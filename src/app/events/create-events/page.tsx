"use client";

import { useSyncExternalStore } from "react";
import { CalendarDays, MapPin, ImagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const subscribe = () => () => {};

const getTodayDate = () =>
  new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Dhaka",
  });

export default function CreateEventPage() {
  const minDate = useSyncExternalStore(subscribe, getTodayDate, () => "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const createEventData = Object.fromEntries(formData.entries());

    console.log("Event Data:", createEventData);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createEventData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create event");
      }

      toast.add({
        title: "Event created successfully!",
        description: "Your community event has been created.",
      });

      console.log("Response Data:", data);
    } catch (error) {
      toast.add({
        title: "Something went wrong",
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 md:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Create an Event
        </h1>
        <p className="mt-3 text-muted-foreground">
          Bring your community together by organizing a meaningful event.
        </p>
      </div>

      <Card className="border-border/70 shadow-sm">
        <CardHeader className="border-b bg-muted/30 px-6 py-5">
          <CardTitle className="text-xl">Event Information</CardTitle>
          <CardDescription>
            Provide the details people need to discover and join your event.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Event Title</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Community Clean-up Day"
                  className="h-11"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Event Description</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell people what this event is about..."
                  className="min-h-32 resize-y"
                />
                <FieldDescription>
                  Include the purpose of the event and what participants can
                  expect.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Select name="category">
                  <SelectTrigger id="category" className="h-11 w-full">
                    <SelectValue placeholder="Select an event category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="community">Community Service</SelectItem>
                    <SelectItem value="charity">
                      Charity & Fundraising
                    </SelectItem>
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
                    min={minDate}
                    disabled={!minDate}
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
                    placeholder="Enter event location"
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
                  placeholder="https://example.com/image.jpg"
                  className="h-11"
                />
                <FieldDescription>
                  Add an image URL to make your event more attractive.
                </FieldDescription>
              </Field>

              <div className="flex justify-center border-t pt-6">
                <Button type="submit" className="min-w-48">
                  Create Event
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
