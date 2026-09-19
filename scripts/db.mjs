import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

function getDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL.trim();
  }

  const envPath = path.join(projectRoot, ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (trimmed.startsWith("DATABASE_URL=")) {
        return trimmed.slice("DATABASE_URL=".length).trim();
      }
    }
  }

  throw new Error(
    "DATABASE_URL tidak ditemukan. Pastikan variabel ini tersedia di .env.local atau environment."
  );
}

async function getClient() {
  const connectionString = getDatabaseUrl();
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  return client;
}

async function runMigrate() {
  const migrationsDir = path.join(projectRoot, "supabase", "migrations");
  if (!fs.existsSync(migrationsDir)) {
    console.log("Direktori migrasi tidak ditemukan.");
    return;
  }

  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.log("Tidak ada berkas migrasi .sql.");
    return;
  }

  const client = await getClient();

  try {
    // 1. Pastikan tabel pelacak migrasi ada
    await client.query(`
      CREATE TABLE IF NOT EXISTS public._migrations (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        executed_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    const { rows } = await client.query("SELECT name FROM public._migrations;");
    const executed = new Set(rows.map((r) => r.name));

    // 2. Tandai migrasi lama yang tabelnya sudah terbukti eksis di database
    const legacyTableMap = [
      { num: "000001", table: "curriculums" },
      { num: "000002", table: "lessons" },
      { num: "000003", table: "vocabulary" },
      { num: "000004", table: "exercises" },
      { num: "000005", table: "error_entries" },
    ];

    for (const item of legacyTableMap) {
      const matchFile = files.find((f) => f.includes(item.num));
      if (matchFile && !executed.has(matchFile)) {
        const checkRes = await client.query(`SELECT to_regclass('public.${item.table}');`);
        if (checkRes.rows[0].to_regclass) {
          await client.query(
            "INSERT INTO public._migrations (name) VALUES ($1) ON CONFLICT (name) DO NOTHING;",
            [matchFile]
          );
          executed.add(matchFile);
        }
      }
    }

    // 3. Filter migrasi yang belum dijalankan
    const pending = files.filter((f) => !executed.has(f));
    if (pending.length === 0) {
      console.log("Semua migrasi sudah pernah diterapkan. Tidak ada migrasi baru.");
      return;
    }

    console.log(`Menjalankan ${pending.length} migrasi baru...`);
    for (const file of pending) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, "utf-8");
      console.log(`[MIGRATE] Mengeksekusi ${file}...`);
      await client.query(sql);
      await client.query("INSERT INTO public._migrations (name) VALUES ($1);", [file]);
      console.log(`[MIGRATE] Berhasil: ${file}`);
    }
    console.log("Semua migrasi selesai dengan sukses!");
  } finally {
    await client.end();
  }
}

async function runSeed() {
  const seedFile = path.join(projectRoot, "supabase", "seed.sql");
  if (!fs.existsSync(seedFile)) {
    console.log("Berkas seed.sql tidak ditemukan.");
    return;
  }

  console.log("[SEED] Mengeksekusi data benih dari supabase/seed.sql...");
  const sql = fs.readFileSync(seedFile, "utf-8");
  const client = await getClient();

  try {
    await client.query(sql);
    console.log("[SEED] Berhasil menyemai data kurikulum, tingkatan, dan pelajaran!");
  } finally {
    await client.end();
  }
}

async function main() {
  const command = process.argv[2];

  try {
    if (command === "migrate") {
      await runMigrate();
    } else if (command === "seed") {
      await runSeed();
    } else {
      console.log("Perintah tidak dikenal. Gunakan: migrate | seed");
      process.exit(1);
    }
  } catch (error) {
    console.error("Gagal mengeksekusi operasi database:", error);
    process.exit(1);
  }
}

main();
