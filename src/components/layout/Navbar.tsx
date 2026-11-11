
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/layout/ThemeToggle";
import {
  UserRound,
  CalendarPlus,
  CalendarCog,
  CalendarCheck,
  LogOut,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/toast";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Navbar() {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const handleLogOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.add({
        title: "Logout Failed",
        description: error.message || "Something went wrong. Please try again.",
      });
      return;
    }

    toast.add({
      title: "Logged Out",
      description: "You have successfully signed out.",
    });

    router.push("/sign-in");
  };

  console.log(user);

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

          <ThemeToggle />

          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full p-1 pr-3 transition-colors hover:bg-muted"
                  >
                    <Avatar>
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user.image as string}
                      />
                      <AvatarFallback>
                        {user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <span className="hidden text-sm font-medium sm:block">
                      {user.name}
                    </span>
                  </button>
                }
              />
              
              <PopoverContent align="end" className="w-64 p-2">
                <PopoverHeader className="px-3 py-2">
                  <PopoverTitle>{user.name}</PopoverTitle>
                  <PopoverDescription>
                    {user.email}
                  </PopoverDescription>
                </PopoverHeader>

                <div className="my-2 border-t" />

                {/* Profile Information */}
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <span className="rounded-md bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                    <UserRound className="h-4 w-4" />
                  </span>
                  <span className="font-medium">Profile Information</span>
                </Link>

                {/* Create Events */}
                <Link
                  href="/create-event"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-green-50 dark:hover:bg-green-950"
                >
                  <span className="rounded-md bg-green-100 p-2 text-green-600 dark:bg-green-900 dark:text-green-300">
                    <CalendarPlus className="h-4 w-4" />
                  </span>
                  <span className="font-medium">Create Events</span>
                </Link>

                {/* Manage Events */}
                <Link
                  href="/manage-events"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-purple-50 dark:hover:bg-purple-950"
                >
                  <span className="rounded-md bg-purple-100 p-2 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                    <CalendarCog className="h-4 w-4" />
                  </span>
                  <span className="font-medium">Manage Events</span>
                </Link>

                {/* Joined Events */}
                <Link
                  href="/joined-events"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50 dark:hover:bg-orange-950"
                >
                  <span className="rounded-md bg-orange-100 p-2 text-orange-600 dark:bg-orange-900 dark:text-orange-300">
                    <CalendarCheck className="h-4 w-4" />
                  </span>
                  <span className="font-medium">Joined Events</span>
                </Link>

                <div className="my-2 border-t" />

                {/* Sign Out */}
                <PopoverDescription className="px-1">
                  <Button
                    onClick={handleLogOut}
                    variant="destructive"
                    className="w-full justify-start gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </PopoverDescription>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                })}
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className={buttonVariants({ size: "sm" })}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
