"use client";

import { useState } from "react";
import { CalendarDays, ImagePlus, MapPin } from "lucide-react";
import { toast } from "@/components/ui/toast";

import type { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditEventDialogProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: (updatedEvent: Event) => void;
}

export default function EditEventDialog({
  event,
  open,
  onOpenChange,
  onUpdated,
}: EditEventDialogProps) {
  const [loading, setLoading] = useState(false);

  const [eventData, setEventData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    category: event?.category || "",
    eventDate: event?.eventDate || "",
    location: event?.location || "",
    image: event?.image || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!event) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update event");
      }

      onUpdated({
        ...event,
        ...eventData,
      });

      toast.add({
        title: "Event Updated Successfully!",
        description: "Your event information has been updated.",
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Update the information about your community event.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Event Title</FieldLabel>
              <Input
                id="title"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                className="h-11"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Event Description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                className="min-h-32 resize-y"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <Select
                value={eventData.category}
                onValueChange={(value) =>
                  setEventData({
                    ...eventData,
                    category: value ?? "",
                  })
                }
              >
                <SelectTrigger id="category" className="h-11 w-full">
                  <SelectValue placeholder="Select an event category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="community">Community Service</SelectItem>
                  <SelectItem value="charity">Charity & Fundraising</SelectItem>
                  <SelectItem value="health">Health & Wellness</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="eventDate">
                  <CalendarDays className="size-4" />
                  Event Date
                </FieldLabel>

                <Input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  value={eventData.eventDate}
                  onChange={handleChange}
                  className="h-11"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="location">
                  <MapPin className="size-4" />
                  Event Location
                </FieldLabel>

                <Input
                  id="location"
                  name="location"
                  value={eventData.location}
                  onChange={handleChange}
                  className="h-11"
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="image">
                <ImagePlus className="size-4" />
                Cover Image URL
              </FieldLabel>

              <Input
                id="image"
                name="image"
                type="url"
                value={eventData.image}
                onChange={handleChange}
                className="h-11"
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
