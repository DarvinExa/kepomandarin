-- Seed Data for Phase 3: Task 3.3
-- Description: Inisialisasi data kurikulum HSK, level HSK 1-5, dan 5 pelajaran HSK 1

-- 1. Seed Curriculum 'HSK'
INSERT INTO public.curriculums (id, code, title, description, total_levels)
VALUES (
    'c1000000-0000-0000-0000-000000000001',
    'HSK',
    'Kurikulum Standar HSK',
    'Sistem standarisasi kemahiran bahasa Mandarin internasional untuk pembelajar non-penutur asli.',
    5
)
ON CONFLICT (code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    total_levels = EXCLUDED.total_levels,
    updated_at = now();

-- 2. Seed Levels (HSK 1 sampai HSK 5)
INSERT INTO public.levels (
    id, curriculum_id, level_number, code, name, vocab_target, target_focus, description, is_active, order_index
)
VALUES
    (
        '11000000-0000-0000-0000-000000000001',
        'c1000000-0000-0000-0000-000000000001',
        1,
        'HSK 1',
        'Tingkat Dasar I',
        150,
        'Fondasi Percakapan & Pengenalan Nada',
        'Memahami dan menggunakan frasa serta kalimat sederhana untuk kebutuhan komunikasi konkrit sehari-hari.',
        true,
        1
    ),
    (
        '11000000-0000-0000-0000-000000000002',
        'c1000000-0000-0000-0000-000000000001',
        2,
        'HSK 2',
        'Tingkat Dasar II',
        300,
        'Aktivitas Harian & Arah',
        'Memperluas percakapan dasar, ungkapan perbandingan, penunjuk arah, dan situasi umum di tempat publik.',
        true,
        2
    ),
    (
        '11000000-0000-0000-0000-000000000003',
        'c1000000-0000-0000-0000-000000000001',
        3,
        'HSK 3',
        'Tingkat Menengah I',
        600,
        'Komunikasi Mandiri',
        'Mampu berkomunikasi secara lancar dalam kehidupan akademis, pekerjaan, dan perjalanan santai.',
        true,
        3
    ),
    (
        '11000000-0000-0000-0000-000000000004',
        'c1000000-0000-0000-0000-000000000001',
        4,
        'HSK 4',
        'Tingkat Menengah II',
        1200,
        'Wacana Konseptual',
        'Membahas berbagai topik sosial, berdiskusi mendalam, serta memahami bacaan naratif dan penjelasan abstrak.',
        true,
        4
    ),
    (
        '11000000-0000-0000-0000-000000000005',
        'c1000000-0000-0000-0000-000000000001',
        5,
        'HSK 5',
        'Tingkat Mahir',
        2500,
        'Literasi Komprehensif',
        'Membaca koran dan majalah berbahasa Mandarin, menikmati film tanpa takarir, dan menyusun pidato terstruktur.',
        true,
        5
    )
ON CONFLICT (curriculum_id, level_number) DO UPDATE SET
    code = EXCLUDED.code,
    name = EXCLUDED.name,
    vocab_target = EXCLUDED.vocab_target,
    target_focus = EXCLUDED.target_focus,
    description = EXCLUDED.description,
    is_active = EXCLUDED.is_active,
    order_index = EXCLUDED.order_index,
    updated_at = now();

-- 3. Seed 5 Pelajaran HSK 1
INSERT INTO public.lessons (
    id, level_id, lesson_number, slug, title, hanzi, pinyin, translation, objectives, overview,
    grammar_focus, dialogue_specimen, vocab_count, duration_minutes, order_index, is_published
)
VALUES
    (
        '21000000-0000-0000-0000-000000000001',
        '11000000-0000-0000-0000-000000000001',
        1,
        '01',
        'Sapaan Sopan',
        '问候',
        'Wènhòu',
        'Sapaan Sehari-hari & Penutupan Percakapan',
        'Memahami penggunaan sapaan formal (您好) dan kasual (你好), aturan perubahan nada ke-3 (sandhi nada), serta salam perpisahan (再见).',
        'Pelajaran pertama meletakkan fondasi etika komunikasi berbahasa Mandarin. Kamu akan mempelajari sapaan kasual dan formal, aturan fonetik sandhi nada ke-3, serta ucapan perpisahan santun.',
        '[{"ruleTitle": "Perbedaan ''你'' (Nǐ) dan ''您'' (Nín)", "explanation": "Gunakan 你 (nǐ) untuk teman sebaya atau situasi santai, dan gunakan 您 (nín) untuk menunjukkan rasa hormat kepada orang tua, guru, atau klien.", "example": "老师，您好！(Lǎoshī, nín hǎo! — Guru, halo!)"}, {"ruleTitle": "Aturan Sandhi Nada ke-3 (变调)", "explanation": "Ketika dua karakter bernada ke-3 bertemu berdampingan, karakter pertama otomatis diucapkan dengan nada ke-2 (naik), meskipun ejaan pinyin tetap ditulis nada ke-3.", "example": "你好 diucapkan ní hǎo (bukan nǐ hǎo)."}]'::jsonb,
        '[{"speaker": "A", "hanzi": "你好！", "pinyin": "Nǐ hǎo!", "translation": "Halo!"}, {"speaker": "B", "hanzi": "你好！早上好。", "pinyin": "Nǐ hǎo! Zǎoshang hǎo.", "translation": "Halo! Selamat pagi."}, {"speaker": "A", "hanzi": "老师，您好！谢谢您。", "pinyin": "Lǎoshī, nín hǎo! Xièxie nín.", "translation": "Guru, halo! Terima kasih kepada Anda."}, {"speaker": "B", "hanzi": "不客气，再见！", "pinyin": "Bú kèqi, zàijiàn!", "translation": "Sama-sama, sampai jumpa!"}]'::jsonb,
        10,
        10,
        1,
        true
    ),
    (
        '21000000-0000-0000-0000-000000000002',
        '11000000-0000-0000-0000-000000000001',
        2,
        '02',
        'Identitas Diri',
        '自我介绍',
        'Zìwǒ Jièshào',
        'Perkenalan Nama & Asal Kewarganegaraan',
        'Menguasai kata ganti orang (我, 你, 他/她), kata kerja penghubung 是 (adalah), kata tanya 什么 (apa), serta menyatakan asal negara (印尼人).',
        'Unit kedua fokus pada menyatakan identitas pribadi. Kamu akan menguasai kata ganti orang, kata kerja kopula 是 (adalah), dan cara menanyakan nama orang lain secara natural.',
        '[{"ruleTitle": "Pola Kalimat Penghubung: A 是 B", "explanation": "Kata 是 (shì) berfungsi menghubungkan subjek dengan identitas status, profesi, atau asal negara (setara dengan ''am/is/are'').", "example": "我是印尼人。(Wǒ shì Yìnní rén — Saya orang Indonesia.)"}, {"ruleTitle": "Menanyakan Nama dengan ''什么'' (Shénme)", "explanation": "Kata tanya 什么 diletakkan langsung di posisi objek kalimat tanpa mengubah urutan struktur kalimat Mandarin.", "example": "你叫什么名字？(Nǐ jiào shénme míngzi? — Siapa namamu?)"}]'::jsonb,
        '[{"speaker": "A", "hanzi": "你好，你叫什么名字？", "pinyin": "Nǐ hǎo, nǐ jiào shénme míngzi?", "translation": "Halo, siapa namamu?"}, {"speaker": "B", "hanzi": "我叫大卫。你是中国人吗？", "pinyin": "Wǒ jiào Dàwèi. Nǐ shì Zhōngguó rén ma?", "translation": "Nama saya David. Apakah kamu orang Tiongkok?"}, {"speaker": "A", "hanzi": "不是，我是印尼人。我也是学生。", "pinyin": "Bú shì, wǒ shì Yìnní rén. Wǒ yě shì xuésheng.", "translation": "Bukan, saya orang Indonesia. Saya juga seorang pelajar."}]'::jsonb,
        15,
        12,
        2,
        true
    ),
    (
        '21000000-0000-0000-0000-000000000003',
        '11000000-0000-0000-0000-000000000001',
        3,
        '03',
        'Angka & Waktu',
        '数字与时间',
        'Shùzì yǔ Shíjiān',
        'Penghitungan Dasar, Jam, Hari & Tanggal',
        'Menyebutkan angka 1–100, menyatakan waktu jam dan menit (点, 分), nama hari (星期), serta susunan kronologis penanggalan Mandarin.',
        'Mempelajari konsep penulisan angka dasar dan susunan hierarki waktu dalam bahasa Mandarin dari unit terbesar ke terkecil (tahun, bulan, tanggal, jam).',
        '[{"ruleTitle": "Hierarki Waktu: Dari Besar ke Kecil", "explanation": "Susunan waktu dalam bahasa Mandarin selalu berurutan: Tahun (年) -> Bulan (月) -> Hari/Tanggal (日/号) -> Jam (点) -> Menit (分).", "example": "今天十月五号三点。(Jīntiān shí yuè wǔ hào sān diǎn.)"}, {"ruleTitle": "Menyatakan Hari dalam Seminggu (星期)", "explanation": "Gunakan kata 星期 (xīngqī) diikuti angka 1 (Senin) hingga 6 (Sabtu). Hari Minggu menggunakan 星期天 atau 星期日.", "example": "今天星期三。(Jīntiān xīngqīsān — Hari ini hari Rabu.)"}]'::jsonb,
        '[{"speaker": "A", "hanzi": "现在几点？", "pinyin": "Xiànzài jǐ diǎn?", "translation": "Sekarang jam berapa?"}, {"speaker": "B", "hanzi": "现在八点十五分。", "pinyin": "Xiànzài bā diǎn shíwǔ fēn.", "translation": "Sekarang jam 8 lewat 15 menit."}, {"speaker": "A", "hanzi": "今天星期几？", "pinyin": "Jīntiān xīngqī jǐ?", "translation": "Hari ini hari apa?"}, {"speaker": "B", "hanzi": "今天星期三。", "pinyin": "Jīntiān xīngqīsān.", "translation": "Hari ini hari Rabu."}]'::jsonb,
        20,
        15,
        3,
        true
    ),
    (
        '21000000-0000-0000-0000-000000000004',
        '11000000-0000-0000-0000-000000000001',
        4,
        '04',
        'Keluarga & Relasi',
        '家庭与关系',
        'Jiātíng yǔ Guānxì',
        'Anggota Keluarga & Hubungan Sosial',
        'Menyebutkan anggota keluarga inti (爸爸, 妈妈, 哥哥, 妹妹), partikel kepemilikan 的 (de), serta kata tanya jumlah 几 (jǐ).',
        'Unit keempat mengajarkan penyebutan hubungan kekeluargaan, kepemilikan menggunakan partikel 的, serta penggunaan kata bantu bilangan dasar 个.',
        '[{"ruleTitle": "Partikel Kepemilikan: 的 (De)", "explanation": "Partikel 的 menghubungkan pemilik dengan benda/orang yang dimiliki: [Pemilik] + 的 + [Benda].", "example": "这是我的书。(Zhè shì wǒ de shū — Ini buku saya.)"}, {"ruleTitle": "Menyatakan Keberadaan dengan ''有'' dan ''没有''", "explanation": "Gunakan 有 (yǒu) untuk menyatakan memiliki / ada, dan 没有 (méiyǒu) untuk bentuk negasi (tidak ada / tidak punya). Jangan gunakan 不有.", "example": "我家有四口人。(Wǒ jiā yǒu sì kǒu rén — Keluarga saya ada 4 orang.)"}]'::jsonb,
        '[{"speaker": "A", "hanzi": "你家有几口人？", "pinyin": "Nǐ jiā yǒu jǐ kǒu rén?", "translation": "Keluargamu ada berapa orang?"}, {"speaker": "B", "hanzi": "我家有四口人：爸爸、妈妈、一个哥哥和我。", "pinyin": "Wǒ jiā yǒu sì kǒu rén: bàba, māma, yí gè gēge hé wǒ.", "translation": "Keluarga saya ada 4 orang: ayah, ibu, seorang kakak laki-laki, dan saya."}, {"speaker": "A", "hanzi": "你哥哥是学生吗？", "pinyin": "Nǐ gēge shì xuésheng ma?", "translation": "Apakah kakakmu seorang pelajar?"}, {"speaker": "B", "hanzi": "是的，他也是大学生。", "pinyin": "Shì de, tā yě shì dàxuéshēng.", "translation": "Benar, dia juga seorang mahasiswa."}]'::jsonb,
        18,
        14,
        4,
        true
    ),
    (
        '21000000-0000-0000-0000-000000000005',
        '11000000-0000-0000-0000-000000000001',
        5,
        '05',
        'Aktivitas Harian',
        '日常活动',
        'Rìcháng Huódòng',
        'Kegiatan Rutin, Lokasi & Kebiasaan',
        'Membahas kegiatan sehari-hari (吃, 喝, 去), struktur kalimat subjek + waktu + tempat + predikat, dan partikel tanya 吗 (ma).',
        'Unit penutup HSK 1 ini menggabungkan seluruh fondasi tata bahasa: menyatakan tindakan harian, urutan tempat sebelum perbuatan, serta pertanyaan dengan partikel 吗.',
        '[{"ruleTitle": "Struktur Tindakan di Tempat: Subjek + 在 (Tempat) + Kata Kerja", "explanation": "Dalam bahasa Mandarin, keterangan tempat selalu diletakkan sebelum tindakan dilakukan, bukan di akhir kalimat.", "example": "我在学校看书。(Wǒ zài xuéxiào kàn shū — Saya membaca buku di sekolah.)"}, {"ruleTitle": "Partikel Tanya ''吗'' (Ma)", "explanation": "Tambahkan 吗 di akhir kalimat pernyataan untuk mengubahnya menjadi kalimat tanya ya/tidak tanpa mengubah kata lain.", "example": "你去商店吗？(Nǐ qù shāngdiàn ma? — Apakah kamu pergi ke toko?)"}]'::jsonb,
        '[{"speaker": "A", "hanzi": "你今天下午做什么？", "pinyin": "Nǐ jīntiān xiàwǔ zuò shénme?", "translation": "Apa yang kamu lakukan siang ini?"}, {"speaker": "B", "hanzi": "我去图书馆看书。你呢？", "pinyin": "Wǒ qù túshūguǎn kàn shū. Nǐ ne?", "translation": "Saya pergi ke perpustakaan untuk membaca buku. Bagaimana denganmu?"}, {"speaker": "A", "hanzi": "我想去喝中国茶，吃点心。", "pinyin": "Wǒ xiǎng qù hē Zhōngguó chá, chī diǎnxin.", "translation": "Saya ingin pergi minum teh Tiongkok dan makan dimsum."}]'::jsonb,
        22,
        16,
        5,
        true
    )
ON CONFLICT (level_id, slug) DO UPDATE SET
    lesson_number = EXCLUDED.lesson_number,
    title = EXCLUDED.title,
    hanzi = EXCLUDED.hanzi,
    pinyin = EXCLUDED.pinyin,
    translation = EXCLUDED.translation,
    objectives = EXCLUDED.objectives,
    overview = EXCLUDED.overview,
    grammar_focus = EXCLUDED.grammar_focus,
    dialogue_specimen = EXCLUDED.dialogue_specimen,
    vocab_count = EXCLUDED.vocab_count,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    is_published = EXCLUDED.is_published,
    updated_at = now();

-- 4. Seed Kosakata HSK 1 (Task 3.5: 80+ Kosakata Terstruktur)
INSERT INTO public.vocabulary (
    id, level_id, lesson_id, hanzi, pinyin, tone, translation, part_of_speech,
    example_hanzi, example_pinyin, example_translation, order_index
)
VALUES
    -- Kosakata Pelajaran 01: Sapaan Sopan
    (
        '31000000-0000-0000-0000-000000000001',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000001',
        '你', 'nǐ', 'Nada 3', 'kamu / engkau (kasual)', 'kata ganti',
        '你好！', 'Nǐ hǎo!', 'Halo / Apa kabar!', 1
    ),
    (
        '31000000-0000-0000-0000-000000000002',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000001',
        '好', 'hǎo', 'Nada 3', 'baik / bagus', 'kata sifat',
        '早上好！', 'Zǎoshang hǎo!', 'Selamat pagi!', 2
    ),
    (
        '31000000-0000-0000-0000-000000000003',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000001',
        '您', 'nín', 'Nada 2', 'Anda (bentuk sopan / hormat)', 'kata ganti',
        '老师，您好！', 'Lǎoshī, nín hǎo!', 'Halo, Guru!', 3
    ),
    (
        '31000000-0000-0000-0000-000000000004',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000001',
        '再见', 'zàijiàn', 'Nada 4 + 4', 'sampai jumpa / selamat tinggal', 'ungkapan',
        '明天再见！', 'Míngtiān zàijiàn!', 'Sampai jumpa besok!', 4
    ),
    (
        '31000000-0000-0000-0000-000000000005',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000001',
        '老师', 'lǎoshī', 'Nada 3 + 1', 'guru / pengajar', 'kata benda',
        '王老师好。', 'Wáng lǎoshī hǎo.', 'Halo, Guru Wang.', 5
    ),
    (
        '31000000-0000-0000-0000-000000000006',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000001',
        '早上', 'zǎoshang', 'Nada 3 + netral', 'pagi hari', 'kata keterangan',
        '早上好。', 'Zǎoshang hǎo.', 'Selamat pagi.', 6
    ),
    (
        '31000000-0000-0000-0000-000000000007',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000001',
        '谢谢', 'xièxie', 'Nada 4 + netral', 'terima kasih', 'kata kerja',
        '谢谢你！', 'Xièxie nǐ!', 'Terima kasih banyak!', 7
    ),
    (
        '31000000-0000-0000-0000-000000000008',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000001',
        '不客气', 'bú kèqi', 'Nada 2 + 4 + netral', 'sama-sama / jangan sungkan', 'ungkapan',
        '不客气，请坐。', 'Bú kèqi, qǐng zuò.', 'Sama-sama, silakan duduk.', 8
    ),
    (
        '31000000-0000-0000-0000-000000000009',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000001',
        '对不起', 'duìbuqǐ', 'Nada 4 + netral + 3', 'mohon maaf / maaf', 'ungkapan',
        '对不起，我迟到了。', 'Duìbuqǐ, wǒ chídào le.', 'Maaf, saya terlambat.', 9
    ),
    (
        '31000000-0000-0000-0000-000000000010',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000001',
        '没关系', 'méi guānxi', 'Nada 2 + 1 + netral', 'tidak apa-apa / bukan masalah', 'ungkapan',
        '没关系，请进。', 'Méi guānxi, qǐng jìn.', 'Tidak apa-apa, silakan masuk.', 10
    ),

    -- Kosakata Pelajaran 02: Identitas Diri
    (
        '31000000-0000-0000-0000-000000000011',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000002',
        '我', 'wǒ', 'Nada 3', 'saya / aku', 'kata ganti',
        '我是学生。', 'Wǒ shì xuésheng.', 'Saya adalah seorang pelajar.', 11
    ),
    (
        '31000000-0000-0000-0000-000000000012',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000002',
        '是', 'shì', 'Nada 4', 'adalah / ya (benar)', 'kata kerja',
        '他是老师。', 'Tā shì lǎoshī.', 'Dia adalah seorang guru.', 12
    ),
    (
        '31000000-0000-0000-0000-000000000013',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000002',
        '叫', 'jiào', 'Nada 4', 'bernama / memanggil', 'kata kerja',
        '我叫王明。', 'Wǒ jiào Wáng Míng.', 'Nama saya Wang Ming.', 13
    ),
    (
        '31000000-0000-0000-0000-000000000014',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000002',
        '什么', 'shénme', 'Nada 2 + netral', 'apa', 'kata tanya',
        '这是什么？', 'Zhè shì shénme?', 'Ini apa?', 14
    ),
    (
        '31000000-0000-0000-0000-000000000015',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000002',
        '名字', 'míngzi', 'Nada 2 + netral', 'nama', 'kata benda',
        '你的名字很好听。', 'Nǐ de míngzi hěn hǎotīng.', 'Namamu sangat bagus didengar.', 15
    ),
    (
        '31000000-0000-0000-0000-000000000016',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000002',
        '人', 'rén', 'Nada 2', 'orang / manusia', 'kata benda',
        '印尼人很热情。', 'Yìnní rén hěn rèqíng.', 'Orang Indonesia sangat ramah.', 16
    ),
    (
        '31000000-0000-0000-0000-000000000017',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000002',
        '印尼', 'Yìnní', 'Nada 4 + 2', 'Indonesia', 'kata benda',
        '我来自印尼。', 'Wǒ láizì Yìnní.', 'Saya berasal dari Indonesia.', 17
    ),
    (
        '31000000-0000-0000-0000-000000000018',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000002',
        '中国', 'Zhōngguó', 'Nada 1 + 2', 'Tiongkok', 'kata benda',
        '中国很大。', 'Zhōngguó hěn dà.', 'Tiongkok sangat besar.', 18
    ),
    (
        '31000000-0000-0000-0000-000000000019',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000002',
        '学生', 'xuésheng', 'Nada 2 + netral', 'murid / pelajar / mahasiswa', 'kata benda',
        '他们都是学生。', 'Tāmen dōu shì xuésheng.', 'Mereka semua adalah pelajar.', 19
    ),
    (
        '31000000-0000-0000-0000-000000000020',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000002',
        '朋友', 'péngyou', 'Nada 2 + netral', 'teman / kawan', 'kata benda',
        '他是我的好朋友。', 'Tā shì wǒ de hǎo péngyou.', 'Dia adalah teman baik saya.', 20
    ),
    (
        '31000000-0000-0000-0000-000000000021',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000002',
        '他', 'tā', 'Nada 1', 'dia (laki-laki)', 'kata ganti',
        '他是我的同学。', 'Tā shì wǒ de tóngxué.', 'Dia adalah teman sekelas saya.', 21
    ),
    (
        '31000000-0000-0000-0000-000000000022',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000002',
        '她', 'tā', 'Nada 1', 'dia (perempuan)', 'kata ganti',
        '她喜欢中国。', 'Tā xǐhuan Zhōngguó.', 'Dia menyukai Tiongkok.', 22
    ),
    (
        '31000000-0000-0000-0000-000000000023',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000002',
        '吗', 'ma', 'Nada netral', 'apakah (partikel tanya ya/tidak)', 'partikel',
        '你是中国人吗？', 'Nǐ shì Zhōngguó rén ma?', 'Apakah kamu orang Tiongkok?', 23
    ),
    (
        '31000000-0000-0000-0000-000000000024',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000002',
        '不', 'bù', 'Nada 4', 'tidak / bukan', 'kata keterangan',
        '我不是老师。', 'Wǒ bú shì lǎoshī.', 'Saya bukan guru.', 24
    ),
    (
        '31000000-0000-0000-0000-000000000025',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000002',
        '也', 'yě', 'Nada 3', 'juga / pun', 'kata keterangan',
        '我也是印尼人。', 'Wǒ yě shì Yìnní rén.', 'Saya juga orang Indonesia.', 25
    ),

    -- Kosakata Pelajaran 03: Angka & Waktu
    (
        '31000000-0000-0000-0000-000000000026',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000003',
        '一', 'yī', 'Nada 1', 'satu', 'angka',
        '一个月。', 'Yí gè yuè.', 'Satu bulan.', 26
    ),
    (
        '31000000-0000-0000-0000-000000000027',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000003',
        '二', 'èr', 'Nada 4', 'dua', 'angka',
        '二月。', 'Èr yuè.', 'Bulan Februari.', 27
    ),
    (
        '31000000-0000-0000-0000-000000000028',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000003',
        '三', 'sān', 'Nada 1', 'tiga', 'angka',
        '三点整。', 'Sān diǎn zhěng.', 'Jam tiga tepat.', 28
    ),
    (
        '31000000-0000-0000-0000-000000000029',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000003',
        '四', 'sì', 'Nada 4', 'empat', 'angka',
        '四个人。', 'Sì gè rén.', 'Empat orang.', 29
    ),
    (
        '31000000-0000-0000-0000-000000000030',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000003',
        '五', 'wǔ', 'Nada 3', 'lima', 'angka',
        '五月。', 'Wǔ yuè.', 'Bulan Mei.', 30
    ),
    (
        '31000000-0000-0000-0000-000000000031',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000003',
        '六', 'liù', 'Nada 4', 'enam', 'angka',
        '星期六。', 'Xīngqīliù.', 'Hari Sabtu.', 31
    ),
    (
        '31000000-0000-0000-0000-000000000032',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000003',
        '七', 'qī', 'Nada 1', 'tujuh', 'angka',
        '七天。', 'Qī tiān.', 'Tujuh hari.', 32
    ),
    (
        '31000000-0000-0000-0000-000000000033',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000003',
        '八', 'bā', 'Nada 1', 'delapan', 'angka',
        '八点。', 'Bā diǎn.', 'Pukul delapan.', 33
    ),
    (
        '31000000-0000-0000-0000-000000000034',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000003',
        '九', 'jiǔ', 'Nada 3', 'sembilan', 'angka',
        '九月。', 'Jiǔ yuè.', 'Bulan September.', 34
    ),
    (
        '31000000-0000-0000-0000-000000000035',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000003',
        '十', 'shí', 'Nada 2', 'sepuluh', 'angka',
        '十分钟。', 'Shí fēnzhōng.', 'Sepuluh menit.', 35
    ),
    (
        '31000000-0000-0000-0000-000000000036',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000003',
        '点', 'diǎn', 'Nada 3', 'jam / pukul', 'kata benda',
        '五点了。', 'Wǔ diǎn le.', 'Sudah jam lima.', 36
    ),
    (
        '31000000-0000-0000-0000-000000000037',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000003',
        '分', 'fēn', 'Nada 1', 'menit', 'kata benda',
        '八点十五分。', 'Bā diǎn shíwǔ fēn.', 'Jam 8 lewat 15 menit.', 37
    ),
    (
        '31000000-0000-0000-0000-000000000038',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000003',
        '星期', 'xīngqī', 'Nada 1 + 1', 'minggu / pekan', 'kata benda',
        '星期天我们休息。', 'Xīngqītiān wǒmen xiūxi.', 'Hari Minggu kami beristirahat.', 38
    ),
    (
        '31000000-0000-0000-0000-000000000039',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000003',
        '月', 'yuè', 'Nada 4', 'bulan (kalender)', 'kata benda',
        '九月开学。', 'Jiǔ yuè kāixué.', 'Bulan September mulai masuk sekolah.', 39
    ),
    (
        '31000000-0000-0000-0000-000000000040',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000003',
        '今天', 'jīntiān', 'Nada 1 + 1', 'hari ini', 'kata keterangan',
        '今天天气很好。', 'Jīntiān tiānqì hěn hǎo.', 'Hari ini cuacanya sangat bagus.', 40
    ),

    -- Kosakata Pelajaran 04: Keluarga & Relasi
    (
        '31000000-0000-0000-0000-000000000041',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000004',
        '家', 'jiā', 'Nada 1', 'rumah / keluarga', 'kata benda',
        '我爱我的家。', 'Wǒ ài wǒ de jiā.', 'Saya mencintai keluarga saya.', 41
    ),
    (
        '31000000-0000-0000-0000-000000000042',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000004',
        '爸爸', 'bàba', 'Nada 4 + netral', 'ayah / bapak', 'kata benda',
        '我爸爸在工作。', 'Wǒ bàba zài gōngzuò.', 'Ayah saya sedang bekerja.', 42
    ),
    (
        '31000000-0000-0000-0000-000000000043',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000004',
        '妈妈', 'māma', 'Nada 1 + netral', 'ibu / mama', 'kata benda',
        '我妈妈喜欢喝茶。', 'Wǒ māma xǐhuan hē chá.', 'Ibu saya suka minum teh.', 43
    ),
    (
        '31000000-0000-0000-0000-000000000044',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000004',
        '哥哥', 'gēge', 'Nada 1 + netral', 'kakak laki-laki', 'kata benda',
        '他是我哥哥。', 'Tā shì wǒ gēge.', 'Dia adalah kakak laki-laki saya.', 44
    ),
    (
        '31000000-0000-0000-0000-000000000045',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000004',
        '姐姐', 'jiějie', 'Nada 3 + netral', 'kakak perempuan', 'kata benda',
        '姐姐在看书。', 'Jiějie zài kàn shū.', 'Kakak perempuan sedang membaca buku.', 45
    ),
    (
        '31000000-0000-0000-0000-000000000046',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000004',
        '弟弟', 'dìdi', 'Nada 4 + netral', 'adik laki-laki', 'kata benda',
        '弟弟今年六岁。', 'Dìdi jīnnián liù suì.', 'Adik laki-laki tahun ini berumur enam tahun.', 46
    ),
    (
        '31000000-0000-0000-0000-000000000047',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000004',
        '妹妹', 'mèimei', 'Nada 4 + netral', 'adik perempuan', 'kata benda',
        '妹妹很可爱。', 'Mèimei hěn kě''ài.', 'Adik perempuan sangat lucu.', 47
    ),
    (
        '31000000-0000-0000-0000-000000000048',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000004',
        '有', 'yǒu', 'Nada 3', 'ada / mempunyai', 'kata kerja',
        '你有一本书吗？', 'Nǐ yǒu yì běn shū ma?', 'Apakah kamu punya sebuah buku?', 48
    ),
    (
        '31000000-0000-0000-0000-000000000049',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000004',
        '没有', 'méiyǒu', 'Nada 2 + 3', 'tidak punya / tidak ada', 'kata kerja',
        '我家没有车。', 'Wǒ jiā méiyǒu chē.', 'Keluarga saya tidak punya mobil.', 49
    ),
    (
        '31000000-0000-0000-0000-000000000050',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000004',
        '的', 'de', 'Nada netral', 'partikel kepemilikan / penjelas', 'partikel',
        '这是谁的书？', 'Zhè shì shéi de shū?', 'Ini buku milik siapa?', 50
    ),

    -- Kosakata Pelajaran 05: Aktivitas Harian
    (
        '31000000-0000-0000-0000-000000000051',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000005',
        '吃', 'chī', 'Nada 1', 'makan', 'kata kerja',
        '你想吃什么？', 'Nǐ xiǎng chī shénme?', 'Kamu ingin makan apa?', 51
    ),
    (
        '31000000-0000-0000-0000-000000000052',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000005',
        '喝', 'hē', 'Nada 1', 'minum', 'kata kerja',
        '请喝茶。', 'Qǐng hē chá.', 'Silakan minum teh.', 52
    ),
    (
        '31000000-0000-0000-0000-000000000053',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000005',
        '茶', 'chá', 'Nada 2', 'teh', 'kata benda',
        '中国茶很好喝。', 'Zhōngguó chá hěn hǎohē.', 'Teh Tiongkok sangat enak diminum.', 53
    ),
    (
        '31000000-0000-0000-0000-000000000054',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000005',
        '水', 'shuǐ', 'Nada 3', 'air', 'kata benda',
        '请给我一杯水。', 'Qǐng gěi wǒ yì bēi shuǐ.', 'Tolong beri saya segelas air.', 54
    ),
    (
        '31000000-0000-0000-0000-000000000055',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000005',
        '去', 'qù', 'Nada 4', 'pergi ke', 'kata kerja',
        '明天我去学校。', 'Míngtiān wǒ qù xuéxiào.', 'Besok saya pergi ke sekolah.', 55
    ),
    (
        '31000000-0000-0000-0000-000000000056',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000005',
        '来', 'lái', 'Nada 2', 'datang', 'kata kerja',
        '请来我家。', 'Qǐng lái wǒ jiā.', 'Silakan datang ke rumah saya.', 56
    ),
    (
        '31000000-0000-0000-0000-000000000057',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000005',
        '做', 'zuò', 'Nada 4', 'melakukan / membuat', 'kata kerja',
        '你在做什么？', 'Nǐ zài zuò shénme?', 'Kamu sedang melakukan apa?', 57
    ),
    (
        '31000000-0000-0000-0000-000000000058',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000005',
        '看', 'kàn', 'Nada 4', 'melihat / membaca / menonton', 'kata kerja',
        '我看汉语书。', 'Wǒ kàn Hànyǔ shū.', 'Saya membaca buku bahasa Mandarin.', 58
    ),
    (
        '31000000-0000-0000-0000-000000000059',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000005',
        '听', 'tīng', 'Nada 1', 'mendengarkan', 'kata kerja',
        '听老师说。', 'Tīng lǎoshī shuō.', 'Dengarkan penjelasan guru.', 59
    ),
    (
        '31000000-0000-0000-0000-000000000060',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000005',
        '说', 'shuō', 'Nada 1', 'berbicara / berkata', 'kata kerja',
        '请慢点说。', 'Qǐng màn diǎn shuō.', 'Tolong bicara lebih lambat.', 60
    ),

    -- Kosakata Inti HSK 1 Lanjutan (Level HSK 1 Umum)
    (
        '31000000-0000-0000-0000-000000000061',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '写', 'xiě', 'Nada 3', 'menulis', 'kata kerja',
        '我会写汉字。', 'Wǒ huì xiě hànzì.', 'Saya bisa menulis hanzi.', 61
    ),
    (
        '31000000-0000-0000-0000-000000000062',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '读', 'dú', 'Nada 2', 'membaca (nyaring)', 'kata kerja',
        '跟我一起读。', 'Gēn wǒ yìqǐ dú.', 'Baca bersama saya.', 62
    ),
    (
        '31000000-0000-0000-0000-000000000063',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '买', 'mǎi', 'Nada 3', 'membeli', 'kata kerja',
        '我去买水果。', 'Wǒ qù mǎi shuǐguǒ.', 'Saya pergi membeli buah.', 63
    ),
    (
        '31000000-0000-0000-0000-000000000064',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '在', 'zài', 'Nada 4', 'berada di / sedang', 'kata kerja',
        '我在学校。', 'Wǒ zài xuéxiào.', 'Saya berada di sekolah.', 64
    ),
    (
        '31000000-0000-0000-0000-000000000065',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '学校', 'xuéxiào', 'Nada 2 + 4', 'sekolah', 'kata benda',
        '我们的学校很大。', 'Wǒmen de xuéxiào hěn dà.', 'Sekolah kami sangat besar.', 65
    ),
    (
        '31000000-0000-0000-0000-000000000066',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '大', 'dà', 'Nada 4', 'besar', 'kata sifat',
        '这个苹果很大。', 'Zhè gè píngguǒ hěn dà.', 'Apel ini sangat besar.', 66
    ),
    (
        '31000000-0000-0000-0000-000000000067',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '小', 'xiǎo', 'Nada 3', 'kecil', 'kata sifat',
        '小猫在睡觉。', 'Xiǎomāo zài shuìjiào.', 'Kucing kecil sedang tidur.', 67
    ),
    (
        '31000000-0000-0000-0000-000000000068',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '多', 'duō', 'Nada 1', 'banyak', 'kata sifat',
        '那里人很多。', 'Nàlǐ rén hěn duō.', 'Di sana ada banyak orang.', 68
    ),
    (
        '31000000-0000-0000-0000-000000000069',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '少', 'shǎo', 'Nada 3', 'sedikit', 'kata sifat',
        '这里的书很少。', 'Zhèlǐ de shū hěn shǎo.', 'Buku di sini sangat sedikit.', 69
    ),
    (
        '31000000-0000-0000-0000-000000000070',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '高兴', 'gāoxìng', 'Nada 1 + 4', 'senang / gembira', 'kata sifat',
        '认识你很高兴。', 'Rènshi nǐ hěn gāoxìng.', 'Senang berkenalan denganmu.', 70
    ),
    (
        '31000000-0000-0000-0000-000000000071',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '喜欢', 'xǐhuan', 'Nada 3 + netral', 'suka / gemar', 'kata kerja',
        '我喜欢学汉语。', 'Wǒ xǐhuan xué Hànyǔ.', 'Saya suka belajar bahasa Mandarin.', 71
    ),
    (
        '31000000-0000-0000-0000-000000000072',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '想', 'xiǎng', 'Nada 3', 'ingin / berkeinginan', 'kata kerja bantu',
        '我想学汉语。', 'Wǒ xiǎng xué Hànyǔ.', 'Saya ingin belajar bahasa Mandarin.', 72
    ),
    (
        '31000000-0000-0000-0000-000000000073',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '会', 'huì', 'Nada 4', 'bisa / mahir (karena belajar)', 'kata kerja bantu',
        '我会说汉语。', 'Wǒ huì shuō Hànyǔ.', 'Saya bisa berbicara bahasa Mandarin.', 73
    ),
    (
        '31000000-0000-0000-0000-000000000074',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '这', 'zhè', 'Nada 4', 'ini', 'kata tunjuk',
        '这是我的书。', 'Zhè shì wǒ de shū.', 'Ini adalah buku saya.', 74
    ),
    (
        '31000000-0000-0000-0000-000000000075',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '那', 'nà', 'Nada 4', 'itu', 'kata tunjuk',
        '那是我的学校。', 'Nà shì wǒ de xuéxiào.', 'Itu adalah sekolah saya.', 75
    ),
    (
        '31000000-0000-0000-0000-000000000076',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '哪', 'nǎ', 'Nada 3', 'yang mana', 'kata tanya',
        '你是哪国人？', 'Nǐ shì nǎ guó rén?', 'Kamu orang negara mana?', 76
    ),
    (
        '31000000-0000-0000-0000-000000000077',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '哪儿', 'nǎr', 'Nada 3', 'di mana', 'kata tanya',
        '你在哪儿？', 'Nǐ zài nǎr?', 'Kamu berada di mana?', 77
    ),
    (
        '31000000-0000-0000-0000-000000000078',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '多少', 'duōshao', 'Nada 1 + netral', 'berapa banyak', 'kata tanya',
        '这个多少钱？', 'Zhè gè duōshao qián?', 'Berapa harga barang ini?', 78
    ),
    (
        '31000000-0000-0000-0000-000000000079',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '岁', 'suì', 'Nada 4', 'tahun (usia / umur)', 'kata bantu bilangan',
        '我今年二十岁。', 'Wǒ jīnnián èrshí suì.', 'Saya tahun ini berumur 20 tahun.', 79
    ),
    (
        '31000000-0000-0000-0000-000000000080',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '块', 'kuài', 'Nada 4', 'yuan / perak / potong', 'kata bantu bilangan',
        '三块钱。', 'Sān kuài qián.', 'Tiga yuan.', 80
    ),
    (
        '31000000-0000-0000-0000-000000000081',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '本', 'běn', 'Nada 3', 'jilid (kata bantu buku)', 'kata bantu bilangan',
        '两本书。', 'Liǎng běn shū.', 'Dua buah buku.', 81
    ),
    (
        '31000000-0000-0000-0000-000000000082',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '商店', 'shāngdiàn', 'Nada 1 + 4', 'toko / warung', 'kata benda',
        '我去商店买东西。', 'Wǒ qù shāngdiàn mǎi dōngxi.', 'Saya pergi ke toko berbelanja.', 82
    ),
    (
        '31000000-0000-0000-0000-000000000083',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '医院', 'yīyuàn', 'Nada 1 + 4', 'rumah sakit', 'kata benda',
        '他在医院工作。', 'Tā zài yīyuàn gōngzuò.', 'Dia bekerja di rumah sakit.', 83
    ),
    (
        '31000000-0000-0000-0000-000000000084',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '汉语', 'Hànyǔ', 'Nada 4 + 3', 'bahasa Mandarin', 'kata benda',
        '汉语很好听。', 'Hànyǔ hěn hǎotīng.', 'Bahasa Mandarin sangat enak didengar.', 84
    ),
    (
        '31000000-0000-0000-0000-000000000085',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        '很', 'hěn', 'Nada 3', 'sangat / amat', 'kata keterangan',
        '他很高兴。', 'Tā hěn gāoxìng.', 'Dia sangat gembira.', 85
    )
ON CONFLICT (id) DO UPDATE SET
    level_id = EXCLUDED.level_id,
    lesson_id = EXCLUDED.lesson_id,
    hanzi = EXCLUDED.hanzi,
    pinyin = EXCLUDED.pinyin,
    tone = EXCLUDED.tone,
    translation = EXCLUDED.translation,
    part_of_speech = EXCLUDED.part_of_speech,
    example_hanzi = EXCLUDED.example_hanzi,
    example_pinyin = EXCLUDED.example_pinyin,
    example_translation = EXCLUDED.example_translation,
    order_index = EXCLUDED.order_index,
    updated_at = now();

-- 5. Seed Soal Latihan HSK 1 (Task 4.1: Pilihan Ganda & Susun Kalimat)
INSERT INTO public.exercises (
    id, level_id, lesson_id, type, prompt, context_hanzi, context_pinyin, context_translation,
    options, correct_answer, explanation, order_index
)
VALUES
    -- Unit 01: Sapaan Sopan
    (
        '41000000-0000-0000-0000-000000000001',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000001',
        'multiple_choice',
        'Pilih kata sapaan yang paling sopan dan tepat untuk menyapa seorang pengajar:',
        '老师，___ 好！',
        'Lǎoshī, ___ hǎo!',
        'Guru, halo!',
        '["您", "你", "吗", "不"]'::jsonb,
        '您',
        'Gunakan kata ganti hormat "您" (nín) untuk menyapa guru, orang tua, atau senior. Sedangkan "你" (nǐ) digunakan untuk teman sebaya.',
        1
    ),
    (
        '41000000-0000-0000-0000-000000000002',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000001',
        'sentence_ordering',
        'Susun kata-kata berikut menjadi ucapan perpisahan santun di lingkungan sekolah:',
        '明天学校见！',
        'Míngtiān xuéxiào jiàn!',
        'Sampai jumpa di sekolah besok!',
        '[{"text": "学校", "pinyin": "xuéxiào"}, {"text": "明天", "pinyin": "míngtiān"}, {"text": "见", "pinyin": "jiàn"}]'::jsonb,
        '明天 学校 见',
        'Dalam sintaksis Mandarin, keterangan waktu (明天) selalu diletakkan di awal atau sebelum keterangan tempat (学校), diikuti kata kerja (见).',
        2
    ),

    -- Unit 02: Identitas Diri
    (
        '41000000-0000-0000-0000-000000000003',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000002',
        'multiple_choice',
        'Lengkapi kalimat tanya untuk menanyakan nama seseorang secara wajar:',
        '你叫 ___ 名字？',
        'Nǐ jiào ___ míngzi?',
        'Siapa namamu?',
        '["什么", "谁", "哪儿", "几"]'::jsonb,
        '什么',
        'Kata tanya "什么" (shénme / apa) berpasangan langsung dengan "名字" (míngzi / nama) untuk menanyakan identitas nama seseorang.',
        3
    ),
    (
        '41000000-0000-0000-0000-000000000004',
        '11000000-0000-0000-0000-000000000002',
        '21000000-0000-0000-0000-000000000002',
        'sentence_ordering',
        'Susun kata-kata berikut menjadi pernyataan kewarganegaraan yang runtut:',
        '我是印尼人。',
        'Wǒ shì Yìnní rén.',
        'Saya adalah orang Indonesia.',
        '[{"text": "是", "pinyin": "shì"}, {"text": "我", "pinyin": "wǒ"}, {"text": "印尼人", "pinyin": "Yìnní rén"}]'::jsonb,
        '我 是 印尼人',
        'Struktur kalimat kopula bahasa Mandarin mengikuti urutan Subjek (我) + Kata Kerja Kopula (是) + Objek Identitas (印尼人).',
        4
    ),

    -- Unit 03: Angka & Waktu
    (
        '41000000-0000-0000-0000-000000000005',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000003',
        'multiple_choice',
        'Pilih kata angka yang tepat untuk menyatakan menit "lima belas (15)":',
        '现在八点 ___ 分。',
        'Xiànzài bā diǎn ___ fēn.',
        'Sekarang pukul delapan lewat lima belas menit.',
        '["十五", "五十", "五", "十"]'::jsonb,
        '十五',
        'Angka belasan dalam bahasa Mandarin diawali angka sepuluh (十) diikuti satuan (五), sehingga 15 adalah "十五" (shíwǔ).',
        5
    ),
    (
        '41000000-0000-0000-0000-000000000006',
        '11000000-0000-0000-0000-000000000003',
        '21000000-0000-0000-0000-000000000003',
        'sentence_ordering',
        'Susun hierarki waktu Mandarin dari unit terbesar menuju unit terkecil:',
        '今天下午三点。',
        'Jīntiān xiàwǔ sān diǎn.',
        'Hari ini pukul tiga siang.',
        '[{"text": "三点", "pinyin": "sān diǎn"}, {"text": "今天", "pinyin": "jīntiān"}, {"text": "下午", "pinyin": "xiàwǔ"}]'::jsonb,
        '今天 下午 三点',
        'Konsep waktu Mandarin selalu dimulai dari unit terbesar ke unit terkecil: Hari (今天) -> Waktu Siang (下午) -> Jam (三点).',
        6
    ),

    -- Unit 04: Keluarga & Relasi
    (
        '41000000-0000-0000-0000-000000000007',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000004',
        'multiple_choice',
        'Pilih partikel kepemilikan yang tepat untuk menghubungkan subjek dengan benda miliknya:',
        '这是我 ___ 书。',
        'Zhè shì wǒ ___ shū.',
        'Ini adalah buku milik saya.',
        '["的", "吗", "呢", "个"]'::jsonb,
        '的',
        'Partikel "的" (de) berfungsi sebagai penanda kepemilikan dengan rumus: [Pemilik] + 的 + [Benda/Orang yang Dimiliki].',
        7
    ),
    (
        '41000000-0000-0000-0000-000000000008',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000004',
        'sentence_ordering',
        'Susun kalimat untuk menyatakan jumlah anggota keluarga:',
        '我家有四口人。',
        'Wǒ jiā yǒu sì kǒu rén.',
        'Keluarga saya ada empat orang.',
        '[{"text": "四口人", "pinyin": "sì kǒu rén"}, {"text": "我家", "pinyin": "wǒ jiā"}, {"text": "有", "pinyin": "yǒu"}]'::jsonb,
        '我家 有 四口人',
        'Urutan kalimat keberadaan keluarga: Subjek (我家) + Kata Kerja Keberadaan (有) + Frasa Jumlah & Satuan Keluarga (四口人).',
        8
    ),

    -- Unit 05: Aktivitas Harian
    (
        '41000000-0000-0000-0000-000000000009',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000005',
        'multiple_choice',
        'Lengkapi kalimat tanya ya/tidak untuk menanyakan rencana makan:',
        '你想吃米饭 ___ ？',
        'Nǐ xiǎng chī mǐfàn ___ ?',
        'Apakah kamu ingin makan nasi?',
        '["吗", "什么", "的", "在"]'::jsonb,
        '吗',
        'Partikel tanya "吗" (ma) diletakkan langsung di ujung kalimat pernyataan untuk mengubahnya menjadi kalimat tanya ya/tidak.',
        9
    ),
    (
        '41000000-0000-0000-0000-000000000010',
        '11000000-0000-0000-0000-000000000001',
        '21000000-0000-0000-0000-000000000005',
        'sentence_ordering',
        'Susun kalimat sesuai kaidah posisi tempat sebelum aksi (Subjek + 在 + Tempat + Tindakan):',
        '我在学校看书。',
        'Wǒ zài xuéxiào kàn shū.',
        'Saya membaca buku di sekolah.',
        '[{"text": "看书", "pinyin": "kàn shū"}, {"text": "我", "pinyin": "wǒ"}, {"text": "在学校", "pinyin": "zài xuéxiào"}]'::jsonb,
        '我 在学校 看书',
        'Dalam bahasa Mandarin, keterangan lokasi perbuatan selalu diletakkan sebelum kata kerja perbuatan, bukan di akhir kalimat.',
        10
    ),

    -- Latihan Review Umum HSK 1
    (
        '41000000-0000-0000-0000-000000000011',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        'multiple_choice',
        'Pilih pelafalan nada yang tepat untuk ungkapan rasa terima kasih "谢谢":',
        '谢谢你的帮助！',
        'Xièxie nǐ de bāngzhù!',
        'Terima kasih atas bantuanmu!',
        '["xièxie (Nada 4 + netral)", "xiéxie (Nada 2 + netral)", "xiěxie (Nada 3 + netral)", "xiēxie (Nada 1 + netral)"]'::jsonb,
        'xièxie (Nada 4 + netral)',
        'Karakter 谢 berbunyi nada ke-4 (turun tajam), dan pada pengulangan kata "谢谢", karakter kedua diucapkan secara ringan (nada netral).',
        11
    ),
    (
        '41000000-0000-0000-0000-000000000012',
        '11000000-0000-0000-0000-000000000001',
        NULL,
        'sentence_ordering',
        'Susun kalimat ajakan santun menikmati hidangan teh:',
        '请喝中国茶。',
        'Qǐng hē Zhōngguó chá.',
        'Silakan minum teh Tiongkok.',
        '[{"text": "喝", "pinyin": "hē"}, {"text": "请", "pinyin": "qǐng"}, {"text": "中国茶", "pinyin": "Zhōngguó chá"}]'::jsonb,
        '请 喝 中国茶',
        'Kata santun "请" (qǐng / silakan) selalu ditempatkan paling depan kalimat imperatif santun.',
        12
    )
ON CONFLICT (id) DO UPDATE SET
    level_id = EXCLUDED.level_id,
    lesson_id = EXCLUDED.lesson_id,
    type = EXCLUDED.type,
    prompt = EXCLUDED.prompt,
    context_hanzi = EXCLUDED.context_hanzi,
    context_pinyin = EXCLUDED.context_pinyin,
    context_translation = EXCLUDED.context_translation,
    options = EXCLUDED.options,
    correct_answer = EXCLUDED.correct_answer,
    explanation = EXCLUDED.explanation,
    order_index = EXCLUDED.order_index,
    updated_at = now();


