import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      {/* Background photo */}
      <Image
        src="/images/hero.jpg"
        alt="Volunteers working together in a community service event"
        fill
        priority
        className="object-cover"
      />

      {/* Dark green overlay so text stays readable */}
     <div className="absolute inset-0 bg-linear-to-r from-[oklch(0.2_0.04_140/0.92)] via-[oklch(0.2_0.04_140/0.7)] to-[oklch(0.2_0.04_140/0.35)]" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 md:px-6">
        <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
          <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm font-medium text-white">
            Community-driven social service
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Small acts, <span className="text-highlight">big change</span> in
            your community
          </h1>

          <p className="mt-5 text-base text-white/85 sm:text-lg">
            Find local service events near you, join with a single click, or
            start your own. From clothes drives to cleanups, every hand counts.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start">
            <Link href="/events" className={buttonVariants({ size: "lg" })}>
              Explore Upcoming Events
            </Link>
            <Link
              href="events/create-events"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white",
              })}
            >
              Create an Event
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}