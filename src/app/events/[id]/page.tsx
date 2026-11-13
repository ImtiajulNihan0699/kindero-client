import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin } from "lucide-react";
import EventDetailsActions from "@/components/events/EventDetailsActions";
import type { Event } from "@/types/event";
import JoinEvent from "@/components/events/JoinEvent";

interface EventDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const event: Event = await res.json();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6">
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        {event.image && (
          <div className="relative h-64 w-full md:h-96">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <div className="space-y-6 p-6 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium capitalize text-primary">
              {event.category}
            </span>

            <div className="ml-auto w-full max-w-xs">
              <EventDetailsActions event={event} />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {event.title}
          </h1>

          <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-5 text-primary" />
              {new Date(`${event.eventDate}T00:00:00`).toLocaleDateString(
                "en-BD",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "Asia/Dhaka",
                },
              )}
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-primary" />
              {event.location}
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="mb-3 text-xl font-semibold">About This Event</h2>

            <p className="whitespace-pre-line text-base leading-8 text-muted-foreground">
              {event.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <JoinEvent event={event} />
      </div>
    </div>
  );
}
