/**
 * phonetics.ts
 * Fondasi dataset dan utilitas fonetik untuk Latihan Mendengar (Listening Lab).
 * Berfokus pada pembeda bunyi krusial HSK 1 bagi pembelajar Indonesia:
 * 1. Pasangan Minimal Inisial (Retrofleks zh/ch/sh vs Dental z/c/s vs Alveolo-palatal j/q/x, Aspirasi b/p & d/t)
 * 2. Pasangan Nada Kritis (Nada 2 naik vs Nada 3 meliuk, Nada 1 datar vs Nada 4 turun tegas)
 * 3. Diktasi Kontekstual Kalimat HSK 1
 */

export type DrillType = "initials" | "tones" | "dictation";

export interface DrillOption {
  id: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  isCorrect: boolean;
  audioText: string;
}

export interface MinimalPairDrill {
  id: string;
  type: "initials";
  title: string;
  phoneticFocus: string;
  instruction: string;
  audioPrompt: string; // Teks yang dibunyikan oleh audio engine
  targetWord: {
    hanzi: string;
    pinyin: string;
    translation: string;
  };
  options: DrillOption[];
  articulatoryTip: {
    title: string;
    mechanism: string;
    indonesianComparison: string;
  };
}

export interface TonePairDrill {
  id: string;
  type: "tones";
  title: string;
  phoneticFocus: string;
  instruction: string;
  audioPrompt: string;
  targetWord: {
    hanzi: string;
    pinyin: string;
    translation: string;
    toneNumber: number;
    contour: string; // e.g., "35" atau "214"
  };
  options: DrillOption[];
  articulatoryTip: {
    title: string;
    mechanism: string;
    indonesianComparison: string;
  };
}

export interface DictationDrill {
  id: string;
  type: "dictation";
  title: string;
  phoneticFocus: string;
  instruction: string;
  audioPrompt: string; // Kalimat utuh yang dibunyikan
  displayCloze: string; // Kalimat dengan rumpang, misal "我 ___ 商店买苹果。"
  fullSentence: {
    hanzi: string;
    pinyin: string;
    translation: string;
  };
  options: DrillOption[];
  articulatoryTip: {
    title: string;
    mechanism: string;
    indonesianComparison: string;
  };
}

export type ListeningDrill = MinimalPairDrill | TonePairDrill | DictationDrill;

export const INITIALS_DRILLS: MinimalPairDrill[] = [
  {
    id: "drill-init-01",
    type: "initials",
    title: "Retrofleks 'zh' vs Alveolo-palatal 'j'",
    phoneticFocus: "zh vs j",
    instruction: "Dengarkan pengucapan kata berikut, lalu tentukan inisial dan hanzi yang tepat:",
    audioPrompt: "知道",
    targetWord: {
      hanzi: "知道",
      pinyin: "zhīdào",
      translation: "mengetahui / tahu",
    },
    options: [
      {
        id: "opt-1a",
        hanzi: "知道",
        pinyin: "zhīdào",
        translation: "mengetahui / tahu",
        isCorrect: true,
        audioText: "知道",
      },
      {
        id: "opt-1b",
        hanzi: "鸡蛋",
        pinyin: "jīdàn",
        translation: "telur ayam",
        isCorrect: false,
        audioText: "鸡蛋",
      },
    ],
    articulatoryTip: {
      title: "Mekanisme Artikulasi: zh vs j",
      mechanism:
        "Inisial 'zh' adalah konsonan retrofleks: ujung lidah ditekuk ke belakang menghadap langit-langit keras. Sementara 'j' adalah alveolo-palatal: daun lidah mendatar menempel di langit-langit depan dekat gigi seri.",
      indonesianComparison:
        "Bunyi 'zh' mirip perpaduan 'c' dan 'j' dengan lidah menggulung ke belakang, sedangkan 'j' mirip bunyi 'c' tipis dalam kata 'cipta'.",
    },
  },
  {
    id: "drill-init-02",
    type: "initials",
    title: "Retrofleks 'sh' vs Alveolo-palatal 'x'",
    phoneticFocus: "sh vs x",
    instruction: "Perhatikan gesekan desis lidah pada kata yang terdengar:",
    audioPrompt: "十",
    targetWord: {
      hanzi: "十",
      pinyin: "shí",
      translation: "sepuluh (angka 10)",
    },
    options: [
      {
        id: "opt-2a",
        hanzi: "西",
        pinyin: "xī",
        translation: "barat (arah mata angin)",
        isCorrect: false,
        audioText: "西",
      },
      {
        id: "opt-2b",
        hanzi: "十",
        pinyin: "shí",
        translation: "sepuluh (angka 10)",
        isCorrect: true,
        audioText: "十",
      },
    ],
    articulatoryTip: {
      title: "Mekanisme Artikulasi: sh vs x",
      mechanism:
        "Untuk 'sh', tekuk ujung lidah ke atas dan hembuskan udara dari sela langit-langit (bunyi tebal bervolume). Untuk 'x', biarkan ujung lidah menyentuh gigi bawah dan tekan badan lidah ke langit-langit keras (desis tajam nyaring).",
      indonesianComparison:
        "'sh' mirip 'sy' pada kata 'syarat' dengan lidah lebih dalam, sedangkan 'x' mirip desis 's' tajam bernada tinggi.",
    },
  },
  {
    id: "drill-init-03",
    type: "initials",
    title: "Aspirasi Bilabial: 'b' (Tanpa Hembusan) vs 'p' (Dengan Hembusan)",
    phoneticFocus: "b vs p",
    instruction: "Dengarkan tingkat hembusan angin dari kedua bibir pada audio:",
    audioPrompt: "怕",
    targetWord: {
      hanzi: "怕",
      pinyin: "pà",
      translation: "takut / khawatir",
    },
    options: [
      {
        id: "opt-3a",
        hanzi: "爸",
        pinyin: "bà",
        translation: "ayah",
        isCorrect: false,
        audioText: "爸",
      },
      {
        id: "opt-3b",
        hanzi: "怕",
        pinyin: "pà",
        translation: "takut / khawatir",
        isCorrect: true,
        audioText: "怕",
      },
    ],
    articulatoryTip: {
      title: "Mekanisme Aspirasi: b vs p",
      mechanism:
        "Dalam fonetik Mandarin, 'b' dan 'p' keduanya adalah konsonan tak bersuara (*voiceless*). Pembedanya adalah aspirasi: 'b' diucapkan tanpa hembusan udara lepas (*unaspirated*), sedangkan 'p' diucapkan dengan letupan hembusan angin kuat dari bibir (*aspirated*).",
      indonesianComparison:
        "Taro selembar kertas di depan bibir: saat melafalkan 'p', kertas harus terdorong tertiup; saat melafalkan 'b', kertas tidak boleh bergerak.",
    },
  },
  {
    id: "drill-init-04",
    type: "initials",
    title: "Aspirasi Alveolar: 'd' vs 't'",
    phoneticFocus: "d vs t",
    instruction: "Dengarkan perbedaan letupan nafas pada ujung lidah menyentuh gusi atas:",
    audioPrompt: "大",
    targetWord: {
      hanzi: "大",
      pinyin: "dà",
      translation: "besar",
    },
    options: [
      {
        id: "opt-4a",
        hanzi: "大",
        pinyin: "dà",
        translation: "besar",
        isCorrect: true,
        audioText: "大",
      },
      {
        id: "opt-4b",
        hanzi: "他",
        pinyin: "tā",
        translation: "dia (laki-laki)",
        isCorrect: false,
        audioText: "他",
      },
    ],
    articulatoryTip: {
      title: "Mekanisme Aspirasi: d vs t",
      mechanism:
        "Konsonan 'd' tidak mengeluarkan semburan nafas saat lidah lepas dari gusi atas. Sebaliknya, 't' melepaskan hembusan udara yang terasa kuat di telapak tangan.",
      indonesianComparison:
        "'d' Mandarin bersuara mirip huruf 't' lembut bahasa Indonesia tanpa letupan nafas tajam.",
    },
  },
  {
    id: "drill-init-05",
    type: "initials",
    title: "Dental Sibilan 'z' vs Retrofleks 'zh'",
    phoneticFocus: "z vs zh",
    instruction: "Perhatikan apakah lidah datar di belakang gigi seri atau tertekuk ke belakang:",
    audioPrompt: "在",
    targetWord: {
      hanzi: "在",
      pinyin: "zài",
      translation: "berada di / sedang",
    },
    options: [
      {
        id: "opt-5a",
        hanzi: "在",
        pinyin: "zài",
        translation: "berada di / sedang",
        isCorrect: true,
        audioText: "在",
      },
      {
        id: "opt-5b",
        hanzi: "站",
        pinyin: "zhàn",
        translation: "stasiun / berdiri",
        isCorrect: false,
        audioText: "站",
      },
    ],
    articulatoryTip: {
      title: "Mekanisme Posisi Lidah: z vs zh",
      mechanism:
        "'z' diartikulasikan dengan ujung lidah lurus menyentuh bagian belakang gigi seri atas (bunyi 'ts' datar). 'zh' mengharuskan ujung lidah ditarik mundur dan dinaikkan menyentuh langit-langit keras.",
      indonesianComparison:
        "Lafalkan 'z' seperti 'ds' pada kata 'tsunami', sedangkan 'zh' terasa lebih tebal dan teredam di rongga mulut bagian atas.",
    },
  },
];

export const TONE_DRILLS: TonePairDrill[] = [
  {
    id: "drill-tone-01",
    type: "tones",
    title: "Nada 2 (Naik 35) vs Nada 3 (Turun-Naik 214)",
    phoneticFocus: "mái (Nada 2) vs mǎi (Nada 3)",
    instruction: "Dengarkan kontur nada: apakah meluncur naik atau menukik ke dasar rongga tenggorokan?",
    audioPrompt: "买",
    targetWord: {
      hanzi: "买",
      pinyin: "mǎi",
      translation: "membeli",
      toneNumber: 3,
      contour: "214 (Turun Rendah ke Tinggi)",
    },
    options: [
      {
        id: "tone-opt-1a",
        hanzi: "埋",
        pinyin: "mái",
        translation: "mengubur / menimbun (Nada 2)",
        isCorrect: false,
        audioText: "埋",
      },
      {
        id: "tone-opt-1b",
        hanzi: "买",
        pinyin: "mǎi",
        translation: "membeli (Nada 3)",
        isCorrect: true,
        audioText: "买",
      },
    ],
    articulatoryTip: {
      title: "Kaidah Kontur: Nada 2 vs Nada 3",
      mechanism:
        "Nada 2 (阳平 - Yángpíng) dimulai dari skala tengah 3 dan langsung menanjak mantap ke skala puncak 5. Nada 3 (上声 - Shǎngshēng) jatuh ke titik terendah rongga vokal (skala 2 ke 1) sebelum ada sedikit liukan naik.",
      indonesianComparison:
        "Nada 2 terdengar seperti intonasi bertanya kaget ('Hah?'). Nada 3 terdengar seperti anggukan ragu bernada berat ('Hmm...').",
    },
  },
  {
    id: "drill-tone-02",
    type: "tones",
    title: "Nada 1 (Datar Tinggi 55) vs Nada 4 (Turun Cepat 51)",
    phoneticFocus: "bā (Nada 1) vs bà (Nada 4)",
    instruction: "Dengarkan apakah suara bertahan stabil tinggi atau tersentak turun secara tegas:",
    audioPrompt: "爸",
    targetWord: {
      hanzi: "爸",
      pinyin: "bà",
      translation: "ayah",
      toneNumber: 4,
      contour: "51 (Jatuh Tegas)",
    },
    options: [
      {
        id: "tone-opt-2a",
        hanzi: "八",
        pinyin: "bā",
        translation: "delapan / 8 (Nada 1)",
        isCorrect: false,
        audioText: "八",
      },
      {
        id: "tone-opt-2b",
        hanzi: "爸",
        pinyin: "bà",
        translation: "ayah (Nada 4)",
        isCorrect: true,
        audioText: "爸",
      },
    ],
    articulatoryTip: {
      title: "Kaidah Kontur: Nada 1 vs Nada 4",
      mechanism:
        "Nada 1 (阴平 - Yīnpíng) dijaga di register pitch 55 yang konstan, tidak boleh turun. Nada 4 (去声 - Qùshēng) melompat dari pitch 5 tertinggi dan jatuh cepat ke pitch 1 tanpa jeda lambat.",
      indonesianComparison:
        "Nada 1 seperti menyanyi nada panjang 'Laa~', sedangkan Nada 4 seperti perintah tegas menghentak: 'Stop!'.",
    },
  },
  {
    id: "drill-tone-03",
    type: "tones",
    title: "Diferensiasi Nada 2 vs Nada 3: '十' (shí) vs '使' (shǐ)",
    phoneticFocus: "shí (Nada 2) vs shǐ (Nada 3)",
    instruction: "Dengarkan apakah nada menanjak lurus atau menukik ke dasar vokal:",
    audioPrompt: "十",
    targetWord: {
      hanzi: "十",
      pinyin: "shí",
      translation: "sepuluh",
      toneNumber: 2,
      contour: "35 (Naik)",
    },
    options: [
      {
        id: "tone-opt-3a",
        hanzi: "十",
        pinyin: "shí",
        translation: "sepuluh (Nada 2)",
        isCorrect: true,
        audioText: "十",
      },
      {
        id: "tone-opt-3b",
        hanzi: "使",
        pinyin: "shǐ",
        translation: "menggunakan / membuat (Nada 3)",
        isCorrect: false,
        audioText: "使",
      },
    ],
    articulatoryTip: {
      title: "Kaidah Kontur: Penekanan Vokal shí",
      mechanism:
        "Dalam percakapan cepat, Nada 3 sering hanya diucapkan separuh rendah (low fall), sedangkan Nada 2 selalu memiliki kenaikan nada yang kentara.",
      indonesianComparison:
        "Pastikan pita suara terasa bergetar naik saat mengidentifikasi Nada 2.",
    },
  },
  {
    id: "drill-tone-04",
    type: "tones",
    title: "Diferensiasi Nada 3 vs Nada 4: '买' (mǎi) vs '卖' (mài)",
    phoneticFocus: "mǎi (Beli) vs mài (Jual)",
    instruction: "Pasangan nada paling vital dalam transaksi Mandarin: Beli (Nada 3) vs Jual (Nada 4):",
    audioPrompt: "卖",
    targetWord: {
      hanzi: "卖",
      pinyin: "mài",
      translation: "menjual",
      toneNumber: 4,
      contour: "51 (Turun)",
    },
    options: [
      {
        id: "tone-opt-4a",
        hanzi: "买",
        pinyin: "mǎi",
        translation: "membeli (Nada 3)",
        isCorrect: false,
        audioText: "买",
      },
      {
        id: "tone-opt-4b",
        hanzi: "卖",
        pinyin: "mài",
        translation: "menjual (Nada 4)",
        isCorrect: true,
        audioText: "卖",
      },
    ],
    articulatoryTip: {
      title: "Kaidah Kontur: mǎi vs mài",
      mechanism:
        "Membeli (买 mǎi) butuh jeda lebih lama pada vokal 'a' karena meliuk rendah. Menjual (卖 mài) diucapkan pendek, tajam, dan langsung jatuh ke nada bawah.",
      indonesianComparison:
        "Ingat mnemonik: 'mǎi' membeli dengan hati-hati (mengangguk perlahan), 'mài' menjual dengan tegas mematok harga!",
    },
  },
];

export const DICTATION_DRILLS: DictationDrill[] = [
  {
    id: "drill-dict-01",
    type: "dictation",
    title: "Diktasi Kalimat: Kata Kerja Keberadaan '在' (zài)",
    phoneticFocus: "zài vs jiā",
    instruction: "Dengarkan rekaman kalimat berikut, lalu pilih kata yang tepat untuk mengisi rumpang:",
    audioPrompt: "我不在学校，我在家。",
    displayCloze: "我不在学校，我 ___ 家。",
    fullSentence: {
      hanzi: "我不在学校，我在家。",
      pinyin: "Wǒ bù zài xuéxiào, wǒ zài jiā.",
      translation: "Saya tidak di sekolah, saya ada di rumah.",
    },
    options: [
      {
        id: "dict-opt-1a",
        hanzi: "在",
        pinyin: "zài",
        translation: "berada di / di",
        isCorrect: true,
        audioText: "在",
      },
      {
        id: "dict-opt-1b",
        hanzi: "是",
        pinyin: "shì",
        translation: "adalah",
        isCorrect: false,
        audioText: "是",
      },
      {
        id: "dict-opt-1c",
        hanzi: "去",
        pinyin: "qù",
        translation: "pergi",
        isCorrect: false,
        audioText: "去",
      },
    ],
    articulatoryTip: {
      title: "Sintaksis & Fonetik: 在 (zài)",
      mechanism:
        "Bunyi 'zài' dilafalkan dengan inisial dental 'z' (lidah pada gigi atas) diikuti diftong 'ai' dengan nada ke-4 jatuh tegas.",
      indonesianComparison:
        "Kaidah sintaksis: '在' (zài) diikuti kata tempat ('家' jiā = rumah) menandakan lokasi fisik keberadaan subjek.",
    },
  },
  {
    id: "drill-dict-02",
    type: "dictation",
    title: "Diktasi Kalimat: Keinginan '想' (xiǎng)",
    phoneticFocus: "xiǎng vs hē",
    instruction: "Dengarkan intonasi percakapan santun berikut:",
    audioPrompt: "我想喝茶，你呢？",
    displayCloze: "我 ___ 喝茶，你呢？",
    fullSentence: {
      hanzi: "我想喝茶，你呢？",
      pinyin: "Wǒ xiǎng hē chá, nǐ ne?",
      translation: "Saya ingin minum teh, kamu bagaimana?",
    },
    options: [
      {
        id: "dict-opt-2a",
        hanzi: "想",
        pinyin: "xiǎng",
        translation: "ingin / berkeinginan",
        isCorrect: true,
        audioText: "想",
      },
      {
        id: "dict-opt-2b",
        hanzi: "爱",
        pinyin: "ài",
        translation: "cinta / gemar",
        isCorrect: false,
        audioText: "爱",
      },
      {
        id: "dict-opt-2c",
        hanzi: "看",
        pinyin: "kàn",
        translation: "melihat / membaca",
        isCorrect: false,
        audioText: "看",
      },
    ],
    articulatoryTip: {
      title: "Aturan Sandhi Nada: 我想 (wǒ xiǎng)",
      mechanism:
        "Kedua kata '我' (wǒ) dan '想' (xiǎng) aslinya bertanda Nada 3. Sesuai aturan Sandhi Nada ke-3 Mandarin, kata pertama 'wǒ' otomatis berubah diucapkan menjadi Nada 2 (wó xiǎng).",
      indonesianComparison:
        "Kamu mendengar wó xiǎng meluncur naik-turun yang luwes, bukan dua nada patah terputus-putus.",
    },
  },
  {
    id: "drill-dict-03",
    type: "dictation",
    title: "Diktasi Kalimat: Pertanyaan Kalender Hari '星期' (xīngqī)",
    phoneticFocus: "xīngqījǐ",
    instruction: "Dengarkan pertanyaan waktu dan tentukan kata bilangan yang ditanyakan:",
    audioPrompt: "今天星期五。",
    displayCloze: "今天星期 ___ 。",
    fullSentence: {
      hanzi: "今天星期五。",
      pinyin: "Jīntiān xīngqīwǔ.",
      translation: "Hari ini adalah hari Jumat.",
    },
    options: [
      {
        id: "dict-opt-3a",
        hanzi: "四",
        pinyin: "sì",
        translation: "empat (Kamis)",
        isCorrect: false,
        audioText: "四",
      },
      {
        id: "dict-opt-3b",
        hanzi: "五",
        pinyin: "wǔ",
        translation: "lima (Jumat)",
        isCorrect: true,
        audioText: "五",
      },
      {
        id: "dict-opt-3c",
        hanzi: "六",
        pinyin: "liù",
        translation: "enam (Sabtu)",
        isCorrect: false,
        audioText: "六",
      },
    ],
    articulatoryTip: {
      title: "Sistem Hari dalam Bahasa Mandarin",
      mechanism:
        "Nama hari Senin sampai Sabtu dalam Mandarin dibentuk teratur dengan pola: 星期 (xīngqī) + Angka 1 s.d. 6. Jumat adalah hari ke-5 (星期五 - xīngqīwǔ).",
      indonesianComparison:
        "Nada pada '五' (wǔ) adalah Nada 3 meliuk rendah.",
    },
  },
];

export function getAllListeningDrills(): ListeningDrill[] {
  return [...INITIALS_DRILLS, ...TONE_DRILLS, ...DICTATION_DRILLS];
}
