/**
 * Data Struktur Kurikulum HSK 5 (Pratinjau Draft // Roadmap)
 * Sesuai prinsip AGENTS.md:
 * - HSK 5 disiapkan sebagai struktur data terstandar bertanda draft/roadmap.
 * - Konten menyertakan Hanzi, Pinyin, dan terjemahan Bahasa Indonesia alami.
 * - Melengkapi arsitektur kurikulum HSK 1 s.d. HSK 5 secara utuh.
 */

export interface Hsk5GrammarPoint {
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

export interface Hsk5LessonDialogue {
  speaker: string;
  role: string;
  hanzi: string;
  pinyin: string;
  translation: string;
}

export interface Hsk5LessonBlueprint {
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
  dialogueSpecimen: Hsk5LessonDialogue[];
  keyVocabPreview: {
    hanzi: string;
    pinyin: string;
    translation: string;
    tag: string;
  }[];
}

export interface Hsk5VocabWord {
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

export interface Hsk5ThemeCategory {
  id: string;
  title: string;
  description: string;
  wordsCount: number;
}

export const HSK5_METADATA = {
  levelCode: "HSK 5",
  title: "Tingkat Mahir (Kurikulum Aktif)",
  status: "active" as const,
  badgeText: "KURIKULUM AKTIF",
  vocabTarget: 2500,
  newVocabTarget: 1300,
  previousLevelVocab: 1200,
  competencyDescription:
    "Mampu membaca surat kabar dan majalah berbahasa Mandarin, menikmati film tanpa takarir, memahami karya sastra, serta menyusun pidato terstruktur dan esai analitis dalam domain akademik maupun profesional.",
  cefrEquivalent: "CEFR C1",
  disclaimer:
    "Kurikulum HSK 5 aktif untuk pembelajaran mandiri terstruktur: mencakup silabus 5 unit pelajaran literasi, 6 matriks formula tata bahasa formal, dan 1.300 taksonomi kosakata tematik yang dapat disimpan langsung ke Buku Frasa pribadi.",
};

export const HSK5_GRAMMAR_POINTS: Hsk5GrammarPoint[] = [
  {
    id: "hsk5-g01",
    patternNumber: "01",
    ruleTitle: "Preposisi Wacana Formal: 自...以来 (Zì... Yǐlái) & 凭 (Píng)",
    formula: "自 + Titik Waktu / Peristiwa + 以来 / 凭 + Landasan / Bukti + Tindakan",
    explanation:
      "Gaya penulisan literatur resmi (shūmiànyǔ) untuk menunjukkan rentang masa bersejarah sejak suatu titik awal, atau menandakan tindakan yang disandarkan pada kompetensi, wewenang, dan bukti konkret.",
    keyRule:
      "自 menggantikan kata lisan 从 (cóng). 凭 menggantikan 靠 (kào) dan diletakkan sebelum frasa nomina landasan (misal: 凭经验 = berlandaskan pengalaman).",
    specimenSentences: [
      {
        hanzi: "自二十一世纪以来，数字信息技术以前所未有的速度深刻改变着人类社会。",
        pinyin: "Zì èrshíyī shìjì yǐlái, shùzì xìnxī jìshù yǐ qiánsuǒwèiyǒu de sùdù shēnkè gǎibiàn zhe rénlèi shèhuì.",
        translation: "Semenjak abad ke-21, teknologi informasi digital dengan kecepatan yang belum pernah ada sebelumnya telah mengubah masyarakat manusia secara mendalam.",
        focusNote: "Penanda rentang waktu historis wacana formal.",
      },
      {
        hanzi: "他凭着坚韧不拔的毅力与卓越的专业才能，攻克了一道又一道科技难关。",
        pinyin: "Tā píng zhe jiānrènbùbá de yìlì yǔ zhuóyuè de zhuānyè cáinéng, gōngkè le yí dào yòu yí dào kējì nánguān.",
        translation: "Berlandaskan ketabahan tekad yang tak tergoyahkan serta kecakapan profesional yang luar biasa, dia menaklukkan rintangan teknologi demi rintangan.",
        focusNote: "Mengandalkan modal kompetensi dan dedikasi batin.",
      },
      {
        hanzi: "自建交以来，两国在经济与人文领域的合作成果斐然。",
        pinyin: "Zì jiànjiāo yǐlái, liǎng guó zài jīngjì yǔ rénwén lǐngyù de hézuò chéngguǒ fěirán.",
        translation: "Semenjak peresmian hubungan diplomatik, capaian kerja sama kedua negara di bidang ekonomi dan humaniora sungguh gemilang.",
        focusNote: "Wacana diplomasi kenegaraan.",
      },
    ],
  },
  {
    id: "hsk5-g02",
    patternNumber: "02",
    ruleTitle: "Sanggahan Filosofis & Retoris: 未尝 (Wèicháng) & 何尝 (Hécháng)",
    formula: "未尝不 / 未尝没有 (Bukan Berarti Tidak...) / 何尝 + Kata Kerja (Mana Pernah / Mana Mungkin...)",
    explanation:
      "Gaya bahasa sastra untuk menyuarakan sanggahan lembut yang bernuansa bijak (negasi ganda untuk menegaskan kemungkinan positif), atau melontarkan pertanyaan retoris yang menggugah nurani.",
    keyRule:
      "未尝不 setara dengan 'boleh jadi / bukan berarti tidak'. 何尝 selalu menyiratkan makna negasi total dalam bentuk pertanyaan retoris.",
    specimenSentences: [
      {
        hanzi: "换一个宽广的维度审视，失败未尝不是通往智慧的必由之路。",
        pinyin: "Huàn yí gè kuānguǎng de wéidù shěnshì, shībài wèicháng bú shì tōng wǎng zhìhuì de bì yóu zhī lù.",
        translation: "Memandang dari dimensi yang lebih lapang, kegagalan bukan berarti bukan jalan mutlak menuju kebijaksanaan.",
        focusNote: "Sanggahan filosofis halus bernada afirmatif.",
      },
      {
        hanzi: "面对故乡的沧桑巨变，游子的内心何尝没有泛起阵阵思念？",
        pinyin: "Miànduì gùxiāng de cāngsāng jùbiàn, yóuzǐ de nèixīn hécháng méiyǒu fàn qǐ zhènzhèn sīniàn?",
        translation: "Menyaksikan perubahan tanah leluhur yang begitu dahsyat, mana pernah di dalam sanubari perantau tidak terbit gelombang kerinduan?",
        focusNote: "Pertanyaan retoris sastra menegaskan kerinduan mendalam.",
      },
      {
        hanzi: "这种看似保守的策略，在当下复杂局势下未尝不是一种明智的选择。",
        pinyin: "Zhè zhǒng kàn sì bǎoshǒu de cèlüè, zài dāngxià fùzá júshì xià wèicháng bú shì yì zhǒng míngzhì de xuǎnzé.",
        translation: "Strategi yang sekilas tampak konservatif ini, di tengah situasi pelik saat ini bukan berarti bukan sebuah pilihan yang bijaksana.",
        focusNote: "Evaluasi strategis yang berhati-hati.",
      },
    ],
  },
  {
    id: "hsk5-g03",
    patternNumber: "03",
    ruleTitle: "Evolusi Tren Kumulatif: 日益 (Rìyì) & 日渐 (Rìjiàn)",
    formula: "Subjek + 日益 / 日渐 + Kata Sifat / Kata Kerja Tren",
    explanation:
      "Digunakan dalam wacana jurnalistik dan analitis untuk melukiskan fenomena sosial, transformasi budaya, atau kondisi alam yang berevolusi secara gradual namun pasti dari hari ke hari.",
    keyRule:
      "Setara dengan 'kian hari kian...' atau 'semakin hari semakin...'. Sering mendampingi kata sifat abstrak seperti 密切 (erat), 突出 (menonjol), 完善 (sempurna).",
    specimenSentences: [
      {
        hanzi: "随着国际化进程的推进，跨文化交际能力的重要性日益凸显。",
        pinyin: "Suízhe guójìhuà jìnchéng de tuījìn, kuà wénhuà jiāojì nénglì de zhòngyàoxìng rìyì tūxiǎn.",
        translation: "Seiring bergulirnya proses internasionalisasi, urgensi kemampuan komunikasi lintas budaya semakin hari semakin tampak menonjol.",
        focusNote: "Menekankan tren kompetensi global.",
      },
      {
        hanzi: "经过多年的生态治理，这座古老城市的空气质量日渐改善。",
        pinyin: "Jīngguò duō nián de shēngtài zhìlǐ, zhè zuò gǔlǎo chéngshì de kōngqì zhìliàng rìjiàn gǎishàn.",
        translation: "Melalui pemulihan ekologis bertahun-tahun, mutu udara di kota kuno ini kian hari kian membaik.",
        focusNote: "Proses pemulihan lingkungan yang berkesinambungan.",
      },
      {
        hanzi: "现代社会中，公共卫生与身心健康保障机制正日益走向完善。",
        pinyin: "Xiàndài shèhuì zhōng, gōnggòng wèishēng yǔ shēnxīn jiànkāng bǎozhàng jīzhì zhèng rìyì zǒuwǎng wánshàn.",
        translation: "Dalam masyarakat modern, mekanisme penjaminan kesehatan publik dan mental secara bertahap kian menuju taraf kesempurnaan.",
        focusNote: "Perkembangan institusi kesejahteraan masyarakat.",
      },
    ],
  },
  {
    id: "hsk5-g04",
    patternNumber: "04",
    ruleTitle: "Inferensi Rasional & Keniscayaan: 想必 (Xiǎngbì) & 势必 (Shìbì)",
    formula: "Subjek + 想必 + Dugaan Rasional / Kondisi, 势必 + Konsekuensi Tak Terhindarkan",
    explanation:
      "想必 menyatakan perkiraan bernalar tinggi yang berlandaskan data logis (kiranya pastilah). 势必 menandakan dampak sebab-akibat objektif yang niscaya terjadi di masa mendatang.",
    keyRule:
      "想必 berakar pada inferensi subjektif yang meyakinkan, sedangkan 势必 berakar pada hukum objektif perkembangan suatu tren (pasti akan berakibat).",
    specimenSentences: [
      {
        hanzi: "历经数月的艰辛探索，科研团队想必已经掌握了核心突破口。",
        pinyin: "Lìjīng shù yuè de jiānxīn tànsuǒ, kēyán tuánduì xiǎngbì yǐjīng zhǎngwò le héxīn tūtòukǒu.",
        translation: "Menjalani penjelajahan melelahkan selama berbulan-bulan, tim peneliti kiranya pastilah telah memegang kunci terobosan utamanya.",
        focusNote: "Inferensi berdasar rekam jejak dedikasi riset.",
      },
      {
        hanzi: "如果忽视环境保护盲目开发，势必会招致大自然的严厉惩罚。",
        pinyin: "Rúguǒ hūshì huánjìng bǎohù mángmù kāifā, shìbì huì zhāozhì dàzìrán de yánlì chéngfá.",
        translation: "Jika mengabaikan kelestarian lingkungan dan mengeksploitasi secara membabi buta, niscaya akan mendatangkan hukuman keras dari alam raya.",
        focusNote: "Keniscayaan hukum kausalitas ekologi.",
      },
      {
        hanzi: "人工智能与实体产业的深度融合，势必重塑未来的就业结构。",
        pinyin: "Réngōng zhìnéng yǔ shítǐ chǎnyè de shēndù rónghé, shìbì chóngshù wèilái de jiùyè jiégòu.",
        translation: "Integrasi mendalam antara kecerdasan buatan dan industri riil niscaya akan merestrukturisasi tatanan lapangan kerja masa depan.",
        focusNote: "Prediksi keniscayaan disrupsi teknologi.",
      },
    ],
  },
  {
    id: "hsk5-g05",
    patternNumber: "05",
    ruleTitle: "Pilihan Konsesi Etis: 宁可...也(不)... (Nìngkě... Yě [Bù]...)",
    formula: "宁可 + Pengorbanan Pahit, 也要 + Mempertahankan Nilai / 也不 + Menolak Kompromi Moral",
    explanation:
      "Mengekspresikan keteguhan moral dan pendirian etis: rela menanggung kerugian material atau penderitaan pribadi demi membela kebenaran, integritas luhur, atau martabat.",
    keyRule:
      "Berbeda dari sekadar preferensi santai, 宁可 mengandung bobot kesungguhan tekad dan kesiapan menanggung risiko.",
    specimenSentences: [
      {
        hanzi: "真正的学者宁可忍受物质上的清贫，也要捍卫学术研究的真理与严谨。",
        pinyin: "Zhēnzhèng de xuézhě nìngkě rěnshòu wùzhì shang de qīngpín, yě yào hànwèi xuéshù yánjiū de zhēnlǐ yǔ yánjǐn.",
        translation: "Ilmuwan sejati lebih memilih tabah menanggung kesederhanaan materi, demi membela kebenaran dan ketelitian riset akademis.",
        focusNote: "Keteguhan integritas intelektual.",
      },
      {
        hanzi: "企业宁可短期利益受损，也绝不降低产品的安全检测标准。",
        pinyin: "Qǐyè nìngkě duǎnqī lìyì shòusǔn, yě juébù jiàngdī chǎnpǐn de ānquán jiǎncè biāozhǔn.",
        translation: "Perusahaan lebih memilih menderita penurunan laba jangka pendek, daripada menurunkan standar uji keamanan produk.",
        focusNote: "Tanggung jawab etika korporasi.",
      },
      {
        hanzi: "他宁可通宵达旦加班，也要确保向用户交付无懈可击的高品质成果。",
        pinyin: "Tā nìngkě tōngxiāodádàn jiābān, yě yào quèbǎo xiàng yònghù jiāofù wúxièkějī de gāo pǐnzhì chéngguǒ.",
        translation: "Dia lebih memilih bekerja semalam suntuk, demi memastikan terserahkannya karya bermutu prima tanpa cela kepada pengguna.",
        focusNote: "Etos dedikasi profesional tanpa kompromi.",
      },
    ],
  },
  {
    id: "hsk5-g06",
    patternNumber: "06",
    ruleTitle: "Sintesis Penutup Wacana: 总而言之 (Zǒng'éryánzhī) & 综上所述",
    formula: "总而言之 / 综上所述, Sintesis Logis / Rekomendasi Pamungkas",
    explanation:
      "Penanda diskursus penutup formal dalam esai analitis, pidato resmi, atau karya ilmiah untuk mengikat seluruh premis argumen menjadi sebuah kesimpulan konseptual yang padat.",
    keyRule:
      "Selalu diletakkan di awal paragraf konklusi atau kalimat penutup, dipisahkan dengan tanda koma.",
    specimenSentences: [
      {
        hanzi: "总而言之，保持身心平衡与持续学习是实现人生长久幸福的根本基石。",
        pinyin: "Zǒng'éryánzhī, bǎochí shēnxīn pínghéng yǔ chíxù xuéxí shì shíxiàn rénshēng chángjiǔ xìngfú de gēnběn jīshí.",
        translation: "Singkatnya, menjaga keseimbangan jiwa raga serta tekun belajar berkelanjutan adalah batu penjuru utama mewujudkan kebahagiaan hidup sejati.",
        focusNote: "Konklusi filosofis penutup wacana.",
      },
      {
        hanzi: "综上所述，唯有秉持开放包容的理念，方能共创人类命运共同体的美好愿景。",
        pinyin: "Zōng shàng suǒ shù, wéiyǒu bǐngchí kāifàng bāoróng de lǐniàn, fāng néng gòng chuàng rénlèi mìngyùn gòngtóngtǐ de měihǎo yuànjǐng.",
        translation: "Berdasarkan seluruh uraian di atas, hanya dengan memegang teguh semangat keterbukaan dan toleransi, barulah mampu bersama-sama merajut asa luhur masa depan kemanusiaan.",
        focusNote: "Konklusi wacana kerja sama peradaban internasional.",
      },
      {
        hanzi: "总而言之，科技应当服务于人的尊严，而不是让人成为技术的附庸。",
        pinyin: "Zǒng'éryánzhī, kējì yīngdāng fúwù yú rén de zūnyán, ér bú shì ràng rén chéngwéi jìshù de fùyōng.",
        translation: "Intinya, teknologi selayaknya mengabdi pada harkat martabat manusia, bukan justru menjadikan manusia sebagai budak teknologi.",
        focusNote: "Sintesis etika humanisme di era sains modern.",
      },
    ],
  },
];

export const HSK5_LESSON_BLUEPRINTS: Hsk5LessonBlueprint[] = [
  {
    id: "hsk5-lesson-21",
    slug: "21",
    lessonNumber: 21,
    title: "Sains & Inovasi Teknologi Masa Depan",
    hanzi: "科技创新与未来图景",
    pinyin: "Kējì Chuàngxīn yǔ Wèilái Tújǐng",
    translation: "Kecerdasan Buatan, Etika Sains & Otomasi Global",
    objectives:
      "Membahas disrupsi kecerdasan buatan, menggunakan pola inferensi 势必 untuk dampak ekonomi digital, dan menimbang batas etika sains.",
    overview:
      "Unit pembuka HSK 5 mengkaji evolusi teknologi cerdas: bagaimana otomatisasi komputasi mendisrupsi dunia kerja, serta tanggung jawab etis dalam pengembangan algoritma.",
    primaryGrammarId: "hsk5-g04",
    vocabCount: 28,
    estimatedMinutes: 26,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Pakar Kecerdasan Buatan",
        hanzi: "随着深度学习算法的突破，生成式人工智能技术在各行各业的应用正日益普及。",
        pinyin: "Suízhe shēndù xuéxí suànfǎ de tūtò, shēngchéngshì réngōng zhìnéng jìshù zài gè háng gè yè de yìngyòng zhèng rìyì pǔjí.",
        translation: "Seiring terobosan algoritma deep learning, penerapan teknologi AI generatif di berbagai sektor industri kian hari kian memasyarakat.",
      },
      {
        speaker: "B",
        role: "Filsuf Etika Sains",
        hanzi: "技术带来的生产力跃升令人惊叹，但其对传统就业结构的冲击势必引发深刻的社会思考。",
        pinyin: "Jìshù dài lái de shēngchǎnlì yuèshēng lìngrén jīngtàn, dàn qí duì chuántǒng jiùyè jiégòu de chōngjī shìbì yǐnfā shēnkè de shèhuì sīkǎo.",
        translation: "Lompatan produktivitas yang dihantarkan sains sungguh memukau, namun benturannya terhadap struktur lapangan kerja niscaya memicu refleksi sosial mendalam.",
      },
      {
        speaker: "A",
        role: "Pakar Kecerdasan Buatan",
        hanzi: "对于研发者而言，技术创新未尝不需要法律与伦理框架的审慎约束。",
        pinyin: "Duìyú yánfāzhě ér yán, jìshù chuàngxīn wèicháng bù xūyào fǎlǜ yǔ lúnlǐ kuàngjià de shěnshèn yuēshù.",
        translation: "Bagi para pengembang riset, inovasi teknologi bukan berarti tidak memerlukan pembatasan cermat dari kerangka hukum dan etika.",
      },
      {
        speaker: "B",
        role: "Filsuf Etika Sains",
        hanzi: "总而言之，技术演进的终极旨归，应当是增进全人类的福祉与文明尊严。",
        pinyin: "Zǒng'éryánzhī, jìshù yǎnjìn de zhōngjí zhǐguī, yīngdāng shì zēngjìn quán rénlèi de fúzhǐ yǔ wénmíng zūnyán.",
        translation: "Singkatnya, muara pamungkas evolusi teknologi selayaknya adalah mempertinggi kesejahteraan segenap umat manusia serta martabat peradaban.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "日益", pinyin: "rìyì", translation: "semakin hari semakin", tag: "Keterangan" },
      { hanzi: "势必", pinyin: "shìbì", translation: "niscaya / pasti akan berakibat", tag: "Keterangan" },
      { hanzi: "未尝", pinyin: "wèicháng", translation: "bukan berarti tidak", tag: "Keterangan" },
      { hanzi: "总而言之", pinyin: "zǒng'éryánzhī", translation: "singkatnya / intinya", tag: "Frasa Konjungsi" },
      { hanzi: "突破", pinyin: "tūtò", translation: "terobosan kemajuan", tag: "Kata Kerja" },
    ],
  },
  {
    id: "hsk5-lesson-22",
    slug: "22",
    lessonNumber: 22,
    title: "Warisan Arsitektur & Pelestarian Sejarah",
    hanzi: "历史遗产与建筑保护",
    pinyin: "Lìshǐ Yíchǎn yǔ Jiànzhù Bǎohù",
    translation: "Konservasi Kota Kuno, Nilai Estetika & Memori Kolektif",
    objectives:
      "Menganalisis dilema antara modernisasi perkotaan dan pelestarian cagar budaya, menggunakan pola 自...以来 untuk narasi waktu, dan mengapresiasi kearifan arsitektur kuno.",
    overview:
      "Unit kedua menelaah konservasi cagar budaya Tiongkok: menjaga keaslian struktur kayu warisan dinasti, tata ruang berfilosofi Fengshui, dan merawat memori peradaban.",
    primaryGrammarId: "hsk5-g01",
    vocabCount: 28,
    estimatedMinutes: 26,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Arsitek Pelestarian",
        hanzi: "自明清两代以来，这处古建聚落保留了极其完整的木构榫卯工艺与传统空间格局。",
        pinyin: "Zì Míng Qīng liǎng dài yǐlái, zhè chù gǔjiàn jùluò bǎoliú le jíqí wánzhěng de mùgòu sǔnmǎo gōngyì yǔ chuántǒng kōngjiān géjú.",
        translation: "Semenjak era Dinasti Ming dan Qing, kompleks arsitektur kuno ini mempertahankan keutuhan sambungan purus kayu pasak serta tata ruang tradisional.",
      },
      {
        speaker: "B",
        role: "Perencana Kota",
        hanzi: "在现代化城市拓展过程中，一些人曾主张彻底拆除改造，其实这种做法未免太短视了。",
        pinyin: "Zài xiàndàihuà chéngshì tuòzhǎn guòchéng zhōng, yì xiē rén céng zhǔzhāng chèdǐ chāichú gǎizào, qíshí zhè zhǒng zuòfǎ wèimiǎn tài duǎnshì le.",
        translation: "Dalam proses perluasan kota modern, sebagian pihak sempat mengusulkan pembongkaran total, sebenarnya tindakan semacam ini sungguh terlampau picik.",
      },
      {
        speaker: "A",
        role: "Arsitek Pelestarian",
        hanzi: "文化遗产不仅是凝固的艺术史诗，更维系着一个民族不可替代的情感根脉。",
        pinyin: "Wénhuà yíchǎn bùjǐn shì nínggù de yìshù shǐshī, gèng wéixì zhe yí gè mínzú bùkě tìdài de qínggǎn gēnmài.",
        translation: "Warisan budaya bukan hanya epik seni yang membeku, melainkan merawat urat nadi emosional bangsa yang tak tergantikan.",
      },
      {
        speaker: "B",
        role: "Perencana Kota",
        hanzi: "保护历史街区，宁可牺牲部分短期商业收益，也要让历史文脉薪火相传、生生不息。",
        pinyin: "Bǎohù lìshǐ jiēqū, nìngkě xīshēng bùfen duǎnqī shāngyè shòuyì, yě yào ràng lìshǐ wénmài xīnhuǒ xiāngchuán, shēngshēngbùxī.",
        translation: "Melindungi kawasan bersejarah, lebih memilih mengorbankan sebagian laba bisnis jangka pendek, demi membiarkan mata rantai sejarah terus bersambung tanpa putus.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "遗产", pinyin: "yíchǎn", translation: "warisan cagar budaya", tag: "Kata Benda" },
      { hanzi: "自", pinyin: "zì", translation: "semenjak / dari", tag: "Preposisi" },
      { hanzi: "格局", pinyin: "géjú", translation: "tata ruang / struktur pola", tag: "Kata Benda" },
      { hanzi: "牺牲", pinyin: "xīshēng", translation: "mengorbankan / pengorbanan", tag: "Kata Kerja" },
      { hanzi: "脉络", pinyin: "màiluò", translation: "mata rantai / benang merah", tag: "Kata Benda" },
    ],
  },
  {
    id: "hsk5-lesson-23",
    slug: "23",
    lessonNumber: 23,
    title: "Ekonomi Hijau & Pembangunan Berkelanjutan",
    hanzi: "绿色经济与可持续发展",
    pinyin: "Lǜsè Jīngjì yǔ Kěchíxù Fāzhǎn",
    translation: "Transisi Energi, Netralitas Karbon & Ekologi Sirkular",
    objectives:
      "Membahas target netralitas karbon, menggunakan pola konsesi etis 宁可...也... dalam kebijakan energi, dan memaparkan sirkulasi ekonomi hijau.",
    overview:
      "Unit ketiga mendalami isu krusial global: transformasi dari ketergantungan bahan bakar fosil menuju energi surya dan angin, serta perombakan rantai pasok industri ramah lingkungan.",
    primaryGrammarId: "hsk5-g05",
    vocabCount: 28,
    estimatedMinutes: 26,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Ekonom Lingkungan",
        hanzi: "面对全球气候变暖的严峻挑战，走低碳循环的绿色发展之路已成国际共识。",
        pinyin: "Miànduì quánqiú qìhòu biànnuǎn de yánjùn tiǎozhàn, zǒu dī tàn xúnhuán de lǜsè fāzhǎn zhī lù yǐ chéng guójì gòngshí.",
        translation: "Menghadapi tantangan keras pemanasan iklim global, menempuh jalur pembangunan hijau rendah karbon telah menjadi konsensus internasional.",
      },
      {
        speaker: "B",
        role: "Pelaku Industri Hijau",
        hanzi: "许多前瞻性制造企业宁可增加研发投入，也要淘汰高污染落后产能。",
        pinyin: "Xǔduō qiánzhānxìng zhìzào qǐyè nìngkě zēngjiā yánfā tóurù, yě yào táotài gāo wūrǎn luòhòu chǎnnéng.",
        translation: "Banyak korporasi manufaktur visioner lebih memilih menambah investasi riset, demi mengeliminasi kapasitas produksi polutif dan usang.",
      },
      {
        speaker: "A",
        role: "Ekonom Lingkungan",
        hanzi: "凭借在太阳能与新能源汽车领域的持续深耕，我们在全球绿色供应链中占据了重要先机。",
        pinyin: "Píngjiè zài tàiyángnéng yǔ xīn néngyuán qìchē lǐngyù de chíxù shēngēng, wǒmen zài quánqiú lǜsè gōngyìngliàn zhōng zhànjù le zhòngyào xiānjī.",
        translation: "Berlandaskan ketekunan mendalam di ranah energi surya dan mobil listrik, kita menduduki peluang strategis utama dalam rantai pasok hijau global.",
      },
      {
        speaker: "B",
        role: "Pelaku Industri Hijau",
        hanzi: "综上所述，经济增长与青山绿水并非对立，二者完全可以在高质量发展中实现动态共赢。",
        pinyin: "Zōng shàng suǒ shù, jīngjì zēngzhǎng yǔ qīngshānlǜshuǐ bìngfēi duìlì, èr zhě wánquán kěyǐ zài gāo zhìliàng fāzhǎn zhōng shíxiàn dòngtài gòngyíng.",
        translation: "Berdasarkan uraian di atas, pertumbuhan ekonomi dan kelestarian alam bukanlah hal yang bertolak belakang; keduanya dapat meraih sinergi unggul bersama.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "宁可", pinyin: "nìngkě", translation: "lebih memilih / rela", tag: "Konjungsi" },
      { hanzi: "凭", pinyin: "píng", translation: "berdasarkan / mengandalkan", tag: "Preposisi" },
      { hanzi: "综上所述", pinyin: "zōng shàng suǒ shù", translation: "berdasarkan uraian di atas", tag: "Frasa Konjungsi" },
      { hanzi: "淘汰", pinyin: "táotài", translation: "mengeliminasi / menyeleksi gugur", tag: "Kata Kerja" },
      { hanzi: "共赢", pinyin: "gòngyíng", translation: "saling menguntungkan / win-win", tag: "Kata Kerja" },
    ],
  },
  {
    id: "hsk5-lesson-24",
    slug: "24",
    lessonNumber: 24,
    title: "Sastra, Seni Rupa & Apresiasi Estetika",
    hanzi: "文学艺术与审美情趣",
    pinyin: "Wénxué Yìshù yǔ Shěnměi Qíngqù",
    translation: "Puisi Klasik, Lukisan Tinta & Filosofi Ruang Kosong",
    objectives:
      "Menganalisis estetika ruang kosong (*liúbái*) dalam lukisan Tiongkok, menggunakan pola 未尝 untuk renungan sastra, dan mendiskusikan metafora puisi kuno.",
    overview:
      "Unit keempat melatih pembelajar menikmati seni tinggi Tiongkok: falsafah kaligrafi, keheningan puisi Dinasti Tang/Song, dan cara membedah kritik sastra analitis.",
    primaryGrammarId: "hsk5-g02",
    vocabCount: 28,
    estimatedMinutes: 26,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Kurator Galeri Seni",
        hanzi: "中国传统水墨画最讲究‘意在笔先’与‘计白当黑’的留白艺术。",
        pinyin: "Zhōngguó chuántǒng shuǐmòhuà zuì jiǎngjiu 'yì zài bǐ xiān' yǔ 'jì bái dāng hēi' de liúbái yìshù.",
        translation: "Lukisan tinta tradisional Tiongkok paling menjunjung seni ruang kosong: 'makna mendahului goresan kuas' dan 'memperlakukan bidang putih sebagai isi'.",
      },
      {
        speaker: "B",
        role: "Peminat Sastra Klasik",
        hanzi: "看似空无一物的水面与云雾，未尝不是留给鉴赏者无尽遐想的诗意空间。",
        pinyin: "Kàn sì kōng wú yí wù de shuǐmiàn yǔ yúnwù, wèicháng bú shì liú gěi jiànshǎngzhě wújìn xiáxiǎng de shīyì kōngjiān.",
        translation: "Permukaan air dan kabut yang sekilas kosong melompong, bukan berarti bukan ruang puitis bagi penikmat seni untuk berimajinasi tanpa batas.",
      },
      {
        speaker: "A",
        role: "Kurator Galeri Seni",
        hanzi: "历代文人墨客凭一管毛笔挥洒胸中丘壑，将自然造化与人文精神融为一体。",
        pinyin: "Lìdài wénrénmòkè píng yì guǎn máobǐ huīsǎ xiōng zhōng qiūhè, jiāng zìrán zàohuà yǔ rénwén jīngshén róng wéi yītǐ.",
        translation: "Para sastrawan lintas zaman mengandalkan sebatang kuas menorehkan keagungan alam di dalam dadanya, meleburkan keindahan alam dan jiwa humaniora menjadi satu kesatuan.",
      },
      {
        speaker: "B",
        role: "Peminat Sastra Klasik",
        hanzi: "这种崇尚自然、追求空灵超脱的审美追求，在喧嚣浮躁的当下尤显珍贵。",
        pinyin: "Zhè zhǒng chóngshàng zìrán, zhuīqiú kōnglíng chāotuō de shěnměi zhuīqiú, zài xuānxiāo fúzào de dāngxià yóu xiǎn zhēnguì.",
        translation: "Cita rasa estetika yang menjunjung alam dan mengejar transendensi batin ini, di tengah riuhnya zaman saat ini terasa amat sangat berharga.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "留白", pinyin: "liúbái", translation: "seni ruang kosong bermakna", tag: "Kata Benda" },
      { hanzi: "遐想", pinyin: "xiáxiǎng", translation: "imajinasi mengembara jauh", tag: "Kata Kerja" },
      { hanzi: "超脱", pinyin: "chāotuō", translation: "transenden / lepas bebas", tag: "Kata Sifat" },
      { hanzi: "审美", pinyin: "shěnměi", translation: "apresiasi estetika keindahan", tag: "Kata Benda" },
      { hanzi: "造诣", pinyin: "zàoyì", translation: "kemahiran karya seni tinggi", tag: "Kata Benda" },
    ],
  },
  {
    id: "hsk5-lesson-25",
    slug: "25",
    lessonNumber: 25,
    title: "Filsafat Harmoni & Dialog Peradaban",
    hanzi: "文明互鉴与和谐哲学",
    pinyin: "Wénmíng Hùjiàn yǔ Héxié Zhéxué",
    translation: "Kesalingterhubungan Global, Sintesis Etis & Masa Depan Bersama",
    objectives:
      "Merangkum dialektika peradaban dunia, menggunakan pola 总而言之 untuk konklusi pemikiran filosofis, dan menyuarakan visi masa depan harmonis multikultural.",
    overview:
      "Unit penutup kurikulum HSK 5 merangkum sintesis puncak kemahiran berbahasa Mandarin: menyusun wacana berbobot intelektual tinggi mengenai dialog antar-peradaban dunia (*hé ér bù tóng*: harmoni dalam keberagaman).",
    primaryGrammarId: "hsk5-g06",
    vocabCount: 30,
    estimatedMinutes: 28,
    dialogueSpecimen: [
      {
        speaker: "A",
        role: "Filsuf Dialog Antarbangsa",
        hanzi: "古老中华哲学所倡导的‘和而不同’思想，为当今多元世界的和平共处提供了深刻启示。",
        pinyin: "Gǔlǎo Zhōnghuá zhéxué suǒ chàngdǎo de 'hé ér bù tóng' sīxiǎng, wèi dāngjīn duōyuán shìjiè de hépíng gòngchǔ tígōng le shēnkè qǐshì.",
        translation: "Pemikiran 'harmoni dalam keberagaman' yang diajarkan filosofi Tiongkok kuno menghantarkan inspirasi mendalam bagi koeksistensi damai dunia yang majemuk saat ini.",
      },
      {
        speaker: "B",
        role: "Diplomat Kebudayaan Global",
        hanzi: "各国文明因交流而多彩，因互鉴而丰富。傲慢与偏见势必加剧分歧，唯有对话方能增进互信。",
        pinyin: "Gè guó wénmíng yīn jiāoliú ér duōcǎi, yīn hùjiàn ér fēngfù. Àomàn yǔ piānjiàn shìbì jiājù fēnqí, wéiyǒu duìhuà fāng néng zēngjìn hùxìn.",
        translation: "Peradaban bangsa-bangsa kian berwarna berkat interaksi, kian kaya berkat saling belajar. Keangkuhan dan prasangka niscaya memperparah perselisihan, hanya dialog yang sanggup menumbuhkan saling percaya.",
      },
      {
        speaker: "A",
        role: "Filsuf Dialog Antarbangsa",
        hanzi: "面对气候、公共安全等全球性危机，任何单一文明都无法独善其身。",
        pinyin: "Miànduì qìhòu, gōnggòng ānquán děng quánqiúxìng wēijī, rènhé dānyī wénmíng dōu wúfǎ dúshànqíshēn.",
        translation: "Menghadapi krisis global seperti iklim dan keselamatan umum, tidak ada peradaban tunggal mana pun yang mampu bertahan menyendiri.",
      },
      {
        speaker: "B",
        role: "Diplomat Kebudayaan Global",
        hanzi: "总而言之，以宽广包容的胸怀拥抱文明多样性，正是我们通向持久和平与共同繁荣的必由之路。",
        pinyin: "Zǒng'éryánzhī, yǐ kuānguǎng bāoróng de xiōnghuái yōngbào wénmíng duōyàngxìng, zhèng shì wǒmen tōng xiàng chíjiǔ hépíng yǔ gòngtóng fánróng de bì yóu zhī lù.",
        translation: "Singkatnya, merengkuh keragaman peradaban dengan kelapangan dada dan toleransi luhur, sesungguhnya adalah jalan niscaya menuju perdamaian abadi dan kemakmuran bersama.",
      },
    ],
    keyVocabPreview: [
      { hanzi: "互鉴", pinyin: "hùjiàn", translation: "saling berkaca / belajar timbal balik", tag: "Kata Kerja" },
      { hanzi: "和而不同", pinyin: "hé ér bù tóng", translation: "harmoni dalam keberagaman", tag: "Idiom Chengyu" },
      { hanzi: "繁荣", pinyin: "fánróng", translation: "kemakmuran pesat", tag: "Kata Sifat" },
      { hanzi: "启示", pinyin: "qǐshì", translation: "ilham / pencerahan inspiratif", tag: "Kata Benda" },
      { hanzi: "胸怀", pinyin: "xiōnghuái", translation: "kelapangan dada / wawasan batin", tag: "Kata Benda" },
    ],
  },
];

export const HSK5_THEME_CATEGORIES: Hsk5ThemeCategory[] = [
  {
    id: "cat-science-future",
    title: "Sains & Inovasi Masa Depan",
    description: "Kecerdasan buatan, bioinformatika, etika riset, dan eksplorasi angkasa.",
    wordsCount: 260,
  },
  {
    id: "cat-architecture-heritage",
    title: "Arsitektur & Warisan Budaya",
    description: "Konservasi kota kuno, arkeologi, estetika tata ruang, dan sejarah bangsa.",
    wordsCount: 260,
  },
  {
    id: "cat-green-economy",
    title: "Ekonomi Hijau & Keberlanjutan",
    description: "Transisi energi, dekarbonisasi industri, rantai pasok sirkular, dan ekologi.",
    wordsCount: 260,
  },
  {
    id: "cat-arts-literature",
    title: "Sastra, Puisi & Seni Rupa",
    description: "Falsafah kaligrafi, lukisan tinta klasik, kritik estetika, dan karya sastra.",
    wordsCount: 260,
  },
  {
    id: "cat-civilization-philosophy",
    title: "Filsafat & Dialog Peradaban",
    description: "Harmoni multikultural, etika kenegaraan, koeksistensi global, dan visi bersama.",
    wordsCount: 260,
  },
];

export const HSK5_VOCABULARY_PREVIEWS: Hsk5VocabWord[] = [
  // 1. Sains & Inovasi Masa Depan
  {
    id: "hsk5-v001",
    hanzi: "突破",
    pinyin: "tūtò",
    translation: "terobosan kemajuan pesat",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Sains & Inovasi Masa Depan",
    sampleSentence: {
      hanzi: "量子计算领域的重大突破将彻底革新数据加密体系。",
      pinyin: "Liàngzǐ jìsuàn lǐngyù de zhòngdà tūtò jiāng chèdǐ géxīn shùjù jiāmì tǐxì.",
      translation: "Terobosan penting di bidang komputasi kuantum akan merevolusi total sistem enkripsi data.",
    },
  },
  {
    id: "hsk5-v002",
    hanzi: "日渐",
    pinyin: "rìjiàn",
    translation: "kian hari kian bertambah",
    partOfSpeech: "Keterangan",
    themeCategory: "Sains & Inovasi Masa Depan",
    sampleSentence: {
      hanzi: "随着芯片工艺日渐精湛，算力成本正在大幅下降。",
      pinyin: "Suízhe xīnpiàn gōngyì rìjiàn jīngzhàn, suànlì chéngběn zhèngzài dà fú xiàjiàng.",
      translation: "Seiring fabrikasi mikrochip kian hari kian presisi, ongkos daya komputasi kian merosot drastis.",
    },
  },
  {
    id: "hsk5-v003",
    hanzi: "势必",
    pinyin: "shìbì",
    translation: "niscaya / pasti akan berakibat",
    partOfSpeech: "Keterangan",
    themeCategory: "Sains & Inovasi Masa Depan",
    sampleSentence: {
      hanzi: "自动驾驶技术的商业化普及势必对城市交通规划产生深远影响。",
      pinyin: "Zìdòng jiàshǐ jìshù de shāngyèhuà pǔjí shìbì duì chéngshì jiāotōng guīhuà chǎnshēng shēnyuǎn yǐngxiǎng.",
      translation: "Komersialisasi teknologi kemudi otomatis niscaya membawa pengaruh mendalam bagi tata ruang transportasi kota.",
    },
  },
  {
    id: "hsk5-v004",
    hanzi: "前瞻",
    pinyin: "qiánzhān",
    translation: "visioner / pandangan ke depan",
    partOfSpeech: "Kata Sifat",
    themeCategory: "Sains & Inovasi Masa Depan",
    sampleSentence: {
      hanzi: "制定科技战略必须具备深远的前瞻眼光与审慎态度。",
      pinyin: "Zhìdìng kējì zhànlüè bìxū jùbèi shēnyuǎn de qiánzhān yǎnguāng yǔ shěnshèn tàidù.",
      translation: "Menyusun peta jalan strategi sains wajib berbekal visi masa depan yang jauh serta sikap penuh kehati-hatian.",
    },
  },

  // 2. Arsitektur & Warisan Budaya
  {
    id: "hsk5-v005",
    hanzi: "遗产",
    pinyin: "yíchǎn",
    translation: "warisan cagar budaya bersejarah",
    partOfSpeech: "Kata Benda",
    themeCategory: "Arsitektur & Warisan Budaya",
    sampleSentence: {
      hanzi: "长城与故宫是全人类共同守护的宝贵物质文化遗产。",
      pinyin: "Chángchéng yǔ Gùgōng shì quán rénlèi gòngtóng shǒuhù de bǎoguì wùzhì wénhuà yíchǎn.",
      translation: "Tembok Besar dan Kota Terlarang adalah cagar budaya ragawi tak ternilai yang dijaga bersama oleh seluruh umat manusia.",
    },
  },
  {
    id: "hsk5-v006",
    hanzi: "格局",
    pinyin: "géjú",
    translation: "tata ruang / struktur pola tatanan",
    partOfSpeech: "Kata Benda",
    themeCategory: "Arsitektur & Warisan Budaya",
    sampleSentence: {
      hanzi: "北京四合院严谨对称的空间格局体现了深厚的中庸礼制思想。",
      pinyin: "Běijīng sìhéyuàn yánjǐn duìchèn de kōngjiān géjú tǐxiàn le shēnhòu de zhōngyōng lǐzhì sīxiǎng.",
      translation: "Tata ruang Siheyuan Beijing yang simetris dan rapi mencerminkan filosofi tatanan harmoni dan etika luhur yang mendalam.",
    },
  },
  {
    id: "hsk5-v007",
    hanzi: "造诣",
    pinyin: "zàoyì",
    translation: "pencapaian kemahiran seni tinggi",
    partOfSpeech: "Kata Benda",
    themeCategory: "Arsitektur & Warisan Budaya",
    sampleSentence: {
      hanzi: "古代工匠在木构榫卯结构上的造诣令人叹为观止。",
      pinyin: "Gǔdài gōngjiàng zài mùgòu sǔnmǎo jiégòu shang de zàoyì lìngrén tànwéiguānzhǐ.",
      translation: "Kemahiran para perajin kuno dalam struktur sambungan kayu purus pasak sungguh memicu kekaguman luar biasa.",
    },
  },

  // 3. Ekonomi Hijau & Keberlanjutan
  {
    id: "hsk5-v008",
    hanzi: "淘汰",
    pinyin: "táotài",
    translation: "mengeliminasi / menyeleksi gugur",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Ekonomi Hijau & Keberlanjutan",
    sampleSentence: {
      hanzi: "依法坚决淘汰落后产能，是推动产业结构绿色转型的关键抓手。",
      pinyin: "Yīfǎ jiānjué táotài luòhòu chǎnnéng, shì tuīdòng chǎnyè jiégòu lǜsè zhuǎnxíng de guānjiàn zhuāshǒu.",
      translation: "Tegas mengeliminasi kapasitas industri usang berdasarkan hukum adalah pilar kunci transformasi hijau struktur industri.",
    },
  },
  {
    id: "hsk5-v009",
    hanzi: "共赢",
    pinyin: "gòngyíng",
    translation: "saling menguntungkan / sinergi menang bersama",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Ekonomi Hijau & Keberlanjutan",
    sampleSentence: {
      hanzi: "推进区域绿色低碳发展合作，旨在实现环境与经济的多方共赢。",
      pinyin: "Tuījìn qūyù lǜsè dī tàn fāzhǎn hézuò, zhǐ zài shíxiàn huánjìng yǔ jīngjì de duō fāng gòngyíng.",
      translation: "Mendorong kemitraan pembangunan regional rendah karbon bertujuan mewujudkan keuntungan bersama multipihak antara lingkungan dan ekonomi.",
    },
  },
  {
    id: "hsk5-v010",
    hanzi: "凭",
    pinyin: "píng",
    translation: "berdasarkan / bersandarkan pada",
    partOfSpeech: "Preposisi",
    themeCategory: "Ekonomi Hijau & Keberlanjutan",
    sampleSentence: {
      hanzi: "凭着严谨的碳足迹监测机制，该基地成功通过了国际绿标认证。",
      pinyin: "Píng zhe yánjǐn de tàn zújì jiāncè jīzhì, gāi jīdì chénggōng tōngguò le guójì lǜ biāo rènzhèng.",
      translation: "Berlandaskan mekanisme monitoring jejak karbon yang ketat, pangkalan tersebut sukses meraih sertifikasi label hijau internasional.",
    },
  },

  // 4. Sastra, Puisi & Seni Rupa
  {
    id: "hsk5-v011",
    hanzi: "未尝",
    pinyin: "wèicháng",
    translation: "bukan berarti tidak / boleh jadi",
    partOfSpeech: "Keterangan",
    themeCategory: "Sastra, Puisi & Seni Rupa",
    sampleSentence: {
      hanzi: "古诗词中看似平淡的写景，未尝不是诗人内心波澜的投射。",
      pinyin: "Gǔ shīcí zhōng kàn sì píngdàn de xiějǐng, wèicháng bú shì shīrén nèixīn bōlán de tóushè.",
      translation: "Lukisan alam yang sekilas sederhana dalam puisi kuno, bukan berarti bukan proyeksi dari gelora emosi di dalam batin sang penyair.",
    },
  },
  {
    id: "hsk5-v012",
    hanzi: "超脱",
    pinyin: "chāotuō",
    translation: "transenden / lepas bebas dari belenggu",
    partOfSpeech: "Kata Sifat",
    themeCategory: "Sastra, Puisi & Seni Rupa",
    sampleSentence: {
      hanzi: "苏轼的辞赋展现出一种随缘自适、豁达超脱的人生境界。",
      pinyin: "Sū Shì de cífù zhǎnxiàn chū yì zhǒng suíyuán zìshì, huòdá chāotuō de rénshēng jìngjiè.",
      translation: "Untaian sajak Su Shi memancarkan maqam kehidupan yang lapang dada, menerima kenyataan, dan transenden bersahaja.",
    },
  },
  {
    id: "hsk5-v013",
    hanzi: "审美",
    pinyin: "shěnměi",
    translation: "apresiasi estetika keindahan",
    partOfSpeech: "Kata Benda",
    themeCategory: "Sastra, Puisi & Seni Rupa",
    sampleSentence: {
      hanzi: "提升大众审美素养能够滋润精神世界，培育健全人格。",
      pinyin: "Tíshēng dàzhòng shěnměi sùyǎng nénggòu zīrùn jīngshén shìjiè, péiyù jiànquán réngé.",
      translation: "Meningkatkan literasi estetika publik mampu menyirami alam batin serta memupuk kepribadian yang luhur dan utuh.",
    },
  },

  // 5. Filsafat & Dialog Peradaban
  {
    id: "hsk5-v014",
    hanzi: "互鉴",
    pinyin: "hùjiàn",
    translation: "saling berkaca / belajar timbal balik",
    partOfSpeech: "Kata Kerja",
    themeCategory: "Filsafat & Dialog Peradaban",
    sampleSentence: {
      hanzi: "推动东西方文明交流互鉴，是消除偏见隔阂的最佳良方。",
      pinyin: "Tuīdòng dōng xī fāng wénmíng jiāoliú hùjiàn, shì xiāochú piānjiàn géhé de zuì jiā liángfāng.",
      translation: "Mendorong pertukaran dan saling belajar antara peradaban Timur dan Barat adalah obat mujarab terbaik untuk menghapus sekat prasangka.",
    },
  },
  {
    id: "hsk5-v015",
    hanzi: "和而不同",
    pinyin: "hé ér bù tóng",
    translation: "harmoni dalam keberagaman",
    partOfSpeech: "Idiom Chengyu",
    themeCategory: "Filsafat & Dialog Peradaban",
    sampleSentence: {
      hanzi: "唯有秉持‘和而不同’的东方智慧，人类方能在多元中共生共荣。",
      pinyin: "Wéiyǒu bǐngchí 'hé ér bù tóng' de dōngfāng zhìhuì, rénlèi fāng néng zài duōyuán zhōng gòngshēng gòngróng.",
      translation: "Hanya dengan berpegang pada kearifan Timur 'harmoni dalam keberagaman', umat manusia barulah mampu hidup damai dan makmur bersama di tengah kemajemukan.",
    },
  },
  {
    id: "hsk5-v016",
    hanzi: "总而言之",
    pinyin: "zǒng'éryánzhī",
    translation: "singkat kata / intinya",
    partOfSpeech: "Frasa Konjungsi",
    themeCategory: "Filsafat & Dialog Peradaban",
    sampleSentence: {
      hanzi: "总而言之，人类命运休戚与共，团结协作方是正道。",
      pinyin: "Zǒng'éryánzhī, rénlèi mìngyùn xiūqīyǔgòng, tuánjié xiézuò fāng shì zhèngdào.",
      translation: "Singkatnya, nasib umat manusia saling terpaut erat; persatuan dan kolaborasilah jalan luhur yang sesungguhnya.",
    },
  },
];
