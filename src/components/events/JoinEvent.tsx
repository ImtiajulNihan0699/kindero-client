
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import type { Event } from "@/types/event";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const API = process.env.NEXT_PUBLIC_API_URL;

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
        const token = await getTokenFromClient();

        const res = await fetch(
          `${API}/joined-events/${session.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
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
      const token = await getTokenFromClient();

      const res = await fetch(`${API}/joined-events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: session.user.id,
          eventId: event._id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to join event");
      }

      setJoined(true);

      toast.add({
        title: "Successfully Joined!",
        description: "You have successfully joined this event.",
      });

      router.push("/events/joined-events");
    } catch (error) {
      console.error("Error joining event:", error);

      toast.add({
        title: "Something went wrong",
        description:
          error instanceof Error
            ? error.message
            : "Failed to join this event. Please try again.",
      });
    } finally {
      setJoining(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
        <h2 className="text-xl font-semibold">
          Want to Be Part of This Event?
        </h2>

        <p className="text-muted-foreground">
          Join this event and be part of something meaningful. We&apos;d love
          to have you participate!
        </p>

        <Button
          onClick={handleJoinEvent}
          disabled={loading || joining || joined || eventEnded}
        >
          {loading
            ? "Checking..."
            : joining
              ? "Joining..."
              : joined
                ? "Already Joined"
                : eventEnded
                  ? "Event Has Ended"
                  : "Join This Event"}
        </Button>
      </CardContent>
    </Card>
  );
}
