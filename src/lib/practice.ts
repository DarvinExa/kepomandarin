import type { Database } from "@/lib/supabase/types";

export type ExerciseRow = Database["public"]["Tables"]["exercises"]["Row"];

export interface SentenceOrderingFragment {
  text: string;
  pinyin?: string;
}

export interface ExerciseItem {
  id: string;
  level_id: string;
  lesson_id: string | null;
  module_id?: string;
  unit_slug?: string;
  type: "multiple_choice" | "sentence_ordering" | "listening";
  prompt: string;
  context_hanzi: string;
  context_pinyin: string;
  context_translation: string;
  audio_url?: string | null;
  options: string[] | SentenceOrderingFragment[];
  correct_answer: string;
  explanation: string;
  order_index: number;
}

export function stripTrailingPunctuation(str: string): string {
  if (!str) return "";
  return str.replace(/[。！？\.,!?，、\s]+$/, "").trim();
}

// -------------------------------------------------------------
// DEFAULT EXERCISES DATABASE (28 UNIT: FONDASI + HSK 1 S.D. 5)
// -------------------------------------------------------------
export const DEFAULT_EXERCISES: ExerciseItem[] = [
  // ==========================================
  // FONDASI DASAR (FUNDAMENTALS)
  // ==========================================
  // Unit 01: Cara Kerja Bahasa Mandarin (F-01)
  {
    id: "fund-ex-01",
    level_id: "fundamentals",
    lesson_id: "fund-01",
    module_id: "fundamentals",
    unit_slug: "01",
    type: "multiple_choice",
    prompt: "Apa fungsi utama sistem Pīnyīn dalam mempelajari bahasa Mandarin?",
    context_hanzi: "拼音",
    context_pinyin: "Pīnyīn",
    context_translation: "sistem romanisasi fonetik",
    options: [
      "Sistem romanisasi fonetik resmi untuk memandu pelafalan aksara Hanzi",
      "Satu-satunya aksara resmi yang menggantikan karakter Hanzi secara tertulis",
      "Bahasa daerah khusus yang hanya digunakan di Tiongkok selatan",
      "Kumpulan simbol angka untuk menghitung tanggal kalender",
    ],
    correct_answer: "Sistem romanisasi fonetik resmi untuk memandu pelafalan aksara Hanzi",
    explanation:
      "Pīnyīn diciptakan sebagai sistem transkripsi fonetik huruf Latin resmi untuk memandu cara membaca dan melafalkan karakter Hanzi dengan nada yang tepat.",
    order_index: 1,
  },
  {
    id: "fund-ex-02",
    level_id: "fundamentals",
    lesson_id: "fund-01",
    module_id: "fundamentals",
    unit_slug: "01",
    type: "sentence_ordering",
    prompt: "Berdasarkan anatomi satu suku kata Mandarin, susunlah komponen pembentuk kata 'mǎ' (马 - kuda) secara runtut:",
    context_hanzi: "mǎ (马)",
    context_pinyin: "mǎ",
    context_translation: "kuda (suku kata utuh)",
    options: [
      { text: "Inisial: m", pinyin: "konsonan awal" },
      { text: "Final: a", pinyin: "vokal inti" },
      { text: "Nada: ke-3 (ˇ)", pinyin: "kontur melengkung rendah" },
    ],
    correct_answer: "Inisial: m Final: a Nada: ke-3 (ˇ)",
    explanation:
      "Suku kata 'mǎ' tersusun runtut atas inisial konsonan 'm', final vokal 'a', dan tanda nada ke-3 di atas vokal utama.",
    order_index: 2,
  },
  {
    id: "fund-ex-03",
    level_id: "fundamentals",
    lesson_id: "fund-01",
    module_id: "fundamentals",
    unit_slug: "01",
    type: "listening",
    prompt: "Dengarkan audio suku kata bernada ketiga (turun-naik rendah) berikut, lalu pilih kata yang tepat:",
    context_hanzi: "马",
    context_pinyin: "mǎ",
    context_translation: "kuda",
    options: ["mǎ (马 / kuda)", "mā (妈 / ibu)", "má (麻 / rami)", "mà (骂 / memarahi)"],
    correct_answer: "mǎ (马 / kuda)",
    explanation:
      "Audio melafalkan suku kata 'mǎ' (马 - kuda) dengan nada ke-3 yang bersuara rendah lalu melengkung naik.",
    order_index: 3,
  },

  // Unit 02: Initials: Kelompok Dasar (F-02)
  {
    id: "fund-ex-04",
    level_id: "fundamentals",
    lesson_id: "fund-02",
    module_id: "fundamentals",
    unit_slug: "02",
    type: "multiple_choice",
    prompt: "Manakah kelompok konsonan inisial dasar yang seluruhnya wajib diucapkan dengan semburan hembusan udara kuat (aspirasi)?",
    context_hanzi: "送气音",
    context_pinyin: "Sòngqìyīn",
    context_translation: "Konsonan Aspirasi (Berhembus Kuat)",
    options: [
      "p, t, dan k",
      "b, d, dan g",
      "m, n, dan l",
      "b, p, dan m",
    ],
    correct_answer: "p, t, dan k",
    explanation:
      "Konsonan 'p', 't', dan 'k' merupakan konsonan aspirasi yang wajib dilafalkan dengan letupan semburan udara kuat dari rongga mulut.",
    order_index: 1,
  },
  {
    id: "fund-ex-05",
    level_id: "fundamentals",
    lesson_id: "fund-02",
    module_id: "fundamentals",
    unit_slug: "02",
    type: "sentence_ordering",
    prompt: "Susun suku kata 'pà' (怕 - takut) dari komponen konsonan inisial berhembus dan vokal berikut:",
    context_hanzi: "怕 (pà)",
    context_pinyin: "pà",
    context_translation: "takut",
    options: [
      { text: "p", pinyin: "inisial berhembus kuat" },
      { text: "a", pinyin: "vokal terbuka" },
      { text: "Nada 4 (` )", pinyin: "kontur jatuh tegas" },
    ],
    correct_answer: "p a Nada 4 (` )",
    explanation:
      "Kata 'pà' dibentuk secara runtut dari inisial aspirasi bibir 'p', final vokal 'a', dan tanda nada ke-4 jatuh tegas.",
    order_index: 2,
  },
  {
    id: "fund-ex-06",
    level_id: "fundamentals",
    lesson_id: "fund-02",
    module_id: "fundamentals",
    unit_slug: "02",
    type: "listening",
    prompt: "Dengarkan audio kata berikut, lalu tentukan apakah kata yang dilafalkan berawal dari konsonan b (tanpa hembusan) atau p (berhembus kuat):",
    context_hanzi: "怕",
    context_pinyin: "pà",
    context_translation: "takut",
    options: [
      "pà (怕 - takut / konsonan berhembus kuat)",
      "bà (爸 - ayah / konsonan tanpa hembusan)",
      "dà (大 - besar / konsonan ujung lidah)",
      "tā (他 - dia / konsonan berhembus lidah)",
    ],
    correct_answer: "pà (怕 - takut / konsonan berhembus kuat)",
    explanation:
      "Audio melafalkan suku kata 'pà' (怕) dengan semburan hembusan udara nyata pada inisial bibir 'p'.",
    order_index: 3,
  },

  // Unit 03: Initials: Kelompok Sulit (F-03)
  {
    id: "fund-ex-07",
    level_id: "fundamentals",
    lesson_id: "fund-03",
    module_id: "fundamentals",
    unit_slug: "03",
    type: "multiple_choice",
    prompt: "Manakah kelompok konsonan yang wajib diucapkan dengan ujung lidah sedikit melengkung ke atas (zh, ch, sh, r)?",
    context_hanzi: "翘舌音",
    context_pinyin: "Qiàoshéyīn",
    context_translation: "Konsonan Lidah Melengkung (zh, ch, sh, r)",
    options: [
      "zh, ch, sh, dan r",
      "z, c, dan s",
      "j, q, dan x",
      "b, p, m, dan f",
    ],
    correct_answer: "zh, ch, sh, dan r",
    explanation:
      "Kelompok konsonan 'zh, ch, sh, r' diucapkan dengan ujung lidah sedikit melengkung ke atas mendekati langit-langit mulut.",
    order_index: 1,
  },
  {
    id: "fund-ex-08",
    level_id: "fundamentals",
    lesson_id: "fund-03",
    module_id: "fundamentals",
    unit_slug: "03",
    type: "sentence_ordering",
    prompt: "Susun suku kata 'chá' (茶 - teh) dari komponen konsonan berhembus dan vokal berikut:",
    context_hanzi: "茶 (chá)",
    context_pinyin: "chá",
    context_translation: "teh",
    options: [
      { text: "ch", pinyin: "konsonan lidah melengkung berhembus" },
      { text: "a", pinyin: "final vokal terbuka" },
      { text: "Nada 2 (ˊ)", pinyin: "kontur intonasi naik" },
    ],
    correct_answer: "ch a Nada 2 (ˊ)",
    explanation:
      "Kata 'chá' (茶 - teh) tersusun atas konsonan 'ch' (lidah melengkung berhembus angin), vokal 'a', dan nada ke-2 menanjak.",
    order_index: 2,
  },
  {
    id: "fund-ex-09",
    level_id: "fundamentals",
    lesson_id: "fund-03",
    module_id: "fundamentals",
    unit_slug: "03",
    type: "listening",
    prompt: "Dengarkan audio kata berikut, lalu tentukan apakah konsonan yang dilafalkan adalah bunyi lidah melengkung (zh) atau gigi datar (z):",
    context_hanzi: "知",
    context_pinyin: "zhī",
    context_translation: "tahu / mengetahui",
    options: [
      "zhī (知 - tahu / konsonan lidah melengkung ke atas)",
      "zī (资 - modal / konsonan gigi datar)",
      "qī (七 - tujuh / konsonan lidah halus)",
      "xī (西 - barat / konsonan desis halus)",
    ],
    correct_answer: "zhī (知 - tahu / konsonan lidah melengkung ke atas)",
    explanation:
      "Audio melafalkan suku kata 'zhī' (知) dengan ujung lidah sedikit melengkung ke atas, bukan mendatar.",
    order_index: 3,
  },

  // Unit 04: Finals Tunggal & Gabungan (F-04)
  {
    id: "fund-ex-10",
    level_id: "fundamentals",
    lesson_id: "fund-04",
    module_id: "fundamentals",
    unit_slug: "04",
    type: "multiple_choice",
    prompt:
      "Manakah kaidah penulisan tanda titik dua pada vokal 'ü' yang BENAR dalam aturan ejaan Pinyin resmi?",
    context_hanzi: "去 vs 绿",
    context_pinyin: "qù vs lǜ",
    context_translation: "pergi vs hijau",
    options: [
      "Titik dua dihilangkan setelah j, q, x, y (misal: qu), tetapi wajib ditulis setelah n dan l (misal: nǚ, lǜ)",
      "Titik dua selalu dihilangkan pada semua inisial konsonan tanpa pengecualian",
      "Titik dua selalu ditulis pada semua konsonan (misal: qǜ, xǜ, lǜ)",
      "Titik dua hanya ditulis jika kata tersebut berada di akhir kalimat",
    ],
    correct_answer:
      "Titik dua dihilangkan setelah j, q, x, y (misal: qu), tetapi wajib ditulis setelah n dan l (misal: nǚ, lǜ)",
    explanation:
      "Konsonan j, q, x, dan y tidak pernah berpasangan dengan vokal 'u' biasa sehingga titik dua aman dihilangkan tanpa kerancuan (qu, ju, xu, yu). Sebaliknya, n dan l dapat berpasangan dengan u dan ü (lu vs lü), sehingga titik dua wajib dipertahankan.",
    order_index: 1,
  },
  {
    id: "fund-ex-11",
    level_id: "fundamentals",
    lesson_id: "fund-04",
    module_id: "fundamentals",
    unit_slug: "04",
    type: "sentence_ordering",
    prompt:
      "Susun suku kata 'liù' (六 - enam) dari komponen inisial, vokal singkatan (asal iou), dan nada berikut:",
    context_hanzi: "六 (liù)",
    context_pinyin: "liù",
    context_translation: "enam (berasal dari l + iou)",
    options: [
      { text: "l", pinyin: "inisial konsonan lidah" },
      { text: "iu", pinyin: "final singkatan dari iou" },
      { text: "Nada 4 (ˋ)", pinyin: "kontur nada jatuh tegas" },
    ],
    correct_answer: "l iu Nada 4 (ˋ)",
    explanation:
      "Suku kata 'liù' (六 - enam) tersusun dari inisial 'l', vokal singkatan 'iu' (berasal dari vokal majemuk 'iou'), dan nada ke-4 jatuh tegas (liù).",
    order_index: 2,
  },
  {
    id: "fund-ex-12",
    level_id: "fundamentals",
    lesson_id: "fund-04",
    module_id: "fundamentals",
    unit_slug: "04",
    type: "listening",
    prompt:
      "Dengarkan audio kata berikut, lalu tentukan apakah vokal yang dilafalkan adalah vokal bulat khusus ü (lǜ - hijau) atau vokal u biasa (lù - jalan):",
    context_hanzi: "绿",
    context_pinyin: "lǜ",
    context_translation: "hijau",
    options: [
      "lǜ (绿 - hijau / vokal bulat bersiul ü)",
      "lù (路 - jalan / vokal belakang u biasa)",
      "lì (利 - tajam / vokal depan i)",
      "lè (乐 - gembira / vokal tengah e)",
    ],
    correct_answer: "lǜ (绿 - hijau / vokal bulat bersiul ü)",
    explanation:
      "Audio melafalkan vokal bulat khusus 'ü' dengan bentuk bibir membulat bersiul pada kata 'lǜ' (绿 - hijau), bukan vokal 'u' biasa pada 'lù' (路 - jalan).",
    order_index: 3,
  },

  // Unit 05: Nasal Finals / Vokal Sengau (F-05)
  {
    id: "fund-ex-13",
    level_id: "fundamentals",
    lesson_id: "fund-05",
    module_id: "fundamentals",
    unit_slug: "05",
    type: "multiple_choice",
    prompt:
      "Manakah pernyataan yang BENAR mengenai posisi artikulasi lidah saat membunyikan vokal sengau depan (-n) dibandingkan sengau belakang (-ng)?",
    context_hanzi: "前鼻音 vs 后鼻音",
    context_pinyin: "Qiánbíyīn vs Hòubíyīn",
    context_translation: "Sengau Depan (-n) vs Sengau Belakang (-ng)",
    options: [
      "Pada -n ujung lidah menempel gusi atas, sedangkan pada -ng pangkal lidah terangkat ke langit-langit lunak",
      "Pada -n lidah ditarik ke belakang, sedangkan pada -ng bibir dirapatkan",
      "Kedua bunyi tersebut dilafalkan persis sama tanpa perbedaan posisi lidah",
      "Pada -ng ujung lidah dikeluarkan di antara dua gigi depan",
    ],
    correct_answer:
      "Pada -n ujung lidah menempel gusi atas, sedangkan pada -ng pangkal lidah terangkat ke langit-langit lunak",
    explanation:
      "Sengau depan (-n) diakhiri sentuhan ujung lidah pada gusi atas (alveolar), sedangkan sengau belakang (-ng) dihasilkan dengan mengangkat pangkal lidah ke langit-langit lunak rongga tekak (velar).",
    order_index: 1,
  },
  {
    id: "fund-ex-14",
    level_id: "fundamentals",
    lesson_id: "fund-05",
    module_id: "fundamentals",
    unit_slug: "05",
    type: "sentence_ordering",
    prompt:
      "Susun suku kata 'tiān' (天 - langit/hari) dari komponen konsonan inisial berhembus, vokal sengau depan gabungan (dilafalkan /ien/), dan tanda nada berikut:",
    context_hanzi: "天 (tiān)",
    context_pinyin: "tiān",
    context_translation: "langit / hari (dilafalkan mendekati /tien/)",
    options: [
      { text: "t", pinyin: "inisial konsonan letupan lidah berhembus" },
      { text: "ian", pinyin: "vokal sengau gabungan /ien/" },
      { text: "Nada 1 (ˉ)", pinyin: "kontur nada tinggi datar" },
    ],
    correct_answer: "t ian Nada 1 (ˉ)",
    explanation:
      "Suku kata 'tiān' (天 - langit/hari) tersusun atas inisial aspirasi 't', vokal sengau depan 'ian' (berbunyi mendekati /ien/), dan nada pertama tinggi datar.",
    order_index: 2,
  },
  {
    id: "fund-ex-15",
    level_id: "fundamentals",
    lesson_id: "fund-05",
    module_id: "fundamentals",
    unit_slug: "05",
    type: "listening",
    prompt:
      "Dengarkan audio kata berikut, lalu tentukan apakah kata yang diucapkan berakhiran sengau depan (-n / melihat) atau sengau belakang (-ng / sehat):",
    context_hanzi: "看",
    context_pinyin: "kàn",
    context_translation: "melihat",
    options: [
      "kàn (看 - melihat / sengau depan ujung lidah -n)",
      "kāng (康 - sehat / sengau belakang pangkal lidah -ng)",
      "kào (靠 - bersandar / vokal majemuk ao)",
      "kè (课 - pelajaran / vokal tunggal e)",
    ],
    correct_answer: "kàn (看 - melihat / sengau depan ujung lidah -n)",
    explanation:
      "Audio melafalkan kata 'kàn' (看 - melihat) dengan penutupan rapi ujung lidah pada gusi atas (sengau depan -n), bukan resonansi rongga tenggorokan 'kāng'.",
    order_index: 3,
  },

  // Unit 06: 4 Nada Utama & Nada Netral (F-06)
  {
    id: "fund-ex-16",
    level_id: "fundamentals",
    lesson_id: "fund-06",
    module_id: "fundamentals",
    unit_slug: "06",
    type: "multiple_choice",
    prompt:
      "Manakah pasangan kontur pitch numerik (五度标记法) yang BENAR untuk Nada Pertama dan Nada Keempat dalam bahasa Mandarin?",
    context_hanzi: "第一声 与 第四声",
    context_pinyin: "Dì-yī shēng yǔ Dì-sì shēng",
    context_translation: "Nada 1 (Tinggi Datar) & Nada 4 (Jatuh Tegas)",
    options: [
      "Nada 1 bernilai 55 (tinggi datar) dan Nada 4 bernilai 51 (puncak jatuh ke dasar)",
      "Nada 1 bernilai 35 (naik) dan Nada 4 bernilai 214 (rendah melengkung)",
      "Nada 1 bernilai 214 dan Nada 4 bernilai 55",
      "Semua nada bernilai datar 33 tanpa perbedaan kontur",
    ],
    correct_answer:
      "Nada 1 bernilai 55 (tinggi datar) dan Nada 4 bernilai 51 (puncak jatuh ke dasar)",
    explanation:
      "Menurut sistem 5-tingkat Chao Yuen Ren, Nada 1 berada di tingkat 55 (tinggi konstan), sedangkan Nada 4 dijatuhkan tegas dari tingkat tertinggi 5 langsung ke dasar terendah 1 (51).",
    order_index: 1,
  },
  {
    id: "fund-ex-17",
    level_id: "fundamentals",
    lesson_id: "fund-06",
    module_id: "fundamentals",
    unit_slug: "06",
    type: "sentence_ordering",
    prompt:
      "Susun kata salam perpisahan 'zàijiàn' (再见 - selamat tinggal) yang terdiri dari dua suku kata bernada ke-4 (jatuh tegas) berikut:",
    context_hanzi: "再见 (zàijiàn)",
    context_pinyin: "zàijiàn",
    context_translation: "selamat tinggal (dua nada ke-4)",
    options: [
      { text: "zài", pinyin: "nada 4 jatuh tegas (51)" },
      { text: "jiàn", pinyin: "nada 4 jatuh tegas (51)" },
      { text: "再见", pinyin: "selamat tinggal" },
    ],
    correct_answer: "zài jiàn 再见",
    explanation:
      "Kata 'zàijiàn' (再见) tersusun atas dua suku kata yang sama-sama bernada ke-4 tegas (zài + jiàn).",
    order_index: 2,
  },
  {
    id: "fund-ex-18",
    level_id: "fundamentals",
    lesson_id: "fund-06",
    module_id: "fundamentals",
    unit_slug: "06",
    type: "listening",
    prompt:
      "Dengarkan audio kata berikut, lalu tentukan kontur nada suara yang dilafalkan:",
    context_hanzi: "马",
    context_pinyin: "mǎ",
    context_translation: "kuda",
    options: [
      "mǎ (马 - kuda / Nada 3: melengkung rendah 214)",
      "mā (妈 - ibu / Nada 1: tinggi datar 55)",
      "má (麻 - rami / Nada 2: naik bertanya 35)",
      "mà (骂 - memarahi / Nada 4: jatuh tegas 51)",
    ],
    correct_answer: "mǎ (马 - kuda / Nada 3: melengkung rendah 214)",
    explanation:
      "Audio melafalkan kata 'mǎ' (马 - kuda) dengan nada ke-3 yang turun ke dasar pita suara (214), berbeda dengan nada 1 (mā), nada 2 (má), dan nada 4 (mà).",
    order_index: 3,
  },

  // Unit 07: Tone Sandhi & Perubahan Nada (F-07)
  {
    id: "fund-ex-19",
    level_id: "fundamentals",
    lesson_id: "fund-07",
    module_id: "fundamentals",
    unit_slug: "07",
    type: "multiple_choice",
    prompt:
      "Ketika dua karakter bernada ke-3 (ˇ) bertemu berdampingan (seperti frasa 'nǐ hǎo' 你好), bagaimanakah aturan pelafalan lisan yang BENAR?",
    context_hanzi: "你好 (nǐ hǎo)",
    context_pinyin: "nǐ hǎo",
    context_translation: "halo / apa kabar",
    options: [
      "Karakter pertama otomatis dilafalkan sebagai Nada ke-2 (ní hǎo), karakter kedua tetap Nada ke-3",
      "Kedua karakter sama-sama berubah menjadi Nada ke-1 (nī hāo)",
      "Kedua karakter dilafalkan dengan nada netral tanpa intonasi",
      "Karakter kedua yang berubah menjadi Nada ke-4 (nǐ hào)",
    ],
    correct_answer:
      "Karakter pertama otomatis dilafalkan sebagai Nada ke-2 (ní hǎo), karakter kedua tetap Nada ke-3",
    explanation:
      "Sesuai kaidah sandhi 3+3 (三声变调), jika dua nada ke-3 bertemu, nada ke-3 pertama dilafalkan sebagai nada ke-2 (35 menanjak) agar lebih luwes diucapkan (ní hǎo).",
    order_index: 1,
  },
  {
    id: "fund-ex-20",
    level_id: "fundamentals",
    lesson_id: "fund-07",
    module_id: "fundamentals",
    unit_slug: "07",
    type: "sentence_ordering",
    prompt:
      "Susun frasa negasi 'bú shì' (不是 - bukan) yang mengalami perubahan sandhi nada dari kata 'bù' (asal nada 4) saat bertemu nada 4 'shì' berikut:",
    context_hanzi: "不是 (bú shì)",
    context_pinyin: "bú shì",
    context_translation: "bukan / tidak (dilafalkan bú shì)",
    options: [
      { text: "bú", pinyin: "kata 不 berubah menjadi nada 2 naik" },
      { text: "shì", pinyin: "kata 是 bernada 4 jatuh tegas" },
      { text: "不是", pinyin: "bukan / tidak" },
    ],
    correct_answer: "bú shì 不是",
    explanation:
      "Kata negasi '不' (bù) berubah menjadi nada ke-2 ('bú') saat bertemu suku kata bernada ke-4 lainnya ('shì'), sehingga dibaca 'bú shì'.",
    order_index: 2,
  },
  {
    id: "fund-ex-21",
    level_id: "fundamentals",
    lesson_id: "fund-07",
    module_id: "fundamentals",
    unit_slug: "07",
    type: "listening",
    prompt:
      "Dengarkan audio kata '一个' (sebuah / satu orang) berikut, lalu tentukan nada yang dilafalkan pada kata '一':",
    context_hanzi: "一个",
    context_pinyin: "yí ge",
    context_translation: "sebuah / satu orang",
    options: [
      "yí ge (kata '一' dilafalkan Nada ke-2 naik sebelum kata bernada ke-4)",
      "yī ge (kata '一' dilafalkan Nada ke-1 tinggi datar)",
      "yì ge (kata '一' dilafalkan Nada ke-4 jatuh)",
      "ge yí (urutan suku kata terbalik)",
    ],
    correct_answer:
      "yí ge (kata '一' dilafalkan Nada ke-2 naik sebelum kata bernada ke-4)",
    explanation:
      "Kata bilangan '一' (yī) mengalami perubahan nada menjadi nada ke-2 ('yí') saat mendahului suku kata bernada ke-4 ('gè' / ge).",
    order_index: 3,
  },

  // Unit 08: Aturan Penulisan Pinyin (F-08)
  {
    id: "fund-ex-22",
    level_id: "fundamentals",
    lesson_id: "fund-08",
    module_id: "fundamentals",
    unit_slug: "08",
    type: "multiple_choice",
    prompt:
      "Manakah aturan penempatan tanda nada (标调规则) yang BENAR ketika suku kata memiliki dua vokal berdampingan seperti 'iu' pada kata 'liù' (六 - enam) dan 'ui' pada kata 'duì' (对 - benar)?",
    context_hanzi: "标调规则",
    context_pinyin: "Biāodiào Guīzé",
    context_translation: "Aturan Penempatan Tanda Nada",
    options: [
      "Jika 'i' dan 'u' berdampingan, tanda nada selalu diletakkan pada huruf vokal yang berada di urutan kedua ('liù' dan 'duì')",
      "Tanda nada selalu diletakkan pada huruf 'i' terlebih dahulu di semua kondisi",
      "Tanda nada selalu diletakkan pada huruf konsonan inisial",
      "Tanda nada diletakkan di antara dua huruf vokal",
    ],
    correct_answer:
      "Jika 'i' dan 'u' berdampingan, tanda nada selalu diletakkan pada huruf vokal yang berada di urutan kedua ('liù' dan 'duì')",
    explanation:
      "Sesuai rima hierarki baku 'i, u 并列标在后' (jika i dan u berdampingan, tanda nada pada huruf di belakang), pada kata 'liù' nada di atas 'u', sedangkan pada 'duì' nada di atas 'i'.",
    order_index: 1,
  },
  {
    id: "fund-ex-23",
    level_id: "fundamentals",
    lesson_id: "fund-08",
    module_id: "fundamentals",
    unit_slug: "08",
    type: "sentence_ordering",
    prompt:
      "Susun ejaan baku nama kota kuno 'Xī'ān' (西安) lengkap dengan tanda apostrof pemisah batas suku kata (隔音符号) berikut:",
    context_hanzi: "西安 (Xī'ān)",
    context_pinyin: "Xī'ān",
    context_translation: "Kota Xi'an (menggunakan apostrof pemisah)",
    options: [
      { text: "Xī", pinyin: "suku kata pertama kapital" },
      { text: "'", pinyin: "tanda apostrof pemisah batas suku kata" },
      { text: "ān", pinyin: "suku kata kedua diawali vokal a" },
    ],
    correct_answer: "Xī ' ān",
    explanation:
      "Nama kota 'Xī'ān' (西安) wajib menggunakan tanda apostrof (') pemisah sebelum vokal 'ā' agar tidak disalahartikan sebagai satu suku kata tunggal 'xiān' (先 - terlebih dahulu).",
    order_index: 2,
  },
  {
    id: "fund-ex-24",
    level_id: "fundamentals",
    lesson_id: "fund-08",
    module_id: "fundamentals",
    unit_slug: "08",
    type: "listening",
    prompt:
      "Dengarkan audio kata berikut, lalu tentukan apakah kata yang diucapkan adalah nama kota dua suku kata 'Xī'ān' (西安) atau kata satu suku kata 'xiān' (先):",
    context_hanzi: "西安 vs 先",
    context_pinyin: "Xī'ān vs xiān",
    context_translation: "Kota Xi'an (dua ketukan) vs duluan (satu ketukan)",
    options: [
      "Xī'ān (西安 - dua suku kata terpisah dengan jeda mikro / nama kota)",
      "xiān (先 - satu suku kata tunggal meluncur / terlebih dahulu)",
      "xīn (新 - baru / vokal sengau in)",
      "xiāng (香 - wangi / vokal sengau iang)",
    ],
    correct_answer:
      "Xī'ān (西安 - dua suku kata terpisah dengan jeda mikro / nama kota)",
    explanation:
      "Audio melafalkan dua suku kata terpisah secara beruntun ('Xī' lalu 'ān'), yang dalam ejaan pinyin resmi wajib ditulis 'Xī'ān'.",
    order_index: 3,
  },

  // Unit 09: Struktur Hanzi & Urutan Goresan (F-09)
  {
    id: "fund-ex-25",
    level_id: "fundamentals",
    lesson_id: "fund-09",
    module_id: "fundamentals",
    unit_slug: "09",
    type: "multiple_choice",
    prompt:
      "Pada karakter berstruktur mengelilingi penuh (全包围结构) seperti '国' (guó - negara) dan '回' (huí - kembali), bagaimanakah kaidah urutan penulisan yang BENAR?",
    context_hanzi: "国 (guó) / 回 (huí)",
    context_pinyin: "Quánbāowéi Jiégòu",
    context_translation: "Struktur Mengelilingi Penuh (Luar dulu, dalam, baru tutup bingkai)",
    options: [
      "Tulis bingkai luar (kiri, atas, kanan), tulis komponen isi di dalam, lalu tutup garis bawah paling akhir ('masuk rumah dulu, baru kunci pintu')",
      "Buat kotak bingkai tertutup rapat terlebih dahulu dari awal, lalu selipkan komponen isi di dalamnya",
      "Tulis garis penutup bawah terlebih dahulu, baru mendirikan dinding kiri dan kanan",
      "Tulis komponen dalam terlebih dahulu, baru buat kotak melingkari di sekelilingnya",
    ],
    correct_answer:
      "Tulis bingkai luar (kiri, atas, kanan), tulis komponen isi di dalam, lalu tutup garis bawah paling akhir ('masuk rumah dulu, baru kunci pintu')",
    explanation:
      "Prinsip baku untuk karakter mengelilingi penuh (全包围) adalah '先外后里再封口' (buat tiga sisi bingkai luar terlebih dahulu, masukkan komponen isi ke dalam, lalu tutup garis horizontal bawah paling akhir sebagai segel penutup).",
    order_index: 1,
  },
  {
    id: "fund-ex-26",
    level_id: "fundamentals",
    lesson_id: "fund-09",
    module_id: "fundamentals",
    unit_slug: "09",
    type: "sentence_ordering",
    prompt:
      "Susun urutan goresan yang BENAR saat menulis karakter '木' (mù - kayu/pohon) dari tarikan pertama hingga terakhir:",
    context_hanzi: "木 (mù)",
    context_pinyin: "mù",
    context_translation: "kayu / pohon (4 goresan)",
    options: [
      { text: "1. 横 (héng)", pinyin: "garis mendatar dari kiri ke kanan" },
      { text: "2. 竖 (shù)", pinyin: "garis tegak lurus memotong tengah" },
      { text: "3. 撇 (piě)", pinyin: "goresan miring melengkung ke kiri" },
      { text: "4. 捺 (nà)", pinyin: "goresan miring menekan ke kanan" },
    ],
    correct_answer: "1. 横 (héng) 2. 竖 (shù) 3. 撇 (piě) 4. 捺 (nà)",
    explanation:
      "Sesuai kaidah '先横后竖' (horizontal sebelum vertikal) dan '先撇后捺' (miring kiri sebelum miring kanan), urutan goresan '木' secara runtut adalah: 横 (1) → 竖 (2) → 撇 (3) → 捺 (4).",
    order_index: 2,
  },
  {
    id: "fund-ex-27",
    level_id: "fundamentals",
    lesson_id: "fund-09",
    module_id: "fundamentals",
    unit_slug: "09",
    type: "listening",
    prompt:
      "Dengarkan audio pembahasan radikal karakter berikut, lalu tentukan radikal semantik yang berkaitan dengan air dan cairan pada kata 'hǎi' (海 - laut):",
    context_hanzi: "海 (hǎi)",
    context_pinyin: "hǎi",
    context_translation: "laut (memiliki radikal tiga titik air)",
    options: [
      "氵 (sāndiǎnshuǐ - tiga titik air di sebelah kiri / perubahan bentuk dari '水')",
      "亻 (dānrénpáng - radikal manusia di sebelah kiri / perubahan bentuk dari '人')",
      "灬 (sìdiǎnhuǒ - radikal empat titik api di sebelah bawah)",
      "艹 (cǎozìtóu - radikal rumput/tumbuhan di sebelah atas)",
    ],
    correct_answer:
      "氵 (sāndiǎnshuǐ - tiga titik air di sebelah kiri / perubahan bentuk dari '水')",
    explanation:
      "Karakter '海' (hǎi - laut) memiliki radikal semantik 氵 (sāndiǎnshuǐ / tiga titik air) yang menandakan bahwa kata tersebut berkaitan erat dengan air, sungai, atau lautan.",
    order_index: 3,
  },

  // Unit 10: Ujian Akhir Fondasi & Mini Proyek (F-10)
  {
    id: "fund-ex-28",
    level_id: "fundamentals",
    lesson_id: "fund-10",
    module_id: "fundamentals",
    unit_slug: "10",
    type: "multiple_choice",
    prompt:
      "Dalam evaluasi komprehensif sistem pinyin dan nada, manakah pernyataan berikut yang PALING TEPAT mengenai pelafalan frasa 'bú duì' (不对 - tidak benar) dan penulisan nama kota 'Xī'ān' (西安)?",
    context_hanzi: "不对 与 西安",
    context_pinyin: "bú duì yǔ Xī'ān",
    context_translation: "Evaluasi Pinyin, Sandhi Nada & Apostrof Pemisah",
    options: [
      "Kata '不' mengalami perubahan sandhi menjadi nada ke-2 ('bú') sebelum nada ke-4 'duì', dan nama kota 'Xī'ān' wajib memakai apostrof pemisah batas suku kata.",
      "Kata '不' tidak pernah berubah nada dalam kondisi apa pun dan nama kota 'Xī'ān' wajib ditulis tanpa apostrof.",
      "Tanda nada pada kata 'duì' diletakkan di atas huruf 'u' bukan 'i'.",
      "Kedua kata dilafalkan dengan nada netral tanpa intonasi.",
    ],
    correct_answer:
      "Kata '不' mengalami perubahan sandhi menjadi nada ke-2 ('bú') sebelum nada ke-4 'duì', dan nama kota 'Xī'ān' wajib memakai apostrof pemisah batas suku kata.",
    explanation:
      "Kata negasi '不' (bù) berubah menjadi nada ke-2 ('bú') ketika mendahului nada ke-4 lainnya ('duì'). Nama kota 'Xī'ān' (西安) wajib menggunakan tanda apostrof pemisah agar tidak keliru dibaca sebagai suku kata tunggal 'xiān'.",
    order_index: 1,
  },
  {
    id: "fund-ex-29",
    level_id: "fundamentals",
    lesson_id: "fund-10",
    module_id: "fundamentals",
    unit_slug: "10",
    type: "sentence_ordering",
    prompt:
      "Susun kalimat Mini Proyek perkenalan diri sederhana berikut secara runtut dan tepat:",
    context_hanzi: "你好，我叫大卫，我学中文。",
    context_pinyin: "Nǐ hǎo, wǒ jiào Dàwèi, wǒ xué Zhōngwén.",
    context_translation: "Halo, nama saya David, saya belajar bahasa Mandarin.",
    options: [
      { text: "你好，", pinyin: "salam pembuka (ní hǎo)" },
      { text: "我叫大卫，", pinyin: "perkenalan nama diri" },
      { text: "我学中文。", pinyin: "kalimat deklaratif tujuan belajar" },
    ],
    correct_answer: "你好， 我叫大卫， 我学中文。",
    explanation:
      "Struktur perkenalan lisan alami dalam bahasa Mandarin diawali oleh salam sopan ('你好'), diikuti perkenalan nama diri ('我叫大卫'), dan diakhiri kalimat konteks kegiatan ('我学中文').",
    order_index: 2,
  },
  {
    id: "fund-ex-30",
    level_id: "fundamentals",
    lesson_id: "fund-10",
    module_id: "fundamentals",
    unit_slug: "10",
    type: "listening",
    prompt:
      "Dengarkan audio evaluasi integratif berikut, lalu identifikasi kalimat yang dilafalkan lengkap dengan penerapan sandhi nada yang tepat:",
    context_hanzi: "你好，一个苹果。",
    context_pinyin: "Nǐ hǎo, yí ge píngguǒ.",
    context_translation: "Halo, sebuah apel. (Pelafalan lisan: ní hǎo, yí ge píngguǒ)",
    options: [
      "你好，一个苹果 (Ní hǎo, yí ge píngguǒ - sandhi nada 2 pada 'nǐ' dan kata '一' berubah 'yí')",
      "Nǐ hǎo, yī ge píngguǒ (tanpa penerapan perubahan sandhi lisan)",
      "Bù hǎo, sì ge píngguǒ (kosakata dan makna berbeda)",
      "Zàijiàn, liǎng ge lí (kalimat perpisahan dan buah pir)",
    ],
    correct_answer:
      "你好，一个苹果 (Ní hǎo, yí ge píngguǒ - sandhi nada 2 pada 'nǐ' dan kata '一' berubah 'yí')",
    explanation:
      "Rekaman melafalkan kalimat '你好，一个苹果' dengan penerapan sandhi 3+3 pada 'ní hǎo' serta sandhi kata bilangan '一' menjadi 'yí' sebelum suku kata bernada ke-4 ('gè' / ge).",
    order_index: 3,
  },

  // ==========================================
  // TINGKAT HSK 1
  // ==========================================
  // Unit 01: Sapaan Sopan
  {
    id: "ex-01",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000001",
    module_id: "hsk1",
    unit_slug: "01",
    type: "multiple_choice",
    prompt: "Pilih kata sapaan yang paling sopan dan tepat untuk menyapa seorang pengajar:",
    context_hanzi: "老师 ___ 好",
    context_pinyin: "Lǎoshī ___ hǎo",
    context_translation: "Guru halo",
    options: ["你 (nǐ)", "您 (nín)", "吗 (ma)", "不 (bù)"],
    correct_answer: "您 (nín)",
    explanation:
      'Gunakan kata ganti hormat "您" (nín) untuk menyapa guru, orang tua, atau senior. Sedangkan "你" (nǐ) digunakan untuk teman sebaya.',
    order_index: 1,
  },
  {
    id: "ex-02",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000001",
    module_id: "hsk1",
    unit_slug: "01",
    type: "sentence_ordering",
    prompt: "Susun potongan kata Mandarin berikut agar membentuk kalimat yang sesuai dengan arti bahasa Indonesia di atas:",
    context_hanzi: "明天学校见",
    context_pinyin: "Míngtiān xuéxiào jiàn",
    context_translation: "Sampai jumpa di sekolah besok",
    options: [
      { text: "学校", pinyin: "xuéxiào" },
      { text: "见", pinyin: "jiàn" },
      { text: "明天", pinyin: "míngtiān" },
    ],
    correct_answer: "明天 学校 见",
    explanation:
      "Kalimat '明天学校见' (Míngtiān xuéxiào jiàn) berarti 'Sampai jumpa di sekolah besok'. Keterangan waktu (明天) mendahului keterangan tempat (学校) dan kata kerja (见).",
    order_index: 2,
  },
  {
    id: "ex-13",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000001",
    module_id: "hsk1",
    unit_slug: "01",
    type: "listening",
    prompt: "Dengarkan audio pelafalan berikut, lalu pilih frasa Hanzi dan ejaan pinyin yang diucapkan:",
    context_hanzi: "早上好",
    context_pinyin: "Zǎoshang hǎo",
    context_translation: "Selamat pagi",
    options: ["再见 (Zàijiàn)", "老师好 (Lǎoshī hǎo)", "早上好 (Zǎoshang hǎo)", "谢谢你 (Xièxie nǐ)"],
    correct_answer: "早上好 (Zǎoshang hǎo)",
    explanation:
      "Audio melafalkan 'Zǎoshang hǎo' (早上好 / Selamat pagi) dengan kontur nada ke-3 pada zǎo, nada netral pada shang, dan nada ke-3 pada hǎo.",
    order_index: 3,
  },
  {
    id: "ex-18",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000001",
    module_id: "hsk1",
    unit_slug: "01",
    type: "listening",
    prompt: "Dengarkan audio percakapan santun berikut, lalu pilih ungkapan Mandarin yang diucapkan:",
    context_hanzi: "明天见",
    context_pinyin: "Míngtiān jiàn",
    context_translation: "Sampai jumpa besok",
    options: ["你好吗 (Nǐ hǎo ma)", "对不起 (Duìbuqǐ)", "不客气 (Bú kèqi)", "明天见 (Míngtiān jiàn)"],
    correct_answer: "明天见 (Míngtiān jiàn)",
    explanation:
      "Audio melafalkan 'Míngtiān jiàn' (明天见) yang berarti 'Sampai jumpa besok'.",
    order_index: 4,
  },

  // Unit 02: Identitas Diri
  {
    id: "ex-03",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000002",
    module_id: "hsk1",
    unit_slug: "02",
    type: "multiple_choice",
    prompt: "Lengkapi kalimat tanya untuk menanyakan nama seseorang secara wajar:",
    context_hanzi: "你叫 ___ 名字",
    context_pinyin: "Nǐ jiào ___ míngzi",
    context_translation: "Siapa namamu",
    options: ["谁 (shéi)", "什么 (shénme)", "哪儿 (nǎr)", "几 (jǐ)"],
    correct_answer: "什么 (shénme)",
    explanation:
      'Kata tanya "什么" (shénme / apa) berpasangan langsung dengan "名字" (míngzi / nama) untuk menanyakan identitas nama seseorang.',
    order_index: 1,
  },
  {
    id: "ex-04",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000002",
    module_id: "hsk1",
    unit_slug: "02",
    type: "sentence_ordering",
    prompt: "Susun potongan kata Mandarin berikut agar membentuk kalimat yang sesuai dengan arti bahasa Indonesia di atas:",
    context_hanzi: "我是印尼人",
    context_pinyin: "Wǒ shì Yìnní rén",
    context_translation: "Saya adalah orang Indonesia",
    options: [
      { text: "印尼人", pinyin: "Yìnní rén" },
      { text: "我", pinyin: "wǒ" },
      { text: "是", pinyin: "shì" },
    ],
    correct_answer: "我 是 印尼人",
    explanation:
      "Struktur kalimat bahasa Mandarin: Subjek (我) + Kata 'adalah' (是) + Objek (印尼人). Berbeda dengan bahasa Indonesia, kata '是' (shì) wajib diucapkan.",
    order_index: 2,
  },
  {
    id: "ex-14",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000002",
    module_id: "hsk1",
    unit_slug: "02",
    type: "listening",
    prompt: "Dengarkan audio percakapan perkenalan berikut, lalu pilih kalimat yang diucapkan:",
    context_hanzi: "很高兴认识你",
    context_pinyin: "Hěn gāoxìng rènshi nǐ",
    context_translation: "Sangat senang berkenalan denganmu",
    options: [
      "明天学校见 (Míngtiān xuéxiào jiàn)",
      "很高兴认识你 (Hěn gāoxìng rènshi nǐ)",
      "你是老师吗 (Nǐ shì lǎoshī ma)",
      "我学汉语 (Wǒ xué hànyǔ)",
    ],
    correct_answer: "很高兴认识你 (Hěn gāoxìng rènshi nǐ)",
    explanation:
      "Ujaran 'Hěn gāoxìng rènshi nǐ' (很高兴认识你) merupakan sapaan etika dasar saat berkenalan pertama kali.",
    order_index: 3,
  },
  {
    id: "ex-19",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000002",
    module_id: "hsk1",
    unit_slug: "02",
    type: "listening",
    prompt: "Dengarkan pertanyaan perkenalan dalam audio berikut, lalu pilih kalimat yang diucapkan:",
    context_hanzi: "你叫什么名字",
    context_pinyin: "Nǐ jiào shénme míngzi",
    context_translation: "Siapa namamu",
    options: [
      "我是印尼人 (Wǒ shì Yìnní rén)",
      "他是我的老师 (Tā shì wǒ de lǎoshī)",
      "你叫什么名字 (Nǐ jiào shénme míngzi)",
      "谢谢大家 (Xièxie dàjiā)",
    ],
    correct_answer: "你叫什么名字 (Nǐ jiào shénme míngzi)",
    explanation:
      "Audio melafalkan 'Nǐ jiào shénme míngzi' (你叫什么名字) untuk menanyakan nama seseorang.",
    order_index: 4,
  },

  // Unit 03: Angka & Waktu
  {
    id: "ex-05",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000003",
    module_id: "hsk1",
    unit_slug: "03",
    type: "multiple_choice",
    prompt: 'Pilih kata angka yang tepat untuk menyatakan menit "lima belas (15)":',
    context_hanzi: "现在八点 ___ 分",
    context_pinyin: "Xiànzài bā diǎn ___ fēn",
    context_translation: "Sekarang pukul delapan lewat lima belas menit",
    options: ["五十 (wǔshí)", "五 (wǔ)", "十五 (shíwǔ)", "十 (shí)"],
    correct_answer: "十五 (shíwǔ)",
    explanation:
      'Angka belasan dalam bahasa Mandarin diawali angka sepuluh (十) diikuti satuan (五), sehingga 15 adalah "十五" (shíwǔ).',
    order_index: 1,
  },
  {
    id: "ex-06",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000003",
    module_id: "hsk1",
    unit_slug: "03",
    type: "sentence_ordering",
    prompt: "Susun potongan kata Mandarin berikut agar membentuk kalimat yang sesuai dengan arti bahasa Indonesia di atas:",
    context_hanzi: "今天下午三点",
    context_pinyin: "Jīntiān xiàwǔ sān diǎn",
    context_translation: "Hari ini pukul tiga siang",
    options: [
      { text: "三点", pinyin: "sān diǎn" },
      { text: "今天", pinyin: "jīntiān" },
      { text: "下午", pinyin: "xiàwǔ" },
    ],
    correct_answer: "今天 下午 三点",
    explanation:
      "Konsep waktu Mandarin selalu dimulai dari unit terbesar ke unit terkecil: Hari (今天) -> Waktu Siang (下午) -> Jam (三点).",
    order_index: 2,
  },
  {
    id: "ex-15",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000003",
    module_id: "hsk1",
    unit_slug: "03",
    type: "listening",
    prompt: "Dengarkan audio waktu berikut, lalu tentukan jam berapakah yang dinyatakan:",
    context_hanzi: "现在两点半",
    context_pinyin: "Xiànzài liǎng diǎn bàn",
    context_translation: "Sekarang pukul dua lewat tiga puluh menit",
    options: [
      "三点二十 (sān diǎn èrshí)",
      "两点半 (liǎng diǎn bàn)",
      "八点整 (bā diǎn zhěng)",
      "十二点 (shí'èr diǎn)",
    ],
    correct_answer: "两点半 (liǎng diǎn bàn)",
    explanation:
      "Frasa '两点半' (liǎng diǎn bàn) berarti pukul dua lewat setengah (30 menit). Gunakan kata '两' (liǎng) bukan '二' (èr) saat menyebutkan jam dua.",
    order_index: 3,
  },
  {
    id: "ex-20",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000003",
    module_id: "hsk1",
    unit_slug: "03",
    type: "listening",
    prompt: "Dengarkan audio penanggalan berikut, lalu pilih pertanyaan hari yang diucapkan:",
    context_hanzi: "今天星期几",
    context_pinyin: "Jīntiān xīngqījǐ",
    context_translation: "Hari ini hari apa",
    options: [
      "现在几点 (Xiànzài jǐ diǎn)",
      "明天见 (Míngtiān jiàn)",
      "早上八点 (Zǎoshang bā diǎn)",
      "今天星期几 (Jīntiān xīngqījǐ)",
    ],
    correct_answer: "今天星期几 (Jīntiān xīngqījǐ)",
    explanation:
      "Audio melafalkan 'Jīntiān xīngqījǐ' (今天星期几) untuk menanyakan nama hari.",
    order_index: 4,
  },

  // Unit 04: Keluarga & Relasi
  {
    id: "ex-07",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000004",
    module_id: "hsk1",
    unit_slug: "04",
    type: "multiple_choice",
    prompt: "Pilih partikel kepemilikan yang tepat untuk menghubungkan subjek dengan benda miliknya:",
    context_hanzi: "这是我 ___ 书",
    context_pinyin: "Zhè shì wǒ ___ shū",
    context_translation: "Ini adalah buku milik saya",
    options: ["吗 (ma)", "的 (de)", "呢 (ne)", "个 (ge)"],
    correct_answer: "的 (de)",
    explanation:
      'Partikel "的" (de) berfungsi sebagai penanda kepemilikan dengan rumus: [Pemilik] + 的 + [Benda/Orang yang Dimiliki].',
    order_index: 1,
  },
  {
    id: "ex-08",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000004",
    module_id: "hsk1",
    unit_slug: "04",
    type: "sentence_ordering",
    prompt: "Susun potongan kata Mandarin berikut agar membentuk kalimat yang sesuai dengan arti bahasa Indonesia di atas:",
    context_hanzi: "我家有四口人",
    context_pinyin: "Wǒ jiā yǒu sì kǒu rén",
    context_translation: "Keluarga saya ada empat orang",
    options: [
      { text: "四口人", pinyin: "sì kǒu rén" },
      { text: "有", pinyin: "yǒu" },
      { text: "我家", pinyin: "wǒ jiā" },
    ],
    correct_answer: "我家 有 四口人",
    explanation:
      "Urutan kalimat keberadaan keluarga: Subjek (我家) + Kata Kerja Keberadaan (有) + Frasa Jumlah & Satuan Keluarga (四口人).",
    order_index: 2,
  },
  {
    id: "ex-16",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000004",
    module_id: "hsk1",
    unit_slug: "04",
    type: "listening",
    prompt: "Dengarkan audio sebutan keluarga berikut, lalu pilih panggilan kekeluargaan yang tepat:",
    context_hanzi: "这是我爸爸",
    context_pinyin: "Zhè shì wǒ bàba",
    context_translation: "Ini adalah ayah saya",
    options: [
      "妈妈 (māma)",
      "爸爸 (bàba)",
      "哥哥 (gēge)",
      "妹妹 (mèimei)",
    ],
    correct_answer: "爸爸 (bàba)",
    explanation:
      "Audio melafalkan 'bàba' (爸爸 - ayah) dengan suku kata pertama bernada ke-4 dan suku kata kedua bernada netral.",
    order_index: 3,
  },
  {
    id: "ex-21",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000004",
    module_id: "hsk1",
    unit_slug: "04",
    type: "listening",
    prompt: "Dengarkan audio keluarga berikut, lalu pilih pertanyaan yang diucapkan:",
    context_hanzi: "你家有几口人",
    context_pinyin: "Nǐ jiā yǒu jǐ kǒu rén",
    context_translation: "Ada berapa orang di keluargamu",
    options: [
      "这是我的书 (Zhè shì wǒ de shū)",
      "你家有几口人 (Nǐ jiā yǒu jǐ kǒu rén)",
      "我爱我家 (Wǒ ài wǒ jiā)",
      "他是我哥哥 (Tā shì wǒ gēge)",
    ],
    correct_answer: "你家有几口人 (Nǐ jiā yǒu jǐ kǒu rén)",
    explanation:
      "Audio melafalkan 'Nǐ jiā yǒu jǐ kǒu rén' (你家有几口人) untuk menanyakan jumlah anggota keluarga.",
    order_index: 4,
  },

  // Unit 05: Aktivitas Harian
  {
    id: "ex-09",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000005",
    module_id: "hsk1",
    unit_slug: "05",
    type: "multiple_choice",
    prompt: "Lengkapi kalimat tanya ya/tidak untuk menanyakan rencana makan:",
    context_hanzi: "你想吃米饭 ___",
    context_pinyin: "Nǐ xiǎng chī mǐfàn ___",
    context_translation: "Apakah kamu ingin makan nasi",
    options: ["什么 (shénme)", "的 (de)", "吗 (ma)", "在 (zài)"],
    correct_answer: "吗 (ma)",
    explanation:
      'Partikel tanya "吗" (ma) diletakkan langsung di ujung kalimat pernyataan untuk mengubahnya menjadi kalimat tanya ya/tidak.',
    order_index: 1,
  },
  {
    id: "ex-10",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000005",
    module_id: "hsk1",
    unit_slug: "05",
    type: "sentence_ordering",
    prompt: "Susun potongan kata Mandarin berikut agar membentuk kalimat yang sesuai dengan arti bahasa Indonesia di atas:",
    context_hanzi: "我在学校看书",
    context_pinyin: "Wǒ zài xuéxiào kàn shū",
    context_translation: "Saya membaca buku di sekolah",
    options: [
      { text: "看书", pinyin: "kàn shū" },
      { text: "我", pinyin: "wǒ" },
      { text: "在学校", pinyin: "zài xuéxiào" },
    ],
    correct_answer: "我 在学校 看书",
    explanation:
      "Dalam bahasa Mandarin, keterangan lokasi perbuatan selalu diletakkan sebelum kata kerja perbuatan, bukan di akhir kalimat.",
    order_index: 2,
  },
  {
    id: "ex-17",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000005",
    module_id: "hsk1",
    unit_slug: "05",
    type: "listening",
    prompt: "Dengarkan audio pesanan hidangan di restoran berikut, lalu tentukan apa yang dipesan:",
    context_hanzi: "我想喝茶",
    context_pinyin: "Wǒ xiǎng hē chá",
    context_translation: "Saya ingin minum teh",
    options: [
      "喝水 (hē shuǐ)",
      "喝茶 (hē chá)",
      "吃米饭 (chī mǐfàn)",
      "吃菜 (chī cài)",
    ],
    correct_answer: "喝茶 (hē chá)",
    explanation:
      "Ujaran 'Wǒ xiǎng hē chá' (我想喝茶) berarti 'Saya ingin minum teh'. Kata '茶' (chá) berbunyi nada ke-2.",
    order_index: 3,
  },
  {
    id: "ex-22",
    level_id: "11000000-0000-0000-0000-000000000001",
    lesson_id: "21000000-0000-0000-0000-000000000005",
    module_id: "hsk1",
    unit_slug: "05",
    type: "listening",
    prompt: "Dengarkan audio aktivitas berikut, lalu pilih kalimat pertanyaan yang diucapkan:",
    context_hanzi: "你想吃什么",
    context_pinyin: "Nǐ xiǎng chī shénme",
    context_translation: "Kamu ingin makan apa",
    options: [
      "我想喝茶 (Wǒ xiǎng hē chá)",
      "你想吃什么 (Nǐ xiǎng chī shénme)",
      "我在看书 (Wǒ zài kàn shū)",
      "学校很大 (Xuéxiào hěn dà)",
    ],
    correct_answer: "你想吃什么 (Nǐ xiǎng chī shénme)",
    explanation:
      "Audio melafalkan 'Nǐ xiǎng chī shénme' (你想吃什么) yang berarti 'Kamu ingin makan apa'.",
    order_index: 4,
  },

  // Unit 06: Rutinitas Harian & Jadwal (HSK 1)
  {
    id: "hsk1-ex-06-01",
    level_id: "hsk1",
    lesson_id: "hsk1-06",
    module_id: "hsk1",
    unit_slug: "06",
    type: "multiple_choice",
    prompt:
      "Dalam urutan sintaksis Mandarin baku, manakah posisi penempatan keterangan waktu '明天上午' (besok pagi) yang PALING TEPAT pada kalimat 'Saya pergi ke sekolah'?",
    context_hanzi: "我 明天上午 去学校",
    context_pinyin: "Wǒ míngtiān shàngwǔ qù xuéxiào",
    context_translation: "Saya pergi ke sekolah besok pagi",
    options: [
      "Tepat setelah subjek atau di awal kalimat sebelum kata kerja (我明天上午去学校 / 明天上午我去学校)",
      "Di akhir kalimat setelah objek sekolah (我去学校明天上午)",
      "Di antara kata kerja dan objek (我去明天上午学校)",
      "Bebas di mana saja tanpa aturan tata bahasa",
    ],
    correct_answer:
      "Tepat setelah subjek atau di awal kalimat sebelum kata kerja (我明天上午去学校 / 明天上午我去学校)",
    explanation:
      "Keterangan waktu dalam bahasa Mandarin selalu diletakkan sebelum kata kerja perbuatan, baik setelah subjek (我 + 明天上午 + 去学校) maupun di awal kalimat (明天上午 + 我 + 去学校). Pantangan besar meletakkannya di akhir kalimat.",
    order_index: 1,
  },
  {
    id: "hsk1-ex-06-02",
    level_id: "hsk1",
    lesson_id: "hsk1-06",
    module_id: "hsk1",
    unit_slug: "06",
    type: "sentence_ordering",
    prompt:
      "Susun potongan kata berikut agar membentuk kalimat 'Setiap hari kami berdua bangun tidur jam 7 pagi':",
    context_hanzi: "我们每天早上七点都起床",
    context_pinyin: "Wǒmen měitiān zǎoshang qī diǎn dōu qǐchuáng",
    context_translation: "Setiap hari kami berdua bangun tidur jam 7 pagi",
    options: [
      { text: "我们", pinyin: "wǒmen" },
      { text: "每天早上七点", pinyin: "měitiān zǎoshang qī diǎn" },
      { text: "都起床", pinyin: "dōu qǐchuáng" },
    ],
    correct_answer: "我们 每天早上七点 都起床",
    explanation:
      "Pola sintaksis: Subjek (我们) + Waktu (每天早上七点) + Keterangan Lingkup (都) + Verba (起床).",
    order_index: 2,
  },
  {
    id: "hsk1-ex-06-03",
    level_id: "hsk1",
    lesson_id: "hsk1-06",
    module_id: "hsk1",
    unit_slug: "06",
    type: "listening",
    prompt:
      "Dengarkan audio percakapan rencana aktivitas berikut, lalu pilih kegiatan yang ditanyakan:",
    context_hanzi: "你几点睡觉",
    context_pinyin: "Nǐ jǐ diǎn shuìjiào",
    context_translation: "Kamu jam berapa tidur",
    options: [
      "你几点睡觉 (Nǐ jǐ diǎn shuìjiào / Jam berapa kamu tidur)",
      "你几点起床 (Nǐ jǐ diǎn qǐchuáng / Jam berapa kamu bangun)",
      "你去学校吗 (Nǐ qù xuéxiào ma / Apakah kamu ke sekolah)",
      "你吃米饭吗 (Nǐ chī mǐfàn ma / Apakah kamu makan nasi)",
    ],
    correct_answer: "你几点睡觉 (Nǐ jǐ diǎn shuìjiào / Jam berapa kamu tidur)",
    explanation:
      "Audio melafalkan 'Nǐ jǐ diǎn shuìjiào' (你几点睡觉) untuk menanyakan jam tidur seseorang.",
    order_index: 3,
  },

  // Unit 07: Makanan & Minuman (HSK 1)
  {
    id: "hsk1-ex-07-01",
    level_id: "hsk1",
    lesson_id: "hsk1-07",
    module_id: "hsk1",
    unit_slug: "07",
    type: "multiple_choice",
    prompt:
      "Pilih kata bantu ukur (classifier) yang paling tepat untuk memesan hidangan 'dua mangkuk nasi putih':",
    context_hanzi: "两 ___ 米饭",
    context_pinyin: "liǎng ___ mǐfàn",
    context_translation: "dua mangkuk nasi putih",
    options: ["碗 (wǎn)", "杯 (bēi)", "瓶 (píng)", "个 (ge)"],
    correct_answer: "碗 (wǎn)",
    explanation:
      "Kata ukur wadah untuk nasi putih dan sup dalam bahasa Mandarin adalah '碗' (wǎn - mangkuk). Contoh: 两碗米饭 (dua mangkuk nasi putih).",
    order_index: 1,
  },
  {
    id: "hsk1-ex-07-02",
    level_id: "hsk1",
    lesson_id: "hsk1-07",
    module_id: "hsk1",
    unit_slug: "07",
    type: "sentence_ordering",
    prompt:
      "Susun potongan kata berikut untuk memesan minuman di restoran: 'Saya ingin minum segelas air hangat':",
    context_hanzi: "我想喝一杯热水",
    context_pinyin: "Wǒ xiǎng hē yì bēi rè shuǐ",
    context_translation: "Saya ingin minum segelas air hangat",
    options: [
      { text: "我想喝", pinyin: "wǒ xiǎng hē" },
      { text: "一杯", pinyin: "yì bēi" },
      { text: "热水", pinyin: "rè shuǐ" },
    ],
    correct_answer: "我想喝 一杯 热水",
    explanation:
      "Struktur: Subjek + Ingin (我想) + Kata Kerja (喝) + Angka & Satuan Ukur (一杯) + Benda (热水).",
    order_index: 2,
  },
  {
    id: "hsk1-ex-07-03",
    level_id: "hsk1",
    lesson_id: "hsk1-07",
    module_id: "hsk1",
    unit_slug: "07",
    type: "listening",
    prompt:
      "Dengarkan audio pesanan hidangan berikut, lalu pilih jenis sajian yang dipesan:",
    context_hanzi: "吃中国菜",
    context_pinyin: "chī Zhōngguó cài",
    context_translation: "makan masakan Tiongkok",
    options: [
      "吃中国菜 (chī Zhōngguó cài / makan masakan Tiongkok)",
      "喝中国茶 (hē Zhōngguó chá / minum teh Tiongkok)",
      "吃米饭 (chī mǐfàn / makan nasi putih)",
      "喝热水 (hē rè shuǐ / minum air hangat)",
    ],
    correct_answer: "吃中国菜 (chī Zhōngguó cài / makan masakan Tiongkok)",
    explanation:
      "Audio melafalkan 'chī Zhōngguó cài' (吃中国菜) yang berarti menyantap masakan Tiongkok.",
    order_index: 3,
  },

  // Unit 08: Tempat, Posisi & Arah Dasar (HSK 1)
  {
    id: "hsk1-ex-08-01",
    level_id: "hsk1",
    lesson_id: "hsk1-08",
    module_id: "hsk1",
    unit_slug: "08",
    type: "multiple_choice",
    prompt:
      "Manakah struktur tata bahasa yang BENAR untuk menyatakan posisi 'Buku berada di atas meja'?",
    context_hanzi: "书在桌子上",
    context_pinyin: "Shū zài zhuōzi shang",
    context_translation: "Buku ada di atas meja",
    options: [
      "书在桌子上 (Shū zài zhuōzi shang - Kata penunjuk posisi diletakkan setelah nama objek)",
      "书在上桌子 (Shū zài shàng zhuōzi - Posisi mendahului nama objek)",
      "桌子在书上 (Zhuōzi zài shū shang - Posisi terbalik: meja di atas buku)",
      "书是桌子上 (Shū shì zhuōzi shang - Keliru memakai kata 'shì' alih-alih kata letak 'zài')",
    ],
    correct_answer:
      "书在桌子上 (Shū zài zhuōzi shang - Kata penunjuk posisi diletakkan setelah nama objek)",
    explanation:
      "Formula posisi bahasa Mandarin: [Subjek] + 在 + [Nama Tempat/Benda] + [Kata Penunjuk Posisi: 上/下/里/前/后].",
    order_index: 1,
  },
  {
    id: "hsk1-ex-08-02",
    level_id: "hsk1",
    lesson_id: "hsk1-08",
    module_id: "hsk1",
    unit_slug: "08",
    type: "sentence_ordering",
    prompt:
      "Susun potongan frasa berikut untuk menanyakan lokasi teman: 'Di manakah temanmu sekarang?':",
    context_hanzi: "你的朋友现在在哪里",
    context_pinyin: "Nǐ de péngyou xiànzài zài nǎlǐ",
    context_translation: "Di manakah temanmu sekarang?",
    options: [
      { text: "你的朋友", pinyin: "nǐ de péngyou" },
      { text: "现在", pinyin: "xiànzài" },
      { text: "在哪里", pinyin: "zài nǎlǐ" },
    ],
    correct_answer: "你的朋友 现在 在哪里",
    explanation:
      "Urutan sintaksis: Subjek (你的朋友) + Waktu (现在) + Tanya Lokasi (在哪里).",
    order_index: 2,
  },
  {
    id: "hsk1-ex-08-03",
    level_id: "hsk1",
    lesson_id: "hsk1-08",
    module_id: "hsk1",
    unit_slug: "08",
    type: "listening",
    prompt:
      "Dengarkan audio keberadaan benda berikut, lalu tentukan di manakah posisi benda yang disebutkan:",
    context_hanzi: "电脑在桌子上",
    context_pinyin: "Diànnǎo zài zhuōzi shang",
    context_translation: "Komputer ada di atas meja",
    options: [
      "Di atas meja (在桌子上 - zài zhuōzi shang)",
      "Di bawah meja (在桌子下 - zài zhuōzi xià)",
      "Di dalam perpustakaan (在图书馆里 - zài túshūguǎn lǐ)",
      "Di depan sekolah (在学校前面 - zài xuéxiào qiánmian)",
    ],
    correct_answer: "Di atas meja (在桌子上 - zài zhuōzi shang)",
    explanation:
      "Audio melafalkan 'Diànnǎo zài zhuōzi shang' (电脑在桌子上) yang berarti komputer berada di atas meja.",
    order_index: 3,
  },

  // Unit 09: Belanja & Harga (HSK 1)
  {
    id: "hsk1-ex-09-01",
    level_id: "hsk1",
    lesson_id: "hsk1-09",
    module_id: "hsk1",
    unit_slug: "09",
    type: "multiple_choice",
    prompt:
      "Lengkapi kalimat tawar-menawar harga berikut: 'Baju ini terlalu mahal, bisakah lebih murah sedikit?':",
    context_hanzi: "太贵了，便宜 ___ 吧",
    context_pinyin: "Tài guì le, piányi ___ ba",
    context_translation: "Terlalu mahal, lebih murah sedikitlah",
    options: ["一点儿 (yìdiǎnr)", "多少 (duōshao)", "几个 (jǐ gè)", "很多 (hěn duō)"],
    correct_answer: "一点儿 (yìdiǎnr)",
    explanation:
      "Untuk meminta perubahan derajat sifat (lebih murah sedikit), gunakan formula: [Kata Sifat] + 一点儿 (piányi yìdiǎnr). Sedangkan 有点儿 diletakkan sebelum kata sifat.",
    order_index: 1,
  },
  {
    id: "hsk1-ex-09-02",
    level_id: "hsk1",
    lesson_id: "hsk1-09",
    module_id: "hsk1",
    unit_slug: "09",
    type: "sentence_ordering",
    prompt:
      "Susun potongan frasa berikut untuk menanyakan harga barang: 'Berapa harga buku ini?':",
    context_hanzi: "这本书多少钱",
    context_pinyin: "Zhè běn shū duōshao qián",
    context_translation: "Berapa harga buku ini?",
    options: [
      { text: "这本书", pinyin: "zhè běn shū" },
      { text: "多少", pinyin: "duōshao" },
      { text: "钱", pinyin: "qián" },
    ],
    correct_answer: "这本书 多少 钱",
    explanation:
      "Pola tanya harga: [Benda + Classifier] + 多少钱 (duōshao qián).",
    order_index: 2,
  },
  {
    id: "hsk1-ex-09-03",
    level_id: "hsk1",
    lesson_id: "hsk1-09",
    module_id: "hsk1",
    unit_slug: "09",
    type: "listening",
    prompt:
      "Dengarkan audio harga barang berikut, lalu tentukan nominal harga yang diucapkan:",
    context_hanzi: "三十五块钱",
    context_pinyin: "sānshíwǔ kuài qián",
    context_translation: "35 kuai / yuan",
    options: [
      "35 kuài (三十五块 - sānshíwǔ kuài)",
      "53 kuài (五十三块 - wǔshísān kuài)",
      "15 kuài (十五块 - shíwǔ kuài)",
      "30 kuài (三十块 - sānshí kuài)",
    ],
    correct_answer: "35 kuài (三十五块 - sānshíwǔ kuài)",
    explanation:
      "Audio melafalkan 'sānshíwǔ kuài qián' (三十五块钱) yaitu angka tiga puluh lima (35).",
    order_index: 3,
  },

  // Unit 10: Cuaca & Kondisi (HSK 1)
  {
    id: "hsk1-ex-10-01",
    level_id: "hsk1",
    lesson_id: "hsk1-10",
    module_id: "hsk1",
    unit_slug: "10",
    type: "multiple_choice",
    prompt:
      "Manakah kalimat mendeskripsikan cuaca yang BENAR secara tata bahasa Mandarin baku?",
    context_hanzi: "今天天气很好",
    context_pinyin: "Jīntiān tiānqì hěn hǎo",
    context_translation: "Cuaca hari ini sangat bagus",
    options: [
      "今天天气很好 (Jīntiān tiānqì hěn hǎo - Menggunakan '很' tanpa menyisipkan '是')",
      "今天天气是很好 (Jīntiān tiānqì shì hěn hǎo - Menyisipkan '是' sebelum kata sifat)",
      "今天天气很冷吗很好 (Kalimat rancu tidak baku)",
      "天气是冷今天 (Urutan kata terbalik)",
    ],
    correct_answer:
      "今天天气很好 (Jīntiān tiānqì hěn hǎo - Menggunakan '很' tanpa menyisipkan '是')",
    explanation:
      "Dalam kalimat dengan kata sifat, bahasa Mandarin menghubungkan subjek langsung ke kata sifat dengan '很' (hěn). PANTANG menyisipkan kata '是' (shì).",
    order_index: 1,
  },
  {
    id: "hsk1-ex-10-02",
    level_id: "hsk1",
    lesson_id: "hsk1-10",
    module_id: "hsk1",
    unit_slug: "10",
    type: "sentence_ordering",
    prompt:
      "Susun potongan frasa berikut untuk menanyakan perkiraan cuaca: 'Bagaimana cuaca besok?':",
    context_hanzi: "明天天气怎么样",
    context_pinyin: "Míngtiān tiānqì zěnmeyàng",
    context_translation: "Bagaimana cuaca besok?",
    options: [
      { text: "明天", pinyin: "míngtiān" },
      { text: "天气", pinyin: "tiānqì" },
      { text: "怎么样", pinyin: "zěnmeyàng" },
    ],
    correct_answer: "明天 天气 怎么样",
    explanation:
      "Pola tanya kondisi cuaca: [Waktu] + 天气 + 怎么样 (zěnmeyàng).",
    order_index: 2,
  },
  {
    id: "hsk1-ex-10-03",
    level_id: "hsk1",
    lesson_id: "hsk1-10",
    module_id: "hsk1",
    unit_slug: "10",
    type: "listening",
    prompt:
      "Dengarkan audio laporan cuaca berikut, lalu tentukan kondisi cuaca yang terjadi:",
    context_hanzi: "外面下雨了很冷",
    context_pinyin: "Wàimiàn xiàyǔ le, hěn lěng",
    context_translation: "Di luar turun hujan, sangat dingin",
    options: [
      "Hujan dan sangat dingin (下雨很冷 - xiàyǔ hěn lěng)",
      "Panas terik tidak hujan (很热不下雨 - hěn rè bú xiàyǔ)",
      "Cuaca sangat bagus dan cerah (天气很好 - tiānqì hěn hǎo)",
      "Salju turun tidak dingin (下雪不冷 - xiàxuě bù lěng)",
    ],
    correct_answer: "Hujan dan sangat dingin (下雨很冷 - xiàyǔ hěn lěng)",
    explanation:
      "Audio melafalkan 'Wàimiàn xiàyǔ le, hěn lěng' (外面下雨了，很冷) yang berarti di luar turun hujan dan terasa sangat dingin.",
    order_index: 3,
  },

  // Unit 11: Kemampuan & Permintaan Santun (HSK 1)
  {
    id: "hsk1-ex-11-01",
    level_id: "hsk1",
    lesson_id: "hsk1-11",
    module_id: "hsk1",
    unit_slug: "11",
    type: "multiple_choice",
    prompt:
      "Pilih kata kerja bantu modal yang paling tepat untuk menyatakan kemahiran yang dipelajari: 'Saya bisa berbicara bahasa Mandarin':",
    context_hanzi: "我 ___ 说汉语",
    context_pinyin: "Wǒ ___ shuō Hànyǔ",
    context_translation: "Saya bisa berbicara bahasa Mandarin",
    options: ["会 (huì)", "可以 (kěyǐ)", "请 (qǐng)", "能 (néng)"],
    correct_answer: "会 (huì)",
    explanation:
      "Kata kerja modal '会' (huì) digunakan khusus untuk menyatakan kemampuan atau keahlian yang diperoleh melalui proses belajar atau latihan (misal: 会说汉语, 会写汉字).",
    order_index: 1,
  },
  {
    id: "hsk1-ex-11-02",
    level_id: "hsk1",
    lesson_id: "hsk1-11",
    module_id: "hsk1",
    unit_slug: "11",
    type: "sentence_ordering",
    prompt:
      "Susun kalimat permohonan pemulihan komunikasi santun berikut saat kamu tidak memahami ucapan lawan bicara:",
    context_hanzi: "对不起我听不懂请说慢一点儿",
    context_pinyin: "Duìbuqǐ, wǒ tīng bu dǒng, qǐng shuō màn yìdiǎnr",
    context_translation: "Maaf, saya tidak paham, tolong bicara lebih pelan sedikit",
    options: [
      { text: "对不起，", pinyin: "duìbuqǐ" },
      { text: "我听不懂，", pinyin: "wǒ tīng bu dǒng" },
      { text: "请说慢一点儿。", pinyin: "qǐng shuō màn yìdiǎnr" },
    ],
    correct_answer: "对不起， 我听不懂， 请说慢一点儿。",
    explanation:
      "Urutan etika komunikasi santun: Maaf (对不起) + Pengakuan kendala pemahaman (我听不懂) + Permohonan pelan (请说慢一点儿).",
    order_index: 2,
  },
  {
    id: "hsk1-ex-11-03",
    level_id: "hsk1",
    lesson_id: "hsk1-11",
    module_id: "hsk1",
    unit_slug: "11",
    type: "listening",
    prompt:
      "Dengarkan permohonan santun dalam audio berikut, lalu pilih frasa yang diucapkan:",
    context_hanzi: "请再说一遍",
    context_pinyin: "Qǐng zài shuō yí biàn",
    context_translation: "Tolong katakan sekali lagi",
    options: [
      "请再说一遍 (Qǐng zài shuō yí biàn / Tolong katakan sekali lagi)",
      "请进请坐 (Qǐng jìn qǐng zuò / Silakan masuk silakan duduk)",
      "我听不懂 (Wǒ tīng bu dǒng / Saya tidak paham)",
      "我可以坐吗 (Wǒ kěyǐ zuò ma / Bolehkah saya duduk)",
    ],
    correct_answer: "请再说一遍 (Qǐng zài shuō yí biàn / Tolong katakan sekali lagi)",
    explanation:
      "Audio melafalkan 'Qǐng zài shuō yí biàn' (请再说一遍) yang merupakan permohonan santun agar lawan bicara mengulangi ucapannya sekali lagi.",
    order_index: 3,
  },

  // Unit 12: Review Integratif & Ujian Akhir Level (HSK 1)
  {
    id: "hsk1-ex-12-01",
    level_id: "hsk1",
    lesson_id: "hsk1-12",
    module_id: "hsk1",
    unit_slug: "12",
    type: "multiple_choice",
    prompt:
      "Berdasarkan sintaksis standar bahasa Mandarin, manakah kalimat profil perkenalan berikut yang memiliki urutan kata 100% TEPAT?",
    context_hanzi: "我每天在大学认真学习汉语",
    context_pinyin: "Wǒ měitiān zài dàxué rènzhēn xuéxí Hànyǔ",
    context_translation: "Saya belajar Mandarin dengan sungguh-sungguh di universitas setiap hari",
    options: [
      "我每天在大学认真学习汉语 (Subjek + Waktu + Tempat + Cara + Verba + Objek)",
      "我在大学学习汉语每天认真 (Keterangan waktu dan cara ditaruh di belakang)",
      "我学习汉语每天在大学 (Keterangan tempat ditaruh di paling belakang)",
      "学习汉语每天我在大学 (Struktur terbalik tidak baku)",
    ],
    correct_answer:
      "我每天在大学认真学习汉语 (Subjek + Waktu + Tempat + Cara + Verba + Objek)",
    explanation:
      "Urutan sintaksis baku bahasa Mandarin: Subjek (我) + Waktu (每天) + Lokasi (在大学) + Keterangan Cara (认真) + Kata Kerja (学习) + Objek (汉语). Latar situasi selalu mendahului aksi.",
    order_index: 1,
  },
  {
    id: "hsk1-ex-12-02",
    level_id: "hsk1",
    lesson_id: "hsk1-12",
    module_id: "hsk1",
    unit_slug: "12",
    type: "sentence_ordering",
    prompt: "Susun kalimat evaluasi kelulusan HSK 1 berikut secara runtut:",
    context_hanzi: "恭喜你顺利完成HSK1",
    context_pinyin: "Gōngxǐ nǐ shùnlì wánchéng HSK 1",
    context_translation: "Selamat kamu telah sukses menyelesaikan HSK 1",
    options: [
      { text: "恭喜你", pinyin: "gōngxǐ nǐ" },
      { text: "顺利完成", pinyin: "shùnlì wánchéng" },
      { text: "HSK 1", pinyin: "HSK 1" },
    ],
    correct_answer: "恭喜你 顺利完成 HSK 1",
    explanation:
      "Ucapan kelulusan: Ucapan selamat (恭喜你) + Verba hasil (顺利完成) + Objek level (HSK 1).",
    order_index: 2,
  },
  {
    id: "hsk1-ex-12-03",
    level_id: "hsk1",
    lesson_id: "hsk1-12",
    module_id: "hsk1",
    unit_slug: "12",
    type: "listening",
    prompt:
      "Dengarkan audio evaluasi akhir HSK 1 berikut, lalu pilih kalimat refleksi penutup yang diucapkan:",
    context_hanzi: "准备学习HSK2",
    context_pinyin: "zhǔnbèi xuéxí HSK 2",
    context_translation: "bersiap mempelajari HSK 2",
    options: [
      "准备学习 HSK 2 (zhǔnbèi xuéxí HSK 2 / bersiap belajar HSK 2)",
      "不学汉语了 (bù xué Hànyǔ le / tidak belajar Mandarin lagi)",
      "每天睡懒觉 (měitiān shuì lǎnjiào / tidur malas setiap hari)",
      "不知道怎么说 (bù zhīdào zěnme shuō / tidak tahu bagaimana mengatakannya)",
    ],
    correct_answer: "准备学习 HSK 2 (zhǔnbèi xuéxí HSK 2 / bersiap belajar HSK 2)",
    explanation:
      "Audio melafalkan 'zhǔnbèi xuéxí HSK 2' (准备学习 HSK 2) yang menunjukkan tekad pembelajar untuk melangkah ke tingkat berikutnya.",
    order_index: 3,
  },

  // ==========================================
  // TINGKAT HSK 2 (UNIT 06 S.D. 10)
  // ==========================================
  // Unit 06: Cuaca & Suhu
  {
    id: "hsk2-ex-01",
    level_id: "hsk2",
    lesson_id: "hsk2-06",
    module_id: "hsk2",
    unit_slug: "06",
    type: "multiple_choice",
    prompt: "Pilih pola kalimat perbandingan yang tepat untuk menyatakan 'Hari ini lebih dingin dari kemarin':",
    context_hanzi: "今天 ___ 昨天冷",
    context_pinyin: "Jīntiān ___ zuótiān lěng",
    context_translation: "Hari ini lebih dingin daripada kemarin",
    options: ["很 (hěn)", "比 (bǐ)", "和 (hé)", "跟 (gēn)"],
    correct_answer: "比 (bǐ)",
    explanation:
      "Pola perbandingan dalam bahasa Mandarin menggunakan kata preposisi 比 (bǐ): [Entitas A] + 比 + [Entitas B] + [Kata Sifat].",
    order_index: 1,
  },
  {
    id: "hsk2-ex-02",
    level_id: "hsk2",
    lesson_id: "hsk2-06",
    module_id: "hsk2",
    unit_slug: "06",
    type: "sentence_ordering",
    prompt: "Susun potongan kata Mandarin berikut agar membentuk kalimat yang sesuai dengan arti bahasa Indonesia di atas:",
    context_hanzi: "今天比昨天冷多了",
    context_pinyin: "Jīntiān bǐ zuótiān lěng duō le",
    context_translation: "Hari ini jauh lebih dingin daripada kemarin",
    options: [
      { text: "今天", pinyin: "jīntiān" },
      { text: "冷多了", pinyin: "lěng duō le" },
      { text: "比昨天", pinyin: "bǐ zuótiān" },
    ],
    correct_answer: "今天 比昨天 冷多了",
    explanation:
      "Kalimat '今天比昨天冷多了' (Jīntiān bǐ zuótiān lěng duō le) berarti 'Hari ini jauh lebih dingin daripada kemarin'. Pola perbandingan: Subjek + 比 + Pembanding + Sifat + Tingkatan.",
    order_index: 2,
  },
  {
    id: "hsk2-ex-03",
    level_id: "hsk2",
    lesson_id: "hsk2-06",
    module_id: "hsk2",
    unit_slug: "06",
    type: "listening",
    prompt: "Dengarkan audio prakiraan cuaca berikut, lalu tentukan kondisi cuaca yang dinyatakan:",
    context_hanzi: "今天会下雪",
    context_pinyin: "Jīntiān huì xià xuě",
    context_translation: "Hari ini akan turun salju",
    options: [
      "下雨 (xià yǔ)",
      "下雪 (xià xuě)",
      "刮风 (guā fēng)",
      "晴天 (qíngtiān)",
    ],
    correct_answer: "下雪 (xià xuě)",
    explanation:
      "Frasa '下雪' (xià xuě) berarti turun salju. Karakter 雪 berbunyi nada ke-3.",
    order_index: 3,
  },

  // Unit 07: Belanja & Harga
  {
    id: "hsk2-ex-04",
    level_id: "hsk2",
    lesson_id: "hsk2-07",
    module_id: "hsk2",
    unit_slug: "07",
    type: "multiple_choice",
    prompt: "Lengkapi kalimat tawar-menawar santun berikut untuk meminta harga lebih murah:",
    context_hanzi: "能不能 ___ 一点儿",
    context_pinyin: "Néng bu néng ___ yìdiǎnr",
    context_translation: "Apakah bisa lebih murah sedikit",
    options: ["贵 (guì)", "便宜 (piányi)", "买 (mǎi)", "卖 (mài)"],
    correct_answer: "便宜 (piányi)",
    explanation:
      "Kata '便宜' (piányi) berarti murah. Frasa '便宜一点儿' umum digunakan saat berbelanja untuk meminta potongan harga.",
    order_index: 1,
  },
  {
    id: "hsk2-ex-05",
    level_id: "hsk2",
    lesson_id: "hsk2-07",
    module_id: "hsk2",
    unit_slug: "07",
    type: "sentence_ordering",
    prompt: "Susun potongan kata Mandarin berikut agar membentuk kalimat yang sesuai dengan arti bahasa Indonesia di atas:",
    context_hanzi: "这些东西一共多少钱",
    context_pinyin: "Zhèxiē dōngxi yígòng duōshao qián",
    context_translation: "Barang-barang ini totalnya berapa harganya",
    options: [
      { text: "一共", pinyin: "yígòng" },
      { text: "这些东西", pinyin: "zhèxiē dōngxi" },
      { text: "多少钱", pinyin: "duōshao qián" },
    ],
    correct_answer: "这些东西 一共 多少钱",
    explanation:
      "Kalimat '这些东西一共多少钱' (Zhèxiē dōngxi yígòng duōshao qián) berarti 'Barang-barang ini totalnya berapa harganya'.",
    order_index: 2,
  },
  {
    id: "hsk2-ex-06",
    level_id: "hsk2",
    lesson_id: "hsk2-07",
    module_id: "hsk2",
    unit_slug: "07",
    type: "listening",
    prompt: "Dengarkan audio transaksi berikut, lalu tentukan nominal harga yang disebutkan:",
    context_hanzi: "两百块",
    context_pinyin: "Liǎng bǎi kuài",
    context_translation: "Dua ratus yuan",
    options: [
      "一百块 (yì bǎi kuài)",
      "两百块 (liǎng bǎi kuài)",
      "二十块 (èrshí kuài)",
      "一百八十块 (yì bǎi bāshí kuài)",
    ],
    correct_answer: "两百块 (liǎng bǎi kuài)",
    explanation:
      "Kata '两百块' (liǎng bǎi kuài) berarti 200 yuan. Gunakan '两' (liǎng) di depan ratusan (百).",
    order_index: 3,
  },

  // Unit 08: Transportasi & Petunjuk Arah
  {
    id: "hsk2-ex-07",
    level_id: "hsk2",
    lesson_id: "hsk2-08",
    module_id: "hsk2",
    unit_slug: "08",
    type: "multiple_choice",
    prompt: "Pilih kata preposisi pengukur rentang jarak antara dua titik lokasi:",
    context_hanzi: "学校 ___ 我家很近",
    context_pinyin: "Xuéxiào ___ wǒ jiā hěn jìn",
    context_translation: "Sekolah berjarak dekat dari rumah saya",
    options: ["往 (wǎng)", "从 (cóng)", "离 (lí)", "在 (zài)"],
    correct_answer: "离 (lí)",
    explanation:
      "Preposisi 离 (lí) berfungsi mengukur jarak spasial: [Titik A] + 离 + [Titik B] + [Ukuran Jarak / 很近 / 很远].",
    order_index: 1,
  },
  {
    id: "hsk2-ex-08",
    level_id: "hsk2",
    lesson_id: "hsk2-08",
    module_id: "hsk2",
    unit_slug: "08",
    type: "sentence_ordering",
    prompt: "Susun potongan kata Mandarin berikut agar membentuk kalimat yang sesuai dengan arti bahasa Indonesia di atas:",
    context_hanzi: "往前走两百米往右拐",
    context_pinyin: "Wǎng qián zǒu liǎng bǎi mǐ wǎng yòu guǎi",
    context_translation: "Jalan lurus ke depan 200 meter lalu belok ke kanan",
    options: [
      { text: "两百米", pinyin: "liǎng bǎi mǐ" },
      { text: "往右拐", pinyin: "wǎng yòu guǎi" },
      { text: "往前走", pinyin: "wǎng qián zǒu" },
    ],
    correct_answer: "往前走 两百米 往右拐",
    explanation:
      "Kalimat '往前走两百米往右拐' (Wǎng qián zǒu liǎng bǎi mǐ wǎng yòu guǎi) berarti 'Jalan lurus ke depan 200 meter lalu belok ke kanan'.",
    order_index: 2,
  },
  {
    id: "hsk2-ex-09",
    level_id: "hsk2",
    lesson_id: "hsk2-08",
    module_id: "hsk2",
    unit_slug: "08",
    type: "listening",
    prompt: "Dengarkan audio moda transportasi berikut, lalu pilih jenis kendaraan umum yang disebutkan:",
    context_hanzi: "出租车",
    context_pinyin: "chūzūchē",
    context_translation: "taksi",
    options: [
      "公共汽车 (gōnggòng qìchē)",
      "出租车 (chūzūchē)",
      "高铁 (gāotiě)",
      "飞机 (fēijī)",
    ],
    correct_answer: "出租车 (chūzūchē)",
    explanation:
      "Ujaran 'chūzūchē' (出租车) berarti mobil taksi.",
    order_index: 3,
  },

  // Unit 09: Pengalaman & Wisata
  {
    id: "hsk2-ex-10",
    level_id: "hsk2",
    lesson_id: "hsk2-09",
    module_id: "hsk2",
    unit_slug: "09",
    type: "multiple_choice",
    prompt: "Pilih partikel aspek untuk menyatakan 'pernah mengalami suatu tindakan di masa lalu':",
    context_hanzi: "我去 ___ 中国旅游",
    context_pinyin: "Wǒ qù ___ Zhōngguó lǚyóu",
    context_translation: "Saya pernah berwisata ke Tiongkok",
    options: ["了 (le)", "过 (guò)", "着 (zhe)", "在 (zài)"],
    correct_answer: "过 (guò)",
    explanation:
      "Partikel aspek 过 (guò) diletakkan tepat setelah kata kerja untuk menyatakan pengalaman masa lampau.",
    order_index: 1,
  },
  {
    id: "hsk2-ex-11",
    level_id: "hsk2",
    lesson_id: "hsk2-09",
    module_id: "hsk2",
    unit_slug: "09",
    type: "sentence_ordering",
    prompt: "Susun potongan kata Mandarin berikut agar membentuk kalimat yang sesuai dengan arti bahasa Indonesia di atas:",
    context_hanzi: "我没吃过北京烤鸭",
    context_pinyin: "Wǒ méi chī guò Běijīng kǎoyā",
    context_translation: "Saya belum pernah makan bebek panggang Beijing",
    options: [
      { text: "北京烤鸭", pinyin: "Běijīng kǎoyā" },
      { text: "我", pinyin: "wǒ" },
      { text: "没吃过", pinyin: "méi chī guò" },
    ],
    correct_answer: "我 没吃过 北京烤鸭",
    explanation:
      "Kalimat '我没吃过北京烤鸭' (Wǒ méi chī guò Běijīng kǎoyā) berarti 'Saya belum pernah makan bebek panggang Beijing'.",
    order_index: 2,
  },
  {
    id: "hsk2-ex-12",
    level_id: "hsk2",
    lesson_id: "hsk2-09",
    module_id: "hsk2",
    unit_slug: "09",
    type: "listening",
    prompt: "Dengarkan audio kesan perjalanan wisata berikut, lalu tentukan maknanya:",
    context_hanzi: "风景很美",
    context_pinyin: "Fēngjǐng hěn měi",
    context_translation: "Pemandangannya sangat indah",
    options: [
      "菜很好吃 (Cài hěn hǎochī)",
      "风景很美 (Fēngjǐng hěn měi)",
      "门票很贵 (Ménpiào hěn guì)",
      "时间很短 (Shíjiān hěn duǎn)",
    ],
    correct_answer: "风景很美 (Fēngjǐng hěn měi)",
    explanation:
      "Frasa '风景很美' (Fēngjǐng hěn měi) sering digunakan untuk mengagumi keindahan panorama alam suatu tempat wisata.",
    order_index: 3,
  },

  // Unit 10: Kesehatan & Istirahat
  {
    id: "hsk2-ex-13",
    level_id: "hsk2",
    lesson_id: "hsk2-10",
    module_id: "hsk2",
    unit_slug: "10",
    type: "multiple_choice",
    prompt: "Lengkapi kalimat saat merasakan gejala flu berikut:",
    context_hanzi: "我 ___ 了，头有点儿疼",
    context_pinyin: "Wǒ ___ le, tóu yǒudiǎnr téng",
    context_translation: "Saya flu, kepala agak sakit",
    options: ["学习 (xuéxí)", "感冒 (gǎnmào)", "工作 (gōngzuò)", "旅游 (lǚyóu)"],
    correct_answer: "感冒 (gǎnmào)",
    explanation:
      "Kata '感冒' (gǎnmào) berarti terserang flu atau masuk angin. Partikel 了 mengindikasikan timbulnya kondisi fisik baru.",
    order_index: 1,
  },
  {
    id: "hsk2-ex-14",
    level_id: "hsk2",
    lesson_id: "hsk2-10",
    module_id: "hsk2",
    unit_slug: "10",
    type: "sentence_ordering",
    prompt: "Susun potongan kata Mandarin berikut agar membentuk kalimat yang sesuai dengan arti bahasa Indonesia di atas:",
    context_hanzi: "我想请假回家休息",
    context_pinyin: "Wǒ xiǎng qǐngjià huí jiā xiūxi",
    context_translation: "Saya ingin minta izin pulang untuk istirahat",
    options: [
      { text: "回家休息", pinyin: "huí jiā xiūxi" },
      { text: "我想", pinyin: "wǒ xiǎng" },
      { text: "请假", pinyin: "qǐngjià" },
    ],
    correct_answer: "我想 请假 回家休息",
    explanation:
      "Kalimat '我想请假回家休息' (Wǒ xiǎng qǐngjià huí jiā xiūxi) berarti 'Saya ingin minta izin pulang untuk istirahat'.",
    order_index: 2,
  },
  {
    id: "hsk2-ex-15",
    level_id: "hsk2",
    lesson_id: "hsk2-10",
    module_id: "hsk2",
    unit_slug: "10",
    type: "listening",
    prompt: "Dengarkan audio anjuran kesehatan berikut, lalu tentukan tindakan yang diminta:",
    context_hanzi: "快吃药吧",
    context_pinyin: "Kuài chī yào ba",
    context_translation: "Cepat minumlah obat",
    options: [
      "喝水 (hē shuǐ)",
      "吃药 (chī yào)",
      "睡觉 (shuìjiào)",
      "看医生 (kàn yīshēng)",
    ],
    correct_answer: "吃药 (chī yào)",
    explanation:
      "Frasa '吃药' (chī yào) dalam bahasa Mandarin secara harfiah berarti 'makan obat' yang setara dengan minum obat.",
    order_index: 3,
  },

  // ==========================================
  // GENERATOR CEPAT UNTUK HSK 3 S.D. 5 (UNIT 11 S.D. 25)
  // ==========================================
  // Unit 11: HSK 3 - Kantor & Rapat
  {
    id: "hsk3-ex-01",
    level_id: "hsk3",
    lesson_id: "hsk3-11",
    module_id: "hsk3",
    unit_slug: "11",
    type: "multiple_choice",
    prompt: "Lengkapi kalimat persiapan rapat kerja dengan kata kerja yang tepat:",
    context_hanzi: "我们明天早上九点开 ___",
    context_pinyin: "Wǒmen míngtiān zǎoshang jiǔ diǎn kāi ___",
    context_translation: "Besok jam sembilan pagi kita mengadakan rapat",
    options: ["车 (chē)", "会 (huì)", "门 (mén)", "机 (jī)"],
    correct_answer: "会 (huì)",
    explanation:
      "Kolokasi kerja '开会' (kāi huì) merupakan istilah standar untuk mengadakan rapat atau pertemuan bisnis.",
    order_index: 1,
  },
  {
    id: "hsk3-ex-02",
    level_id: "hsk3",
    lesson_id: "hsk3-11",
    module_id: "hsk3",
    unit_slug: "11",
    type: "sentence_ordering",
    prompt: "Susun potongan kata Mandarin berikut agar membentuk kalimat yang sesuai dengan arti bahasa Indonesia di atas:",
    context_hanzi: "这个项目由我负责",
    context_pinyin: "Zhège xiàngmù yóu wǒ fùzé",
    context_translation: "Proyek ini menjadi tanggung jawab saya",
    options: [
      { text: "由我", pinyin: "yóu wǒ" },
      { text: "负责", pinyin: "fùzé" },
      { text: "这个项目", pinyin: "zhège xiàngmù" },
    ],
    correct_answer: "这个项目 由我 负责",
    explanation:
      "Kalimat '这个项目由我负责' (Zhège xiàngmù yóu wǒ fùzé) berarti 'Proyek ini menjadi tanggung jawab saya'.",
    order_index: 2,
  },
  {
    id: "hsk3-ex-03",
    level_id: "hsk3",
    lesson_id: "hsk3-11",
    module_id: "hsk3",
    unit_slug: "11",
    type: "listening",
    prompt: "Dengarkan audio dokumen kantor berikut, lalu pilih istilah yang diucapkan:",
    context_hanzi: "一份详细的计划",
    context_pinyin: "Yí fèn xiángxì de jìhuà",
    context_translation: "Sebuah rencana kerja yang rinci",
    options: [
      "报告 (bàogào)",
      "计划 (jìhuà)",
      "合同 (hétong)",
      "时间表 (shíjiānbiǎo)",
    ],
    correct_answer: "计划 (jìhuà)",
    explanation:
      "Kata '计划' (jìhuà) berarti rancangan rencana kerja yang tersusun sistematis.",
    order_index: 3,
  },

  // Unit 16: HSK 4 - Karier & Negosiasi
  {
    id: "hsk4-ex-01",
    level_id: "hsk4",
    lesson_id: "hsk4-16",
    module_id: "hsk4",
    unit_slug: "16",
    type: "multiple_choice",
    prompt: "Pilih kata sambung syarat mutlak dalam perundingan kerja sama bisnis:",
    context_hanzi: "___ 互相信任，才能达成合作",
    context_pinyin: "___ hùxiāng xìnrèn, cái néng dáchéng hézuò",
    context_translation: "Hanya dengan saling percaya, barulah kerja sama dapat dicapai",
    options: ["如果 (rúguǒ)", "只有 (zhǐyǒu)", "虽然 (suīrán)", "因为 (yīnwèi)"],
    correct_answer: "只有 (zhǐyǒu)",
    explanation:
      "Pasangan konjungsi '只有 ... 才' (hanya jika ... barulah) menyatakan prasyarat tunggal yang mutlak.",
    order_index: 1,
  },
  {
    id: "hsk4-ex-02",
    level_id: "hsk4",
    lesson_id: "hsk4-16",
    module_id: "hsk4",
    unit_slug: "16",
    type: "sentence_ordering",
    prompt: "Susun potongan kata Mandarin berikut agar membentuk kalimat yang sesuai dengan arti bahasa Indonesia di atas:",
    context_hanzi: "我们要认真对待每一个细节",
    context_pinyin: "Wǒmen yào rènzhēn duìdài měi yí gè xìjié",
    context_translation: "Kita harus memperlakukan setiap detail dengan sungguh-sungguh",
    options: [
      { text: "认真", pinyin: "rènzhēn" },
      { text: "我们要", pinyin: "wǒmen yào" },
      { text: "对待每一个细节", pinyin: "duìdài měi yí gè xìjié" },
    ],
    correct_answer: "我们要 认真 对待每一个细节",
    explanation:
      "Kalimat '我们要认真对待每一个细节' (Wǒmen yào rènzhēn duìdài měi yí gè xìjié) berarti 'Kita harus memperlakukan setiap detail dengan sungguh-sungguh'.",
    order_index: 2,
  },
  {
    id: "hsk4-ex-03",
    level_id: "hsk4",
    lesson_id: "hsk4-16",
    module_id: "hsk4",
    unit_slug: "16",
    type: "listening",
    prompt: "Dengarkan audio istilah kerja sama berikut, lalu tentukan maknanya:",
    context_hanzi: "实现双方共赢",
    context_pinyin: "Shíxiàn shuāngfāng gòngyíng",
    context_translation: "Mencapai keuntungan bersama bagi kedua belah pihak",
    options: [
      "风险 (fēngxiǎn)",
      "共赢 (gòngyíng)",
      "成本 (chéngběn)",
      "推迟 (tuīchí)",
    ],
    correct_answer: "共赢 (gòngyíng)",
    explanation:
      "Istilah '共赢' (gòngyíng / win-win) merupakan prinsip sentral dalam etika negosiasi kerja sama modern.",
    order_index: 3,
  },

  // Unit 21: HSK 5 - Wacana Ekonomi & Pasar
  {
    id: "hsk5-ex-01",
    level_id: "hsk5",
    lesson_id: "hsk5-21",
    module_id: "hsk5",
    unit_slug: "21",
    type: "multiple_choice",
    prompt: "Lengkapi kalimat analisis tren ekonomi pasar modal berikut:",
    context_hanzi: "随着科技创新，数字经济呈现出快速 ___ 的趋势",
    context_pinyin: "Suízhe kējì chuàngxīn, shùzì jīngjì chéngxiàn chū kuàisù ___ de qūshì",
    context_translation: "Seiring inovasi teknologi, ekonomi digital menunjukkan tren pertumbuhan pesat",
    options: ["减少 (jiǎnshǎo)", "增长 (zēngzhǎng)", "倒退 (dàotuì)", "停止 (tíngzhǐ)"],
    correct_answer: "增长 (zēngzhǎng)",
    explanation:
      "Kolokasi formal wacana ekonomi '快速增长的趋势' berarti tren pertumbuhan yang meningkat pesat.",
    order_index: 1,
  },
  {
    id: "hsk5-ex-02",
    level_id: "hsk5",
    lesson_id: "hsk5-21",
    module_id: "hsk5",
    unit_slug: "21",
    type: "sentence_ordering",
    prompt: "Susun potongan kata Mandarin berikut agar membentuk kalimat yang sesuai dengan arti bahasa Indonesia di atas:",
    context_hanzi: "市场的稳定对实体经济发展至关重要",
    context_pinyin: "Shìchǎng de wěndìng duì shítǐ jīngjì fāzhǎn zhìguān zhòngyào",
    context_translation: "Kestabilan pasar sangat krusial bagi perkembangan ekonomi riil",
    options: [
      { text: "对实体经济发展", pinyin: "duì shítǐ jīngjì fāzhǎn" },
      { text: "至关重要", pinyin: "zhìguān zhòngyào" },
      { text: "市场的稳定", pinyin: "shìchǎng de wěndìng" },
    ],
    correct_answer: "市场的稳定 对实体经济发展 至关重要",
    explanation:
      "Kalimat '市场的稳定对实体经济发展至关重要' (Shìchǎng de wěndìng duì shítǐ jīngjì fāzhǎn zhìguān zhòngyào) berarti 'Kestabilan pasar sangat krusial bagi perkembangan ekonomi riil'.",
    order_index: 2,
  },
  {
    id: "hsk5-ex-03",
    level_id: "hsk5",
    lesson_id: "hsk5-21",
    module_id: "hsk5",
    unit_slug: "21",
    type: "listening",
    prompt: "Dengarkan audio analisis investasi berikut, lalu tentukan konsep yang dibahas:",
    context_hanzi: "合理分散投资风险",
    context_pinyin: "Hélǐ fēnsàn tóuzī fēngxiǎn",
    context_translation: "Mendiversifikasi risiko investasi secara rasional",
    options: [
      "吸收就业 (xīshōu jiùyè)",
      "分散风险 (fēnsàn fēngxiǎn)",
      "贷款利率 (dàikuǎn lìlǜ)",
      "汇率波动 (huìlǜ bōdòng)",
    ],
    correct_answer: "分散风险 (fēnsàn fēngxiǎn)",
    explanation:
      "Frasa '分散投资风险' (fēnsàn tóuzī fēngxiǎn) merupakan prinsip dasar manajemen portofolio investasi keuangan.",
    order_index: 3,
  },
];

// Helper fallback untuk unit HSK 2-5 yang belum memiliki soal spesifik
function generateUnitFallbackExercises(moduleId: string, unitSlug: string): ExerciseItem[] {
  return [
    {
      id: `${moduleId}-${unitSlug}-ex-01`,
      level_id: moduleId,
      lesson_id: `${moduleId}-${unitSlug}`,
      module_id: moduleId,
      unit_slug: unitSlug,
      type: "multiple_choice",
      prompt: `Pilih pemakaian kosakata dan pola tata bahasa yang paling tepat untuk Unit ${unitSlug}:`,
      context_hanzi: "请根据课文语境选择最佳答案",
      context_pinyin: "Qǐng gēnjù kèwén yǔjìng xuǎnzé zuìjiā dá'àn",
      context_translation: "Silakan pilih jawaban paling tepat sesuai konteks kalimat",
      options: [
        "语序不当 (yǔxù bùdāng)",
        "正确 (zhèngquè)",
        "用词有误 (yòngcí yǒuwù)",
        "搭配不当 (dāpèi bùdāng)",
      ],
      correct_answer: "正确 (zhèngquè)",
      explanation:
        "Dalam pola kalimat Mandarin, keterangan waktu dan tempat mendahului aksi utama yang dilakukan oleh subjek.",
      order_index: 1,
    },
    {
      id: `${moduleId}-${unitSlug}-ex-02`,
      level_id: moduleId,
      lesson_id: `${moduleId}-${unitSlug}`,
      module_id: moduleId,
      unit_slug: unitSlug,
      type: "sentence_ordering",
      prompt: "Susun potongan kata Mandarin berikut agar membentuk kalimat yang sesuai dengan arti bahasa Indonesia di atas:",
      context_hanzi: "我们每天都在认真学习",
      context_pinyin: "Wǒmen měitiān dōu zài rènzhēn xuéxí",
      context_translation: "Setiap hari kami belajar dengan sungguh-sungguh",
      options: [
        { text: "每天都在", pinyin: "měitiān dōu zài" },
        { text: "认真学习", pinyin: "rènzhēn xuéxí" },
        { text: "我们", pinyin: "wǒmen" },
      ],
      correct_answer: "我们 每天都在 认真学习",
      explanation:
        "Kalimat '我们每天都在认真学习' berarti 'Setiap hari kami belajar dengan sungguh-sungguh'.",
      order_index: 2,
    },
    {
      id: `${moduleId}-${unitSlug}-ex-03`,
      level_id: moduleId,
      lesson_id: `${moduleId}-${unitSlug}`,
      module_id: moduleId,
      unit_slug: unitSlug,
      type: "listening",
      prompt: "Dengarkan pelafalan kalimat berikut, lalu pilih frasa yang dilafalkan:",
      context_hanzi: "学以致用，温故知新",
      context_pinyin: "Xué yǐ zhì yòng, wēn gù zhī xīn",
      context_translation: "Belajar untuk diamalkan, mengulang materi lama agar memahami hal baru",
      options: [
        "学以致用 (xué yǐ zhì yòng)",
        "温故知新 (wēn gù zhī xīn)",
        "循序渐进 (xún xù jiàn jìn)",
        "持之以恒 (chí zhī yǐ héng)",
      ],
      correct_answer: "温故知新 (wēn gù zhī xīn)",
      explanation:
        "Pepatah '温故知新' (wēn gù zhī xīn) mengajarkan pentingnya mengulang dan meninjau kembali materi yang telah dipelajari.",
      order_index: 3,
    },
  ];
}

const LESSON_ID_EQUIVALENTS: Record<string, string[]> = {
  "01": ["lesson-hsk1-01", "21000000-0000-0000-0000-000000000001", "01", "hsk1-01"],
  "02": ["lesson-hsk1-02", "21000000-0000-0000-0000-000000000002", "02", "hsk1-02"],
  "03": ["lesson-hsk1-03", "21000000-0000-0000-0000-000000000003", "03", "hsk1-03"],
  "04": ["lesson-hsk1-04", "21000000-0000-0000-0000-000000000004", "04", "hsk1-04"],
  "05": ["lesson-hsk1-05", "21000000-0000-0000-0000-000000000005", "05", "hsk1-05"],
  "06": ["hsk1-06", "hsk2-06", "06", "hsk2-lesson-06"],
  "07": ["hsk1-07", "hsk2-07", "07", "hsk2-lesson-07"],
  "08": ["hsk1-08", "hsk2-08", "08", "hsk2-lesson-08"],
  "09": ["hsk1-09", "hsk2-09", "09", "hsk2-lesson-09"],
  "10": ["hsk1-10", "hsk2-10", "10", "hsk2-lesson-10"],
  "11": ["hsk1-11", "11"],
  "12": ["hsk1-12", "12"],
  "hsk1-01": ["hsk1-01", "01", "lesson-hsk1-01"],
  "hsk1-02": ["hsk1-02", "02", "lesson-hsk1-02"],
  "hsk1-03": ["hsk1-03", "03", "lesson-hsk1-03"],
  "hsk1-04": ["hsk1-04", "04", "lesson-hsk1-04"],
  "hsk1-05": ["hsk1-05", "05", "lesson-hsk1-05"],
  "hsk1-06": ["hsk1-06", "06"],
  "hsk1-07": ["hsk1-07", "07"],
  "hsk1-08": ["hsk1-08", "08"],
  "hsk1-09": ["hsk1-09", "09"],
  "hsk1-10": ["hsk1-10", "10"],
  "hsk1-11": ["hsk1-11", "11"],
  "hsk1-12": ["hsk1-12", "12"],
  "fund-01": ["fund-01", "fundamentals-01"],
  "fund-02": ["fund-02", "fundamentals-02"],
  "fund-03": ["fund-03", "fundamentals-03"],
  "fund-04": ["fund-04", "fundamentals-04"],
  "fund-05": ["fund-05", "fundamentals-05"],
  "fund-06": ["fund-06", "fundamentals-06"],
  "fund-07": ["fund-07", "fundamentals-07"],
  "fund-08": ["fund-08", "fundamentals-08"],
  "fund-09": ["fund-09", "fundamentals-09"],
  "fund-10": ["fund-10", "fundamentals-10"],
};

export function parseExerciseOptions(
  optionsJson: unknown,
  type: "multiple_choice" | "sentence_ordering" | "listening"
): string[] | SentenceOrderingFragment[] {
  if (Array.isArray(optionsJson)) {
    if (type === "multiple_choice" || type === "listening") {
      return optionsJson.map((opt) => (typeof opt === "string" ? opt : String(opt)));
    }
    return optionsJson as SentenceOrderingFragment[];
  }
  return [];
}

export interface GetExercisesParams {
  lessonId?: string;
  moduleId?: string;
  unitSlug?: string;
  type?: "multiple_choice" | "sentence_ordering" | "listening";
  limit?: number;
}

export async function getExercises(params?: GetExercisesParams): Promise<ExerciseItem[]> {
  let filtered = [...DEFAULT_EXERCISES];

  if (params?.moduleId && params?.unitSlug) {
    const targetModule = params.moduleId;
    const targetSlug = params.unitSlug;
    filtered = filtered.filter(
      (ex) =>
        (ex.module_id === targetModule && ex.unit_slug === targetSlug) ||
        ex.lesson_id === `${targetModule}-${targetSlug}`
    );

    // Jika belum ada soal bawaan, buatkan fallback otomatis yang relevan
    if (filtered.length === 0) {
      filtered = generateUnitFallbackExercises(targetModule, targetSlug);
    }
  } else if (params?.lessonId) {
    const matchingIds = LESSON_ID_EQUIVALENTS[params.lessonId] ?? [params.lessonId];
    filtered = filtered.filter(
      (ex) => ex.lesson_id !== null && matchingIds.includes(ex.lesson_id)
    );
  }

  if (params?.type) {
    filtered = filtered.filter((ex) => ex.type === params.type);
  }
  if (params?.limit) {
    filtered = filtered.slice(0, params.limit);
  }

  return filtered;
}
