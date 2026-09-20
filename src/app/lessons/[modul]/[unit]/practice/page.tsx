import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  getAllModules,
  getModuleById,
  getModuleUnit,
  getNextUnitNavigation,
} from "@/lib/curriculum-modules";
import { getExercises } from "@/lib/practice";
import { LessonFocusedPractice } from "@/components/practice/LessonFocusedPractice";

export function generateStaticParams() {
  const modules = getAllModules();
  const params: { modul: string; unit: string }[] = [];

  for (const m of modules) {
    for (const u of m.units) {
      params.push({ modul: m.id, unit: u.slug });
    }
  }

  return params;
}

interface PageProps {
  params: Promise<{ modul: string; unit: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { modul, unit } = await params;
  const unitDetail = getModuleUnit(modul, unit);
  const currentModule = getModuleById(modul);

  if (!unitDetail || !currentModule) {
    return {
      title: "Latihan Tidak Ditemukan | KepoMandarin",
    };
  }

  return {
    title: `Latihan Pelajaran ${unitDetail.slug}: ${unitDetail.title} (${unitDetail.hanzi}) : ${currentModule.title} | KepoMandarin`,
    description: `Latihan soal fokus untuk Pelajaran ${unitDetail.slug}: Pilihan ganda, susun kalimat, dan audio.`,
  };
}

export default async function ModuleUnitPracticePage({ params }: PageProps) {
  const { modul, unit } = await params;
  const unitDetail = getModuleUnit(modul, unit);
  const currentModule = getModuleById(modul);

  if (!unitDetail || !currentModule) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const exercises = await getExercises({
    moduleId: modul,
    unitSlug: unit,
  });

  const nextNav = getNextUnitNavigation(modul, unit);

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Editorial Breadcrumb */}
      <nav className="border-b border-rule pb-3 flex items-center justify-between font-mono text-xs text-muted">
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={`/lessons/${currentModule.id}`}
            className="hover:text-ink transition-colors"
          >
            Silabus {currentModule.title}
          </Link>
          <span>/</span>
          <Link
            href={`/lessons/${currentModule.id}/${unitDetail.slug}`}
            className="hover:text-ink transition-colors"
          >
            Unit {unitDetail.slug}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">Latihan</span>
        </div>
        <Link
          href={`/lessons/${currentModule.id}/${unitDetail.slug}`}
          className="hover:text-ink uppercase transition-colors shrink-0"
        >
          ← Kembali ke Materi
        </Link>
      </nav>

      {/* Focused Practice Main Screen */}
      <LessonFocusedPractice
        lesson={{
          id: unitDetail.id,
          slug: unitDetail.slug,
          title: unitDetail.title,
          hanzi: unitDetail.hanzi,
          pinyin: unitDetail.pinyin,
          translation: unitDetail.translation,
          moduleId: currentModule.id,
          moduleTitle: currentModule.title,
          backHref: `/lessons/${currentModule.id}/${unitDetail.slug}`,
        }}
        exercises={exercises}
        userId={user?.id}
        nextNavigation={
          nextNav
            ? {
                label: nextNav.label,
                title: nextNav.title,
                href: nextNav.href,
                isLastInCurriculum: nextNav.isLastInCurriculum,
              }
            : null
        }
      />
    </div>
  );
}
