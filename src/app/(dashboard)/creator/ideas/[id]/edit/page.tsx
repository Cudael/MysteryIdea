import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { IdeaForm } from "@/features/ideas/components/idea-form";
import { DeleteIdeaDialog } from "@/features/ideas/components/delete-idea-dialog";
import { getIdeaById, updateIdea } from "@/features/ideas/actions";

export const metadata: Metadata = {
  title: "Edit Idea - MysteryMarket",
};

export default async function EditIdeaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const idea = await getIdeaById(id);

  if (!idea || idea.creator.clerkId !== userId) notFound();

  async function handleUpdate(data: Parameters<typeof updateIdea>[1]) {
    "use server";
    await updateIdea(id, data);
  }

  return (
    <div className="mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-[#D9DCE3] pb-6">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#1A1A1A]">Edit Idea</h1>
          <p className="mt-2 text-[15px] leading-[1.6] text-[#1A1A1A]/60">
            Update your insight, adjust pricing, or refine your tags.
          </p>
        </div>
        {idea._count.purchases === 0 && (
          <div className="shrink-0 mb-1">
            <DeleteIdeaDialog ideaId={id} ideaTitle={idea.title} />
          </div>
        )}
      </div>

      <div className="rounded-[12px] border border-[#D9DCE3] bg-[#FFFFFF] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <IdeaForm
          initialData={{
            title: idea.title,
            teaserText: idea.teaserText ?? undefined,
            teaserImageUrl: idea.teaserImageUrl ?? undefined,
            hiddenContent: idea.hiddenContent,
            priceInCents: idea.priceInCents,
            unlockType: idea.unlockType,
            maxUnlocks: idea.maxUnlocks ?? undefined,
            category: idea.category ?? undefined,
            tags: idea.tags,
          }}
          onSubmit={handleUpdate}
          submitLabel="Save Changes"
        />
      </div>
      
    </div>
  );
}
