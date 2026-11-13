
"use client";

import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

import type { Event } from "@/types/event";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteEventDialogProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: (eventId: string) => void;
}

export default function DeleteEventDialog({
  event,
  open,
  onOpenChange,
  onDeleted,
}: DeleteEventDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!event) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${event._id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete event");
      }

      onDeleted(event._id);

      toast.add({
        title: "Event Deleted Successfully!",
        description: "Your event has been removed.",
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting event:", error);

      toast.add({
        title: "Deletion Failed",
        description: "Something went wrong while deleting your event.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" />
          </div>

          <AlertDialogTitle>Delete Event?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {event?.title}
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <Button
            variant="destructive"
            disabled={loading}
            onClick={handleDelete}
          >
            <Trash2 className="size-4" />
            {loading ? "Deleting..." : "Delete Event"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
