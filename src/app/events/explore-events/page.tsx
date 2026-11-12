"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/events/EventCard";
import type { Event } from "@/types/event";

export default function ExploreEventsPage() {
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


        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Loading events...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Explore Events
        </h1>
        <p className="mt-3 text-muted-foreground">
          Discover community events and find opportunities to make a difference.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="rounded-xl border border-dashed py-16 text-center">
          <p className="text-lg font-medium">No events found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            There are no events available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}