/**
 * Data Struktur Kurikulum HSK 4 (Pratinjau Draft // Roadmap)
 * Sesuai prinsip AGENTS.md:
 * - HSK 4 disiapkan sebagai struktur data terstandar bertanda draft/roadmap.
 * - Konten menyertakan Hanzi, Pinyin, dan terjemahan Bahasa Indonesia alami.
 * - Menjaga keselarasan arsitektur kurikulum bertahap.
 */

export interface Hsk4GrammarPoint {
  id: string;
  patternNumber: string;
  ruleTitle: string;
  formula: string;
  explanation: string;
  keyRule: string;
  specimenSentences: {
    hanzi: string;
    pinyin: string;
    translation: string;
    focusNote?: string;
  }[];
}

export interface Hsk4LessonDialogue {
  speaker: string;
  role: string;
  hanzi: string;
  pinyin: string;
  translation: string;
}

export interface Hsk4LessonBlueprint {
  id: string;
  slug: string;
  lessonNumber: number;
  title: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  objectives: string;
  overview: string;
  primaryGrammarId: string;
  vocabCount: number;
  estimatedMinutes: number;
  dialogueSpecimen: Hsk4LessonDialogue[];
  keyVocabPreview: {
    hanzi: string;
    pinyin: string;
    translation: string;
    tag: string;
  }[];
}

export interface Hsk4VocabWord {
  id: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  partOfSpeech: string;
  themeCategory: string;
  sampleSentence: {
    hanzi: string;
    pinyin: string;
    translation: string;
  };
}

export interface Hsk4ThemeCategory {
  id: string;
  title: string;
  description: string;
  wordsCount: number;
}

export const HSK4_METADATA = {
  levelCode: "HSK 4",
  title: "Tingkat Menengah II (Kurikulum Aktif)",
  status: "active" as const,
  badgeText: "KURIKULUM AKTIF",
  vocabTarget: 1200,
  newVocabTarget: 600,
  previousLevelVocab: 600,
  competencyDescription:
    "Mampu mendiskusikan berbagai topik sosial dan wacana konseptual, berargumentasi secara logis, serta memahami bacaan naratif dan penjelasan abstrak dalam konteks profesional maupun akademis.",
  cefrEquivalent: "CEFR B2",
  disclaimer:
    "Kurikulum HSK 4 aktif untuk pembelajaran mandiri terstruktur: mencakup silabus 5 unit pelajaran wacana, 6 matriks formula tata bahasa retoris, dan 600 taksonomi kosakata tematik yang dapat disimpan langsung ke Buku Frasa pribadi.",
};

export const HSK4_GRAMMAR_POINTS: Hsk4GrammarPoint[] = [
  {
    id: "hsk4-g01",
    patternNumber: "01",
    ruleTitle: "Kontras Tak Terduga: 反而 (Fǎn'ér)",
    formula: "Kondisi Awal / Harapan, (Subjek) + 反而 + Hasil Berlawanan",
    explanation:
      "Digunakan untuk menunjukkan bahwa kenyataan atau hasil yang terjadi justru bertolak belakang dari apa yang diprediksi atau di luar logika umum.",
    keyRule:
      "反而 sering dipadukan dengan kata penghubung konsesif seperti 不但没... (bukannya tidak...) atau 本来想... (awalnya ingin...) untuk mempertegas efek kejutan.",
    specimenSentences: [
      {
        hanzi: "吃了药以后，他的感冒不但没好，反而更严重了。",
        pinyin: "Chī le yào yǐhòu, tā de gǎnmào búdàn méi hǎo, fǎn'ér gèng yánzhòng le.",
        translation: "Setelah minum obat, flunya bukannya membaik, sebaliknya malah semakin parah.",
        focusNote: "Hasil berlawanan dengan ekspektasi khasiat obat.",
      },
      {
        hanzi: "大城市的生活虽然方便，但人们的压力反而更大了。",
        pinyin: "Dà chéngshì de shēnghuó suīrán fāngbiàn, dàn rénmen de yālì fǎn'ér gèng dà le.",
        translation: "Kehidupan di kota besar meskipun praktis, namun tekanan hidup orang-orang justru kian membesar.",
        focusNote: "Kontras antara fasilitas modern dan beban psikologis.",
      },
      {
        hanzi: "他听到这个消息不仅不生气，反而笑了。",
        pinyin: "Tā tīng dào zhè gè xiāoxi bùjǐn bú shēngqì, fǎn'ér xiào le.",
        translation: "Mendengar kabar ini dia tidak hanya tidak marah, melainkan malah tertawa.",
        focusNote: "Reaksi emosional yang berlawanan dengan dugaan umum.",
      },
    ],
  },
  {
    id: "hsk4-g02",
    patternNumber: "02",
    ruleTitle: "Penegasan Sebab-Akibat Kompleks: 之所以...是因为...",
    formula: "Subjek + 之所以 + Akibat / Fenomena, 是因为 + Alasan Pokok",
    explanation:
      "Struktur retorika untuk membalik urutan wacana: mengangkat akibat atau pencapaian terlebih dahulu demi menarik perhatian audiens, kemudian menegaskan alasan hakikinya.",
    keyRule:
      "Struktur ini setara dengan 'Alasan mengapa... adalah karena...'. Subjek biasanya diletakkan tepat sebelum 之所以.",
    specimenSentences: [
      {
        hanzi: "他之所以能取得成功，是因为他付出了常人难以想象的努力。",
        pinyin: "Tā zhī suǒyǐ néng qǔdé chénggōng, shì yīnwèi tā fùchū le chángrén nányǐ xiǎngxiàng de nǔlì.",
        translation: "Alasan mengapa dia bisa meraih kesuksesan adalah karena dia telah mencurahkan kerja keras yang sulit dibayangkan orang biasa.",
        focusNote: "Menekankan faktor dedikasi di balik kesuksesan.",
      },
      {
        hanzi: "我们之所以推迟会议，是因为需要等待最新的调研数据。",
        pinyin: "Wǒmen zhī suǒyǐ tuīchí huìyì, shì yīnwèi xūyào děngdài zuìxīn de diàoyán shùjù.",
        translation: "Alasan mengapa kami menunda rapat adalah karena perlu menunggu data riset terbaru.",
        focusNote: "Penjelasan rasional penundaan agenda kerja.",
      },
      {
        hanzi: "这款产品之所以受欢迎，是因为它的设计非常人性化。",
        pinyin: "Zhè kuǎn chǎnpǐn zhī suǒyǐ shòu huānyíng, shì yīnwèi tā de shèjì fēicháng rénxìnghuà.",
        translation: "Alasan mengapa produk ini sangat diminati adalah karena desainnya yang sangat memikirkan kenyamanan pengguna.",
        focusNote: "Penyebab keunggulan daya saing produk.",
      },
    ],
  },
  {
    id: "hsk4-g03",
    patternNumber: "03",
    ruleTitle: "Preposisi Sudut Pandang: 对于 (Duìyú) & 关于 (Guānyú)",
    formula: "对于 / 关于 + Isu / Ranah Bahasan, Subjek + Pandangan / Tindakan",
    explanation:
      "Digunakan untuk menarik suatu topik, entitas, atau permasalahan ke posisi topik utama di awal kalimat guna memberikan batasan ranah pembahasan.",
    keyRule:
      "对于 menekankan sudut pandang atau sikap terhadap suatu hal (setara 'bagi / terhadap'), sedangkan 关于 menekankan lingkup isi informasi (setara 'mengenai / perihal').",
    specimenSentences: [
      {
        hanzi: "对于初学者来说，掌握正确的声调至关重要。",
        pinyin: "Duìyú chūxuézhě lái shuō, zhǎngwò zhèngquè de shēngdiào zhìguān zhòngyào.",
        translation: "Bagi pemula, menguasai nada yang benar adalah hal yang teramat penting.",
        focusNote: "Sudut pandang spesifik: pemula bahasa.",
      },
      {
        hanzi: "关于明天的日程安排，秘书已经发到了大家的邮箱。",
        pinyin: "Guānyú míngtiān de rìchéng ānpái, mìshū yǐjīng fā dào le dàjiā de yóuxiāng.",
        translation: "Perihal susunan jadwal besok, sekretaris telah mengirimkannya ke kotak surel masing-masing.",
        focusNote: "Lingkup topik informasi: jadwal kerja.",
      },
      {
        hanzi: "对于这个问题，各位专家有着截然不同的看法。",
        pinyin: "Duìyú zhè gè wèntí, gè wèi zhuānjiā yǒu zhe jiérán bù tóng de kànfǎ.",
        translation: "Terhadap masalah ini, para pakar memiliki pandangan yang sangat berbeda.",
        focusNote: "Objek evaluasi pendapat akademis.",
      },
    ],
  },
  {
    id: "hsk4-g04",
    patternNumber: "04",
    ruleTitle: "Kalimat Tanya Retoris: 难道...吗？ (Nándào... Ma?)",
    formula: "难道 + Pernyataan Afirmasi / Negasi (+ 吗)？",
    explanation:
      "Bentuk tanya retoris yang tidak mengharapkan jawaban, melainkan digunakan untuk menegaskan kebenaran suatu opini, menyanggah keraguan, atau mengekspresikan ketidakpercayaan.",
    keyRule:
      "Jika pernyataan di dalam 难道 berupa bentuk negatif (难道不...?), maknanya menegaskan hal positif (tentu saja demikian).",
    specimenSentences: [
      {
        hanzi: "这么重要的事情，难道你忘了吗？",
        pinyin: "Zhème zhòngyào de shìqing, nándào nǐ wàng le ma?",
        translation: "Urusan sepenting ini, masakan kamu melupakannya?",
        focusNote: "Menegaskan bahwa lawan bicara seharusnya ingat.",
      },
      {
        hanzi: "难道我们不应该保护身边的自然环境吗？",
        pinyin: "Nándào wǒmen bù yīnggāi bǎohù shēnbiān de zìrán huánjìng ma?",
        translation: "Masakan kita tidak seharusnya menjaga kelestarian alam di sekitar kita?",
        focusNote: "Bentuk negatif (不应该) menegaskan keharusan positif (pasti harus menjaga).",
      },
      {
        hanzi: "难道你不知道遵守交通规则的重要性吗？",
        pinyin: "Nándào nǐ bù zhīdào zūnshǒu jiāotōng guīzé de zhòngyàoxìng ma?",
        translation: "Masakan kamu tidak mengetahui betapa pentingnya mematuhi tata tertib lalu lintas?",
        focusNote: "Teguran retoris terhadap kedisiplinan publik.",
      },
    ],
  },
  {
    id: "hsk4-g05",
    patternNumber: "05",
    ruleTitle: "Konsesi Mutlak Tanpa Syarat: 无论 / 不管...都...",
    formula: "无论 / 不管 + Kondisi Jamak / Kata Tanya, Subjek + 都 / 也 + Tindakan",
    explanation:
      "Menegaskan bahwa dalam kondisi apa pun, dalam situasi bagaimana pun, atau pilihan mana pun yang tersedia, hasil atau pendirian yang diambil tetap berlaku mutlak tanpa perkecualian.",
    keyRule:
      "Setelah 无论/不管 wajib menyertakan kata tanya (什么, 怎么, 哪里) atau pilihan alternatif (A 还是 B, 正 反), dan klausa utama wajib didampingi kata keterangan 都 atau 也.",
    specimenSentences: [
      {
        hanzi: "无论遇到多大的困难，我们都要坚持到底。",
        pinyin: "Wúlùn yù dào duō dà de kùnnan, wǒmen dōu yào jiānchí dào dǐ.",
        translation: "Bagaimanapun besarnya kesulitan yang dihadapi, kita harus tetap bertahan hingga akhir.",
        focusNote: "Kondisi berat tidak menggoyahkan tekad.",
      },
      {
        hanzi: "不管别人怎么看，他始终坚持走自己的路。",
        pinyin: "Bùguǎn biérén zěnme kàn, tā shǐzhōng jiānchí zǒu zìjǐ de lù.",
        translation: "Bagaimanapun pandangan orang lain, dia selalu teguh menempuh jalannya sendiri.",
        focusNote: "Kemandirian pendirian terhadap opini luar.",
      },
      {
        hanzi: "无论刮风还是下雨，早班公交车都会准时出发。",
        pinyin: "Wúlùn guāfēng háishì xià yǔ, zǎobān gōngjiāochē dōu huì zhǔnshí chūfā.",
        translation: "Baik berangin kencang maupun turun hujan, bus pagi selalu berangkat tepat waktu.",
        focusNote: "Komitmen ketepatan waktu layanan transportasi.",
      },
    ],
  },
  {
    id: "hsk4-g06",
    patternNumber: "06",
    ruleTitle: "Klarifikasi Fakta Sebenarnya: 其实 (Qíshí) & 究竟 (Jiūjìng)",
    formula: "Kesan Luar / Dugaan, 其实 + Fakta Hakiki / 究竟 + Pertanyaan Inti",
    explanation:
      "其实 digunakan untuk meluruskan kesalahpahaman atau mengungkap hakikat nyata yang berbeda dari tampakan luar. 究竟 dipakai untuk menggali kejelasan terdalam dalam kalimat tanya.",
    keyRule:
      "其实 dapat diletakkan di awal klausa atau setelah subjek. 究竟 hanya digunakan dalam kalimat yang memuat kata tanya.",
    specimenSentences: [
      {
        hanzi: "他表面上看起来很严肃，其实性格非常幽默随和。",
        pinyin: "Tā biǎomiàn shang kàn qǐlai hěn yánsù, qíshí xìnggé fēicháng yōumò suíhe.",
        translation: "Dari luar dia kelihatan sangat kaku/serius, sebenarnya sifatnya sangat humoris dan ramah bersahabat.",
        focusNote: "Mengoreksi kesan pertama terhadap kepribadian seseorang.",
      },
      {
        hanzi: "很多事情看似复杂，其实只要掌握了规律就很简单。",
        pinyin: "Hěn duō shìqing kàn sì fùzá, qíshí zhǐyào zhǎngwò le guīlǜ jiù hěn jiǎndān.",
        translation: "Banyak hal kelihatannya rumit, sebenarnya asalkan menguasai polanya akan sangat mudah.",
        focusNote: "Mengungkap simplisitas di balik kerumitan semu.",
      },
      {
        hanzi: "你究竟打算什么时候开始准备毕业论文？",
        pinyin: "Nǐ jiūjìng dǎsuàn shénme shíhou kāishǐ zhǔnbèi bìyè lùnwén?",
        translation: "Sebenarnya kapan kamu berencana mulai menyusun skripsi kelulusanmu?",
        focusNote: "Penegasan pertanyaan mendalam perihal kepastian waktu.",
      },
    ],
  },
];

export const HSK4_LESSON_BLUEPRINTS: Hsk4LessonBlueprint[] = [
  {
    id: "hsk4-lesson-16",
    slug: "16",
    lessonNumber: 16,
    title: "Percintaan, Komitmen & Pernikahan",
    hanzi: "爱情与婚姻",
    pinyin: "Àiqíng yǔ Hūnyīn",
    translation: "Memahami Saling Pengertian & Esensi Kebersamaan",
    objectives:
      "Mendiskusikan pandangan hidup berpasangan, menggunakan pola 其实 untuk meluruskan romantisme semu, dan memahami nilai kesetiaan jangka panjang.",
    overview:
      "Unit pembuka HSK 4 ini mengkaji kedewasaan emosional dalam hubungan. Pembelajar diajak merefleksikan bahwa cinta sejati bukan hanya ketertarikan sesaat melainkan kesediaan saling memaklumi.",
    primaryGrammarId: "hsk4-g06",
    vocabCount: 24,
    estimatedMinutes: 22,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Rekan Diskusi A",
        hanzi: "很多人以为浪漫就是送花和甜言蜜语，其实真正的爱情是在日常生活中互相支持。",
        pinyin: "Hěn duō rén yǐwéi làngmàn jiù shì sòng huā hé tiányánmìyǔ, qíshí zhēnzhèng de àiqíng shì zài rìcháng shēnghuó zhōng hùxiāng zhīchí.",
        translation: "Banyak orang mengira romansa itu hanya mengirim bunga dan kata-kata manis, sebenarnya cinta sejati adalah saling mendukung dalam keseharian.",
      },
      {
        speaker: "B",
        role: "Rekan Diskusi B",
        hanzi: "你说得太深刻了。婚姻不仅是两个人的结合，更是一种长久的责任与陪伴。",
        pinyin: "Nǐ shuō de tài shēnkè le. Hūnyīn bùjǐn shì liǎng gè rén de jiéhé, gèng shì yì zhǒng chángjiǔ de zérèn yǔ péibàn.",
        translation: "Perkataanmu sangat mendalam. Pernikahan bukan hanya penyatuan dua insan, melainkan sebuah tanggung jawab dan pendampingan jangka panjang.",
      },
      {
        speaker: "A",
        role: "Rekan Diskusi A",
        hanzi: "如果遇到性格上的分歧，两个人究竟应该如何沟通？",
        pinyin: "Rúguǒ yù dào xìnggé shang de fēnqí, liǎng gè rén jiūjìng yīnggāi rúhé gōutōng?",
        translation: "Jika menemui perbedaan karakter, bagaimana sebenarnya kedua pihak seharusnya berkomunikasi?",
      },
      {
        speaker: "B",
        role: "Rekan Diskusi B",
        hanzi: "最重要的是保持耐心，多站在对方的角度思考，包容彼此的缺点。",
        pinyin: "Zuì zhòngyào de shì bǎochí nàixīn, duō zhàn zài duìfāng de jiǎodù sīkǎo, bāoróng bǐcǐ de quēdiǎn.",
        translation: "Yang paling penting adalah menjaga kesabaran, sering memandang dari sudut pandang pasangan, dan memaklumi kekurangan masing-masing.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "其实", pinyin: "qíshí", translation: "sebenarnya", tag: "Keterangan" },
      { hanzi: "爱情", pinyin: "àiqíng", translation: "cinta asmara", tag: "Kata Benda" },
      { hanzi: "婚姻", pinyin: "hūnyīn", translation: "pernikahan", tag: "Kata Benda" },
      { hanzi: "沟通", pinyin: "gōutōng", translation: "berkomunikasi", tag: "Kata Kerja" },
      { hanzi: "缺点", pinyin: "quēdiǎn", translation: "kekurangan / kelemahan", tag: "Kata Benda" },
    ],
  },
  {
    id: "hsk4-lesson-17",
    slug: "17",
    lessonNumber: 17,
    title: "Dunia Kerja & Manajemen Stres",
    hanzi: "职场挑战与压力管理",
    pinyin: "Zhíchǎng Tiǎozhàn yǔ Yālì Guǎnlǐ",
    translation: "Mengelola Beban Kerja & Strategi Produktivitas",
    objectives:
      "Menganalisis faktor penyebab stres karir, menggunakan pola 之所以...是因为... untuk merumuskan akar permasalahan efisiensi, dan membagi prioritas kerja.",
    overview:
      "Unit kedua berfokus pada etos profesional tingkat lanjut: menyeimbangkan ritme kerja, mengatasi kejenuhan (*burnout*), dan berkomunikasi asertif dengan rekan tim.",
    primaryGrammarId: "hsk4-g02",
    vocabCount: 26,
    estimatedMinutes: 24,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Konsultan Karir",
        hanzi: "小王，你最近工作效率非常高。你之所以能按时完成所有项目，秘诀是什么？",
        pinyin: "Xiǎo Wáng, nǐ zuìjìn gōngzuò xiàolǜ fēicháng gāo. Nǐ zhī suǒyǐ néng ànshí wánchéng suǒyǒu xiàngmù, mìjué shì shénme?",
        translation: "Xiao Wang, akhir-akhir ini efisiensi kerjamu sangat tinggi. Alasan mengapa kamu bisa menyelesaikan semua proyek tepat waktu, apa rahasianya?",
      },
      {
        speaker: "B",
        role: "Karyawan Senior",
        hanzi: "我之所以能保持高效，是因为我每天早上先把最紧急重要的任务列出清单，逐一解决。",
        pinyin: "Wǒ zhī suǒyǐ néng bǎochí gāoxiào, shì yīnwèi wǒ měitiān zǎoshang xiān bǎ zuì jǐnjí zhòngyào de rènwù liè chū qīngdān, zhúyī jiějué.",
        translation: "Alasan mengapa saya bisa menjaga efisiensi tinggi adalah karena setiap pagi saya menyusun daftar tugas paling mendesak dan menyelesaikannya satu demi satu.",
      },
      {
        speaker: "A",
        role: "Konsultan Karir",
        hanzi: "很多年轻人面对加班经常抱怨，反而忽视了提升核心技能的机会。",
        pinyin: "Hěn duō niánqīngrén miànduì jiābān jīngcháng bàoyuàn, fǎn'ér hūshì le tíshēng héxīn jìnéng de jīhuì.",
        translation: "Banyak pemuda menghadapi lembur sering mengeluh, sebaliknya malah mengabaikan peluang mengasah keahlian inti.",
      },
      {
        speaker: "B",
        role: "Karyawan Senior",
        hanzi: "确实如此。合理调节心理压力，把挑战当作锻炼，才能走得更远。",
        pinyin: "Quèshí rúcǐ. Hélǐ tiáojié xīnlǐ yālì, bǎ tiǎozhàn dàngzuò duànliàn, cái néng zǒu de gèng yuǎn.",
        translation: "Memang sungguh demikian. Menata tekanan mental secara proporsional dan menganggap tantangan sebagai latihan barulah bisa melangkah lebih jauh.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "之所以", pinyin: "zhī suǒyǐ", translation: "alasan mengapa", tag: "Konjungsi" },
      { hanzi: "压力", pinyin: "yālì", translation: "tekanan / beban mental", tag: "Kata Benda" },
      { hanzi: "任务", pinyin: "rènwù", translation: "tugas / misi", tag: "Kata Benda" },
      { hanzi: "抱怨", pinyin: "bàoyuàn", translation: "mengeluh / menggerutu", tag: "Kata Kerja" },
      { hanzi: "效率", pinyin: "xiàolǜ", translation: "efisiensi", tag: "Kata Benda" },
    ],
  },
  {
    id: "hsk4-lesson-18",
    slug: "18",
    lessonNumber: 18,
    title: "Kebiasaan Konsumsi & Finansial Cerdas",
    hanzi: "理性消费与理财观念",
    pinyin: "Lǐxìng Xiāofèi yǔ Lǐcái Guānniàn",
    translation: "Kebijakan Anggaran, Kualitas Barang & Belanja Rasional",
    objectives:
      "Mengevaluasi keputusan belanja diskon, menggunakan preposisi 对于 untuk menimbang kegunaan barang, dan pola 反而 untuk fenomena pemborosan.",
    overview:
      "Unit ketiga membahas literasi finansial pribadi: membedakan antara kebutuhan primer (*need*) dan keinginan impulsif (*want*), serta investasi pengetahuan.",
    primaryGrammarId: "hsk4-g01",
    vocabCount: 25,
    estimatedMinutes: 22,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Pembelanja Bijak",
        hanzi: "对于大商场的打折促销活动，你是怎么看的？",
        pinyin: "Duìyú dà shāngchǎng de dǎzhé cùxiāo huódòng, nǐ shì zěnme kàn de?",
        translation: "Mengenai promo diskon obral di pusat perbelanjaan besar, bagaimana pandanganmu?",
      },
      {
        speaker: "B",
        role: "Rekan Konsumen",
        hanzi: "有些人为了贪图便宜买了一堆用不上的东西，结果不但没省钱，反而造成了浪费。",
        pinyin: "Yǒu xiē rén wèile tāntú piányi mǎi le yì duī yòng bu shàng de dōngxi, jiéguǒ búdàn méi shěngqián, fǎn'ér zàochéng le làngfèi.",
        translation: "Sebagian orang demi mengejar harga murah membeli setumpuk barang tak berguna, akibatnya bukannya hemat uang, sebaliknya malah memicu pemborosan.",
      },
      {
        speaker: "A",
        role: "Pembelanja Bijak",
        hanzi: "非常赞同！买东西关键看品质与实际需要，不能只看广告宣传。",
        pinyin: "Fēicháng zàntóng! Mǎi dōngxi guānjiàn kàn pǐnzhì yǔ shíjì xūyào, bù néng zhǐ kàn guǎnggào xuānchuán.",
        translation: "Sangat setuju! Membeli barang kuncinya melihat kualitas dan kebutuhan nyata, tidak boleh hanya terpaku pada promosi iklan.",
      },
      {
        speaker: "B",
        role: "Rekan Konsumen",
        hanzi: "养成定期储蓄的习惯，把钱花在学习和自我投资上，才是长远之计。",
        pinyin: "Yǎngchéng dìngqī chǔxù de xíguàn, bǎ qián huā zài xuéxí hé zìwǒ tóuzī shang, cái shì chángyuǎn zhī jì.",
        translation: "Membiasakan menabung secara berkala dan membelanjakan uang untuk belajar serta investasi diri barulah strategi jangka panjang yang tepat.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "对于", pinyin: "duìyú", translation: "terhadap / mengenai", tag: "Preposisi" },
      { hanzi: "反而", pinyin: "fǎn'ér", translation: "sebaliknya / malah", tag: "Konjungsi" },
      { hanzi: "打折", pinyin: "dǎzhé", translation: "memberi diskon", tag: "Kata Kerja" },
      { hanzi: "浪费", pinyin: "làngfèi", translation: "membuang-buang / boros", tag: "Kata Kerja" },
      { hanzi: "投资", pinyin: "tóuzī", translation: "berinvestasi / investasi", tag: "Kata Kerja" },
    ],
  },
  {
    id: "hsk4-lesson-19",
    slug: "19",
    lessonNumber: 19,
    title: "Seni Komunikasi & Hubungan Sosial",
    hanzi: "人际交往与沟通艺术",
    pinyin: "Rénjì Jiāowǎng yǔ Gōutōng Yìshù",
    translation: "Mendengarkan Empatis, Humor & Menjaga Hubungan",
    objectives:
      "Menggunakan pertanyaan retoris 难道...吗？ untuk menegaskan etika pergaulan, memahami kekuatan pujian tulus, dan cara menolak permintaan secara santun.",
    overview:
      "Unit keempat melatih pembelajar bergaul dalam lingkungan majemuk. Belajar menghindari perdebatan tidak perlu dan mengapresiasi keunikan karakter orang lain.",
    primaryGrammarId: "hsk4-g04",
    vocabCount: 25,
    estimatedMinutes: 22,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Pengamat Sosial",
        hanzi: "在与人相处时，懂得真诚倾听往往比能言善辩更加重要。",
        pinyin: "Zài yǔ rén xiāngchǔ shí, dǒngde zhēnchéng qīngtīng wǎngwǎng bǐ néng yán shàn biàn gèngjiā zhòngyào.",
        translation: "Saat berinteraksi dengan sesama, pandai mendengarkan secara tulus sering kali jauh lebih berharga daripada piawai berdebat lihai.",
      },
      {
        speaker: "B",
        role: "Sahabat Diskusi",
        hanzi: "难道多替别人着想不是建立深厚友谊的基石吗？",
        pinyin: "Nándào duō tì biérén zhuóxiǎng bú shì jiànlì shēnhòu yǒuyì de jīshí ma?",
        translation: "Masakan banyak berempati bagi orang lain bukanlah batu fondasi dalam membangun persahabatan yang kokoh?",
      },
      {
        speaker: "A",
        role: "Pengamat Sosial",
        hanzi: "一点没错。适当的幽默感能迅速消除陌生人之间的尴尬与距离感。",
        pinyin: "Yì diǎn méi cuò. Shìdàng de yōumògǎn néng xùnsù xiāochú mòshēngrén zhījiān de gāngà yǔ jùlígǎn.",
        translation: "Sama sekali tidak keliru. Selera humor yang pantas dapat seketika mencairkan kecanggungan dan jarak di antara orang yang baru kenal.",
      },
      {
        speaker: "B",
        role: "Sahabat Diskusi",
        hanzi: "学会尊重不同的观点，即使看法不一致，也能成为志同道合的知己。",
        pinyin: "Xuéhuì zūnzhòng bù tóng de guāndiǎn, jíshǐ kànfǎ bù yízhì, yě néng chéngwéi zhìtóngdàohé de zhījǐ.",
        translation: "Belajar menghormati sudut pandang yang berbeda, sekalipun pendapat tidak sejalan, tetap dapat menjadi sahabat karib yang saling mengerti.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "难道", pinyin: "nándào", translation: "masakan / apakah mungkin (retoris)", tag: "Keterangan" },
      { hanzi: "友谊", pinyin: "yǒuyì", translation: "persahabatan", tag: "Kata Benda" },
      { hanzi: "幽默", pinyin: "yōumò", translation: "humoris / jenaka", tag: "Kata Sifat" },
      { hanzi: "尊重", pinyin: "zūnzhòng", translation: "menghormati / menghargai", tag: "Kata Kerja" },
      { hanzi: "交流", pinyin: "jiāoliú", translation: "berinteraksi / bertukar pikiran", tag: "Kata Kerja" },
    ],
  },
  {
    id: "hsk4-lesson-20",
    slug: "20",
    lessonNumber: 20,
    title: "Sikap Hidup & Filosofi Kebahagiaan",
    hanzi: "生活态度与幸福哲学",
    pinyin: "Shēnghuó Tàidù yǔ Xìngfú Zhéxué",
    translation: "Keteguhan Mental, Optimisme & Definisi Sukses",
    objectives:
      "Menggunakan pola konsesi mutlak 无论...都... untuk menegaskan integritas pendirian hidup, menyikapi kegagalan sebagai proses belajar, dan mensyukuri hidup.",
    overview:
      "Unit penutup HSK 4 ini merangkum seluruh fondasi wacana konseptual: membahas filosofi kebahagiaan batin yang tidak semata diukur dari materi melainkan kedamaian pikiran.",
    primaryGrammarId: "hsk4-g05",
    vocabCount: 26,
    estimatedMinutes: 24,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Mentor Kehidupan",
        hanzi: "在这个快节奏的时代，你觉得一个人怎样才能真正获得内心的幸福？",
        pinyin: "Zài zhè gè kuài jièzòu de shídài, nǐ juéde yí gè rén zěnyàng cái néng zhēnzhèng huòdé nèixīn de xìngfú?",
        translation: "Di era yang serba cepat ini, menurutmu bagaimana seseorang barulah bisa benar-benar memperoleh kebahagiaan batin?",
      },
      {
        speaker: "B",
        role: "Pembelajar Filosofis",
        hanzi: "无论外界环境发生什么变化，我们都要保持平和积极的心态，珍惜当下的每一刻。",
        pinyin: "Wúlùn wàijiè huánjìng fāshēng shénme biànhuà, wǒmen dōu yào bǎochí pínghé jījí de xīntài, zhēnxī dāngxià de měi yí kè.",
        translation: "Bagaimanapun perubahan yang terjadi di lingkungan luar, kita harus tetap memelihara sikap mental yang damai dan positif, serta mensyukuri setiap detik saat ini.",
      },
      {
        speaker: "A",
        role: "Mentor Kehidupan",
        hanzi: "说得非常好。人生难免遭遇挫折，关键是把失败当作前进的台阶。",
        pinyin: "Shuō de fēicháng hǎo. Rénshēng nánmiǎn zāoyù cuòzhé, guānjiàn shì bǎ shībài dàngzuò qiánjìn de táijiē.",
        translation: "Uraianmu sangat bagus. Dalam hidup tak terelakkan menemui kegagalan, kuncinya adalah memperlakukan kegagalan sebagai anak tangga menuju kemajuan.",
      },
      {
        speaker: "B",
        role: "Pembelajar Filosofis",
        hanzi: "是的，只要心中有明确的目标与热爱，生活就会充满阳光与希望。",
        pinyin: "Shì de, zhǐyào xīnzhōng yǒu míngquè de mùbiāo yǔ rè'ài, shēnghuó jiù huì chōngmǎn yángguāng yǔ xīwàng.",
        translation: "Benar sekali, asalkan di dalam hati memiliki tujuan jelas dan rasa cinta pada apa yang ditekuni, kehidupan akan dipenuhi sinar mentari dan harapan.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "无论", pinyin: "wúlùn", translation: "bagaimanapun / tak peduli", tag: "Konjungsi" },
      { hanzi: "积极", pinyin: "jījí", translation: "positif / proaktif", tag: "Kata Sifat" },
      { hanzi: "珍惜", pinyin: "zhēnxī", translation: "menghargai / mensyukuri", tag: "Kata Kerja" },
      { hanzi: "挫折", pinyin: "cuòzhé", translation: "kemunduran / kegagalan", tag: "Kata Benda" },
      { hanzi: "阳光", pinyin: "yángguāng", translation: "sinar mentari / ceria cerah", tag: "Kata Benda" },
    ],
  },
];

export const HSK4_THEME_CATEGORIES: Hsk4ThemeCategory[] = [
  {
    id: "cat-emotions-relations",
    title: "Emosi & Hubungan Manusia",
    description: "Percintaan, pernikahan, persahabatan, dan dinamika kehangatan emosi.",
    wordsCount: 120,
  },
  {
    id: "cat-career-development",
    title: "Karir & Pengembangan Diri",
    description: "Produktivitas kantor, kepemimpinan, evaluasi kerja, dan keahlian.",
    wordsCount: 120,
  },
  {
    id: "cat-finance-consumption",
    title: "Ekonomi & Belanja Rasional",
    description: "Finansial, transaksi perbankan, strategi investasi, dan gaya hidup hemat.",
    wordsCount: 120,
  },
  {
    id: "cat-society-communication",
    title: "Etika Sosial & Bahasa",
    description: "Kecerdasan interaksi sosial, diplomasi bahasa, kesantunan, dan empati.",
    wordsCount: 120,
  },
  {
    id: "cat-philosophy-life",
    title: "Filosofi Hidup & Kesejahteraan",
    description: "Resiliensi mental, sudut pandang kesuksesan, dan makna kebahagiaan sejati.",
    wordsCount: 120,
  },
];

export const HSK4_VOCABULARY_PREVIEWS: Hsk4VocabWord[] = [
  // 1. Emosi & Hubungan Manusia
  {
    id: "hsk4-v001",
    hanzi: "爱情",
    pinyin: "àiqíng",
    translation: "cinta asmara",
    partOfSpeech: "Kata Benda",
    themeCategory: "Emosi & Hubungan Manusia",
    sampleSentence: {
      hanzi: "他们俩的爱情经受住了时间的严峻考验。",
      pinyin: "Tāmen liǎ de àiqíng jīngshòu zhù le shíjiān de yánjùn kǎoyàn.",
      translation: "Cinta mereka berdua telah teruji kokoh oleh kerasnya tempaan waktu.",
    },
  },
  {
    id: "hsk4-v002",
    hanzi: "婚姻",
    pinyin: "hūnyīn",
    translation: "pernikahan",
    partOfSpeech: "Kata Benda",
    themeCategory: "Emosi & Hubungan Manusia",
    sampleSentence: {
      hanzi: "幸福的婚姻需要双方共同用心经营。",
      pinyin: "Xìngfú de hūnyīn xūyào shuāngfāng gòngtóng yòngxīn jīngyíng.",
      translation: "Pernikahan yang bahagia menuntut kedua belah pihak bersama-sama tulus merawatnya.",
    },
  },
  {
    id: "hsk4-v003",
    hanzi: "沟通",
    pinyin: "gōutōng",
    translation: "berkomunikasi / komunikasi",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Emosi & Hubungan Manusia",
    sampleSentence: {
      hanzi: "良好的沟通是化解彼此误会的最好桥梁。",
      pinyin: "Liánghǎo de gōutōng shì huàjiě bǐcǐ wùhuì de zuì hǎo qiáoliáng.",
      translation: "Komunikasi yang baik adalah jembatan terbaik untuk meredakan kesalahpahaman antarsesama.",
    },
  },
  {
    id: "hsk4-v004",
    hanzi: "缺点",
    pinyin: "quēdiǎn",
    translation: "kekurangan / titik lemah",
    partOfSpeech: "Kata Benda",
    themeCategory: "Emosi & Hubungan Manusia",
    sampleSentence: {
      hanzi: "每个人都有缺点，关键在于能否正视并加以改正。",
      pinyin: "Měi gè rén dōu yǒu quēdiǎn, guānjiàn zàiyú néng fǒu zhèngshì bìng jiāyǐ gǎizhèng.",
      translation: "Setiap orang memiliki kekurangan, kuncinya terletak pada kemampuan mengakui dan memperbaikinya.",
    },
  },
  {
    id: "hsk4-v005",
    hanzi: "感动",
    pinyin: "gǎndòng",
    translation: "tersentuh / mengharukan",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Emosi & Hubungan Manusia",
    sampleSentence: {
      hanzi: "朋友们的真诚祝福深深感动了我。",
      pinyin: "Péngyou men de zhēnchéng zhùfú shēnshēn gǎndòng le wǒ.",
      translation: "Untaian doa tulus dari para sahabat sungguh sangat menyentuh hatiku.",
    },
  },

  // 2. Karir & Pengembangan Diri
  {
    id: "hsk4-v006",
    hanzi: "任务",
    pinyin: "rènwù",
    translation: "tugas / amanah",
    partOfSpeech: "Kata Benda",
    themeCategory: "Karir & Pengembangan Diri",
    sampleSentence: {
      hanzi: "团队齐心协力提前完成了本阶段的攻关任务。",
      pinyin: "Tuánduì qíxīn xiélì tíqián wánchéng le běn jiēduàn de gōngguān rènwù.",
      translation: "Tim bahu-membahu menuntaskan tugas krusial tahap ini lebih awal dari jadwal.",
    },
  },
  {
    id: "hsk4-v007",
    hanzi: "压力",
    pinyin: "yālì",
    translation: "tekanan mental / beban",
    partOfSpeech: "Kata Benda",
    themeCategory: "Karir & Pengembangan Diri",
    sampleSentence: {
      hanzi: "适度的压力能够转化为激发潜能的强大动力。",
      pinyin: "Shìdù de yālì nénggòu zhuǎnhuà wéi jīfā qiánnéng de qiángdà dònglì.",
      translation: "Tekanan yang proporsional dapat bertransformasi menjadi daya dorong dahsyat untuk menggali potensi terpendam.",
    },
  },
  {
    id: "hsk4-v008",
    hanzi: "效率",
    pinyin: "xiàolǜ",
    translation: "efisiensi",
    partOfSpeech: "Kata Benda",
    themeCategory: "Karir & Pengembangan Diri",
    sampleSentence: {
      hanzi: "熟练运用现代办公软件能大幅提升工作效率。",
      pinyin: "Shúliàn yùnyòng xiàndài bàngōng ruǎnjiàn néng dà fú tíshēng gōngzuò xiàolǜ.",
      translation: "Kemahiran mengoperasikan peranti lunak perkantoran modern sanggup mendongkrak efisiensi kerja secara masif.",
    },
  },
  {
    id: "hsk4-v009",
    hanzi: "抱怨",
    pinyin: "bàoyuàn",
    translation: "mengeluh / meratap",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Karir & Pengembangan Diri",
    sampleSentence: {
      hanzi: "与其一味抱怨环境不顺，不如脚踏实地改变自己。",
      pinyin: "Yǔqí yíwèi bàoyuàn huánjìng bú shùn, bùrú jiǎotàshídì gǎibiàn zìjǐ.",
      translation: "Daripada melulu mengeluhkan kondisi sekitar yang serba salah, lebih baik berpijak pada realitas dan membenahi diri sendiri.",
    },
  },
  {
    id: "hsk4-v010",
    hanzi: "总结",
    pinyin: "zǒngjié",
    translation: "menyimpulkan / rekapitulasi evaluasi",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Karir & Pengembangan Diri",
    sampleSentence: {
      hanzi: "每次活动结束后，我们都会召开会议总结经验教训。",
      pinyin: "Měi cì huódòng jiéshù hòu, wǒmen dōu huì zhàokāi huìyì zǒngjié jīngyàn jiàoxùn.",
      translation: "Setiap kali kegiatan rampung, kami selalu mengadakan rapat untuk merekapitulasi pelajaran berharga.",
    },
  },

  // 3. Ekonomi & Belanja Rasional
  {
    id: "hsk4-v011",
    hanzi: "打折",
    pinyin: "dǎzhé",
    translation: "diskon / potongan harga",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Ekonomi & Belanja Rasional",
    sampleSentence: {
      hanzi: "商场换季时，许多优质服装都会打折销售。",
      pinyin: "Shāngchǎng huànjì shí, xǔduō yōuzhì fúzhuāng dōu huì dǎzhé xiāoshòu.",
      translation: "Saat mal berganti musim, banyak busana bermutu tinggi dijual dengan potongan harga.",
    },
  },
  {
    id: "hsk4-v012",
    hanzi: "浪费",
    pinyin: "làngfèi",
    translation: "memboroskan / menyia-nyiakan",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Ekonomi & Belanja Rasional",
    sampleSentence: {
      hanzi: "随手关灯节约用电，切勿造成不必要的能源浪费。",
      pinyin: "Suíshǒu guān dēng jiéyuē yòng diàn, qièwù zàochéng bú bìyào de néngyuán làngfèi.",
      translation: "Segera padamkan lampu untuk hemat listrik, jangan sampai menimbulkan pemborosan energi yang tak perlu.",
    },
  },
  {
    id: "hsk4-v013",
    hanzi: "投资",
    pinyin: "tóuzī",
    translation: "berinvestasi / modal investasi",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Ekonomi & Belanja Rasional",
    sampleSentence: {
      hanzi: "给大脑充电、坚持阅读，是回报率最高的长期投资。",
      pinyin: "Gěi dànǎo chōngdiàn, jiānchí yuèdú, shì huíbàolǜ zuì gāo de chángqī tóuzī.",
      translation: "Mengisi asupan pikiran dan tekun membaca adalah investasi jangka panjang dengan tingkat imbal hasil tertinggi.",
    },
  },
  {
    id: "hsk4-v014",
    hanzi: "考虑",
    pinyin: "kǎolǜ",
    translation: "mempertimbangkan / mengkaji matang",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Ekonomi & Belanja Rasional",
    sampleSentence: {
      hanzi: "在签署商业合同之前，必须把所有潜在风险考虑周全。",
      pinyin: "Zài qiānshǔ shāngyè hétong zhīqián, bìxū bǎ suǒyǒu qiánzài fēngxiǎn kǎolǜ zhōuquán.",
      translation: "Sebelum menandatangani akad bisnis, wajib mempertimbangkan segala potensi risiko dengan saksama.",
    },
  },

  // 4. Etika Sosial & Bahasa
  {
    id: "hsk4-v015",
    hanzi: "友谊",
    pinyin: "yǒuyì",
    translation: "persahabatan",
    partOfSpeech: "Kata Benda",
    themeCategory: "Etika Sosial & Bahasa",
    sampleSentence: {
      hanzi: "真挚的友谊如同陈年佳酿，历久弥新。",
      pinyin: "Zhēnzhì de yǒuyì rútóng chénnián jiāniàng, lìjiǔmíxīn.",
      translation: "Persahabatan yang tulus bagaikan anggur tua berkualitas, kian lama kian terasa keindahannya.",
    },
  },
  {
    id: "hsk4-v016",
    hanzi: "幽默",
    pinyin: "yōumò",
    translation: "humoris / jenaka santun",
    partOfSpeech: "Kata Sifat",
    themeCategory: "Etika Sosial & Bahasa",
    sampleSentence: {
      hanzi: "一位幽默的演讲者总能牢牢抓住观众的注意力。",
      pinyin: "Yí wèi yōumò de yǎnjiǎngzhě zǒng néng láoláo zhuā zhù guānzhòng de zhùyìlì.",
      translation: "Seorang orator yang jenaka selalu sanggup mencuri perhatian para audiens dengan memukau.",
    },
  },
  {
    id: "hsk4-v017",
    hanzi: "尊重",
    pinyin: "zūnzhòng",
    translation: "menghormati / menghargai martabat",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Etika Sosial & Bahasa",
    sampleSentence: {
      hanzi: "尊重他人的劳动成果是社会文明进步的基本体现。",
      pinyin: "Zūnzhòng tārén de láodòng chéngguǒ shì shèhuì wénmíng jìnbù de jīběn tǐxiàn.",
      translation: "Menghormati jerih payah keringat orang lain merupakan cerminan pokok dari kemajuan peradaban sosial.",
    },
  },
  {
    id: "hsk4-v018",
    hanzi: "交流",
    pinyin: "jiāoliú",
    translation: "berinteraksi / pertukaran budaya",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Etika Sosial & Bahasa",
    sampleSentence: {
      hanzi: "文化交流不仅增进相互理解，更促进了世界和平。",
      pinyin: "Wénhuà jiāoliú bùjǐn zēngjìn xiānghù lǐjiě, gèng cùjìn le shìjiè hépíng.",
      translation: "Pertukaran kebudayaan bukan hanya mempererat saling pengertian, melainkan juga memajukan perdamaian dunia.",
    },
  },

  // 5. Filosofi Hidup & Kesejahteraan
  {
    id: "hsk4-v019",
    hanzi: "积极",
    pinyin: "jījí",
    translation: "positif / proaktif bersemangat",
    partOfSpeech: "Kata Sifat",
    themeCategory: "Filosofi Hidup & Kesejahteraan",
    sampleSentence: {
      hanzi: "怀着积极乐观的心态生活，世界也会对你报以微笑。",
      pinyin: "Huái zhe jījí lèguān de xīntài shēnghuó, shìjiè yě huì duì nǐ bào yǐ wēixiào.",
      translation: "Menjalani hari dengan mental proaktif dan optimistis, semesta pun akan membalasmu dengan senyuman.",
    },
  },
  {
    id: "hsk4-v020",
    hanzi: "珍惜",
    pinyin: "zhēnxī",
    translation: "menghargai / mensyukuri apa yang ada",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Filosofi Hidup & Kesejahteraan",
    sampleSentence: {
      hanzi: "唯有懂得珍惜眼前所拥有的，才能体会到内心的富足。",
      pinyin: "Wéiyǒu dǒngde zhēnxī yǎnqián suǒ yōngyǒu de, cái néng tǐhuì dào nèixīn de fùzú.",
      translation: "Hanya dengan mengerti cara mensyukuri apa yang digenggam saat ini, barulah sanggup meresapi kekayaan batin sejati.",
    },
  },
  {
    id: "hsk4-v021",
    hanzi: "挫折",
    pinyin: "cuòzhé",
    translation: "kemunduran / kegagalan sementara",
    partOfSpeech: "Kata Benda",
    themeCategory: "Filosofi Hidup & Kesejahteraan",
    sampleSentence: {
      hanzi: "不经历一番风雨挫折，怎能见证彩虹的绚丽壮美？",
      pinyin: "Bù jīnglì yì fān fēngyǔ cuòzhé, zěn néng jiànzhèng cǎihóng de xuànlì zhuàngměi?",
      translation: "Tanpa melalui tempaan badai dan kemunduran, mana mungkin menyaksikan gemerlap indahnya sang pelangi?",
    },
  },
  {
    id: "hsk4-v022",
    hanzi: "究竟",
    pinyin: "jiūjìng",
    translation: "sebenarnya / pada hakikatnya",
    partOfSpeech: "Keterangan",
    themeCategory: "Filosofi Hidup & Kesejahteraan",
    sampleSentence: {
      hanzi: "探索人生的意义，究竟是为了追求物质还是充盈精神？",
      pinyin: "Tànsuǒ rénshēng de yìyì, jiūjìng shì wèile zhuīqiú wùzhì háishì chōngyíng jīngshén?",
      translation: "Menjelajahi makna kehidupan, pada hakikatnya apakah demi memburu materi atau memperkaya rohani?",
    },
  },
];
