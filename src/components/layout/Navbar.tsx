import Image from "next/image";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto] items-center px-4 md:grid-cols-3 md:px-6">
        {/* Left: logo + name in ONE link */}
        <Link href="/" className="flex items-center gap-2 justify-self-start">
          <Image
            src="/images/logo.png"
            alt="Kindero logo"
            width={32}
            height={36}
            priority
          />
          <span className="text-xl font-bold text-primary">Kindero</span>
        </Link>

        {/* Middle: Upcoming Events (hidden on mobile for now) */}
        <nav className="hidden justify-self-center md:block">
          <Link
            href="/events"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
          >
            Upcoming Events
          </Link>
        </nav>

        {/* Right: theme button + auth buttons */}
        <div className="flex items-center gap-2 justify-self-end">
          <Button variant="ghost" size="icon" aria-label="Toggle theme">
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
          </Button>
          <Link
            href="/signin"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Sign In
          </Link>
          <Link href="/signup" className={buttonVariants({ size: "sm" })}>
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}