/**
 * hanzi.ts
 * Fondasi dataset dan utilitas untuk Modul 9.3: Hanzi Explorer (Eksplorasi Karakter Hanzi & Radikal).
 * Berfokus pada:
 * 1. 12 Radikal Semantik Utama HSK 1
 * 2. 4 Jenis Struktur Spasial Karakter Geometris
 * 3. 7 Kaidah Urutan Goresan Standar (Bǐshùn)
 * 4. Katalog Dekonstruksi Karakter HSK 1
 * 5. Soal Latihan Identifikasi Radikal & Karakter
 */

export interface RadicalInfo {
  id: string;
  symbol: string; // Misal: 氵
  originalHanzi: string; // Karakter asalnya: 水
  pinyin: string; // Sāndiǎnshuǐ
  meaningIndonesian: string; // Air / Cairan
  symbolicOrigin: string; // Filosofi piktograf/ideograf
  hsk1Examples: {
    hanzi: string;
    pinyin: string;
    translation: string;
    audioText: string;
  }[];
}

export type SpatialStructureType = "left_right" | "top_bottom" | "enclosure" | "single";

export interface SpatialStructureInfo {
  type: SpatialStructureType;
  nameIndonesian: string;
  nameChinese: string;
  pinyinChinese: string;
  visualSymbol: string;
  description: string;
}

export const SPATIAL_STRUCTURES: Record<SpatialStructureType, SpatialStructureInfo> = {
  left_right: {
    type: "left_right",
    nameIndonesian: "Struktur Kiri - Kanan",
    nameChinese: "左右结构",
    pinyinChinese: "Zuǒyòu jiégòu",
    visualSymbol: "[ ◧ ]",
    description:
      "Karakter terbagi dua secara vertikal. Bagian kiri biasanya berupa radikal semantik pembawa makna, bagian kanan memberikan petunjuk fonetik atau pelengkap.",
  },
  top_bottom: {
    type: "top_bottom",
    nameIndonesian: "Struktur Atas - Bawah",
    nameChinese: "上下结构",
    pinyinChinese: "Shàngxià jiégòu",
    visualSymbol: "[ ⬓ ]",
    description:
      "Karakter terbagi dua secara horizontal. Bagian atas sering kali berupa penanda kategori (seperti atap 宀 atau rumput 艹), bagian bawah adalah inti makna/bunyi.",
  },
  enclosure: {
    type: "enclosure",
    nameIndonesian: "Struktur Pembungkus (Enclosure)",
    nameChinese: "包围结构",
    pinyinChinese: "Bāowéi jiégòu",
    visualSymbol: "[ ▣ ]",
    description:
      "Komponen luar membungkus atau mengelilingi komponen dalam (seperti 国 atau 四). Menuntut aturan goresan khusus: masuk ke dalam terlebih dahulu baru menutup pintu bawah.",
  },
  single: {
    type: "single",
    nameIndonesian: "Karakter Tunggal (Non-Komposit)",
    nameChinese: "独体字",
    pinyinChinese: "Dútǐzì",
    visualSymbol: "[ ■ ]",
    description:
      "Karakter yang tidak dapat dipecah menjadi bagian-bagian terpisah tanpa merusak esensinya. Sering kali merupakan piktograf benda alam murni.",
  },
};

export const RADICALS_DATA: RadicalInfo[] = [
  {
    id: "rad-shui",
    symbol: "氵",
    originalHanzi: "水",
    pinyin: "Sāndiǎnshuǐ",
    meaningIndonesian: "Air / Cairan",
    symbolicOrigin:
      "Berupa 3 titik tetesan air mengalir. Seluruh karakter dengan radikal ini berhubungan dengan air, cairan, basah, atau pembersihan.",
    hsk1Examples: [
      { hanzi: "没", pinyin: "méi", translation: "tidak (tenggelam dalam air)", audioText: "没" },
      { hanzi: "汉", pinyin: "hàn", translation: "suku Han / sungai Han", audioText: "汉" },
      { hanzi: "渴", pinyin: "kě", translation: "haus (butuh air)", audioText: "渴" },
    ],
  },
  {
    id: "rad-ren",
    symbol: "亻",
    originalHanzi: "人",
    pinyin: "Dānrénpáng",
    meaningIndonesian: "Manusia / Orang",
    symbolicOrigin:
      "Bentuk miring dari karakter '人' (orang berdiri menyamping). Mengindikasikan pelaku manusia, sifat orang, atau relasi antar-manusia.",
    hsk1Examples: [
      { hanzi: "你", pinyin: "nǐ", translation: "kamu (orang kedua)", audioText: "你" },
      { hanzi: "他", pinyin: "tā", translation: "dia laki-laki", audioText: "他" },
      { hanzi: "们", pinyin: "men", translation: "partikel jamak orang", audioText: "们" },
      { hanzi: "住", pinyin: "zhù", translation: "tinggal / menetap", audioText: "住" },
    ],
  },
  {
    id: "rad-yan",
    symbol: "讠",
    originalHanzi: "言",
    pinyin: "Yánzìpáng",
    meaningIndonesian: "Bahasa / Perkataan",
    symbolicOrigin:
      "Melambangkan lidah yang mengeluarkan kata-kata dari mulut. Terkait dengan ucapan, bahasa, berbicara, dan percakapan.",
    hsk1Examples: [
      { hanzi: "语", pinyin: "yǔ", translation: "bahasa (汉语 Hànyǔ)", audioText: "语" },
      { hanzi: "说", pinyin: "shuō", translation: "berbicara / berkata", audioText: "说" },
      { hanzi: "请", pinyin: "qǐng", translation: "silakan / memohon", audioText: "请" },
      { hanzi: "话", pinyin: "huà", translation: "ucapan / perkataan", audioText: "话" },
    ],
  },
  {
    id: "rad-kou",
    symbol: "口",
    originalHanzi: "口",
    pinyin: "Kǒuzìpáng",
    meaningIndonesian: "Mulut / Konsumsi / Suara",
    symbolicOrigin:
      "Piktograf rongga mulut terbuka. Berkaitan erat dengan aktivitas makan, minum, memanggil, suara partikel tanya, atau lubang masuk.",
    hsk1Examples: [
      { hanzi: "吃", pinyin: "chī", translation: "makan", audioText: "吃" },
      { hanzi: "喝", pinyin: "hē", translation: "minum", audioText: "喝" },
      { hanzi: "叫", pinyin: "jiào", translation: "bernama / memanggil", audioText: "叫" },
      { hanzi: "吗", pinyin: "ma", translation: "partikel tanya", audioText: "吗" },
      { hanzi: "呢", pinyin: "ne", translation: "partikel tanya balik", audioText: "呢" },
    ],
  },
  {
    id: "rad-nv",
    symbol: "女",
    originalHanzi: "女",
    pinyin: "Nǚzìpáng",
    meaningIndonesian: "Wanita / Perempuan",
    symbolicOrigin:
      "Piktograf seorang wanita bersimpuh santun. Karakter turunannya terkait dengan wanita, ibu, atau relasi keluarga perempuan.",
    hsk1Examples: [
      { hanzi: "她", pinyin: "tā", translation: "dia perempuan", audioText: "她" },
      { hanzi: "好", pinyin: "hǎo", translation: "baik (wanita + anak)", audioText: "好" },
      { hanzi: "妈", pinyin: "mā", translation: "ibu", audioText: "妈" },
      { hanzi: "姐", pinyin: "jiě", translation: "kakak perempuan", audioText: "姐" },
    ],
  },
  {
    id: "rad-ri",
    symbol: "日",
    originalHanzi: "日",
    pinyin: "Rìzìpáng",
    meaningIndonesian: "Matahari / Hari / Waktu",
    symbolicOrigin:
      "Piktograf piringan matahari dengan titik di tengahnya. Menandai waktu, tanggal, siang, cuaca cerah, atau kejelasan.",
    hsk1Examples: [
      { hanzi: "是", pinyin: "shì", translation: "adalah / benar (matahari lurus)", audioText: "是" },
      { hanzi: "明", pinyin: "míng", translation: "terang / besok (matahari + bulan)", audioText: "明" },
      { hanzi: "昨", pinyin: "zuó", translation: "kemarin", audioText: "昨" },
      { hanzi: "早", pinyin: "zǎo", translation: "pagi hari", audioText: "早" },
    ],
  },
  {
    id: "rad-mu",
    symbol: "木",
    originalHanzi: "木",
    pinyin: "Mùzìpáng",
    meaningIndonesian: "Kayu / Pohon",
    symbolicOrigin:
      "Piktograf sebatang pohon lengkap dengan cabang atas dan akar di bawahnya. Membentuk kata benda perabotan kayu atau tumbuhan.",
    hsk1Examples: [
      { hanzi: "桌", pinyin: "zhuō", translation: "meja (berbahan kayu)", audioText: "桌" },
      { hanzi: "杯", pinyin: "bēi", translation: "cangkir / gelas kayu asali", audioText: "杯" },
      { hanzi: "本", pinyin: "běn", translation: "jilid buku / akar pohon", audioText: "本" },
    ],
  },
  {
    id: "rad-shi",
    symbol: "饣",
    originalHanzi: "食",
    pinyin: "Shízìpáng",
    meaningIndonesian: "Makanan / Santapan",
    symbolicOrigin:
      "Piktograf mangkuk makanan tertutup. Karakter turunannya berhubungan dengan jenis hidangan, beras, atau tempat makan.",
    hsk1Examples: [
      { hanzi: "饭", pinyin: "fàn", translation: "nasi / hidangan makan", audioText: "饭" },
      { hanzi: "馆", pinyin: "guǎn", translation: "gedung makan / restoran", audioText: "馆" },
      { hanzi: "饱", pinyin: "bǎo", translation: "kenyang", audioText: "饱" },
    ],
  },
  {
    id: "rad-zou",
    symbol: "辶",
    originalHanzi: "辵",
    pinyin: "Zǒuzhīpáng",
    meaningIndonesian: "Berjalan / Gerakan Spasial",
    symbolicOrigin:
      "Melambangkan telapak kaki yang melangkah di persimpangan jalan. Terkait mobilitas fisik, jarak, atau kedekatan arah.",
    hsk1Examples: [
      { hanzi: "这", pinyin: "zhè", translation: "ini (dekat jangkauan langkah)", audioText: "这" },
      { hanzi: "过", pinyin: "guò", translation: "melewati / pernah", audioText: "过" },
      { hanzi: "边", pinyin: "biān", translation: "sisi / pinggir jalan", audioText: "边" },
    ],
  },
  {
    id: "rad-bao",
    symbol: "宀",
    originalHanzi: "宀",
    pinyin: "Bǎogàitóu",
    meaningIndonesian: "Atap Rumah / Bangunan",
    symbolicOrigin:
      "Piktograf atap rumah dengan cerobong atau puncak tiang. Karakter turunannya berhubungan dengan hunian tempat tinggal dan ruangan.",
    hsk1Examples: [
      { hanzi: "家", pinyin: "jiā", translation: "rumah / keluarga", audioText: "家" },
      { hanzi: "字", pinyin: "zì", translation: "karakter huruf (belajar di rumah)", audioText: "字" },
      { hanzi: "定", pinyin: "dìng", translation: "pasti / menetap", audioText: "定" },
    ],
  },
  {
    id: "rad-cao",
    symbol: "艹",
    originalHanzi: "艸",
    pinyin: "Cǎozìtóu",
    meaningIndonesian: "Rumput / Tanaman Herbal",
    symbolicOrigin:
      "Dua tunas rumput kecil yang baru menyembul dari tanah. Terkait dengan dedaunan, sayuran, dan minuman seduhan nabati.",
    hsk1Examples: [
      { hanzi: "茶", pinyin: "chá", translation: "teh (pucuk daun teh)", audioText: "茶" },
      { hanzi: "菜", pinyin: "cài", translation: "sayuran / hidangan masakan", audioText: "菜" },
      { hanzi: "苹", pinyin: "píng", translation: "apel (苹果 píngguǒ)", audioText: "苹" },
    ],
  },
  {
    id: "rad-yue",
    symbol: "月",
    originalHanzi: "月/肉",
    pinyin: "Yuèzìpáng",
    meaningIndonesian: "Bulan / Daging / Tubuh",
    symbolicOrigin:
      "Piktograf bulan sabit (waktu) atau potongan daging ròu (organ tubuh manusia).",
    hsk1Examples: [
      { hanzi: "期", pinyin: "qī", translation: "periode / hari (星期 xīngqī)", audioText: "期" },
      { hanzi: "朋", pinyin: "péng", translation: "sahabat (teman karib)", audioText: "朋" },
      { hanzi: "明", pinyin: "míng", translation: "terang / besok", audioText: "明" },
    ],
  },
];

export interface DeconstructedHanzi {
  id: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  strokeCount: number;
  spatialType: SpatialStructureType;
  primaryRadical: string;
  components: {
    symbol: string;
    pinyin: string;
    role: "radikal_makna" | "komponen_fonetik" | "balok_penyusun";
    description: string;
  }[];
  etymologyStory: string;
  strokeOrderSteps: string[];
  audioText: string;
}

export const DECONSTRUCTED_HANZI_LIST: DeconstructedHanzi[] = [
  {
    id: "dec-hao",
    hanzi: "好",
    pinyin: "hǎo",
    translation: "baik / bagus",
    strokeCount: 6,
    spatialType: "left_right",
    primaryRadical: "女 (Wanita)",
    components: [
      {
        symbol: "女",
        pinyin: "nǚ",
        role: "radikal_makna",
        description: "Wanita / ibu yang penuh kasih sayang.",
      },
      {
        symbol: "子",
        pinyin: "zǐ",
        role: "balok_penyusun",
        description: "Anak / keturunan yang sehat.",
      },
    ],
    etymologyStory:
      "Dalam peradaban Tiongkok kuno, seorang ibu (女) yang menggendong anaknya (子) adalah simbol kebahagiaan, keharmonisan, dan hal yang paling 'baik' (好).",
    strokeOrderSteps: [
      "1.撇点 (piědiǎn) - goresan miring titik kiri女",
      "2.撇 (piě) - goresan miring kiri女",
      "3.提 (tí) - garis naik menyilang女",
      "4.横撇 (héngpiě) - garis horizontal miring子",
      "5.竖钩 (shùgōu) - garis vertikal berkait子",
      "6.横 (héng) - garis horizontal penutup子",
    ],
    audioText: "好",
  },
  {
    id: "dec-he",
    hanzi: "喝",
    pinyin: "hē",
    translation: "minum",
    strokeCount: 12,
    spatialType: "left_right",
    primaryRadical: "口 (Mulut)",
    components: [
      {
        symbol: "口",
        pinyin: "kǒu",
        role: "radikal_makna",
        description: "Mulut untuk meneguk cairan.",
      },
      {
        symbol: "曷",
        pinyin: "hé",
        role: "komponen_fonetik",
        description: "Komponen fonetik pemberi rima bunyi 'he'.",
      },
    ],
    etymologyStory:
      "Aktivitas minum dilakukan menggunakan mulut (口), dipadukan dengan komponen fonetik 曷 (hé) yang memberikan pelafalan rima 'hē'.",
    strokeOrderSteps: [
      "1.竖 (shù) - garis vertikal mulut",
      "2.横折 (héngzhé) - sudut mulut",
      "3.横 (héng) - tutup mulut",
      "4.日 (rì) di atas komponen kanan (4 goresan)",
      "5.Komponen penopang bawah (5 goresan)",
    ],
    audioText: "喝",
  },
  {
    id: "dec-yu",
    hanzi: "语",
    pinyin: "yǔ",
    translation: "bahasa / tuturan",
    strokeCount: 9,
    spatialType: "left_right",
    primaryRadical: "讠 (Bahasa)",
    components: [
      {
        symbol: "讠",
        pinyin: "yán",
        role: "radikal_makna",
        description: "Radikal kata / tuturan bahasa.",
      },
      {
        symbol: "五",
        pinyin: "wǔ",
        role: "balok_penyusun",
        description: "Angka lima.",
      },
      {
        symbol: "口",
        pinyin: "kǒu",
        role: "balok_penyusun",
        description: "Mulut penutur.",
      },
    ],
    etymologyStory:
      "Karakter '语' (bahasa) dibentuk dari kata/bahasa (讠) yang diucapkan oleh mulut (口) milik diri sendiri (吾 = 五 + 口).",
    strokeOrderSteps: [
      "1.点 (diǎn) - titik radikal kata",
      "2.横折提 (héngzhétí) - siku naik radikal kata",
      "3-6.Goresan angka 五 (wǔ)",
      "7-9.Goresan kotak 口 (kǒu)",
    ],
    audioText: "语",
  },
  {
    id: "dec-jia",
    hanzi: "家",
    pinyin: "jiā",
    translation: "rumah / keluarga",
    strokeCount: 10,
    spatialType: "top_bottom",
    primaryRadical: "宀 (Atap)",
    components: [
      {
        symbol: "宀",
        pinyin: "bǎogài",
        role: "radikal_makna",
        description: "Atap bangunan tempat tinggal.",
      },
      {
        symbol: "豕",
        pinyin: "shǐ",
        role: "balok_penyusun",
        description: "Babi / hewan ternak berharga.",
      },
    ],
    etymologyStory:
      "Di zaman agraris kuno, sebuah bangunan beratap (宀) yang di dalamnya memelihara ternak (豕) menandakan kemakmuran dan tempat tinggal keluarga sejati.",
    strokeOrderSteps: [
      "1.点 (diǎn) - titik puncak atap",
      "2.点 (diǎn) - titik kiri atap",
      "3.横钩 (hénggōu) - bentangan atap berkait",
      "4-10.Goresan badan dan kaki hewan ternak 豕",
    ],
    audioText: "家",
  },
  {
    id: "dec-guo",
    hanzi: "国",
    pinyin: "guó",
    translation: "negara",
    strokeCount: 8,
    spatialType: "enclosure",
    primaryRadical: "囗 (Pagar Keliling)",
    components: [
      {
        symbol: "囗",
        pinyin: "wéi",
        role: "radikal_makna",
        description: "Tembok batas wilayah perbatasan.",
      },
      {
        symbol: "玉",
        pinyin: "yù",
        role: "balok_penyusun",
        description: "Giok / harta tak ternilai.",
      },
    ],
    etymologyStory:
      "Sebuah negara (国) adalah batas benteng pertahanan (囗) yang menjaga permata giok (玉) lambang kedaulatan rakyat di dalamnya.",
    strokeOrderSteps: [
      "1.竖 (shù) - tiang batas kiri luar",
      "2.横折 (héngzhé) - sudut atas dan kanan luar",
      "3-6.Isi dalam: tiga garis horizontal dan tiang giok 玉",
      "7.点 (diǎn) - titik giok",
      "8.横 (héng) - TUTUP PINTU BAWAH (kaidah masuk dulu baru tutup pintu)",
    ],
    audioText: "国",
  },
  {
    id: "dec-cha",
    hanzi: "茶",
    pinyin: "chá",
    translation: "teh",
    strokeCount: 9,
    spatialType: "top_bottom",
    primaryRadical: "艹 (Rumput)",
    components: [
      {
        symbol: "艹",
        pinyin: "cǎo",
        role: "radikal_makna",
        description: "Pucuk daun tanaman.",
      },
      {
        symbol: "人",
        pinyin: "rén",
        role: "balok_penyusun",
        description: "Manusia pemetik teh.",
      },
      {
        symbol: "木",
        pinyin: "mù",
        role: "balok_penyusun",
        description: "Batang semak pohon teh.",
      },
    ],
    etymologyStory:
      "Manusia (人) yang berada di antara pucuk dedaunan (艹) dan pohon kayu (木) sedang menikmati seduhan daun teh alami.",
    strokeOrderSteps: [
      "1-3.Radikal rumput 艹 di atas",
      "4-5.Goresan orang 人 di tengah (撇 dan 捺)",
      "6-9.Goresan pohon 木 di bawah (横, 竖钩, 撇, 点)",
    ],
    audioText: "茶",
  },
  {
    id: "dec-ni",
    hanzi: "你",
    pinyin: "nǐ",
    translation: "kamu",
    strokeCount: 7,
    spatialType: "left_right",
    primaryRadical: "亻 (Manusia)",
    components: [
      {
        symbol: "亻",
        pinyin: "rén",
        role: "radikal_makna",
        description: "Sosok manusia di hadapan.",
      },
      {
        symbol: "尔",
        pinyin: "ěr",
        role: "komponen_fonetik",
        description: "Komponen fonetik kuno untuk kata 'engkau'.",
      },
    ],
    etymologyStory:
      "Orang (亻) yang sedang diajak berhadapan secara langsung: kamu (你).",
    strokeOrderSteps: [
      "1.撇 (piě) - garis miring kiri orang",
      "2.竖 (shù) - tiang tegak orang",
      "3.撇 (piě) - goresan miring atas kanan",
      "4.横钩 (hénggōu) - garis siku",
      "5.竖钩 (shùgōu) - tiang tengah berkait",
      "6.撇 (piě) - titik kiri",
      "7.点 (diǎn) - titik kanan",
    ],
    audioText: "你",
  },
  {
    id: "dec-shi",
    hanzi: "是",
    pinyin: "shì",
    translation: "adalah / benar",
    strokeCount: 9,
    spatialType: "top_bottom",
    primaryRadical: "日 (Matahari)",
    components: [
      {
        symbol: "日",
        pinyin: "rì",
        role: "radikal_makna",
        description: "Matahari yang terang benderang.",
      },
      {
        symbol: "疋/正",
        pinyin: "zhèng",
        role: "balok_penyusun",
        description: "Lurus / tidak bengkok.",
      },
    ],
    etymologyStory:
      "Sesuatu yang berada di bawah terang matahari (日) dan terbukti lurus/jujur (正) adalah kebenaran yang tak terbantahkan: adalah/benar (是).",
    strokeOrderSteps: [
      "1-4.Kotak matahari 日 di bagian atas",
      "5.横 (héng) - garis horizontal tengah",
      "6.竖 (shù) - tiang vertikal",
      "7.横 (héng) - garis datar",
      "8.撇 (piě) - miring kiri",
      "9.捺 (nà) - miring kanan penopang",
    ],
    audioText: "是",
  },
];

export interface HanziQuizQuestion {
  id: string;
  prompt: string;
  targetRadicalSymbol: string;
  targetRadicalMeaning: string;
  options: {
    id: string;
    hanzi: string;
    pinyin: string;
    translation: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export const HANZI_QUIZ_QUESTIONS: HanziQuizQuestion[] = [
  {
    id: "hq-01",
    prompt: "Karakter manakah yang memuat radikal semantik '氵' (Air / Cairan)?",
    targetRadicalSymbol: "氵",
    targetRadicalMeaning: "Air",
    options: [
      { id: "opt-1a", hanzi: "没", pinyin: "méi", translation: "tidak / belum", isCorrect: true },
      { id: "opt-1b", hanzi: "你", pinyin: "nǐ", translation: "kamu", isCorrect: false },
      { id: "opt-1c", hanzi: "吃", pinyin: "chī", translation: "makan", isCorrect: false },
      { id: "opt-1d", hanzi: "好", pinyin: "hǎo", translation: "baik", isCorrect: false },
    ],
    explanation:
      "Karakter 没 (méi) memiliki radikal 氵 di sisi kirinya, berakar dari konsep tenggelam ke dalam air.",
  },
  {
    id: "hq-02",
    prompt: "Karakter manakah yang berkaitan erat dengan aktivitas mulut '口'?",
    targetRadicalSymbol: "口",
    targetRadicalMeaning: "Mulut",
    options: [
      { id: "opt-2a", hanzi: "家", pinyin: "jiā", translation: "rumah", isCorrect: false },
      { id: "opt-2b", hanzi: "喝", pinyin: "hē", translation: "minum", isCorrect: true },
      { id: "opt-2c", hanzi: "茶", pinyin: "chá", translation: "teh", isCorrect: false },
      { id: "opt-2d", hanzi: "他", pinyin: "tā", translation: "dia laki-laki", isCorrect: false },
    ],
    explanation:
      "Karakter 喝 (hē = minum) memiliki radikal 口 (mulut) di bagian kiri yang menandai aktivitas menelan cairan.",
  },
  {
    id: "hq-03",
    prompt: "Karakter '语' (yǔ - bahasa) menggunakan radikal semantik apa di sisi kirinya?",
    targetRadicalSymbol: "讠",
    targetRadicalMeaning: "Bahasa / Ucapan",
    options: [
      { id: "opt-3a", hanzi: "讠", pinyin: "yán", translation: "radikal bahasa/kata", isCorrect: true },
      { id: "opt-3b", hanzi: "亻", pinyin: "rén", translation: "radikal manusia", isCorrect: false },
      { id: "opt-3c", hanzi: "日", pinyin: "rì", translation: "radikal matahari", isCorrect: false },
      { id: "opt-3d", hanzi: "饣", pinyin: "shí", translation: "radikal makanan", isCorrect: false },
    ],
    explanation:
      "Radikal 讠 (Yánzìpáng) melambangkan perkataan dan tutur kata, yang menjadi akar kata 语 (bahasa), 说 (berbicara), dan 话 (ucapan).",
  },
  {
    id: "hq-04",
    prompt: "Berdasarkan tata letak spasial, karakter '国' (guó - negara) termasuk dalam tipe struktur apa?",
    targetRadicalSymbol: "囗",
    targetRadicalMeaning: "Pembungkus",
    options: [
      { id: "opt-4a", hanzi: "包围结构", pinyin: "Bāowéi", translation: "Struktur Pembungkus (Enclosure)", isCorrect: true },
      { id: "opt-4b", hanzi: "左右结构", pinyin: "Zuǒyòu", translation: "Struktur Kiri - Kanan", isCorrect: false },
      { id: "opt-4c", hanzi: "上下结构", pinyin: "Shàngxià", translation: "Struktur Atas - Bawah", isCorrect: false },
      { id: "opt-4d", hanzi: "独体字", pinyin: "Dútǐzì", translation: "Karakter Tunggal", isCorrect: false },
    ],
    explanation:
      "Karakter 国 (guó) memiliki struktur pembungkus penuh (全包围结构) di mana kotak luar 囗 mengurung giok 玉 di dalamnya.",
  },
];
