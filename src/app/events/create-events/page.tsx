
"use client";

import { useSyncExternalStore } from "react";
import { CalendarDays, Clock, MapPin, Users, ImagePlus } from "lucide-react";

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
  const minDate = useSyncExternalStore(
    subscribe,
    getTodayDate,
    () => ""
  );

  const handleSubmit= async(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

     const formData = new FormData(e.currentTarget);
    const createEventData = Object.fromEntries(formData.entries());

    console.log("Event Data:", createEventData);
    
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Create an Event
        </h1>
        <p className="mt-2 text-muted-foreground">
          Bring your community together by organizing a meaningful event.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Information</CardTitle>
          <CardDescription>
            Provide the details people need to discover and join your event.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Event Title</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Community Clean-up Day"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">
                  Event Description
                </FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell people what this event is about..."
                  className="min-h-32 resize-y"
                />
                <FieldDescription>
                  Include the purpose of the event and what participants can expect.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Select name="category">
                  <SelectTrigger id="category" className="w-full">
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
                    min={minDate}
                    disabled={!minDate}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="participants">
                    <Users className="size-4" />
                    Maximum Participants
                  </FieldLabel>
                  <Input
                    id="participants"
                    name="participants"
                    type="number"
                    min="1"
                    placeholder="e.g. 30"
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="startTime">
                    <Clock className="size-4" />
                    Start Time
                  </FieldLabel>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="endTime">
                    <Clock className="size-4" />
                    End Time
                  </FieldLabel>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="time"
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="location">
                  <MapPin className="size-4" />
                  Event Location
                </FieldLabel>
                <Input
                  id="location"
                  name="location"
                  placeholder="Enter the event address or meeting point"
                />
              </Field>

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
                />
                <FieldDescription>
                  Add an image URL to make your event more attractive.
                </FieldDescription>
              </Field>

              <div className="flex flex-col-reverse justify-end gap-3 border-t pt-5 sm:flex-row">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">
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
