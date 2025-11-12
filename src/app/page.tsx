"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Ship, MessageSquare, Database, X } from "lucide-react";

export default function Home() {
  const [showArtifacts, setShowArtifacts] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      {/* Wave background pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 35px,
            #3b82f620 35px,
            #3b82f620 37px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 100%
          )
        `,
        backgroundSize: '100% 40px'
      }}>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q 25 10, 50 20 T 100 20" fill="none" stroke="#3b82f630" strokeWidth="1.5" />
              <path d="M0 25 Q 25 15, 50 25 T 100 25" fill="none" stroke="#3b82f620" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave)" />
        </svg>
      </div>

      {/* Corner accent lines */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-blue-600"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-blue-600"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-blue-600"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-blue-600"></div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-0 mb-10 mt-5">
        <div className="max-w-5xl w-full">
          {/* Main content box */}
          <div className="border-2 border-black bg-white p-3 sm:p-6 md:p-8 space-y-8 sm:space-y-12">
            {/* Header */}
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 sm:gap-3 border-2 border-blue-600 px-4 sm:px-6 py-2 bg-blue-50">
                <Ship className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span className="text-[10px] sm:text-xs font-mono tracking-wider text-blue-600 font-bold">UNMANNED SURFACE VEHICLES</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
                USV TECH HUB
              </h1>

              <p className="text-base sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto px-4 sm:px-0">
                The comprehensive directory of innovative companies, and capabilities shaping America's unmanned maritime future
              </p>


            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Button
                size="lg"
                onClick={() => setShowArtifacts(true)}
                className="w-full h-24 sm:h-32 text-base sm:text-xl px-4 sm:px-8 bg-blue-600 text-white hover:bg-blue-700 rounded-none font-mono tracking-wider border-2 border-blue-600 transition-all md:hover:translate-x-2 md:hover:translate-y-2 md:hover:shadow-[-8px_-8px_0px_0px_rgba(37,99,235,1)] flex flex-col items-center justify-center gap-2 sm:gap-3"
              >
                <Database className="w-8 h-8 sm:w-10 sm:h-10" />
                <div className="space-y-1">
                  <div className="text-sm sm:text-xl">VIEW RESOURCES</div>
                  <div className="text-xs text-blue-100 font-sans tracking-normal">Market data & insights</div>
                </div>
              </Button>

              <Link href="/market-scouting">
                <Button
                  size="lg"
                  className="w-full h-24 sm:h-32 text-base sm:text-xl px-4 sm:px-8 bg-white text-black hover:bg-gray-50 rounded-none font-mono tracking-wider border-2 border-black transition-all md:hover:translate-x-2 md:hover:translate-y-2 md:hover:shadow-[-8px_-8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-2 sm:gap-3"
                >
                  <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10" />
                  <div className="space-y-1">
                    <div className="text-sm sm:text-xl">BUILD TECH FASTER</div>
                    <div className="text-xs text-gray-500 font-sans tracking-normal">What components do you need?</div>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Artifacts Modal */}
      {showArtifacts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowArtifacts(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white border-2 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="border-b-2 border-black p-4 sm:p-6 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <span className="text-[10px] sm:text-xs font-mono tracking-wider text-blue-600 font-bold block">USV RESOURCES</span>
                <h2 className="text-lg sm:text-2xl font-bold tracking-tight mt-1">Explore the Market</h2>
              </div>
              <button
                onClick={() => setShowArtifacts(false)}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border-2 border-black hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Artifacts List */}
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <Link href="/usv-market" onClick={() => setShowArtifacts(false)}>
                <div className="border-2 border-black bg-white hover:bg-blue-50 p-4 sm:p-6 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-base sm:text-lg tracking-tight mb-2">USV Market Database</h3>
                      <p className="text-xs sm:text-sm text-gray-700">
                        Comprehensive directory of companies, and capabilities in the unmanned surface vehicle ecosystem
                      </p>
                    </div>
                    <span className="font-mono text-xl sm:text-2xl flex-shrink-0">→</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
