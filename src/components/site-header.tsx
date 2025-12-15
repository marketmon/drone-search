"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActive = (path: string) => {
    // Treat home page (/) as the same as /usv-market
    if (path === "/usv-market" && pathname === "/") {
      return true;
    }
    return pathname === path;
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white border-b-2 border-black transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
          {/* Logo */}
          <Link href="/">
            <div className="font-mono text-base sm:text-md text-gray-600 transition-colors whitespace-nowrap text-center sm:text-left">
              USV HUB
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex justify-center sm:justify-end gap-4 sm:gap-4 text-xs sm:text-md font-mono tracking-wider">
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 transition-colors whitespace-nowrap ${isActive("/usv-market")
                ? "text-black border-b-2 border-black pb-0.5"
                : "text-gray-600 hover:text-black"
                }`}>
                DATABASE
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="font-mono">
                <DropdownMenuItem asChild>
                  <Link href="/usv-market" className="cursor-pointer">
                    USVs
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href="https://uuvhub.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    UUVs
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
              className={`transition-colors whitespace-nowrap ${isActive("/about")
                ? "text-black border-b-2 border-black pb-0.5"
                : "text-gray-600 hover:text-black"
                }`}
            >
              ABOUT
            </Link>

            <Link
              href="/about#community"
              className="transition-colors whitespace-nowrap text-gray-600 hover:text-black"
            >
              JOIN
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
