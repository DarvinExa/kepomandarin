import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto py-12 sm:py-24 text-center">
      <div className="border-2 border-ink bg-paper p-8 sm:p-14 space-y-6">
        <div className="flex justify-center">
          <img
            src="/images/mascot-frustrated.png"
            alt="Maskot Halaman Tidak Ditemukan"
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
          />
        </div>

        <div className="space-y-2">
          <div className="inline-block border border-rule px-3 py-1 font-mono text-[11px] text-accent-red uppercase bg-canvas font-bold">
            GALAT 404 // HALAMAN TIDAK DITEMUKAN
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-ink">
            Sepertinya Kamu Tersesat
          </h1>
          <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
            Halaman materi atau latihan yang kamu cari tidak ditemukan atau alamat URL keliru.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider font-bold transition-colors"
          >
            ← Kembali ke Beranda
          </Link>
          <Link
            href="/lessons"
            className="px-6 py-3 border border-rule hover:border-ink bg-canvas text-ink font-mono text-xs uppercase tracking-wider font-bold transition-colors"
          >
            Silabus Pelajaran
          </Link>
        </div>
      </div>
    </div>
  );
}
