import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="mx-auto max-w-3xl pb-12">
      {/* Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-8 w-40 bg-[#D9DCE3]/50 rounded-[6px]" />
        <Skeleton className="mt-3 h-4 w-96 bg-[#D9DCE3]/40 rounded-[4px]" />
      </div>

      <div className="space-y-8">
        {/* Profile Card Skeleton */}
        <div className="rounded-[12px] border border-[#D9DCE3] bg-[#FFFFFF] shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="border-b border-[#D9DCE3] bg-[#F8F9FC] px-6 py-4 flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded-full bg-[#D9DCE3]/60" />
            <Skeleton className="h-5 w-32 bg-[#D9DCE3]/60 rounded-[4px]" />
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-24 bg-[#D9DCE3]/40 rounded-[4px]" />
              <Skeleton className="h-10 w-full bg-[#D9DCE3]/30 rounded-[8px]" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-12 bg-[#D9DCE3]/40 rounded-[4px]" />
              <Skeleton className="h-28 w-full bg-[#D9DCE3]/30 rounded-[8px]" />
            </div>
            <div className="flex justify-end pt-2">
              <Skeleton className="h-10 w-32 bg-[#D9DCE3]/50 rounded-[8px]" />
            </div>
          </div>
        </div>

        {/* Account Info Card Skeleton */}
        <div className="rounded-[12px] border border-[#D9DCE3] bg-[#FFFFFF] shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="border-b border-[#D9DCE3] bg-[#F8F9FC] px-6 py-4 flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded-full bg-[#D9DCE3]/60" />
            <Skeleton className="h-5 w-40 bg-[#D9DCE3]/60 rounded-[4px]" />
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="space-y-2.5">
                <Skeleton className="h-3 w-28 bg-[#D9DCE3]/40 rounded-[4px]" />
                <Skeleton className="h-5 w-48 bg-[#D9DCE3]/30 rounded-[4px]" />
              </div>
              <div className="space-y-2.5">
                <Skeleton className="h-3 w-24 bg-[#D9DCE3]/40 rounded-[4px]" />
                <Skeleton className="h-6 w-20 bg-[#D9DCE3]/30 rounded-[6px]" />
              </div>
              <div className="sm:col-span-2 space-y-2.5">
                <Skeleton className="h-3 w-28 bg-[#D9DCE3]/40 rounded-[4px]" />
                <Skeleton className="h-5 w-36 bg-[#D9DCE3]/30 rounded-[4px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
