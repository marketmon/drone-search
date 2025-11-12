import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative bg-white border-t-2 border-black mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <Link
            href="/about"
            className="text-xs font-mono text-gray-600 hover:text-black transition-colors tracking-wider"
          >
            ABOUT
          </Link>
          <span className="hidden sm:inline text-gray-300">|</span>
          <Link
            href="/usv-market"
            className="text-xs font-mono text-gray-600 hover:text-black transition-colors tracking-wider"
          >
            MARKET DATABASE
          </Link>
          <span className="hidden sm:inline text-gray-300">|</span>
          <Link
            href="/market-scouting"
            className="text-xs font-mono text-gray-600 hover:text-black transition-colors tracking-wider"
          >
            MARKET SCOUTING
          </Link>
        </div>
      </div>
    </footer>
  );
}
