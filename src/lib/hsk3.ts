/**
 * Data Struktur Kurikulum HSK 3 (Pratinjau Draft // Roadmap)
 * Sesuai prinsip AGENTS.md:
 * - HSK 3 disiapkan sebagai struktur data terstandar bertanda draft/roadmap.
 * - Konten menyertakan Hanzi, Pinyin, dan terjemahan Bahasa Indonesia alami.
 * - Menjaga keselarasan arsitektur kurikulum bertahap.
 */

export interface Hsk3GrammarPoint {
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

export interface Hsk3LessonDialogue {
  speaker: string;
  role: string;
  hanzi: string;
  pinyin: string;
  translation: string;
}

export interface Hsk3LessonBlueprint {
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
  dialogueSpecimen: Hsk3LessonDialogue[];
  keyVocabPreview: {
    hanzi: string;
    pinyin: string;
    translation: string;
    tag: string;
  }[];
}

export interface Hsk3VocabWord {
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

export interface Hsk3ThemeCategory {
  id: string;
  title: string;
  description: string;
  wordsCount: number;
}

export const HSK3_METADATA = {
  levelCode: "HSK 3",
  title: "Tingkat Menengah I (Kurikulum Aktif)",
  status: "active" as const,
  badgeText: "KURIKULUM AKTIF",
  vocabTarget: 600,
  newVocabTarget: 300,
  previousLevelVocab: 300,
  competencyDescription:
    "Mampu berkomunikasi mandiri dalam kehidupan akademis, pekerjaan, dan perjalanan santai. Mampu mengekspresikan opini pribadi, mengutarakan alasan logis, dan memecahkan kendala komunikasi sehari-hari.",
  cefrEquivalent: "CEFR B1",
  disclaimer:
    "Kurikulum HSK 3 aktif untuk pembelajaran mandiri terstruktur: mencakup silabus 5 unit pelajaran, 6 matriks formula tata bahasa disposisi & pasif, dan 300 taksonomi kosakata tematik yang dapat disimpan langsung ke Buku Frasa pribadi.",
};

export const HSK3_GRAMMAR_POINTS: Hsk3GrammarPoint[] = [
  {
    id: "hsk3-g01",
    patternNumber: "01",
    ruleTitle: "Kalimat Disposisi: 把 (Bǎ)",
    formula: "Subjek + 把 + Objek + Kata Kerja + Komplement / Hasil",
    explanation:
      "Digunakan ketika pembicara ingin menekankan tindakan yang dilakukan terhadap objek tertentu dan bagaimana hasil atau perubahan lokasi objek tersebut setelah aksi selesai.",
    keyRule:
      "Objek harus spesifik (sudah diketahui bersama), dan kata kerja dilarang berdiri sendirian tanpa imbuhan (wajib diikuti 了, 在, 到, atau komplement hasil seperti 完, 好, 光).",
    specimenSentences: [
      {
        hanzi: "我把今天的作业做完了。",
        pinyin: "Wǒ bǎ jīntiān de zuòyè zuò wán le.",
        translation: "Saya sudah menyelesaikan pekerjaan rumah hari ini.",
        focusNote: "Objek 'pekerjaan rumah' mengalami tindakan 'selesai'.",
      },
      {
        hanzi: "请把护照和机票放好。",
        pinyin: "Qǐng bǎ hùzhào hé jīpiào fàng hǎo.",
        translation: "Tolong simpan paspor dan tiket pesawat dengan aman/baik.",
        focusNote: "Hasil penempatan aman ditandai komplement 好.",
      },
      {
        hanzi: "服务员把菜单拿过来了。",
        pinyin: "Fúwùyuán bǎ càidān ná guòlai le.",
        translation: "Pramusaji telah membawakan buku menu ke sini.",
        focusNote: "Perpindahan posisi objek ke arah pembicara.",
      },
    ],
  },
  {
    id: "hsk3-g02",
    patternNumber: "02",
    ruleTitle: "Kalimat Pasif: 被 (Bèi)",
    formula: "Subjek (Penerima) + 被 (+ Pelaku) + Kata Kerja + Hasil",
    explanation:
      "Menyatakan bahwa subjek menerima atau mengalami perbuatan yang sering kali membawa dampak merugikan, tidak menyenangkan, atau di luar kehendak subjek.",
    keyRule:
      "Pelaku aksi di belakang 被 bersifat opsional. Jika pelaku tidak diketahui atau tidak perlu disebutkan, kata pelaku dapat dihilangkan langsung.",
    specimenSentences: [
      {
        hanzi: "我的自行车被别人借走了。",
        pinyin: "Wǒ de zìxíngchē bèi biérén jiè zǒu le.",
        translation: "Sepeda saya telah dipinjam dan dibawa pergi oleh orang lain.",
        focusNote: "Penerima (sepeda) mengalami peminjaman.",
      },
      {
        hanzi: "那个大西瓜被弟弟吃光了。",
        pinyin: "Nà gè dà xīguā bèi dìdi chī guāng le.",
        translation: "Semangka besar itu telah dihabiskan oleh adik laki-laki.",
        focusNote: "Pelaku (adik) disebutkan setelah 被.",
      },
      {
        hanzi: "玻璃杯被摔坏了。",
        pinyin: "Bōlibēi bèi shuāi huài le.",
        translation: "Gelas kaca terjatuh hingga pecah rusak.",
        focusNote: "Pelaku tidak disebutkan karena fokus pada kondisi gelas.",
      },
    ],
  },
  {
    id: "hsk3-g03",
    patternNumber: "03",
    ruleTitle: "Komplement Arah & Hasil Abstrak: 起来 / 下去 / 出来",
    formula: "Kata Kerja / Sifat + 起来 / 下去 / 出来",
    explanation:
      "Pelengkap arah sering kali memiliki makna figuratif abstrak: 起来 (mulai aktif / sudut pandang kesan), 下去 (melanjutkan aksi yang sedang berjalan), 出来 (mengenali atau menghasilkan solusi).",
    keyRule:
      "Jika kata kerja memiliki objek pada pola 起来, objek disisipkan di tengah: 起 + Objek + 来 (misal: 唱起歌来).",
    specimenSentences: [
      {
        hanzi: "春天到了，天气慢慢热起来了。",
        pinyin: "Chūntiān dào le, tiānqì mànmàn rè qǐlai le.",
        translation: "Musim semi telah tiba, cuaca perlahan-lahan mulai memanas.",
        focusNote: "Perubahan menuju keadaan aktif: 热起来.",
      },
      {
        hanzi: "只要坚持学下去，汉语就会越来越流利。",
        pinyin: "Zhǐyào jiānchí xué xiàqu, Hànyǔ jiù huì yuèláiyuè liúlì.",
        translation: "Asalkan bertahan dan terus belajar, bahasa Mandarinmu akan semakin lancar.",
        focusNote: "Kelanjutan proses yang sudah berjalan: 学下去.",
      },
      {
        hanzi: "我听出来了，这是李老师的声音。",
        pinyin: "Wǒ tīng chūlai le, zhè shì Lǐ lǎoshī de shēngyīn.",
        translation: "Saya bisa mengenali dari suara pendengaran, ini suara Guru Li.",
        focusNote: "Mengenali atau mengidentifikasi: 听出来.",
      },
    ],
  },
  {
    id: "hsk3-g04",
    patternNumber: "04",
    ruleTitle: "Konjungsi Majemuk: 虽然...但是... / 不但...而且...",
    formula: "虽然 A 但是 B (Meskipun... Namun...) / 不但 A 而且 B (Bukan hanya... Melainkan juga...)",
    explanation:
      "Digunakan untuk menyusun wacana bertingkat yang matang: menyatakan pertentangan konsesif (meskipun/namun) atau perluasan informasi secara progresif.",
    keyRule:
      "Jika kedua klausa memiliki subjek yang sama, subjek diletakkan sebelum konjungsi. Jika subjek berbeda, konjungsi diletakkan sebelum masing-masing subjek.",
    specimenSentences: [
      {
        hanzi: "虽然汉字有点儿难写，但是很有意思。",
        pinyin: "Suīrán hànzì yǒudiǎnr nán xiě, dànshì hěn yǒu yìsi.",
        translation: "Meskipun karakter Hanzi agak sulit ditulis, namun sangat menarik.",
        focusNote: "Hubungan pertentangan konsesif: 虽然...但是...",
      },
      {
        hanzi: "他不但会说普通话，而且还会写毛笔字。",
        pinyin: "Tā búdàn huì shuō pǔtōnghuà, érqiě hái huì xiě máobǐzì.",
        translation: "Dia bukan hanya bisa berbicara bahasa Mandarin, melainkan juga bisa menulis kaligrafi kuas.",
        focusNote: "Penambahan kemampuan bergradasi: 不但...而且...",
      },
      {
        hanzi: "这双鞋虽然便宜，但是非常舒服。",
        pinyin: "Zhè shuāng xié suīrán piányi, dànshì fēicháng shūfu.",
        translation: "Sepasang sepatu ini meskipun murah, namun sangat nyaman dipakai.",
        focusNote: "Membandingkan harga terjangkau dengan kenyamanan tinggi.",
      },
    ],
  },
  {
    id: "hsk3-g05",
    patternNumber: "05",
    ruleTitle: "Penekanan Ekstrem: 连...都 / 也... (Lián... Dōu / Yě...)",
    formula: "Subjek + 连 + Hal Paling Ekstrem + 都 / 也 + Predikat",
    explanation:
      "Menegaskan bahwa bahkan contoh yang paling sederhana, tidak terduga, atau hal terkecil sekalipun berlaku demikian, mengindikasikan hal lain apalagi.",
    keyRule:
      "Elemen yang ingin ditekankan diletakkan tepat di antara 连 dan 都/也.",
    specimenSentences: [
      {
        hanzi: "这个问题太简单了，连小孩子都知道。",
        pinyin: "Zhè gè wèntí tài jiǎndān le, lián xiǎoháizi dōu zhīdào.",
        translation: "Pertanyaan ini terlalu sederhana, bahkan anak kecil pun tahu jawabannya.",
        focusNote: "Penekanan pada subjek paling muda: 连小孩子都...",
      },
      {
        hanzi: "他今天太忙了，连午饭都没时间吃。",
        pinyin: "Tā jīntiān tài máng le, lián wǔfàn dōu méi shíjiān chī.",
        translation: "Hari ini dia terlalu sibuk, bahkan makan siang pun tak sempat makan.",
        focusNote: "Penekanan pada kebutuhan dasar yang terlewatkan.",
      },
      {
        hanzi: "这个小山村很安静，连汽车的声音都听不到。",
        pinyin: "Zhè gè xiǎoshāncūn hěn ānjìng, lián qìchē de shēngyīn dōu tīng bú dào.",
        translation: "Desa pegunungan kecil ini sangat tenang, bahkan suara mobil pun tidak terdengar.",
        focusNote: "Penekanan suasana hening total.",
      },
    ],
  },
  {
    id: "hsk3-g06",
    patternNumber: "06",
    ruleTitle: "Syarat Mutlak & Kausalitas: 只要...就... (Zhǐyào... Jiù...)",
    formula: "只要 + Kondisi Syarat Cukup, 就 + Hasil Pasti",
    explanation:
      "Menunjukkan hubungan syarat yang cukup: asalkan satu prasyarat ini terpenuhi, maka dampak atau kesimpulan yang diinginkan pasti terwujud.",
    keyRule:
      "Berbeda dari 只有...才... (satu-satunya syarat mutlak), 只要...就... menegaskan kemudahan terwujudnya hasil jika ada komitmen.",
    specimenSentences: [
      {
        hanzi: "只要认真复习，你就能通过考试。",
        pinyin: "Zhǐyào rènzhēn fùxí, nǐ jiù néng tōngguò kǎoshì.",
        translation: "Asalkan rajin mengulang pelajaran, kamu pasti bisa lulus ujian.",
        focusNote: "Syarat cukup (rajin mengulang) menjamin kelulusan.",
      },
      {
        hanzi: "只要明天下大雨，我们的足球赛就推迟。",
        pinyin: "Zhǐyào míngtiān xià dàyǔ, wǒmen de zúqiúsài jiù tuīchí.",
        translation: "Asalkan besok turun hujan lebat, pertandingan sepak bola kita ditunda.",
        focusNote: "Kondisi cuaca menentukan jadwal kegiatan.",
      },
      {
        hanzi: "只要你愿意帮忙，这件事情就很容易办好。",
        pinyin: "Zhǐyào nǐ yuànyì bāngmáng, zhè jiàn shìqing jiù hěn róngyì bàn hǎo.",
        translation: "Asalkan kamu bersedia membantu, urusan ini akan sangat mudah diselesaikan.",
        focusNote: "Dukungan rekan mempermudah penyelesaian tugas.",
      },
    ],
  },
];

export const HSK3_LESSON_BLUEPRINTS: Hsk3LessonBlueprint[] = [
  {
    id: "hsk3-lesson-11",
    slug: "11",
    lessonNumber: 11,
    title: "Rencana Akhir Pekan & Alam Bebas",
    hanzi: "周末计划与户外",
    pinyin: "Zhōumò Jìhuà yǔ Hùwài",
    translation: "Menyusun Agenda Rekreasi & Pendakian Gunung",
    objectives:
      "Mengutarakan rencana waktu luang (打算, 计划), menggunakan konjungsi 虽然...但是... untuk menimbang jarak tempuh, dan menyepakati waktu berkumpul.",
    overview:
      "Unit pembuka tingkat menengah ini mengajak pembelajar berdiskusi menyusun agenda rekreasi luar ruangan, memperkirakan perlengkapan yang perlu dibawa, dan mengelola waktu.",
    primaryGrammarId: "hsk3-g04",
    vocabCount: 20,
    estimatedMinutes: 18,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Rekan Mahasiswa A",
        hanzi: "这个周末你有什么打算？要不要一起去爬山？",
        pinyin: "Zhè gè zhōumò nǐ yǒu shénme dǎsuàn? Yào bu yào yìqǐ qù páshān?",
        translation: "Akhir pekan ini kamu ada rencana apa? Mau pergi mendaki gunung bersama?",
      },
      {
        speaker: "B",
        role: "Rekan Mahasiswa B",
        hanzi: "虽然那座山有点儿远，但是风景听说特别漂亮，我很想去！",
        pinyin: "Suīrán nà zuò shān yǒudiǎnr yuǎn, dànshì fēngjǐng tīngshuō tèbié piàoliang, wǒ hěn xiǎng qù!",
        translation: "Meskipun gunung itu agak jauh, namun pemandangannya kabarnya sangat indah, saya sangat ingin pergi!",
      },
      {
        speaker: "A",
        role: "Rekan Mahasiswa A",
        hanzi: "那我们周六早上七点在校门口集合，记得带上水和面包。",
        pinyin: "Nà wǒmen zhōuliù zǎoshang qī diǎn zài xiàoménkǒu jíhé, jìde dài shàng shuǐ hé miànbāo.",
        translation: "Kalau begitu kita berkumpul jam 7 pagi Sabtu di gerbang kampus, ingat bawa air dan roti.",
      },
      {
        speaker: "B",
        role: "Rekan Mahasiswa B",
        hanzi: "好的，只要天气晴朗，我们就能拍很多好看的照片。",
        pinyin: "Hǎo de, zhǐyào tiānqì qínglǎng, wǒmen jiù néng pāi hěn duō hǎokàn de zhàopiàn.",
        translation: "Baiklah, asalkan cuaca cerah, kita bisa memotret banyak foto yang bagus.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "打算", pinyin: "dǎsuàn", translation: "berencana / rencana", tag: "Kata Kerja" },
      { hanzi: "爬山", pinyin: "páshān", translation: "mendaki gunung", tag: "Kata Kerja" },
      { hanzi: "虽然", pinyin: "suīrán", translation: "meskipun", tag: "Konjungsi" },
      { hanzi: "但是", pinyin: "dànshì", translation: "tetapi / namun", tag: "Konjungsi" },
      { hanzi: "特别", pinyin: "tèbié", translation: "sangat / istimewa", tag: "Keterangan" },
    ],
  },
  {
    id: "hsk3-lesson-12",
    slug: "12",
    lessonNumber: 12,
    title: "Wawancara Kerja & Kantor",
    hanzi: "求职面试与职场",
    pinyin: "Qiúzhí Miànshì yǔ Zhíchǎng",
    translation: "Memperkenalkan Kualifikasi & Komunikasi Kerja",
    objectives:
      "Menyampaikan latar belakang keahlian, menggunakan kalimat 把 untuk tindakan dokumen kantor (menyerahkan resume, menyelesaikan laporan), dan menyapa manajer.",
    overview:
      "Unit kedua membawa pembelajar ke konteks profesional perkantoran. Mempelajari etika wawancara kerja, instruksi atasan, dan kerja sama tim.",
    primaryGrammarId: "hsk3-g01",
    vocabCount: 22,
    estimatedMinutes: 20,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Pewawancara (Manajer)",
        hanzi: "请坐。请您先把个人简历交给我，然后简单介绍一下你自己。",
        pinyin: "Qǐng zuò. Qǐng nín xiān bǎ gèrén jiǎnlì jiāo gěi wǒ, ránhòu jiǎndān jièshào yíxià nǐ zìjǐ.",
        translation: "Silakan duduk. Tolong serahkan resume pribadimu kepada saya terlebih dahulu, lalu perkenalkan dirimu secara singkat.",
      },
      {
        speaker: "B",
        role: "Pelamar Kerja",
        hanzi: "经理好。我大学学的是国际贸易，不但会英语，而且中文也达到了中级水平。",
        pinyin: "Jīnglǐ hǎo. Wǒ dàxué xué de shì guójì màoyì, búdàn huì Yīngyǔ, érqiě Zhōngwén yě dádào le zhōngjí shuǐpíng.",
        translation: "Halo Manajer. Di universitas saya belajar perdagangan internasional, bukan hanya bisa bahasa Inggris, melainkan bahasa Mandarin saya juga mencapai tingkat menengah.",
      },
      {
        speaker: "A",
        role: "Pewawancara (Manajer)",
        hanzi: "你的经历很符合我们的要求。如果遇到工作压力，你如何解决？",
        pinyin: "Nǐ de jīnglì hěn fúhé wǒmen de yāoqiú. Rúguǒ yù dào gōngzuò yālì, nǐ rúhé jiějué?",
        translation: "Pengalamanmu sangat sesuai dengan kualifikasi kami. Jika menghadapi tekanan kerja, bagaimana kamu menyelesaikannya?",
      },
      {
        speaker: "B",
        role: "Pelamar Kerja",
        hanzi: "我会认真计划时间，并主动和同事沟通，把问题尽快处理好。",
        pinyin: "Wǒ huì rènzhēn jìhuà shíjiān, bìng zhǔdòng hé tóngshì gōutōng, bǎ wèntí jǐnkuài chǔlǐ hǎo.",
        translation: "Saya akan merencanakan waktu dengan sungguh-sungguh, berinisiatif berkomunikasi dengan rekan kerja, dan menyelesaikan masalah sebaik mungkin.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "把", pinyin: "bǎ", translation: "partikel disposisi", tag: "Partikel" },
      { hanzi: "经理", pinyin: "jīnglǐ", translation: "manajer", tag: "Kata Benda" },
      { hanzi: "同事", pinyin: "tóngshì", translation: "rekan kerja", tag: "Kata Benda" },
      { hanzi: "解决", pinyin: "jiějué", translation: "menyelesaikan masalah", tag: "Kata Kerja" },
      { hanzi: "简单", pinyin: "jiǎndān", translation: "sederhana / ringkas", tag: "Kata Sifat" },
    ],
  },
  {
    id: "hsk3-lesson-13",
    slug: "13",
    lessonNumber: 13,
    title: "Gaya Hidup Sehat & Lingkungan",
    hanzi: "健康生活与环境",
    pinyin: "Jiànkāng Shēnghuó yǔ Huánjìng",
    translation: "Pola Hidup Bersih, Olahraga Rutin & Menjaga Alam",
    objectives:
      "Membahas kebiasaan berolahraga, menggunakan komplement 起来 dan 下去 untuk memulai serta mempertahankan rutinitas sehat, dan pentingnya merawat lingkungan.",
    overview:
      "Unit ketiga menekankan kesadaran hidup sehat dan pelestarian lingkungan: mengurangi penggunaan plastik, rajin berolahraga pagi, dan menjaga kebersihan publik.",
    primaryGrammarId: "hsk3-g03",
    vocabCount: 20,
    estimatedMinutes: 18,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Dokter / Konsultan",
        hanzi: "你最近运动量有点儿少，应该多去公园跑跑步。",
        pinyin: "Nǐ zuìjìn yùndòngliàng yǒudiǎnr shǎo, yīnggāi duō qù gōngyuán pǎopǎobù.",
        translation: "Porsi olahragamu akhir-akhir ini agak kurang, seharusnya lebih sering pergi ke taman untuk jogging.",
      },
      {
        speaker: "B",
        role: "Pasien",
        hanzi: "你说得对，我已经开始早起了，感觉整个人精神起来了。",
        pinyin: "Nǐ shuō de duì, wǒ yǐjīng kāishǐ zǎoqǐ le, gǎnjué zhěng gè rén jīngshén qǐlai le.",
        translation: "Kamu benar, saya sudah mulai bangun pagi, rasanya seluruh badan mulai berenergi segar.",
      },
      {
        speaker: "A",
        role: "Dokter / Konsultan",
        hanzi: "很好！坚持运动下去，连感冒都会很少找你。",
        pinyin: "Hěn hǎo! Jiānchí yùndòng xiàqu, lián gǎnmào dōu huì hěn shǎo zhǎo nǐ.",
        translation: "Sangat bagus! Bertahanlah terus berolahraga, bahkan flu pun akan jarang menghampirimu.",
      },
      {
        speaker: "B",
        role: "Pasien",
        hanzi: "而且多在外面呼吸新鲜空气，也能保护视力、放松心情。",
        pinyin: "Érqiě duō zài wàimiàn hūxī xīnxiān kōngqì, yě néng bǎohù shìlì, fàngsōng xīnqíng.",
        translation: "Selain itu, banyak menghirup udara segar di luar juga dapat menjaga penglihatan dan merilekskan pikiran.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "环境", pinyin: "huánjìng", translation: "lingkungan hidup", tag: "Kata Benda" },
      { hanzi: "习惯", pinyin: "xíguàn", translation: "kebiasaan", tag: "Kata Benda" },
      { hanzi: "坚持", pinyin: "jiānchí", translation: "bertahan / gigih", tag: "Kata Kerja" },
      { hanzi: "健康", pinyin: "jiànkāng", translation: "sehat / kesehatan", tag: "Kata Sifat" },
      { hanzi: "新鲜", pinyin: "xīnxiān", translation: "segar", tag: "Kata Sifat" },
    ],
  },
  {
    id: "hsk3-lesson-14",
    slug: "14",
    lessonNumber: 14,
    title: "Tradisi, Budaya & Perayaan",
    hanzi: "传统节日与文化",
    pinyin: "Chuántǒng Jiérì yǔ Wénhuà",
    translation: "Mengenal Festival Musim Semi, Tradisi & Kuliner Khas",
    objectives:
      "Menceritakan perayaan festival tradisional Tiongkok (Tahun Baru Imlek, Festival Musim Gugur), menggunakan pola penekanan 连...都... untuk kemeriahan kota.",
    overview:
      "Unit keempat memperluas wawasan lintas budaya. Pembelajar memahami filosofi mudik berkumpul bersama keluarga, makan kue bulan, dan menyalakan lentera.",
    primaryGrammarId: "hsk3-g05",
    vocabCount: 22,
    estimatedMinutes: 20,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Mahasiswa Asing",
        hanzi: "马上就要到春节了，街上看起来真热闹啊！",
        pinyin: "Mǎshàng jiù yào dào Chūnjié le, jiē shang kàn qǐlai zhēn rènao a!",
        translation: "Sebentar lagi Festival Musim Semi (Imlek) akan tiba, jalanan kelihatan sangat meriah!",
      },
      {
        speaker: "B",
        role: "Sahabat Lokal",
        hanzi: "对啊，大家都在买年货，连平时安静的超市都挤满了人。",
        pinyin: "Duì a, dàjiā dōu zài mǎi niánhuò, lián píngshí ānjìng de chāoshì dōu jǐ mǎn le rén.",
        translation: "Benar sekali, semua orang berbelanja kebutuhan tahun baru, bahkan supermarket yang biasanya tenang pun dipadati pengunjung.",
      },
      {
        speaker: "A",
        role: "Mahasiswa Asing",
        hanzi: "听说除夕那天，全家人都要聚在一起吃饺子？",
        pinyin: "Tīngshuō Chúxī nà tiān, quán jiā rén dōu yào jù zài yìqǐ chī jiǎozi?",
        translation: "Kabarnya di malam tahun baru, seluruh keluarga harus berkumpul bersama makan pangsit?",
      },
      {
        speaker: "B",
        role: "Sahabat Lokal",
        hanzi: "是的！饺子的形状像元宝，象征着新的一年万事如意、发财平安。",
        pinyin: "Shì de! Jiǎozi de xíngzhuàng xiàng yuánbǎo, xiàngzhēng zhe xīn de yì nián wànshì rúyì, fācái píng'ān.",
        translation: "Benar! Bentuk pangsit menyerupai batangan uang emas kuno, melambangkan segala urusan lancar, rezeki melimpah, dan aman di tahun baru.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "节日", pinyin: "jiérì", translation: "hari raya / festival", tag: "Kata Benda" },
      { hanzi: "文化", pinyin: "wénhuà", translation: "kebudayaan", tag: "Kata Benda" },
      { hanzi: "热闹", pinyin: "rènao", translation: "meriah / ramai ceria", tag: "Kata Sifat" },
      { hanzi: "连", pinyin: "lián", translation: "bahkan (partikel penekan)", tag: "Preposisi" },
      { hanzi: "历史", pinyin: "lìshǐ", translation: "sejarah", tag: "Kata Benda" },
    ],
  },
  {
    id: "hsk3-lesson-15",
    slug: "15",
    lessonNumber: 15,
    title: "Layanan Publik & Pemecahan Masalah",
    hanzi: "公共服务与解决问题",
    pinyin: "Gōnggòng Fúwù yǔ Jiějué Wèntí",
    translation: "Menghadapi Kendala di Bank, Stasiun, & Barang Hilang",
    objectives:
      "Menyatakan situasi darurat atau kendala layanan umum, menggunakan kalimat pasif 被 untuk barang tertinggal/hilang, dan pola syarat 只要...就... dengan petugas.",
    overview:
      "Unit penutup HSK 3 melengkapi kemandirian komunikasi pembelajar: mampu meminta bantuan pihak berwenang, mengurus kehilangan kartu identitas, dan mencari solusi damai.",
    primaryGrammarId: "hsk3-g02",
    vocabCount: 22,
    estimatedMinutes: 20,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Penumpang",
        hanzi: "你好，请问失物招领处在哪里？我的背包被遗忘在列车上了。",
        pinyin: "Nǐ hǎo, qǐngwèn shīwù zhāolǐngchù zài nǎlǐ? Wǒ de bēibāo bèi yíwàng zài lièchē shang le.",
        translation: "Halo, permisi bagian penitipan barang hilang di mana? Ransel saya tertinggal di dalam gerbong kereta.",
      },
      {
        speaker: "B",
        role: "Petugas Stasiun",
        hanzi: "别着急。请问您坐的是哪一趟列车？里面有什么贵重物品？",
        pinyin: "Bié zháojí. Qǐngwèn nín zuò de shì nǎ yí tàng lièchē? Lǐmiàn yǒu shénme guìzhòng wùpǐn?",
        translation: "Jangan panik. Anda menaiki kereta nomor berapa? Di dalamnya terdapat barang berharga apa saja?",
      },
      {
        speaker: "A",
        role: "Penumpang",
        hanzi: "是G12次列车。里面有我的护照、笔记本电脑和银行卡。",
        pinyin: "Shì G12 cì lièchē. Lǐmiàn yǒu wǒ de hùzhào, bǐjìběn diànnǎo hé yínhángkǎ.",
        translation: "Kereta G12. Di dalamnya terdapat paspor saya, komputer laptop, dan kartu bank.",
      },
      {
        speaker: "B",
        role: "Petugas Stasiun",
        hanzi: "好的，只要您出示车票，我们马上联系列车长帮您查找，请在此稍候。",
        pinyin: "Hǎo de, zhǐyào nín chūshì chēpiào, wǒmen mǎshàng liánxì lièchēzhǎng bāng nín cházhǎo, qǐng zài cǐ shāohòu.",
        translation: "Baiklah, asalkan Anda menunjukkan tiket kereta, kami akan segera menghubungi kepala kondektur untuk mencarinya, silakan tunggu sejenak di sini.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "被", pinyin: "bèi", translation: "partikel kalimat pasif", tag: "Preposisi" },
      { hanzi: "遇到", pinyin: "yù dào", translation: "menemui / menjumpai kendala", tag: "Kata Kerja" },
      { hanzi: "着急", pinyin: "zháojí", translation: "panik / cemas terburu-buru", tag: "Kata Sifat" },
      { hanzi: "检查", pinyin: "jiǎnchá", translation: "memeriksa", tag: "Kata Kerja" },
      { hanzi: "办法", pinyin: "bànfǎ", translation: "solusi / jalan keluar", tag: "Kata Benda" },
    ],
  },
];

export const HSK3_THEME_CATEGORIES: Hsk3ThemeCategory[] = [
  {
    id: "cat-plans-leisure",
    title: "Rencana & Rekreasi",
    description: "Kegiatan akhir pekan, wisata alam terbuka, dan hobi personal.",
    wordsCount: 60,
  },
  {
    id: "cat-career-office",
    title: "Karir & Dunia Kerja",
    description: "Komunikasi kantor, wawancara kerja, dan tugas profesional.",
    wordsCount: 60,
  },
  {
    id: "cat-habits-environment",
    title: "Kebiasaan & Lingkungan",
    description: "Pola hidup sehat, kelestarian alam, dan pemeliharaan diri.",
    wordsCount: 60,
  },
  {
    id: "cat-culture-festivals",
    title: "Budaya & Tradisi",
    description: "Perayaan festival Tiongkok, kuliner khas, dan adat istiadat.",
    wordsCount: 60,
  },
  {
    id: "cat-services-problem-solving",
    title: "Layanan & Solusi Kendala",
    description: "Fasilitas umum, perbankan, transportasi, dan penyelesaian sengketa.",
    wordsCount: 60,
  },
];

export const HSK3_VOCABULARY_PREVIEWS: Hsk3VocabWord[] = [
  // 1. Rencana & Rekreasi
  {
    id: "hsk3-v001",
    hanzi: "打算",
    pinyin: "dǎsuàn",
    translation: "berencana / rencana",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Rencana & Rekreasi",
    sampleSentence: {
      hanzi: "放假以后你打算去哪儿旅游？",
      pinyin: "Fàngjià yǐhòu nǐ dǎsuàn qù nǎr lǚyóu?",
      translation: "Setelah liburan kamu berencana pergi ke mana untuk berwisata?",
    },
  },
  {
    id: "hsk3-v002",
    hanzi: "爬山",
    pinyin: "páshān",
    translation: "mendaki gunung",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Rencana & Rekreasi",
    sampleSentence: {
      hanzi: "爬山不仅能锻炼身体，还能呼吸新鲜空气。",
      pinyin: "Páshān bùjǐn néng duànliàn shēntǐ, hái néng hūxī xīnxiān kōngqì.",
      translation: "Mendaki gunung bukan hanya melatih fisik, melainkan juga menghirup udara segar.",
    },
  },
  {
    id: "hsk3-v003",
    hanzi: "虽然",
    pinyin: "suīrán",
    translation: "meskipun / walaupun",
    partOfSpeech: "Konjungsi",
    themeCategory: "Rencana & Rekreasi",
    sampleSentence: {
      hanzi: "虽然天气不太好，但他还是出门了。",
      pinyin: "Suīrán tiānqì bú tài hǎo, dàn tā háishì chūmén le.",
      translation: "Meskipun cuaca kurang bersahabat, namun dia tetap bepergian ke luar.",
    },
  },
  {
    id: "hsk3-v004",
    hanzi: "特别",
    pinyin: "tèbié",
    translation: "sangat / istimewa",
    partOfSpeech: "Keterangan",
    themeCategory: "Rencana & Rekreasi",
    sampleSentence: {
      hanzi: "这家餐馆的中国菜特别地道。",
      pinyin: "Zhè jiā cānguǎn de Zhōngguó cài tèbié dìdao.",
      translation: "Masakan Tiongkok di restoran ini sangat autentik.",
    },
  },
  {
    id: "hsk3-v005",
    hanzi: "经常",
    pinyin: "jīngcháng",
    translation: "sering kali",
    partOfSpeech: "Keterangan",
    themeCategory: "Rencana & Rekreasi",
    sampleSentence: {
      hanzi: "周末我们经常去图书馆看书。",
      pinyin: "Zhōumò wǒmen jīngcháng qù túshūguǎn kàn shū.",
      translation: "Saat akhir pekan kami sering pergi ke perpustakaan membaca buku.",
    },
  },

  // 2. Karir & Dunia Kerja
  {
    id: "hsk3-v006",
    hanzi: "经理",
    pinyin: "jīnglǐ",
    translation: "manajer",
    partOfSpeech: "Kata Benda",
    themeCategory: "Karir & Dunia Kerja",
    sampleSentence: {
      hanzi: "李经理正在会议室和客户开会。",
      pinyin: "Lǐ jīnglǐ zhèngzài huìyìshì hé kèhù kāihuì.",
      translation: "Manajer Li sedang mengadakan rapat dengan klien di ruang rapat.",
    },
  },
  {
    id: "hsk3-v007",
    hanzi: "同事",
    pinyin: "tóngshì",
    translation: "rekan kerja",
    partOfSpeech: "Kata Benda",
    themeCategory: "Karir & Dunia Kerja",
    sampleSentence: {
      hanzi: "我和新来的同事相处得非常好。",
      pinyin: "Wǒ hé xīn lái de tóngshì xiāngchǔ de fēicháng hǎo.",
      translation: "Saya bergaul dan bekerja sama dengan sangat baik bersama rekan kerja yang baru datang.",
    },
  },
  {
    id: "hsk3-v008",
    hanzi: "解决",
    pinyin: "jiějué",
    translation: "menyelesaikan / menuntaskan masalah",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Karir & Dunia Kerja",
    sampleSentence: {
      hanzi: "只要大家齐心协力，这个问题很快就能解决。",
      pinyin: "Zhǐyào dàjiā qíxīn xiélì, zhè gè wèntí hěn kuài jiù néng jiějué.",
      translation: "Asalkan semua orang bersatu hati, masalah ini akan segera terselesaikan.",
    },
  },
  {
    id: "hsk3-v009",
    hanzi: "简单",
    pinyin: "jiǎndān",
    translation: "sederhana / mudah",
    partOfSpeech: "Kata Sifat",
    themeCategory: "Karir & Dunia Kerja",
    sampleSentence: {
      hanzi: "这份工作并不像你想象的那么简单。",
      pinyin: "Zhè fèn gōngzuò bìng bù xiàng nǐ xiǎngxiàng de nàme jiǎndān.",
      translation: "Pekerjaan ini tidaklah sesederhana yang kamu bayangkan.",
    },
  },
  {
    id: "hsk3-v010",
    hanzi: "提高",
    pinyin: "tígāo",
    translation: "meningkatkan / memajukan",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Karir & Dunia Kerja",
    sampleSentence: {
      hanzi: "多听广播能帮助你提高听力水平。",
      pinyin: "Duō tīng guǎngbō néng bāngzhù nǐ tígāo tīnglì shuǐpíng.",
      translation: "Sering mendengarkan siaran radio dapat membantumu meningkatkan kemampuan mendengar.",
    },
  },

  // 3. Kebiasaan & Lingkungan
  {
    id: "hsk3-v011",
    hanzi: "环境",
    pinyin: "huánjìng",
    translation: "lingkungan hidup",
    partOfSpeech: "Kata Benda",
    themeCategory: "Kebiasaan & Lingkungan",
    sampleSentence: {
      hanzi: "我们学校的学习环境非常安静舒适。",
      pinyin: "Wǒmen xuéxiào de xuéxí huánjìng fēicháng ānjìng shūshì.",
      translation: "Lingkungan belajar di sekolah kami sangat tenang dan nyaman.",
    },
  },
  {
    id: "hsk3-v012",
    hanzi: "习惯",
    pinyin: "xíguàn",
    translation: "kebiasaan / terbiasa",
    partOfSpeech: "Kata Benda",
    themeCategory: "Kebiasaan & Lingkungan",
    sampleSentence: {
      hanzi: "养成早睡早起的好习惯对身体很有益处。",
      pinyin: "Yǎngchéng zǎoshuì zǎoqǐ de hǎo xíguàn duì shēntǐ hěn yǒu yìchu.",
      translation: "Membiasakan diri tidur lebih awal dan bangun pagi sangat bermanfaat bagi tubuh.",
    },
  },
  {
    id: "hsk3-v013",
    hanzi: "坚持",
    pinyin: "jiānchí",
    translation: "bertahan / teguh tekun",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Kebiasaan & Lingkungan",
    sampleSentence: {
      hanzi: "他每天坚持跑步半小时，已经三年了。",
      pinyin: "Tā měitiān jiānchí pǎobù bàn xiǎoshí, yǐjīng sān nián le.",
      translation: "Setiap hari dia tekun jogging setengah jam, sudah tiga tahun berlangsung.",
    },
  },
  {
    id: "hsk3-v014",
    hanzi: "新鲜",
    pinyin: "xīnxiān",
    translation: "segar / baru",
    partOfSpeech: "Kata Sifat",
    themeCategory: "Kebiasaan & Lingkungan",
    sampleSentence: {
      hanzi: "早晨菜市场的蔬菜和水果都特别新鲜。",
      pinyin: "Zǎochén càishìchǎng de shūcài hé shuǐguǒ dōu tèbié xīnxiān.",
      translation: "Pagi hari sayur dan buah di pasar tradisional semuanya sangat segar.",
    },
  },

  // 4. Budaya & Tradisi
  {
    id: "hsk3-v015",
    hanzi: "节日",
    pinyin: "jiérì",
    translation: "hari raya / festival",
    partOfSpeech: "Kata Benda",
    themeCategory: "Budaya & Tradisi",
    sampleSentence: {
      hanzi: "中秋节是中国人合家团圆的传统节日。",
      pinyin: "Zhōngqiūjié shì Zhōngguó rén héjiā tuányuán de chuántǒng jiérì.",
      translation: "Festival Pertengahan Musim Gugur adalah hari raya tradisional reuni keluarga masyarakat Tiongkok.",
    },
  },
  {
    id: "hsk3-v016",
    hanzi: "文化",
    pinyin: "wénhuà",
    translation: "kebudayaan",
    partOfSpeech: "Kata Benda",
    themeCategory: "Budaya & Tradisi",
    sampleSentence: {
      hanzi: "学汉语的同时，我也了解了很多中国文化。",
      pinyin: "Xué Hànyǔ de tóngshí, wǒ yě liǎojiě le hěn duō Zhōngguó wénhuà.",
      translation: "Di samping belajar bahasa Mandarin, saya juga memahami banyak kebudayaan Tiongkok.",
    },
  },
  {
    id: "hsk3-v017",
    hanzi: "历史",
    pinyin: "lìshǐ",
    translation: "sejarah",
    partOfSpeech: "Kata Benda",
    themeCategory: "Budaya & Tradisi",
    sampleSentence: {
      hanzi: "北京是一座拥有三千多年历史的古老城市。",
      pinyin: "Běijīng shì yí zuò yōngyǒu sānqiān duō nián lìshǐ de gǔlǎo chéngshì.",
      translation: "Beijing adalah kota kuno yang memiliki sejarah lebih dari 3.000 tahun.",
    },
  },
  {
    id: "hsk3-v018",
    hanzi: "热闹",
    pinyin: "rènao",
    translation: "meriah / semarak ramai",
    partOfSpeech: "Kata Sifat",
    themeCategory: "Budaya & Tradisi",
    sampleSentence: {
      hanzi: "除夕之夜大街小巷都张灯结彩，非常热闹。",
      pinyin: "Chúxī zhī yè dàjiē xiǎoxiàng dōu zhāngdēng jiécǎi, fēicháng rènao.",
      translation: "Di malam tahun baru jalanan besar dan gang dihiasi lentera, suasananya sangat meriah.",
    },
  },

  // 5. Layanan & Solusi Kendala
  {
    id: "hsk3-v019",
    hanzi: "遇到",
    pinyin: "yù dào",
    translation: "menjumpai / berpapasan dengan kendala",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Layanan & Solusi Kendala",
    sampleSentence: {
      hanzi: "旅途中如果遇到困难，可以向警察寻求帮助。",
      pinyin: "Lǚtú zhōng rúguǒ yù dào kùnnan, kěyǐ xiàng jǐngchá xúnqiú bāngzhù.",
      translation: "Jika di tengah perjalanan menemui kesulitan, kamu bisa meminta bantuan kepada polisi.",
    },
  },
  {
    id: "hsk3-v020",
    hanzi: "着急",
    pinyin: "zháojí",
    translation: "cemas / panik tergesa-gesa",
    partOfSpeech: "Kata Sifat",
    themeCategory: "Layanan & Solusi Kendala",
    sampleSentence: {
      hanzi: "离火车开车还有半小时，大家不用太着急。",
      pinyin: "Lí huǒchē kāichē hái yǒu bàn xiǎoshí, dàjiā búyòng tài zháojí.",
      translation: "Masih tersisa setengah jam sebelum kereta berangkat, semuanya tidak perlu terlalu cemas.",
    },
  },
  {
    id: "hsk3-v021",
    hanzi: "办法",
    pinyin: "bànfǎ",
    translation: "cara / jalan keluar",
    partOfSpeech: "Kata Benda",
    themeCategory: "Layanan & Solusi Kendala",
    sampleSentence: {
      hanzi: "你有什么好办法能解决这个难题吗？",
      pinyin: "Nǐ yǒu shénme hǎo bànfǎ néng jiějué zhè gè nántí ma?",
      translation: "Apakah kamu punya cara baik untuk menyelesaikan teka-teki sulit ini?",
    },
  },
  {
    id: "hsk3-v022",
    hanzi: "检查",
    pinyin: "jiǎnchá",
    translation: "memeriksa / meneliti ulang",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Layanan & Solusi Kendala",
    sampleSentence: {
      hanzi: "交卷以前请把名字和考号再检查一遍。",
      pinyin: "Jiāo juàn yǐqián qǐng bǎ míngzi hé kǎohào zài jiǎnchá yí biàn.",
      translation: "Sebelum mengumpulkan lembar jawaban, tolong periksa kembali nama dan nomor ujian sekali lagi.",
    },
  },
];
