
import Link from "next/link";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <SearchX className="mb-6 size-16 text-primary" />

      <h1 className="text-6xl font-bold tracking-tight">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-muted-foreground">
        Sorry, the page you are looking for does not exist or may have been moved.
      </p>

      <div className="mt-8 flex gap-3">
        <Link href="/">
          <Button>Go Home</Button>
        </Link>

        <Link href="/events/explore-events">
          <Button variant="outline">Explore Events</Button>
        </Link>
      </div>
    </div>
  );
}
