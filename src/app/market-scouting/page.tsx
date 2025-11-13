"use client";

import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";

export default function MarketScouting() {

  return (
    <div className="min-h-screen bg-white text-black relative">
      {/* Wave background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-scouting" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q 25 10, 50 20 T 100 20" fill="none" stroke="#3b82f630" strokeWidth="1.5" />
              <path d="M0 25 Q 25 15, 50 25 T 100 25" fill="none" stroke="#3b82f620" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-scouting)" />
        </svg>
      </div>

      {/* Navigation */}
      <SiteHeader />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Responsive iframe container */}
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfc9T5du7T1e0HydcCHAXH-wlFvWHWLd476hTf-945hBPDqVw/viewform?embedded=true"
            className="w-full h-[1800px] sm:h-[1600px] md:h-[1525px]"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Market Scouting Form"
          >
            Loading…
          </iframe>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
