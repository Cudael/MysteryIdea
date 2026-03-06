"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, Unlock, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "@/features/bookmarks/components/bookmark-button";
import { formatPrice } from "@/lib/utils";
import { CATEGORY_META } from "@/lib/constants";
import type { IdeaCardProps } from "@/features/ideas/types";

export function IdeaCard({
  id,
  title,
  teaserText,
  teaserImageUrl,
  priceInCents,
  unlockType,
  category,
  creatorId,
  creatorName,
  creatorAvatarUrl,
  purchaseCount,
  isOwner = false,
  isPurchased = false,
  initialBookmarked = false,
  isAuthenticated = false,
}: IdeaCardProps) {
  const [imageError, setImageError] = useState(false);

  const isLocked = !isOwner && !isPurchased;

  const normalizedImageUrl = useMemo(() => {
    if (typeof teaserImageUrl !== "string") return null;
    const trimmed = teaserImageUrl.trim();
    if (!trimmed) return null;
    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://")
    ) {
      return trimmed;
    }
    return null;
  }, [teaserImageUrl]);

  const hasImage = !!normalizedImageUrl && !imageError;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-[#14151B]">
        {/* Base placeholder */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(90,105,140,0.22),transparent_38%),linear-gradient(135deg,#1B1D25_0%,#232632_45%,#14151B_100%)]" />

        {/* Decorative pattern for no-image state */}
        {!hasImage && (
          <>
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:22px_22px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm">
                <Sparkles className="h-6 w-6 text-white/70" />
              </div>
            </div>
          </>
        )}

        {/* Image */}
        {hasImage && (
          <Image
            src={normalizedImageUrl}
            alt={title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
        )}

        {/* Always-on dark treatment so bright images don't wash out header */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1020]/20 via-transparent to-transparent" />

        {/* Category badge */}
        {category && (
          <div className="absolute left-3 top-3 z-20">
            {CATEGORY_META[category]?.slug ? (
              <Link
                href={`/ideas/category/${CATEGORY_META[category].slug}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center rounded-md border border-white/15 bg-black/35 px-2.5 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-black/50"
              >
                {category}
              </Link>
            ) : (
              <span className="inline-flex items-center rounded-md border border-white/15 bg-black/35 px-2.5 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
                {category}
              </span>
            )}
          </div>
        )}

        {/* Lock overlay */}
        {isLocked && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#11131A]/35 backdrop-blur-[2px]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/40 shadow-xl">
              <Lock className="h-5 w-5 text-white" strokeWidth={2.4} />
            </div>
            <span className="mt-3 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold tracking-wide text-white shadow-xl">
              Locked Content
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                unlockType === "EXCLUSIVE"
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {unlockType === "EXCLUSIVE" ? "Exclusive" : "Multi-unlock"}
            </span>

            {purchaseCount !== undefined && purchaseCount > 0 && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                {purchaseCount}
              </span>
            )}
          </div>

          {!isOwner && (
            <div className="shrink-0">
              <BookmarkButton
                ideaId={id}
                initialBookmarked={initialBookmarked}
                isAuthenticated={isAuthenticated}
              />
            </div>
          )}
        </div>

        <h3 className="line-clamp-2 text-lg font-bold leading-tight text-foreground">
          <Link
            href={`/ideas/${id}`}
            className="transition-colors hover:text-primary focus:outline-none"
          >
            {title}
          </Link>
        </h3>

        {teaserText && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {teaserText}
          </p>
        )}

        <div className="flex-1" />

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-foreground">
              {formatPrice(priceInCents)}
            </span>

            {creatorName && (
              <div className="mt-0.5 flex items-center gap-1.5">
                {creatorId ? (
                  <Link
                    href={`/creators/${creatorId}`}
                    className="text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    by {creatorName}
                  </Link>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    by {creatorName}
                  </span>
                )}
              </div>
            )}
          </div>

          <div>
            {isOwner ? (
              <Button asChild variant="outline" size="sm">
                <Link href={`/creator/ideas/${id}/edit`}>Edit</Link>
              </Button>
            ) : isPurchased ? (
              <Button
                asChild
                size="sm"
                className="gap-1.5 bg-green-600 text-white hover:bg-green-700"
              >
                <Link href={`/ideas/${id}`}>
                  <Unlock className="h-3.5 w-3.5" />
                  Read
                </Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="gap-1.5">
                <Link href={`/ideas/${id}`}>Unlock Now</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
