
"use client";

import { useEffect, useState } from "react";
import type { Event } from "@/types/event";
import EventCard from "@/components/events/EventCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function FeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data: Event[] = await res.json();

        const today = new Date().toLocaleDateString("en-CA", {
          timeZone: "Asia/Dhaka",
        });

        const upcomingEvents = data
          .filter((event) => event.eventDate >= today)
          .sort((a, b) =>
            a.eventDate.localeCompare(b.eventDate)
          )
          .slice(0, 6);

        setEvents(upcomingEvents);
      } catch (error) {
        console.error("Error fetching featured events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section className="py-16 text-center">
        Loading featured events...
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
          Discover What&apos;s Happening
        </p>

        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Featured Events
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Explore upcoming community events and find opportunities
          to connect, contribute, and make a difference.
        </p>
      </div>

      {events.length > 0 ? (
        <Carousel
          opts={{
            align: "start",
            loop: events.length > 3,
          }}
          className="mx-auto w-full"
        >
          <CarouselContent className="-ml-4">
            {events.map((event) => (
              <CarouselItem
                key={event._id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <EventCard event={event} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex justify-center gap-3">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      ) : (
        <p className="py-10 text-center text-muted-foreground">
          No upcoming events available right now.
        </p>
      )}
    </section>
  );
}
