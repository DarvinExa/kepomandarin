/**
 * scenarios.ts
 * Fondasi dataset dan logika untuk Modul 9.5: Conversation Scenarios (Skenario Percakapan Kontekstual).
 * Berfokus pada 4 situasi komunikasi nyata tingkat HSK 1:
 * 1. Sapaan Sopan & Perkenalan Diri di Kampus
 * 2. Memesan Minuman di Kedai Teh Tradisional
 * 3. Berbelanja Buah di Toko / Pasar
 * 4. Menanyakan Hari & Janji Temu Waktu
 */

export interface DialogueLine {
  id: string;
  speakerRole: "A" | "B";
  speakerName: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  audioText: string;
  isUserTurn?: boolean;
  userChoices?: {
    id: string;
    hanzi: string;
    pinyin: string;
    translation: string;
    isAppropriate: boolean;
    feedback: string;
  }[];
}

export interface ConversationScenario {
  id: string;
  title: string;
  subtitle: string;
  setting: string;
  contextGoal: string;
  culturalEtiquette: {
    title: string;
    description: string;
  };
  roleA: {
    name: string;
    title: string;
    color: string;
  };
  roleB: {
    name: string;
    title: string;
    color: string;
  };
  dialogue: DialogueLine[];
  keyVocabulary: {
    hanzi: string;
    pinyin: string;
    translation: string;
  }[];
}

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  {
    id: "sc-01",
    title: "Sapaan Sopan & Perkenalan Diri",
    subtitle: "Hari Pertama di Kampus Universitas",
    setting: "Di dalam ruang kelas sebelum kuliah dimulai",
    contextGoal: "Menyapa secara santun, memperkenalkan nama lengkap, dan menanyakan kewarganegaraan lawan bicara.",
    culturalEtiquette: {
      title: "Etika Menyapa dalam Budaya Tionghoa",
      description:
        "Sapaan '你好' (nǐ hǎo) adalah bentuk universal. Saat menanyakan nama seseorang secara formal, digunakan '你叫什么名字？' (nǐ jiào shénme míngzi). Jangan lupa membalas '很高兴认识你' (hěn gāoxìng rènshi nǐ - senang berkenalan denganmu) sebagai tanda keramahan.",
    },
    roleA: {
      name: "李老师 (Lǐ Lǎoshī)",
      title: "Dosen Pengajar",
      color: "border-accent-red text-accent-red",
    },
    roleB: {
      name: "大卫 (Dàwèi)",
      title: "Mahasiswa Baru (Peran Kamu)",
      color: "border-accent-blue text-accent-blue",
    },
    keyVocabulary: [
      { hanzi: "你好", pinyin: "nǐ hǎo", translation: "halo / apa kabar" },
      { hanzi: "名字", pinyin: "míngzi", translation: "nama" },
      { hanzi: "哪国人", pinyin: "nǎ guó rén", translation: "orang negara mana" },
      { hanzi: "高兴", pinyin: "gāoxìng", translation: "senang / gembira" },
    ],
    dialogue: [
      {
        id: "d1-1",
        speakerRole: "A",
        speakerName: "李老师",
        hanzi: "你好！欢迎来到中文班。",
        pinyin: "Nǐ hǎo! Huānyíng lái dào Zhōngwén bān.",
        translation: "Halo! Selamat datang di kelas bahasa Mandarin.",
        audioText: "你好！欢迎来到中文班。",
      },
      {
        id: "d1-2",
        speakerRole: "B",
        speakerName: "大卫 (Kamu)",
        hanzi: "老师好！我叫大卫。",
        pinyin: "Lǎoshī hǎo! Wǒ jiào Dàwèi.",
        translation: "Halo Guru! Nama saya David.",
        audioText: "老师好！我叫大卫。",
        isUserTurn: true,
        userChoices: [
          {
            id: "c1-a",
            hanzi: "老师好！我叫大卫。",
            pinyin: "Lǎoshī hǎo! Wǒ jiào Dàwèi.",
            translation: "Halo Guru! Nama saya David.",
            isAppropriate: true,
            feedback: "Sangat santun. Menyapa guru dengan sebutan '老师好' menunjukkan tata krama yang baik.",
          },
          {
            id: "c1-b",
            hanzi: "我不认识你。",
            pinyin: "Wǒ bù rènshi nǐ.",
            translation: "Saya tidak mengenalmu.",
            isAppropriate: false,
            feedback: "Kurang sopan dan terdengar dingin untuk situasi perkenalan kelas pertama.",
          },
        ],
      },
      {
        id: "d1-3",
        speakerRole: "A",
        speakerName: "李老师",
        hanzi: "大卫，你是哪国人？",
        pinyin: "Dàwèi, nǐ shì nǎ guó rén?",
        translation: "David, kamu berasal dari negara mana?",
        audioText: "大卫，你是哪国人？",
      },
      {
        id: "d1-4",
        speakerRole: "B",
        speakerName: "大卫 (Kamu)",
        hanzi: "我是美国人，也是学生。",
        pinyin: "Wǒ shì Měiguó rén, yě shì xuésheng.",
        translation: "Saya orang Amerika, dan juga seorang mahasiswa.",
        audioText: "我是美国人，也是学生。",
        isUserTurn: true,
        userChoices: [
          {
            id: "c1-c",
            hanzi: "我是美国人，也是学生。",
            pinyin: "Wǒ shì Měiguó rén, yě shì xuésheng.",
            translation: "Saya orang Amerika, dan juga seorang mahasiswa.",
            isAppropriate: true,
            feedback: "Tepat. Menggunakan pola '我是...人' untuk menyatakan kewarganegaraan.",
          },
          {
            id: "c1-d",
            hanzi: "他不是老师。",
            pinyin: "Tā bù shì lǎoshī.",
            translation: "Dia bukan guru.",
            isAppropriate: false,
            feedback: "Tidak menjawab pertanyaan guru mengenai kewarganegaraanmu.",
          },
        ],
      },
      {
        id: "d1-5",
        speakerRole: "A",
        speakerName: "李老师",
        hanzi: "很好，很高兴认识你！",
        pinyin: "Hěn hǎo, hěn gāoxìng rènshi nǐ!",
        translation: "Bagus sekali, sangat senang berkenalan denganmu!",
        audioText: "很好，很高兴认识你！",
      },
    ],
  },
  {
    id: "sc-02",
    title: "Memesan Minuman di Kedai Teh",
    subtitle: "Interaksi Pelanggan dan Pelayan Kedai",
    setting: "Di kedai teh tradisional (茶馆)",
    contextGoal: "Menyampaikan pesanan minuman secara santun, menggunakan kata penggolong wadah '杯', dan menanyakan harga.",
    culturalEtiquette: {
      title: "Budaya Minum Teh (茶文化)",
      description:
        "Memesan minuman menggunakan kata bantu bilangan wadah '一杯' (yì bēi - secangkir). Menggunakan kata '想' (xiǎng - ingin secara santun) lebih disukai daripada kata perintah langsung.",
    },
    roleA: {
      name: "服务员 (Fúwùyuán)",
      title: "Pelayan Kedai",
      color: "border-accent-red text-accent-red",
    },
    roleB: {
      name: "顾客 (Gùkè)",
      title: "Pelanggan (Peran Kamu)",
      color: "border-accent-blue text-accent-blue",
    },
    keyVocabulary: [
      { hanzi: "请坐", pinyin: "qǐng zuò", translation: "silakan duduk" },
      { hanzi: "想喝", pinyin: "xiǎng hē", translation: "ingin minum" },
      { hanzi: "一杯茶", pinyin: "yì bēi chá", translation: "secangkir teh" },
      { hanzi: "多少钱", pinyin: "duōshao qián", translation: "berapa harganya" },
      { hanzi: "块", pinyin: "kuài", translation: "satuan mata uang yuan" },
    ],
    dialogue: [
      {
        id: "d2-1",
        speakerRole: "A",
        speakerName: "服务员",
        hanzi: "下午好！请坐，你想喝什么？",
        pinyin: "Xiàwǔ hǎo! Qǐng zuò, nǐ xiǎng hē shénme?",
        translation: "Selamat sore! Silakan duduk, kamu ingin minum apa?",
        audioText: "下午好！请坐，你想喝什么？",
      },
      {
        id: "d2-2",
        speakerRole: "B",
        speakerName: "顾客 (Kamu)",
        hanzi: "你好！我想喝一杯中国茶。",
        pinyin: "Nǐ hǎo! Wǒ xiǎng hē yì bēi Zhōngguó chá.",
        translation: "Halo! Saya ingin minum secangkir teh Tiongkok.",
        audioText: "你好！我想喝一杯中国茶。",
        isUserTurn: true,
        userChoices: [
          {
            id: "c2-a",
            hanzi: "你好！我想喝一杯中国茶。",
            pinyin: "Nǐ hǎo! Wǒ xiǎng hē yì bēi Zhōngguó chá.",
            translation: "Halo! Saya ingin minum secangkir teh Tiongkok.",
            isAppropriate: true,
            feedback: "Sangat alami. Penggunaan penggolong '一杯' (yì bēi) tepat untuk minuman teh.",
          },
          {
            id: "c2-b",
            hanzi: "我不喝茶，我想睡觉。",
            pinyin: "Wǒ bù hē chá, wǒ xiǎng shuìjiào.",
            translation: "Saya tidak minum teh, saya mau tidur.",
            isAppropriate: false,
            feedback: "Tidak cocok diucapkan kepada pelayan di kedai teh.",
          },
        ],
      },
      {
        id: "d2-3",
        speakerRole: "A",
        speakerName: "服务员",
        hanzi: "好的，请稍等。这是你的茶。",
        pinyin: "Hǎo de, qǐng shāoděng. Zhè shì nǐ de chá.",
        translation: "Baik, mohon tunggu sebentar. Ini teh pesananmu.",
        audioText: "好的，请稍等。这是你的茶。",
      },
      {
        id: "d2-4",
        speakerRole: "B",
        speakerName: "顾客 (Kamu)",
        hanzi: "谢谢！请问这杯茶多少钱？",
        pinyin: "Xièxie! Qǐngwèn zhè bēi chá duōshao qián?",
        translation: "Terima kasih! Numpang tanya secangkir teh ini berapa harganya?",
        audioText: "谢谢！请问这杯茶多少钱？",
        isUserTurn: true,
        userChoices: [
          {
            id: "c2-c",
            hanzi: "谢谢！请问这杯茶多少钱？",
            pinyin: "Xièxie! Qǐngwèn zhè bēi chá duōshao qián?",
            translation: "Terima kasih! Numpang tanya secangkir teh ini berapa harganya?",
            isAppropriate: true,
            feedback: "Kata santun '请问' (qǐngwèn - numpang tanya) menunjukkan kehalusan bertutur.",
          },
          {
            id: "c2-d",
            hanzi: "太贵了，我不给钱。",
            pinyin: "Tài guì le, wǒ bù gěi qián.",
            translation: "Terlalu mahal, saya tidak mau bayar.",
            isAppropriate: false,
            feedback: "Kasar dan melanggar etika bertransaksi.",
          },
        ],
      },
      {
        id: "d2-5",
        speakerRole: "A",
        speakerName: "服务员",
        hanzi: "这杯茶十块钱。不客气！",
        pinyin: "Zhè bēi chá shí kuài qián. Bú kèqi!",
        translation: "Secangkir teh ini sepuluh yuan. Sama-sama!",
        audioText: "这杯茶十块钱。不客气！",
      },
    ],
  },
  {
    id: "sc-03",
    title: "Berbelanja Buah Apel di Toko",
    subtitle: "Transaksi Kuantitas & Negosiasi Sederhana",
    setting: "Di toko buah segar pinggir jalan",
    contextGoal: "Menanyakan ketersediaan buah, harga satuan, dan membeli kuantitas tertentu dengan kata penggolong '个'.",
    culturalEtiquette: {
      title: "Etika Jual Beli Tradisional",
      description:
        "Saat membeli buah, kuantitas dihitung dengan '几个' (jǐ ge). Mengucapkan '我要...' (wǒ yào... - saya mau...) adalah cara lugas dan wajar untuk menyatakan jumlah yang dibeli.",
    },
    roleA: {
      name: "店主 (Diànzhǔ)",
      title: "Pemilik Toko",
      color: "border-accent-red text-accent-red",
    },
    roleB: {
      name: "买家 (Mǎijiā)",
      title: "Pembeli (Peran Kamu)",
      color: "border-accent-blue text-accent-blue",
    },
    keyVocabulary: [
      { hanzi: "苹果", pinyin: "píngguǒ", translation: "buah apel" },
      { hanzi: "怎么卖", pinyin: "zěnme mài", translation: "bagaimana jualnya / berapa harga" },
      { hanzi: "三个", pinyin: "sān gè", translation: "tiga buah" },
      { hanzi: "一共", pinyin: "yígòng", translation: "total keseluruhan" },
    ],
    dialogue: [
      {
        id: "d3-1",
        speakerRole: "A",
        speakerName: "店主",
        hanzi: "你好！来看看，这里的苹果很大很新鲜。",
        pinyin: "Nǐ hǎo! Lái kànkan, zhèlǐ de píngguǒ hěn dà hěn xīnxian.",
        translation: "Halo! Mari lihat-lihat, apel di sini sangat besar dan segar.",
        audioText: "你好！来看看，这里的苹果很大很新鲜。",
      },
      {
        id: "d3-2",
        speakerRole: "B",
        speakerName: "买家 (Kamu)",
        hanzi: "你好！请问这苹果多少钱一个？",
        pinyin: "Nǐ hǎo! Qǐngwèn zhè píngguǒ duōshao qián yí gè?",
        translation: "Halo! Numpang tanya apel ini berapa harganya sebuah?",
        audioText: "你好！请问这苹果多少钱一个？",
        isUserTurn: true,
        userChoices: [
          {
            id: "c3-a",
            hanzi: "你好！请问这苹果多少钱一个？",
            pinyin: "Nǐ hǎo! Qǐngwèn zhè píngguǒ duōshao qián yí gè?",
            translation: "Halo! Numpang tanya apel ini berapa harganya sebuah?",
            isAppropriate: true,
            feedback: "Pertanyaan yang sangat wajar menanyakan harga satuan menggunakan '一个' (yí gè).",
          },
          {
            id: "c3-b",
            hanzi: "你的苹果不好吃。",
            pinyin: "Nǐ de píngguǒ bù hǎochī.",
            translation: "Apelmu tidak enak.",
            isAppropriate: false,
            feedback: "Tidak sopan menilai sebelum membeli.",
          },
        ],
      },
      {
        id: "d3-3",
        speakerRole: "A",
        speakerName: "店主",
        hanzi: "三块钱一个。你想买几个？",
        pinyin: "Sān kuài qián yí gè. Nǐ xiǎng mǎi jǐ ge?",
        translation: "Tiga yuan sebuah. Kamu ingin beli berapa buah?",
        audioText: "三块钱一个。你想买几个？",
      },
      {
        id: "d3-4",
        speakerRole: "B",
        speakerName: "买家 (Kamu)",
        hanzi: "我要三个苹果，一共多少钱？",
        pinyin: "Wǒ yào sān gè píngguǒ, yígòng duōshao qián?",
        translation: "Saya mau tiga buah apel, totalnya berapa uang?",
        audioText: "我要三个苹果，一共多少钱？",
        isUserTurn: true,
        userChoices: [
          {
            id: "c3-c",
            hanzi: "我要三个苹果，一共多少钱？",
            pinyin: "Wǒ yào sān gè píngguǒ, yígòng duōshao qián?",
            translation: "Saya mau tiga buah apel, totalnya berapa uang?",
            isAppropriate: true,
            feedback: "Tepat sekali. Menggunakan rumus: Angka (三) + Penggolong (个) + Benda (苹果).",
          },
          {
            id: "c3-d",
            hanzi: "我要买一本苹果。",
            pinyin: "Wǒ yào mǎi yì běn píngguǒ.",
            translation: "Saya mau beli sejilid apel.",
            isAppropriate: false,
            feedback: "Salah kata penggolong. '本' (běn) hanya untuk buku berjilid, bukan apel!",
          },
        ],
      },
      {
        id: "d3-5",
        speakerRole: "A",
        speakerName: "店主",
        hanzi: "一共九块钱。给你苹果，谢谢！",
        pinyin: "Yígòng jiǔ kuài qián. Gěi nǐ píngguǒ, xièxie!",
        translation: "Totalnya sembilan yuan. Ini apelmu, terima kasih!",
        audioText: "一共九块钱。给你苹果，谢谢！",
      },
    ],
  },
  {
    id: "sc-04",
    title: "Menanyakan Hari & Janji Temu",
    subtitle: "Koordinasi Waktu Bertemu dengan Sahabat",
    setting: "Percakapan telepon antar-teman sekelas",
    contextGoal: "Menanyakan hari kalender '星期几', menentukan jam pertemuan '点半', dan menyepakati lokasi.",
    culturalEtiquette: {
      title: "Konsep Waktu dalam Bahasa Mandarin",
      description:
        "Urutan waktu dalam Mandarin selalu bergerak dari unit besar ke kecil: Tanggal/Hari dulu, baru waktu jam (misal: '明天下午三点' - besok sore jam 3).",
    },
    roleA: {
      name: "王朋 (Wáng Péng)",
      title: "Teman Sekelas",
      color: "border-accent-red text-accent-red",
    },
    roleB: {
      name: "李友 (Lǐ Yǒu)",
      title: "Teman (Peran Kamu)",
      color: "border-accent-blue text-accent-blue",
    },
    keyVocabulary: [
      { hanzi: "今天", pinyin: "jīntiān", translation: "hari ini" },
      { hanzi: "星期几", pinyin: "xīngqījǐ", translation: "hari apa" },
      { hanzi: "明天见", pinyin: "míngtiān jiàn", translation: "sampai jumpa besok" },
      { hanzi: "三点半", pinyin: "sān diǎn bàn", translation: "jam setengah empat" },
    ],
    dialogue: [
      {
        id: "d4-1",
        speakerRole: "A",
        speakerName: "王朋",
        hanzi: "李友，今天星期几？你忙不忙？",
        pinyin: "Lǐ Yǒu, jīntiān xīngqījǐ? Nǐ máng bu máng?",
        translation: "Li You, hari ini hari apa? Kamu sibuk tidak?",
        audioText: "李友，今天星期几？你忙不忙？",
      },
      {
        id: "d4-2",
        speakerRole: "B",
        speakerName: "李友 (Kamu)",
        hanzi: "今天星期五，我不忙。怎么了？",
        pinyin: "Jīntiān xīngqīwǔ, wǒ bù máng. Zěnme le?",
        translation: "Hari ini hari Jumat, saya tidak sibuk. Ada apa?",
        audioText: "今天星期五，我不忙。怎么了？",
        isUserTurn: true,
        userChoices: [
          {
            id: "c4-a",
            hanzi: "今天星期五，我不忙。怎么了？",
            pinyin: "Jīntiān xīngqīwǔ, wǒ bù máng. Zěnme le?",
            translation: "Hari ini hari Jumat, saya tidak sibuk. Ada apa?",
            isAppropriate: true,
            feedback: "Sangat alami. Menjawab hari Jumat (星期五) dan menyatakan tidak sibuk.",
          },
          {
            id: "c4-b",
            hanzi: "我是老师，你在家吗？",
            pinyin: "Wǒ shì lǎoshī, nǐ zài jiā ma?",
            translation: "Saya guru, kamu di rumah?",
            isAppropriate: false,
            feedback: "Keliru konteks hubungan pertemanan.",
          },
        ],
      },
      {
        id: "d4-3",
        speakerRole: "A",
        speakerName: "王朋",
        hanzi: "明天下午我们一起去学校看书，好吗？几点见？",
        pinyin: "Míngtiān xiàwǔ wǒmen yìqǐ qù xuéxiào kàn shū, hǎo ma? Jǐ diǎn jiàn?",
        translation: "Besok sore kita pergi bersama ke sekolah membaca buku, mau? Jam berapa bertemu?",
        audioText: "明天下午我们一起去学校看书，好吗？几点见？",
      },
      {
        id: "d4-4",
        speakerRole: "B",
        speakerName: "李友 (Kamu)",
        hanzi: "太好了！明天下午三点半在学校见。",
        pinyin: "Tài hǎo le! Míngtiān xiàwǔ sān diǎn bàn zài xuéxiào jiàn.",
        translation: "Bagus sekali! Besok sore jam setengah empat bertemu di sekolah.",
        audioText: "太好了！明天下午三点半在学校见。",
        isUserTurn: true,
        userChoices: [
          {
            id: "c4-c",
            hanzi: "太好了！明天下午三点半在学校见。",
            pinyin: "Tài hǎo le! Míngtiān xiàwǔ sān diǎn bàn zài xuéxiào jiàn.",
            translation: "Bagus sekali! Besok sore jam setengah empat bertemu di sekolah.",
            isAppropriate: true,
            feedback: "Struktur waktu yang sempurna: Waktu besar (明天) + Waktu kecil (下午三点半) + Tempat (在学校) + Aksi (见).",
          },
          {
            id: "c4-d",
            hanzi: "我不去学校看苹果。",
            pinyin: "Wǒ bú qù xuéxiào kàn píngguǒ.",
            translation: "Saya tidak pergi ke sekolah melihat apel.",
            isAppropriate: false,
            feedback: "Kalimat tidak masuk akal dalam konteks janji temu belajar.",
          },
        ],
      },
      {
        id: "d4-5",
        speakerRole: "A",
        speakerName: "王朋",
        hanzi: "好的！明天见！",
        pinyin: "Hǎo de! Míngtiān jiàn!",
        translation: "Baiklah! Sampai jumpa besok!",
        audioText: "好的！明天见！",
      },
    ],
  },
];
