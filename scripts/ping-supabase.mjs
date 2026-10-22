import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Muat variabel environment dari .env.local atau .env jika belum tersedia di process.env
function loadEnvFile(filename) {
  const filePath = path.join(projectRoot, filename);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('[Error] Supabase URL atau Anon Key tidak ditemukan di environment maupun file .env.local.');
  process.exitCode = 1;
} else {
  const startTime = Date.now();
  const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/curriculums?select=id&limit=1`;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] Memulai ping Supabase...`);
  console.log(`Target host: ${new URL(supabaseUrl).host}`);

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      }
    });

    const elapsed = Date.now() - startTime;

    if (!res.ok) {
      const text = await res.text();
      console.error(`[Error] Gagal melakukan query ke Supabase. Status: ${res.status} (${res.statusText})`);
      console.error(`Detail: ${text}`);
      process.exitCode = 1;
    } else {
      const data = await res.json();
      console.log(`[Sukses] Supabase aktif dan merespons dalam ${elapsed} ms.`);
      console.log(`Data terverifikasi: ${JSON.stringify(data)}`);
      process.exitCode = 0;
    }
  } catch (err) {
    const elapsed = Date.now() - startTime;
    console.error(`[Error] Terjadi kesalahan koneksi setelah ${elapsed} ms: ${err.message}`);
    process.exitCode = 1;
  }
}
