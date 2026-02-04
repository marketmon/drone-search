import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Wave background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-404" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q 25 10, 50 20 T 100 20" fill="none" stroke="#3b82f630" strokeWidth="1.5" />
              <path d="M0 25 Q 25 15, 50 25 T 100 25" fill="none" stroke="#3b82f620" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-404)" />
        </svg>
      </div>

      {/* Navigation */}
      <SiteHeader />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="border-2 border-black bg-white p-8 sm:p-12 text-center">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600" />
          </div>

          <span className="text-xs font-mono tracking-wider text-blue-600 block mb-2">ERROR 404</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">Page Not Found</h1>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Link
            href="/usv-market"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-mono text-sm tracking-wider border-2 border-black hover:bg-blue-700 transition-colors"
          >
            Go to Database
          </Link>
        </div>
      </div>
    </div>
  );
}
