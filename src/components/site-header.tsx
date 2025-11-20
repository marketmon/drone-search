"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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
    <nav className={`sticky top-0 z-50 bg-white border-b-2 border-black transition-transform duration-300 ${
      isVisible ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
          {/* Logo */}
          <div className="font-mono text-base sm:text-md text-gray-600 transition-colors whitespace-nowrap text-center sm:text-left">
            USV HUB
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center sm:justify-end gap-4 sm:gap-4 text-xs sm:text-md font-mono tracking-wider">
            <Link
              href="/usv-market"
              className={`transition-colors whitespace-nowrap ${isActive("/usv-market")
                ? "text-black border-b-2 border-black pb-0.5"
                : "text-gray-600 hover:text-black"
                }`}
            >
              DATABASE
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
              className={`transition-colors whitespace-nowrap ${isActive("/about")
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
