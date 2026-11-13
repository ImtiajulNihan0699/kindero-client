
"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/events/EventCard";
import EventCardSkeleton from "@/components/events/EventCardSkeleton";
import type { Event } from "@/types/event";

export default function ExploreEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { label: "All", value: "all" },
    { label: "Environment", value: "environment" },
    { label: "Education", value: "education" },
    { label: "Community Service", value: "community" },
    { label: "Charity & Fundraising", value: "charity" },
    { label: "Health & Wellness", value: "health" },
    { label: "Other", value: "other" },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "all" ||
      event.category.toLowerCase() === selectedCategory;

    const searchWords = searchTerm
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    const eventText = [event.title, event.description, event.location]
      .join(" ")
      .toLowerCase();

    const eventWords = eventText.split(/\W+/);

    const matchesSearch = searchWords.every((word) =>
      eventWords.includes(word),
    );

    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);

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
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Explore Events
          </h1>

          <p className="mt-3 text-muted-foreground">
            Discover community events and find opportunities to make a
            difference.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
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
          Discover community events and find opportunities to make a
          difference.
        </p>

        {/* Category Tabs and Search */}
        <div className="mt-8 space-y-5">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => setSelectedCategory(category.value)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? "bg-primary text-primary-foreground"
                    : "border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search events by title, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 w-full rounded-lg border bg-background px-4 pl-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="rounded-xl border border-dashed py-16 text-center">
          <p className="text-lg font-medium">No events found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try another category or search term.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
