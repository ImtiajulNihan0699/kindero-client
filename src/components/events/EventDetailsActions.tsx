
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { Event } from "@/types/event";
import { authClient } from "@/lib/auth-client";
import EventActions from "@/components/events/EventActions";
import EditEventDialog from "@/components/events/EditEventDialog";
import DeleteEventDialog from "@/components/events/DeleteEventDialog";

interface EventDetailsActionsProps {
  event: Event;
}

export default function EventDetailsActions({
  event,
}: EventDetailsActionsProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [currentEvent, setCurrentEvent] = useState(event);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Show actions only to the logged-in event creator
  if (
    !session?.user.id ||
    currentEvent.createdBy !== session.user.id
  ) {
    return null;
  }

  return (
    <>
      <EventActions
        onEdit={() => setEditOpen(true)}
        onDelete={() => setDeleteOpen(true)}
      />

      <EditEventDialog
        key={currentEvent._id}
        event={currentEvent}
        open={editOpen}
        onOpenChange={setEditOpen}
        onUpdated={(updatedEvent) => {
          setCurrentEvent(updatedEvent);
          setEditOpen(false);
          router.refresh();
        }}
      />

      <DeleteEventDialog
        event={currentEvent}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDeleted={() => {
          setDeleteOpen(false);
          router.push("/events/manage-events");
        }}
      />
    </>
  );
}
