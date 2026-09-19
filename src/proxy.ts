import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Berlaku untuk seluruh rute kecuali aset statis:
     * - _next/static (berkas statis Next.js)
     * - _next/image (optimasi gambar Next.js)
     * - favicon.ico (favicon)
     * - ekstensi berkas statis (svg, png, jpg, jpeg, gif, webp)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
