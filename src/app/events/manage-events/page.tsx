"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Event } from "@/types/event";
import EventCard from "@/components/events/EventCard";
import EditEventDialog from "@/components/events/EditEventDialog";
import DeleteEventDialog from "@/components/events/DeleteEventDialog";
import EventCardSkeleton from "@/components/events/EventCardSkeleton";

export default function ManageEventsPage() {
  const { data: session } = authClient.useSession();

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyEvents = async () => {
      if (!session?.user.id) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-events/${session.user.id}`,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error("Failed to fetch your events");
        }

        setEvents(data);
      } catch (error) {
        console.error("Error fetching my events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [session?.user.id]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Manage Events
        </h1>
        <p className="mt-3 text-muted-foreground">
          Manage the community events you have created.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      ) : events.length === 0 ? (
        <p className="text-center text-muted-foreground">
          You haven&apos;t created any events yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              showEdit
              showDelete
              onEdit={(event) => setSelectedEvent(event)}
              onDelete={(eventId) => setDeleteEventId(eventId)}
            />
          ))}
        </div>
      )}

      <EditEventDialog
        key={selectedEvent?._id}
        event={selectedEvent}
        open={!!selectedEvent}
        onOpenChange={(open) => {
          if (!open) setSelectedEvent(null);
        }}
        onUpdated={(updatedEvent) => {
          setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event._id === updatedEvent._id ? updatedEvent : event,
            ),
          );
          setSelectedEvent(null);
        }}
      />

      <DeleteEventDialog
        event={events.find((event) => event._id === deleteEventId) || null}
        open={!!deleteEventId}
        onOpenChange={(open) => {
          if (!open) setDeleteEventId(null);
        }}
        onDeleted={(eventId) => {
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event._id !== eventId),
          );
          setDeleteEventId(null);
        }}
      />
    </section>
  );
}
