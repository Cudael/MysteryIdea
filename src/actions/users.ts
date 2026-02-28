"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { z } from "zod";

export async function syncUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("User not found in Clerk");

  const email =
    clerkUser.emailAddresses.find(
      (e) => e.id === clerkUser.primaryEmailAddressId
    )?.emailAddress ?? "";

  const name =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;

  const user = await prisma.user.upsert({
    where: { clerkId },
    update: { email, name, avatarUrl: clerkUser.imageUrl },
    create: { clerkId, email, name, avatarUrl: clerkUser.imageUrl },
  });

  return user;
}

const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  bio: z.string().max(500).optional(),
});

export async function updateProfile(
  data: z.infer<typeof updateProfileSchema>
) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const validated = updateProfileSchema.parse(data);

  const user = await prisma.user.update({
    where: { clerkId },
    data: validated,
  });

  revalidatePath("/settings");
  return user;
}

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: { clerkId },
    include: {
      _count: {
        select: { ideas: true, purchases: true },
      },
    },
  });
}
