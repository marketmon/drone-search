"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";

function SpecSheetContent() {
  const searchParams = useSearchParams();
  const vehicleName = searchParams.get("vehicle");
  const companyName = searchParams.get("company");
  const googleLink = searchParams.get("link");

  // Convert Google Drive view link to preview link
  const getEmbedLink = (link: string) => {
    if (!link) return "";
    // Convert /view to /preview for embedding
    return link.replace("/view", "/preview");
  };

  const embedLink = googleLink ? getEmbedLink(googleLink) : "";

  if (!vehicleName || !companyName || !googleLink) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Invalid Request</h1>
          <p className="text-gray-600 mb-6">Missing required parameters</p>
          <Link href="/usv-market">
            <button className="bg-blue-600 text-white px-6 py-3 font-mono text-sm tracking-wider hover:bg-blue-700 transition-colors">
              RETURN TO MARKET DATABASE
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <Link href="/usv-market" className="font-mono text-[10px] sm:text-xs tracking-wider text-gray-600 hover:text-black transition-colors whitespace-nowrap flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              BACK TO MARKET DATABASE
            </Link>
            <Link href="/" className="font-mono text-[10px] sm:text-xs tracking-wider text-gray-600 hover:text-black transition-colors whitespace-nowrap">
              HOME
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-black p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="inline-block bg-blue-800 border-2 border-blue-400 px-3 py-1 mb-3">
                  <span className="text-xs font-mono tracking-wider text-blue-100 font-bold">SPEC SHEET</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-2">
                  {vehicleName}
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 font-medium">
                  {companyName}
                </p>
              </div>
              <a
                href={googleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-gray-100 text-blue-600 border-2 border-white font-mono text-xs sm:text-sm tracking-wider px-4 py-3 rounded-none whitespace-nowrap transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                OPEN IN GOOGLE DRIVE
              </a>
            </div>
          </div>
        </div>

        {/* PDF Embed */}
        <div className="bg-white border-2 border-black p-4 sm:p-6">
          <div className="w-full mx-auto" style={{ maxWidth: "1200px" }}>
            <div className="relative w-full" style={{ paddingBottom: "141.4%" }}>
              <iframe
                src={embedLink}
                className="absolute top-0 left-0 w-full h-full border-2 border-gray-300"
                allow="autoplay"
                title={`${vehicleName} Spec Sheet`}
              />
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 p-4 bg-gray-50 border-2 border-gray-200">
          <p className="text-xs text-gray-600 font-mono text-center">
            If the PDF doesn't load properly, try opening it directly in Google Drive using the button above.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SpecSheetPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="font-mono text-sm text-gray-600">Loading spec sheet...</p>
          </div>
        </div>
      }
    >
      <SpecSheetContent />
    </Suspense>
  );
}
