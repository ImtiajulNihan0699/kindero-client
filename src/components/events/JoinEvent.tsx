
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function JoinEvent() {
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

        <Button size="lg" className="min-w-44">
          Join This Event
        </Button>
      </CardContent>
    </Card>
  );
}
