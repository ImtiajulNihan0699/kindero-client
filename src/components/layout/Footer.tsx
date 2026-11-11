
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[oklch(0.2_0.04_140)] text-white">
      {/* Colorful top strip using the logo colors */}
      <div className="h-1.5 bg-linear-to-r from-[oklch(0.756_0.168_129.9)] via-[oklch(0.779_0.16_72.8)] to-[oklch(0.665_0.169_46.8)]" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Kindero logo"
              width={36}
              height={40}
            />
            <span className="text-2xl font-bold">Kindero</span>
          </Link>

          <p className="mt-4 max-w-sm text-sm text-white/75">
            A community platform where neighbours create, discover, and join
            social service events. Small acts, big change.
          </p>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Kindero on X"
            className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-highlight hover:text-highlight"
          >
            <XIcon className="h-4 w-4" />
          </a>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-lg font-semibold text-highlight">
            Quick Links
          </h3>

          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className="transition-colors hover:text-white"
              >
                Upcoming Events
              </Link>
            </li>
            <li>
              <Link
                href="/create-event"
                className="transition-colors hover:text-white"
              >
                Create Event
              </Link>
            </li>
            <li>
              <Link
                href="/joined-events"
                className="transition-colors hover:text-white"
              >
                Joined Events
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-highlight">
            Contact
          </h3>

          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-highlight" />
              hello@kindero.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-highlight" />
              Chattogram, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15 py-5 text-center text-sm text-white/60">
        © 2026 Kindero. All rights reserved.
      </div>
    </footer>
  );
}
