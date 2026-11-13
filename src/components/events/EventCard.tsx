
import Image from "next/image";
import { CalendarDays, MapPin, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { Event } from "@/types/event";

interface EventCardProps {
  event: Event;
  showEdit?: boolean;
  showDelete?: boolean;
  onEdit?: (event: Event) => void;
  onDelete?: (eventId: string) => void;
}

export default function EventCard({
  event,
  showEdit = false,
  showDelete = false,
  onEdit,
  onDelete,
}: EventCardProps) {
  return (
    <Card className="overflow-hidden border-border/70 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-48 w-full bg-muted">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            unoptimized
            loading="eager"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No cover image
          </div>
        )}
      </div>

      <CardHeader>
        <div className="mb-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
            {event.category}
          </span>
        </div>

        <CardTitle className="line-clamp-1">{event.title}</CardTitle>

        <CardDescription className="line-clamp-2">
          {event.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 shrink-0 text-primary" />
          <span>
            {new Date(`${event.eventDate}T00:00:00`).toLocaleDateString(
              "en-BD",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "Asia/Dhaka",
              },
            )}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="size-4 shrink-0 text-primary" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Link
          href={`/events/${event._id}`}
          className="flex w-full items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          View Details
        </Link>

        {(showEdit || showDelete) && (
          <div className="flex w-full gap-2">
            {showEdit && (
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onEdit?.(event)}
              >
                <Pencil className="size-4" />
                Edit
              </Button>
            )}

            {showDelete && (
              <Button
                type="button"
                variant="destructive"
                className="flex-1"
                onClick={() => onDelete?.(event._id)}
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
