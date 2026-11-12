"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/events/EventCard";
import type { Event } from "@/types/event";

export default function UpcomingEventsPage() {
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

       const upcomingEvents = data.filter(
  (event) => event.eventDate >= today
);

setEvents(upcomingEvents);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Loading upcoming events...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Upcoming Events
        </h1>
        <p className="mt-3 text-muted-foreground">
          Explore upcoming community events and be part of something meaningful.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="rounded-xl border border-dashed py-16 text-center">
          <p className="text-lg font-medium">No upcoming events</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Check back later for new community events.
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