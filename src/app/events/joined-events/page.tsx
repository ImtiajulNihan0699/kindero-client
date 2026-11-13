
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Eye, Trash2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/event";

interface JoinedEvent extends Omit<Event, "_id"> {
  _id: string;
  eventId: string;
  joinedAt: string;
}

export default function JoinedEventsPage() {
  const { data: session } = authClient.useSession();

  const [events, setEvents] = useState<JoinedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      if (!session?.user.id) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${session.user.id}`,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error("Failed to fetch joined events");
        }

        setEvents(data);
      } catch (error) {
        console.error("Error fetching joined events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [session?.user.id]);

  const handleRemove = async (id: string) => {
    setRemovingId(id);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to remove event");
      }

      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== id),
      );

      toast.add({
        title: "Event Removed",
        description: "The event has been removed from your joined events.",
      });
    } catch (error) {
      console.error("Error removing joined event:", error);

      toast.add({
        title: "Removal Failed",
        description: "Something went wrong while removing the event.",
      });
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          My Joined Events
        </h1>

        <p className="mt-3 text-muted-foreground">
          Keep track of the events you have joined.
        </p>
      </div>

      {loading ? (
        <p className="py-12 text-center text-muted-foreground">
          Loading your joined events...
        </p>
      ) : events.length === 0 ? (
        <div className="rounded-xl border bg-card px-6 py-16 text-center">
          <h2 className="text-xl font-semibold">
            No Joined Events Yet
          </h2>

          <p className="mt-2 text-muted-foreground">
            Explore upcoming events and join something interesting!
          </p>

          <Link href="/events/explore-events" className="mt-6 inline-block">
            <Button>Explore Events</Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-card">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex flex-col gap-5 border-b p-5 last:border-b-0 sm:flex-row sm:items-center"
            >
              <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:h-28 sm:w-40">
                {event.image && (
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold">
                    {event.title}
                  </h2>

                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium capitalize text-primary">
                    {event.category}
                  </span>
                </div>

                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {event.description}
                </p>

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="size-4 text-primary" />
                    {new Date(
                      `${event.eventDate}T00:00:00`,
                    ).toLocaleDateString("en-BD", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "Asia/Dhaka",
                    })}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-primary" />
                    {event.location}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:w-36">
                <Link
                  href={`/events/${event.eventId}`}
                  className="w-full"
                >
                  <Button className="w-full">
                    <Eye className="size-4" />
                    View Details
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="w-full text-destructive hover:bg-destructive hover:text-white"
                  disabled={removingId === event._id}
                  onClick={() => handleRemove(event._id)}
                >
                  <Trash2 className="size-4" />
                  {removingId === event._id ? "Removing..." : "Remove"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
