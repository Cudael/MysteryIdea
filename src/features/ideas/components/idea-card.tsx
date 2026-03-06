"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, Sparkles, Unlock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "@/features/bookmarks/components/bookmark-button";
import { CATEGORY_META } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
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
  const [avatarError, setAvatarError] = useState(false);

  const normalizedImageUrl = useMemo(() => {
    if (typeof teaserImageUrl !== "string") return null;
    const trimmed = teaserImageUrl.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    return null;
  }, [teaserImageUrl]);

  const normalizedCreatorAvatarUrl = useMemo(() => {
    if (typeof creatorAvatarUrl !== "string") return null;
    const trimmed = creatorAvatarUrl.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    return null;
  }, [creatorAvatarUrl]);

  const hasImage = !!normalizedImageUrl && !imageError;
  const hasAvatar = !!normalizedCreatorAvatarUrl && !avatarError;

  const creatorInitials = useMemo(() => {
    const value = creatorName?.trim();
    if (!value) return "?";

    const parts = value.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();

    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
  }, [creatorName]);

  const categoryHref = category && CATEGORY_META[category]?.slug
    ? `/ideas/category/${CATEGORY_META[category].slug}`
    : null;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#D9DCE3] bg-[#FFFFFF] shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
      <div className="relative">
        <div className="relative h-52 w-full overflow-hidden bg-[#EEF2FF] sm:h-56">
          {hasImage ? (
            <>
              <Image
                src={normalizedImageUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                onError={() => setImageError(true)}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(58,95,205,0.20),_transparent_35%),linear-gradient(135deg,_#F8F9FC_0%,_#EEF2FF_45%,_#F5F6FA_100%)]">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#3A5FCD]/10 blur-2xl" />
              <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center px-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D9DCE3] bg-white/80 shadow-sm backdrop-blur">
                  <Sparkles className="h-5 w-5 text-[#3A5FCD]" />
                </div>
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  Premium hidden insight
                </p>
                <p className="mt-1 max-w-[220px] text-xs leading-5 text-[#1A1A1A]/55">
                  Carefully packaged by the creator and ready to unlock.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <div className="pointer-events-auto flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm ${
                unlockType === "EXCLUSIVE"
                  ? "border-amber-200 bg-amber-50/95 text-amber-800"
                  : "border-white/40 bg-white/90 text-[#1A1A1A]"
              }`}
            >
              {unlockType === "EXCLUSIVE" ? "Exclusive" : "Multi-unlock"}
            </span>

            {category && (
              <>
                {categoryHref ? (
                  <Link
                    href={categoryHref}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center rounded-full border border-white/40 bg-white/90 px-3 py-1 text-[11px] font-medium text-[#1A1A1A] shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                  >
                    {category}
                  </Link>
                ) : (
                  <span className="inline-flex items-center rounded-full border border-white/40 bg-white/90 px-3 py-1 text-[11px] font-medium text-[#1A1A1A] shadow-sm backdrop-blur-sm">
                    {category}
                  </span>
                )}
              </>
            )}
          </div>

          {!isOwner && (
            <div className="pointer-events-auto">
              <div className="rounded-full border border-[#D9DCE3] bg-white/92 p-1 shadow-sm backdrop-blur">
                <BookmarkButton
                  ideaId={id}
                  initialBookmarked={initialBookmarked}
                  isAuthenticated={isAuthenticated}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 text-xs text-[#1A1A1A]/55">
            {purchaseCount !== undefined && purchaseCount > 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F8F9FC] px-2.5 py-1 font-medium text-[#1A1A1A]/70">
                <Users className="h-3.5 w-3.5 text-[#3A5FCD]" />
                {purchaseCount}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F8F9FC] px-2.5 py-1 font-medium text-[#1A1A1A]/50">
                <Bookmark className="h-3.5 w-3.5 text-[#3A5FCD]/70" />
                New listing
              </span>
            )}
          </div>
        </div>

        <h3 className="text-[1.05rem] font-bold leading-snug tracking-tight text-[#111827]">
          <Link
            href={`/ideas/${id}`}
            className="rounded-sm transition-colors hover:text-[#3A5FCD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3A5FCD]/30"
          >
            <span className="line-clamp-2">{title}</span>
          </Link>
        </h3>

        {teaserText && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#1A1A1A]/65">
            {teaserText}
          </p>
        )}

        <div className="mt-5 flex-1" />

        <div className="mt-4 border-t border-[#E7EAF0] pt-4">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[1.35rem] font-black tracking-tight text-[#111827]">
                {formatPrice(priceInCents)}
              </div>

              {creatorName && (
                <div className="mt-2">
                  {creatorId ? (
                    <Link
                      href={`/creators/${creatorId}`}
                      className="inline-flex max-w-full items-center gap-2.5 rounded-full pr-2 text-sm text-[#1A1A1A]/65 transition-colors hover:text-[#3A5FCD]"
                    >
                      {hasAvatar ? (
                        <Image
                          src={normalizedCreatorAvatarUrl}
                          alt={creatorName}
                          width={28}
                          height={28}
                          className="h-7 w-7 rounded-full border border-[#D9DCE3] object-cover"
                          onError={() => setAvatarError(true)}
                        />
                      ) : (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D9DCE3] bg-[#EEF2FF] text-[11px] font-bold text-[#3A5FCD]">
                          {creatorInitials}
                        </div>
                      )}

                      <span className="truncate">
                        by <span className="font-medium">{creatorName}</span>
                      </span>
                    </Link>
                  ) : (
                    <div className="inline-flex max-w-full items-center gap-2.5 text-sm text-[#1A1A1A]/65">
                      {hasAvatar ? (
                        <Image
                          src={normalizedCreatorAvatarUrl}
                          alt={creatorName}
                          width={28}
                          height={28}
                          className="h-7 w-7 rounded-full border border-[#D9DCE3] object-cover"
                          onError={() => setAvatarError(true)}
                        />
                      ) : (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D9DCE3] bg-[#EEF2FF] text-[11px] font-bold text-[#3A5FCD]">
                          {creatorInitials}
                        </div>
                      )}

                      <span className="truncate">
                        by <span className="font-medium">{creatorName}</span>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="shrink-0">
              {isOwner ? (
                <Button asChild variant="outline" size="sm" className="rounded-full px-4">
                  <Link href={`/creator/ideas/${id}/edit`}>Edit</Link>
                </Button>
              ) : isPurchased ? (
                <Button
                  asChild
                  size="sm"
                  className="gap-1.5 rounded-full bg-green-600 px-4 text-white hover:bg-green-700"
                >
                  <Link href={`/ideas/${id}`}>
                    <Unlock className="h-3.5 w-3.5" />
                    Read
                  </Link>
                </Button>
              ) : (
                <Button asChild size="sm" className="rounded-full px-4">
                  <Link href={`/ideas/${id}`}>Unlock Now</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
