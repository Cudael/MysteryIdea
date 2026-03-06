"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lightbulb, Unlock, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

  const normalizedCreatorAvatarUrl = useMemo(() => {
    if (typeof creatorAvatarUrl !== "string") return null;
    const trimmed = creatorAvatarUrl.trim();
    if (!trimmed) return null;
    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://")
    ) {
      return trimmed;
    }
    return null;
  }, [creatorAvatarUrl]);

  const creatorInitials = useMemo(() => {
    const value = creatorName?.trim();
    if (!value) return "?";

    const parts = value.split(/\s+/).filter(Boolean);
    return parts
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }, [creatorName]);

  const hasImage = !!normalizedImageUrl && !imageError;
  const categorySlug = category ? CATEGORY_META[category]?.slug : null;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-[#D9DCE3] bg-[#FFFFFF] shadow-[0_4px_18px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.07)]">
      {/* Header / media */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-[#F5F6FA]">
        {hasImage ? (
          <>
            <Image
              src={normalizedImageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,_#F8F9FC_0%,_#F1F4FB_100%)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(58,95,205,0.10),_transparent_30%)]" />
            <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#D9DCE3] bg-[#FFFFFF] shadow-sm">
                <Lightbulb className="h-5 w-5 text-[#3A5FCD]" />
              </div>
              <p className="text-sm font-semibold text-[#1A1A1A]">
                Premium insight preview
              </p>
              <p className="mt-1 max-w-[220px] text-xs leading-5 text-[#1A1A1A]/55">
                Unlock the creator&apos;s full idea and hidden details.
              </p>
            </div>
          </div>
        )}

        {/* Top row */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                unlockType === "EXCLUSIVE"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-white/92 text-[#1A1A1A]"
              }`}
            >
              {unlockType === "EXCLUSIVE" ? "Exclusive" : "Multi-unlock"}
            </span>

            {category &&
              (categorySlug ? (
                <Link
                  href={`/ideas/category/${categorySlug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-medium text-[#1A1A1A] shadow-sm transition-colors hover:bg-white"
                >
                  {category}
                </Link>
              ) : (
                <span className="inline-flex items-center rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-medium text-[#1A1A1A] shadow-sm">
                  {category}
                </span>
              ))}
          </div>

          {!isOwner && (
            <div className="rounded-full border border-[#D9DCE3] bg-white/95 p-1 shadow-sm backdrop-blur-sm">
              <BookmarkButton
                ideaId={id}
                initialBookmarked={initialBookmarked}
                isAuthenticated={isAuthenticated}
              />
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2">
          {purchaseCount !== undefined && purchaseCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F6FA] px-2.5 py-1 text-xs font-medium text-[#1A1A1A]/65">
              <Users className="h-3.5 w-3.5 text-[#3A5FCD]" />
              {purchaseCount}
            </span>
          )}
        </div>

        <h3 className="text-[20px] font-bold leading-[1.25] tracking-tight text-[#1A1A1A]">
          <Link
            href={`/ideas/${id}`}
            className="transition-colors hover:text-[#3A5FCD] focus:outline-none"
          >
            <span className="line-clamp-2">{title}</span>
          </Link>
        </h3>

        {teaserText && (
          <p className="mt-3 line-clamp-3 text-[15px] leading-[1.65] text-[#1A1A1A]/72">
            {teaserText}
          </p>
        )}

        <div className="flex-1" />

        {/* Footer */}
        <div className="mt-5 flex items-end justify-between gap-4 border-t border-[#D9DCE3] pt-4">
          <div className="min-w-0 flex-1">
            <div className="text-[28px] font-black tracking-tight text-[#1A1A1A]">
              {formatPrice(priceInCents)}
            </div>

            {creatorName && (
              <div className="mt-2">
                {creatorId ? (
                  <Link
                    href={`/creators/${creatorId}`}
                    className="flex min-w-0 items-center gap-2 text-sm text-[#1A1A1A]/68 transition-colors hover:text-[#3A5FCD]"
                  >
                    <Avatar className="h-7 w-7 border border-[#D9DCE3]">
                      {normalizedCreatorAvatarUrl ? (
                        <AvatarImage
                          src={normalizedCreatorAvatarUrl}
                          alt={creatorName}
                        />
                      ) : null}
                      <AvatarFallback className="bg-[#EEF3FF] text-[11px] font-semibold text-[#3A5FCD]">
                        {creatorInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate">
                      by <span className="font-medium">{creatorName}</span>
                    </span>
                  </Link>
                ) : (
                  <div className="flex min-w-0 items-center gap-2 text-sm text-[#1A1A1A]/68">
                    <Avatar className="h-7 w-7 border border-[#D9DCE3]">
                      {normalizedCreatorAvatarUrl ? (
                        <AvatarImage
                          src={normalizedCreatorAvatarUrl}
                          alt={creatorName}
                        />
                      ) : null}
                      <AvatarFallback className="bg-[#EEF3FF] text-[11px] font-semibold text-[#3A5FCD]">
                        {creatorInitials}
                      </AvatarFallback>
                    </Avatar>
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
              <Button asChild variant="outline" size="sm" className="h-10 px-4">
                <Link href={`/creator/ideas/${id}/edit`}>Edit</Link>
              </Button>
            ) : isPurchased ? (
              <Button
                asChild
                size="sm"
                className="h-10 gap-1.5 bg-green-600 px-4 text-white hover:bg-green-700"
              >
                <Link href={`/ideas/${id}`}>
                  <Unlock className="h-3.5 w-3.5" />
                  Read
                </Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="h-10 px-4">
                <Link href={`/ideas/${id}`}>Unlock Now</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
