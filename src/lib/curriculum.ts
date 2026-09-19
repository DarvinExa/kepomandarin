import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export type Curriculum = Database["public"]["Tables"]["curriculums"]["Row"];
export type CurriculumLevel = Database["public"]["Tables"]["levels"]["Row"];

export const DEFAULT_CURRICULUM: Curriculum = {
  id: "curriculum-hsk-std",
  code: "HSK",
  title: "Kurikulum Standar HSK",
  description:
    "Sistem standarisasi kemahiran bahasa Mandarin internasional untuk pembelajar non-penutur asli.",
  total_levels: 5,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const DEFAULT_LEVELS: CurriculumLevel[] = [
  {
    id: "level-hsk-1",
    curriculum_id: "curriculum-hsk-std",
    level_number: 1,
    code: "HSK 1",
    name: "Tingkat Dasar I",
    vocab_target: 150,
    target_focus: "Fondasi Percakapan & Pengenalan Nada",
    description:
      "Memahami dan menggunakan frasa serta kalimat sederhana untuk kebutuhan komunikasi konkrit sehari-hari.",
    is_active: true,
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "level-hsk-2",
    curriculum_id: "curriculum-hsk-std",
    level_number: 2,
    code: "HSK 2",
    name: "Tingkat Dasar II",
    vocab_target: 300,
    target_focus: "Aktivitas Harian & Arah",
    description:
      "Memperluas percakapan dasar, ungkapan perbandingan, penunjuk arah, dan situasi umum di tempat publik.",
    is_active: true,
    order_index: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "level-hsk-3",
    curriculum_id: "curriculum-hsk-std",
    level_number: 3,
    code: "HSK 3",
    name: "Tingkat Menengah I",
    vocab_target: 600,
    target_focus: "Komunikasi Mandiri",
    description:
      "Mampu berkomunikasi secara lancar dalam kehidupan akademis, pekerjaan, dan perjalanan santai.",
    is_active: true,
    order_index: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "level-hsk-4",
    curriculum_id: "curriculum-hsk-std",
    level_number: 4,
    code: "HSK 4",
    name: "Tingkat Menengah II",
    vocab_target: 1200,
    target_focus: "Wacana Konseptual",
    description:
      "Membahas berbagai topik sosial, berdiskusi mendalam, serta memahami bacaan naratif dan penjelasan abstrak.",
    is_active: true,
    order_index: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "level-hsk-5",
    curriculum_id: "curriculum-hsk-std",
    level_number: 5,
    code: "HSK 5",
    name: "Tingkat Mahir",
    vocab_target: 2500,
    target_focus: "Literasi Komprehensif",
    description:
      "Membaca koran dan majalah berbahasa Mandarin, menikmati film tanpa takarir, dan menyusun pidato terstruktur.",
    is_active: true,
    order_index: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export type Lesson = Database["public"]["Tables"]["lessons"]["Row"];

export const DEFAULT_LESSONS: Lesson[] = [
  {
    id: "lesson-hsk1-01",
    level_id: "level-hsk-1",
    lesson_number: 1,
    slug: "01",
    title: "Sapaan Sopan",
    hanzi: "问候",
    pinyin: "Wènhòu",
    translation: "Sapaan Sehari-hari & Penutupan Percakapan",
    objectives:
      "Memahami penggunaan sapaan formal (您好) dan kasual (你好), aturan perubahan nada ke-3 (sandhi nada), serta salam perpisahan (再见).",
    overview:
      "Pelajaran pertama meletakkan fondasi etika komunikasi berbahasa Mandarin. Kamu akan mempelajari sapaan kasual dan formal, aturan fonetik sandhi nada ke-3, serta ucapan perpisahan santun.",
    grammar_focus: [
      {
        ruleTitle: "Perbedaan '你' (Nǐ) dan '您' (Nín)",
        explanation:
          "Gunakan 你 (nǐ) untuk teman sebaya atau situasi santai, dan gunakan 您 (nín) untuk menunjukkan rasa hormat kepada orang tua, guru, atau klien.",
        example: "您好，老师！(Nín hǎo, lǎoshī! / Halo, guru!)",
      },
    ],
    dialogue_specimen: [
      {
        speaker: "A",
        hanzi: "你好！",
        pinyin: "Nǐ hǎo!",
        translation: "Halo!",
      },
      {
        speaker: "B",
        hanzi: "你好！很高兴认识你。",
        pinyin: "Nǐ hǎo! Hěn gāoxìng rènshi nǐ.",
        translation: "Halo! Senang berkenalan denganmu.",
      },
    ],
    vocab_count: 10,
    duration_minutes: 10,
    order_index: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "lesson-hsk1-02",
    level_id: "level-hsk-1",
    lesson_number: 2,
    slug: "02",
    title: "Identitas Diri",
    hanzi: "自我介绍",
    pinyin: "Zìwǒ Jièshào",
    translation: "Perkenalan Nama & Asal Kewarganegaraan",
    objectives:
      "Menguasai kata ganti orang (我, 你, 他/她), kata kerja penghubung 是 (adalah), kata tanya 什么 (apa), serta menyatakan asal negara (印尼人).",
    overview:
      "Unit kedua fokus pada menyatakan identitas pribadi. Kamu akan menguasai kata ganti orang, kata kerja kopula 是 (adalah), dan cara menanyakan nama orang lain secara natural.",
    grammar_focus: [
      {
        ruleTitle: "Pola Kalimat Penghubung: A 是 B",
        explanation:
          "Kata 是 (shì) berfungsi menghubungkan subjek dengan identitas status, profesi, atau asal negara (setara dengan 'am/is/are').",
        example: "我是印尼人。(Wǒ shì Yìnní rén: Saya orang Indonesia.)",
      },
      {
        ruleTitle: "Menanyakan Nama dengan '什么' (Shénme)",
        explanation:
          "Kata tanya 什么 diletakkan langsung di posisi objek kalimat tanpa mengubah urutan struktur kalimat Mandarin.",
        example: "你叫什么名字？(Nǐ jiào shénme míngzi?: Siapa namamu?)",
      },
    ],
    dialogue_specimen: [
      {
        speaker: "A",
        hanzi: "你好，你叫什么名字？",
        pinyin: "Nǐ hǎo, nǐ jiào shénme míngzi?",
        translation: "Halo, siapa namamu?",
      },
      {
        speaker: "B",
        hanzi: "我叫大卫。你是中国人吗？",
        pinyin: "Wǒ jiào Dàwèi. Nǐ shì Zhōngguó rén ma?",
        translation: "Nama saya David. Apakah kamu orang Tiongkok?",
      },
      {
        speaker: "A",
        hanzi: "不是，我是印尼人。我也是学生。",
        pinyin: "Bú shì, wǒ shì Yìnní rén. Wǒ yě shì xuésheng.",
        translation: "Bukan, saya orang Indonesia. Saya juga seorang pelajar.",
      },
    ],
    vocab_count: 15,
    duration_minutes: 12,
    order_index: 2,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "lesson-hsk1-03",
    level_id: "level-hsk-1",
    lesson_number: 3,
    slug: "03",
    title: "Angka & Waktu",
    hanzi: "数字与时间",
    pinyin: "Shùzì yǔ Shíjiān",
    translation: "Penghitungan Dasar, Jam, Hari & Tanggal",
    objectives:
      "Menyebutkan angka 1 sampai 100, menyatakan waktu jam dan menit (点, 分), nama hari (星期), serta susunan kronologis penanggalan Mandarin.",
    overview:
      "Mempelajari konsep penulisan angka dasar dan susunan hierarki waktu dalam bahasa Mandarin dari unit terbesar ke terkecil (tahun, bulan, tanggal, jam).",
    grammar_focus: [
      {
        ruleTitle: "Hierarki Waktu: Dari Besar ke Kecil",
        explanation:
          "Susunan waktu dalam bahasa Mandarin selalu berurutan: Tahun (年) -> Bulan (月) -> Hari/Tanggal (日/号) -> Jam (点) -> Menit (分).",
        example: "今天十月五号三点。(Jīntiān shí yuè wǔ hào sān diǎn.)",
      },
      {
        ruleTitle: "Menyatakan Hari dalam Seminggu (星期)",
        explanation:
          "Gunakan kata 星期 (xīngqī) diikuti angka 1 (Senin) hingga 6 (Sabtu). Hari Minggu menggunakan 星期天 atau 星期日.",
        example: "今天星期三。(Jīntiān xīngqīsān: Hari ini hari Rabu.)",
      },
    ],
    dialogue_specimen: [
      {
        speaker: "A",
        hanzi: "现在几点？",
        pinyin: "Xiànzài jǐ diǎn?",
        translation: "Sekarang jam berapa?",
      },
      {
        speaker: "B",
        hanzi: "现在八点十五分。",
        pinyin: "Xiànzài bā diǎn shíwǔ fēn.",
        translation: "Sekarang jam 8 lewat 15 menit.",
      },
      {
        speaker: "A",
        hanzi: "今天星期几？",
        pinyin: "Jīntiān xīngqī jǐ?",
        translation: "Hari ini hari apa?",
      },
      {
        speaker: "B",
        hanzi: "今天星期三。",
        pinyin: "Jīntiān xīngqīsān.",
        translation: "Hari ini hari Rabu.",
      },
    ],
    vocab_count: 20,
    duration_minutes: 15,
    order_index: 3,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "lesson-hsk1-04",
    level_id: "level-hsk-1",
    lesson_number: 4,
    slug: "04",
    title: "Keluarga & Relasi",
    hanzi: "家庭与关系",
    pinyin: "Jiātíng yǔ Guānxì",
    translation: "Anggota Keluarga & Hubungan Sosial",
    objectives:
      "Menyebutkan anggota keluarga inti (爸爸, 妈妈, 哥哥, 妹妹), partikel kepemilikan 的 (de), serta kata tanya jumlah 几 (jǐ).",
    overview:
      "Unit keempat mengajarkan penyebutan hubungan kekeluargaan, kepemilikan menggunakan partikel 的, serta penggunaan kata bantu bilangan dasar 个.",
    grammar_focus: [
      {
        ruleTitle: "Partikel Kepemilikan: 的 (De)",
        explanation:
          "Partikel 的 menghubungkan pemilik dengan benda/orang yang dimiliki: [Pemilik] + 的 + [Benda].",
        example: "这是我的书。(Zhè shì wǒ de shū: Ini buku saya.)",
      },
      {
        ruleTitle: "Menyatakan Keberadaan dengan '有' dan '没有'",
        explanation:
          "Gunakan 有 (yǒu) untuk menyatakan memiliki / ada, dan 没有 (méiyǒu) untuk bentuk negasi (tidak ada / tidak punya). Jangan gunakan 不有.",
        example: "我家有四口人。(Wǒ jiā yǒu sì kǒu rén: Keluarga saya ada 4 orang.)",
      },
    ],
    dialogue_specimen: [
      {
        speaker: "A",
        hanzi: "你家有几口人？",
        pinyin: "Nǐ jiā yǒu jǐ kǒu rén?",
        translation: "Keluargamu ada berapa orang?",
      },
      {
        speaker: "B",
        hanzi: "我家有四口人：爸爸、妈妈、一个哥哥和我。",
        pinyin: "Wǒ jiā yǒu sì kǒu rén: bàba, māma, yí gè gēge hé wǒ.",
        translation: "Keluarga saya ada 4 orang: ayah, ibu, seorang kakak laki-laki, dan saya.",
      },
      {
        speaker: "A",
        hanzi: "你哥哥是学生吗？",
        pinyin: "Nǐ gēge shì xuésheng ma?",
        translation: "Apakah kakakmu seorang pelajar?",
      },
      {
        speaker: "B",
        hanzi: "是的，他也是大学生。",
        pinyin: "Shì de, tā yě shì dàxuéshēng.",
        translation: "Benar, dia juga seorang mahasiswa.",
      },
    ],
    vocab_count: 18,
    duration_minutes: 14,
    order_index: 4,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "lesson-hsk1-05",
    level_id: "level-hsk-1",
    lesson_number: 5,
    slug: "05",
    title: "Aktivitas Harian",
    hanzi: "日常活动",
    pinyin: "Rìcháng Huódòng",
    translation: "Kegiatan Rutin, Lokasi & Kebiasaan",
    objectives:
      "Membahas kegiatan sehari-hari (吃, 喝, 去), struktur kalimat subjek + waktu + tempat + predikat, dan partikel tanya 吗 (ma).",
    overview:
      "Unit penutup HSK 1 ini menggabungkan seluruh fondasi tata bahasa: menyatakan tindakan harian, urutan tempat sebelum perbuatan, serta pertanyaan dengan partikel 吗.",
    grammar_focus: [
      {
        ruleTitle: "Struktur Tindakan di Tempat: Subjek + 在 (Tempat) + Kata Kerja",
        explanation:
          "Dalam bahasa Mandarin, keterangan tempat selalu diletakkan sebelum tindakan dilakukan, bukan di akhir kalimat.",
        example: "我在学校看书。(Wǒ zài xuéxiào kàn shū: Saya membaca buku di sekolah.)",
      },
      {
        ruleTitle: "Partikel Tanya '吗' (Ma)",
        explanation:
          "Tambahkan 吗 di akhir kalimat pernyataan untuk mengubahnya menjadi kalimat tanya ya/tidak tanpa mengubah kata lain.",
        example: "你去商店吗？(Nǐ qù shāngdiàn ma?: Apakah kamu pergi ke toko?)",
      },
    ],
    dialogue_specimen: [
      {
        speaker: "A",
        hanzi: "你今天下午做什么？",
        pinyin: "Nǐ jīntiān xiàwǔ zuò shénme?",
        translation: "Apa yang kamu lakukan siang ini?",
      },
      {
        speaker: "B",
        hanzi: "我去图书馆看书。你呢？",
        pinyin: "Wǒ qù túshūguǎn kàn shū. Nǐ ne?",
        translation: "Saya pergi ke perpustakaan untuk membaca buku. Bagaimana denganmu?",
      },
      {
        speaker: "A",
        hanzi: "我想去喝中国茶，吃点心。",
        pinyin: "Wǒ xiǎng qù hē Zhōngguó chá, chī diǎnxin.",
        translation: "Saya ingin pergi minum teh Tiongkok dan makan dimsum.",
      },
    ],
    vocab_count: 22,
    duration_minutes: 16,
    order_index: 5,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export interface GrammarFocusItem {
  ruleTitle: string;
  explanation: string;
  example: string;
}

export interface DialogueSpecimenItem {
  speaker: string;
  hanzi: string;
  pinyin: string;
  translation: string;
}

export function parseGrammarFocus(grammarFocusJson: unknown): GrammarFocusItem[] {
  if (Array.isArray(grammarFocusJson)) {
    return grammarFocusJson as GrammarFocusItem[];
  }
  return [];
}

export function parseDialogueSpecimen(dialogueSpecimenJson: unknown): DialogueSpecimenItem[] {
  if (Array.isArray(dialogueSpecimenJson)) {
    return dialogueSpecimenJson as DialogueSpecimenItem[];
  }
  return [];
}

/**
 * Mengambil data kurikulum dari Supabase atau fallback ke data statis
 */
export async function getCurriculumData(code = "HSK"): Promise<Curriculum> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("curriculums")
      .select("*")
      .eq("code", code)
      .maybeSingle();

    if (!error && data) {
      return data;
    }
  } catch {
    // Gunakan data default jika koneksi gagal atau tabel belum siap
  }
  return DEFAULT_CURRICULUM;
}

/**
 * Mengambil daftar tingkatan level dari Supabase atau fallback ke data statis
 */
export async function getCurriculumLevels(): Promise<CurriculumLevel[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("levels")
      .select("*")
      .order("order_index", { ascending: true });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch {
    // Gunakan data default jika koneksi gagal atau tabel belum siap
  }
  return DEFAULT_LEVELS;
}

/**
 * Mengambil daftar pelajaran berdasarkan level_id atau fallback ke data statis
 */
export async function getLessonsByLevel(levelId?: string): Promise<Lesson[]> {
  try {
    const supabase = createClient();
    let query = supabase
      .from("lessons")
      .select("*")
      .order("order_index", { ascending: true });
    if (levelId) {
      query = query.eq("level_id", levelId);
    }
    const { data, error } = await query;

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch {
    // Gunakan data default jika koneksi gagal atau tabel belum siap
  }
  return DEFAULT_LESSONS;
}

/**
 * Mengambil detail pelajaran berdasarkan slug (misal: "01", "02")
 */
export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && data) {
      return data;
    }
  } catch {
    // Gunakan data default jika koneksi gagal atau tabel belum siap
  }
  return DEFAULT_LESSONS.find((l) => l.slug === slug) ?? null;
}

export type VocabularyItem = Database["public"]["Tables"]["vocabulary"]["Row"];

/**
 * Mengambil daftar kosakata berdasarkan lesson_id
 */
export async function getVocabularyByLesson(lessonId: string): Promise<VocabularyItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("vocabulary")
      .select("*")
      .eq("lesson_id", lessonId)
      .order("order_index", { ascending: true });

    if (!error && data) {
      return data;
    }
  } catch {
    // Abaikan kegagalan jaringan
  }
  return [];
}

/**
 * Mengambil daftar kosakata berdasarkan level_id
 */
export async function getVocabularyByLevel(levelId: string): Promise<VocabularyItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("vocabulary")
      .select("*")
      .eq("level_id", levelId)
      .order("order_index", { ascending: true });

    if (!error && data) {
      return data;
    }
  } catch {
    // Abaikan kegagalan jaringan
  }
  return [];
}
