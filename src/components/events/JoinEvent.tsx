
"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import type { Event } from "@/types/event";
import { useRouter } from "next/navigation";

interface JoinEventProps {
  event: Event;
}

export default function JoinEvent({ event }: JoinEventProps) {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Dhaka",
  });

  const eventEnded = event.eventDate < today;

  useEffect(() => {
    const checkJoinedEvent = async () => {
      if (!session?.user.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${session.user.id}`,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error("Failed to check joined events");
        }

        const alreadyJoined = data.some(
          (joinedEvent: { eventId: string }) =>
            joinedEvent.eventId === event._id,
        );

        setJoined(alreadyJoined);
      } catch (error) {
        console.error("Error checking joined event:", error);
      } finally {
        setLoading(false);
      }
    };

    checkJoinedEvent();
  }, [session?.user.id, event._id]);

  const handleJoinEvent = async () => {
    if (!session?.user.id) {
      toast.add({
        title: "Login Required",
        description: "Please log in to join this event.",
      });
      return;
    }

    setJoining(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/joined-events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.user.id,
            eventId: event._id,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to join event");
      }

      setJoined(true);

      toast.add({
        title: "Successfully Joined!",
        description: "You have joined this event.",
      });
      router.push("/events/joined-events");
    } catch (error) {
      console.error("Error joining event:", error);

      toast.add({
        title: "Unable to Join",
        description: "Something went wrong while joining this event.",
      });
    } finally {
      setJoining(false);
    }
  };

  return (
    <Card className="border-primary/20 bg-primary/5 shadow-sm">
      <CardContent className="flex flex-col items-center gap-4 px-6 py-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Want to Be Part of This Event?
        </h2>

        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Your participation can make a difference! Connect with your
          community, meet like-minded people, and contribute to something
          meaningful. Join us and be part of the positive change.
        </p>

        <Button
          size="lg"
          className="min-w-44"
          disabled={loading || joining || joined || eventEnded}
          onClick={handleJoinEvent}
        >
          {loading
            ? "Checking..."
            : eventEnded
              ? "Event Ended"
              : joined
                ? "Already Joined"
                : joining
                  ? "Joining..."
                  : "Join This Event"}
        </Button>
      </CardContent>
    </Card>
  );
}
