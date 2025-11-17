"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    // Treat home page (/) as the same as /usv-market
    if (path === "/usv-market" && pathname === "/") {
      return true;
    }
    return pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div
            className="font-mono text-[10px] sm:text-xs  text-gray-600 transition-colors whitespace-nowrap"
          >
            USV HUB
          </div>
          <div className="flex gap-3 sm:gap-4 text-[10px] sm:text-xs font-mono tracking-wider">
            <Link
              href="/usv-market"
              className={`transition-colors whitespace-nowrap ${isActive("/usv-market")
                ? "text-black border-b-2 border-black pb-0.5"
                : "text-gray-600 hover:text-black"
                }`}
            >
              USV DATABASE
            </Link>

            <Link
              href="/usv-market/contribution"
              className={`transition-colors whitespace-nowrap ${isActive("/usv-market/contribution")
                ? "text-black border-b-2 border-black pb-0.5"
                : "text-gray-600 hover:text-black"
                }`}
            >
              CONTRIBUTE
            </Link>

            <Link
              href="/about"
              className={`transition-colors ${isActive("/about")
                ? "text-black border-b-2 border-black pb-0.5"
                : "text-gray-600 hover:text-black"
                }`}
            >
              ABOUT
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
