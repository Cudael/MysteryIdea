"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { z } from "zod";

const createIdeaSchema = z.object({
  title: z.string().min(1).max(200),
  teaserText: z.string().optional(),
  hiddenContent: z.string().min(1),
  priceInCents: z.number().int().min(100),
  unlockType: z.enum(["EXCLUSIVE", "MULTI"]),
  maxUnlocks: z.number().int().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export async function createIdea(data: z.infer<typeof createIdeaSchema>) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");

  const validated = createIdeaSchema.parse(data);

  const idea = await prisma.idea.create({
    data: {
      ...validated,
      tags: validated.tags ?? [],
      creatorId: user.id,
    },
  });

  revalidatePath("/creator");
  return idea;
}

export async function updateIdea(
  id: string,
  data: Partial<z.infer<typeof createIdeaSchema>>
) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");

  const idea = await prisma.idea.findFirst({
    where: { id, creatorId: user.id },
  });
  if (!idea) throw new Error("Idea not found or unauthorized");

  const updated = await prisma.idea.update({
    where: { id },
    data,
  });

  revalidatePath("/creator");
  revalidatePath(`/ideas/${id}`);
  return updated;
}

export async function deleteIdea(id: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");

  const idea = await prisma.idea.findFirst({
    where: { id, creatorId: user.id },
  });
  if (!idea) throw new Error("Idea not found or unauthorized");

  await prisma.idea.delete({ where: { id } });
  revalidatePath("/creator");
}

export async function publishIdea(id: string) {
  return updateIdea(id, { published: true });
}

export async function getIdeasByCreator() {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");

  return prisma.idea.findMany({
    where: { creatorId: user.id },
    orderBy: { createdAt: "desc" },
  });
}
