import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { IdeaForm } from "@/features/ideas/components/idea-form";
import { createIdea } from "@/features/ideas/actions";

export const metadata: Metadata = {
  title: "Create Idea - MysteryMarket",
};

export default async function NewIdeaPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 border-b border-[#D9DCE3] pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-[#1A1A1A]">Create New Idea</h1>
        <p className="mt-2 text-[16px] leading-[1.6] text-[#1A1A1A]/70">
          Draft your insight, set your terms, and prepare to monetize your expertise.
        </p>
      </div>

      <div className="rounded-[12px] border border-[#D9DCE3] bg-[#FFFFFF] p-6 sm:p-8 shadow-[0_4px_14px_rgba(0,0,0,0.02)]">
        <IdeaForm onSubmit={createIdea} />
      </div>
    </div>
  );
}
