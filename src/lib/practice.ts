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
  // Unit 01: 4 Nada & Nada Netral
  {
    id: "fund-ex-01",
    level_id: "fundamentals",
    lesson_id: "fund-01",
    module_id: "fundamentals",
    unit_slug: "01",
    type: "multiple_choice",
    prompt: "Pilih kontur nada yang tepat untuk kata 'mǎ' (马 - kuda):",
    context_hanzi: "mǎ (马)",
    context_pinyin: "mǎ",
    context_translation: "kuda",
    options: [
      "Nada 1 (Tinggi datar)",
      "Nada 3 (Turun-naik melengkung rendah)",
      "Nada 2 (Naik tajam)",
      "Nada 4 (Jatuh tegas ke bawah)",
    ],
    correct_answer: "Nada 3 (Turun-naik melengkung rendah)",
    explanation:
      "Karakter '马' (mǎ) memiliki tanda caron (ˇ) yang menandakan nada ke-3, bersuara turun rendah lalu melengkung naik kembali.",
    order_index: 1,
  },
  {
    id: "fund-ex-02",
    level_id: "fundamentals",
    lesson_id: "fund-01",
    module_id: "fundamentals",
    unit_slug: "01",
    type: "sentence_ordering",
    prompt: "Susun urutan hierarki vokal dalam aturan penempatan tanda nada pinyin dari prioritas tertinggi:",
    context_hanzi: "标调规则",
    context_pinyin: "Biāodiào Guīzé",
    context_translation: "Aturan Penempatan Nada",
    options: [
      { text: "o / e", pinyin: "prioritas kedua" },
      { text: "a", pinyin: "prioritas utama" },
      { text: "i / u", pinyin: "prioritas ketiga" },
    ],
    correct_answer: "a o / e i / u",
    explanation:
      "Urutan prioritas penempatan tanda nada pinyin selalu dimulai dari 'a', kemudian 'o' atau 'e', lalu 'i' atau 'u'.",
    order_index: 2,
  },
  {
    id: "fund-ex-03",
    level_id: "fundamentals",
    lesson_id: "fund-01",
    module_id: "fundamentals",
    unit_slug: "01",
    type: "listening",
    prompt: "Dengarkan audio karakter bernada pertama (tinggi datar) berikut, lalu pilih kata yang tepat:",
    context_hanzi: "妈",
    context_pinyin: "mā",
    context_translation: "ibu",
    options: ["má (麻 / rami)", "mā (妈 / ibu)", "mǎ (马 / kuda)", "mà (骂 / memarahi)"],
    correct_answer: "mā (妈 / ibu)",
    explanation:
      "Kata 'mā' (妈) berbunyi nada ke-1 yang tinggi, datar, dan stabil tanpa kenaikan atau penurunan intonasi.",
    order_index: 3,
  },

  // Unit 02: Inisial & Final Pinyin
  {
    id: "fund-ex-04",
    level_id: "fundamentals",
    lesson_id: "fund-02",
    module_id: "fundamentals",
    unit_slug: "02",
    type: "multiple_choice",
    prompt: "Manakah pasangan konsonan yang dibedakan oleh hembusan udara kuat (aspirasi)?",
    context_hanzi: "声母发音",
    context_pinyin: "Shēngmǔ fāyīn",
    context_translation: "Pelafalan Konsonan Pīnyīn",
    options: ["m dan f", "b dan p", "n dan l", "y dan w"],
    correct_answer: "b dan p",
    explanation:
      "Konsonan 'b' diucapkan lembut tanpa hembusan udara, sedangkan konsonan 'p' diucapkan dengan hembusan angin yang nyata dari rongga mulut.",
    order_index: 1,
  },
  {
    id: "fund-ex-05",
    level_id: "fundamentals",
    lesson_id: "fund-02",
    module_id: "fundamentals",
    unit_slug: "02",
    type: "sentence_ordering",
    prompt: "Susun suku kata pinyin untuk kata 'nǚ' (wanita) dari konsonan dan vokal berikut:",
    context_hanzi: "女",
    context_pinyin: "nǚ",
    context_translation: "wanita",
    options: [
      { text: "ü", pinyin: "vokal bulat" },
      { text: "n", pinyin: "konsonan hidung" },
    ],
    correct_answer: "n ü",
    explanation:
      "Suku kata pinyin selalu dimulai dengan inisial konsonan (n) diikuti oleh final vokal (ü).",
    order_index: 2,
  },
  {
    id: "fund-ex-06",
    level_id: "fundamentals",
    lesson_id: "fund-02",
    module_id: "fundamentals",
    unit_slug: "02",
    type: "listening",
    prompt: "Dengarkan audio bunyi vokal berikut, lalu tentukan huruf pinyin yang dilafalkan:",
    context_hanzi: "八",
    context_pinyin: "bā",
    context_translation: "delapan",
    options: ["dà (大 - besar)", "bā (八 - delapan)", "kàn (看 - melihat)", "tiān (天 - hari)"],
    correct_answer: "bā (八 - delapan)",
    explanation:
      "Audio melafalkan suku kata 'bā' dengan konsonan bibir lembut 'b' dan vokal terbuka rileks 'a'.",
    order_index: 3,
  },

  // Unit 03: Aturan Menulis Hanzi
  {
    id: "fund-ex-07",
    level_id: "fundamentals",
    lesson_id: "fund-03",
    module_id: "fundamentals",
    unit_slug: "03",
    type: "multiple_choice",
    prompt: "Pada karakter '十' (shí - sepuluh), goresan manakah yang wajib ditulis terlebih dahulu?",
    context_hanzi: "十",
    context_pinyin: "shí",
    context_translation: "sepuluh",
    options: [
      "Garis tegak lurus vertikal (竖 - Shù)",
      "Garis mendatar horizontal (横 - Héng)",
      "Titik tekan (点 - Diǎn)",
      "Goresan kait (钩 - Gōu)",
    ],
    correct_answer: "Garis mendatar horizontal (横 - Héng)",
    explanation:
      "Berdasarkan kaidah '先横后竖' (Horizontal sebelum Vertikal), garis mendatar ditarik terlebih dahulu sebelum dipotong garis tegak vertikal.",
    order_index: 1,
  },
  {
    id: "fund-ex-08",
    level_id: "fundamentals",
    lesson_id: "fund-03",
    module_id: "fundamentals",
    unit_slug: "03",
    type: "sentence_ordering",
    prompt: "Susun urutan goresan karakter simetris '小' (xiǎo - kecil) sesuai kaidah '先中间后两边':",
    context_hanzi: "小",
    context_pinyin: "xiǎo",
    context_translation: "kecil",
    options: [
      { text: "Titik kanan (丶)", pinyin: "langkah 3" },
      { text: "Kait tengah (亅)", pinyin: "langkah 1" },
      { text: "Miring kiri (丿)", pinyin: "langkah 2" },
    ],
    correct_answer: "Kait tengah (亅) Miring kiri (丿) Titik kanan (丶)",
    explanation:
      "Kaidah karakter simetris mewajibkan poros tengah (亅) ditulis pertama, baru diikuti sayap kiri dan sayap kanan.",
    order_index: 2,
  },
  {
    id: "fund-ex-09",
    level_id: "fundamentals",
    lesson_id: "fund-03",
    module_id: "fundamentals",
    unit_slug: "03",
    type: "listening",
    prompt: "Dengarkan audio karakter berikut dan perhatikan nama goresan dasarnya:",
    context_hanzi: "一",
    context_pinyin: "yī",
    context_translation: "satu",
    options: [
      "Shù (竖 - goresan tegak)",
      "Héng (横 - goresan mendatar)",
      "Piě (撇 - goresan miring kiri)",
      "Nà (捺 - goresan tebal kanan)",
    ],
    correct_answer: "Héng (横 - goresan mendatar)",
    explanation:
      "Karakter '一' (yī - satu) tersusun atas satu tarikan goresan mendatar tunggal bernama Héng (横).",
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
      "Struktur kalimat kopula bahasa Mandarin: Subjek (我) + Kata Kerja Kopula (是) + Objek Identitas (印尼人).",
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
  "06": ["hsk2-06", "06", "hsk2-lesson-06"],
  "07": ["hsk2-07", "07", "hsk2-lesson-07"],
  "08": ["hsk2-08", "08", "hsk2-lesson-08"],
  "09": ["hsk2-09", "09", "hsk2-lesson-09"],
  "10": ["hsk2-10", "10", "hsk2-lesson-10"],
  "fund-01": ["fund-01", "fundamentals-01"],
  "fund-02": ["fund-02", "fundamentals-02"],
  "fund-03": ["fund-03", "fundamentals-03"],
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
