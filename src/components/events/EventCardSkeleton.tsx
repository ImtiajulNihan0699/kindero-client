
export default function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      {/* Image skeleton */}
      <div className="h-52 w-full animate-pulse bg-muted" />

      <div className="space-y-4 p-5">
        {/* Category */}
        <div className="h-5 w-24 animate-pulse rounded-full bg-muted" />

        {/* Title */}
        <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        </div>

        {/* Date and location */}
        <div className="space-y-2">
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        </div>

        {/* Button */}
        <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
}
