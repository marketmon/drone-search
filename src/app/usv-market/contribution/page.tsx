"use client";

import Link from "next/link";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContributionFormPage() {
    return (
        <div className="min-h-screen bg-white text-black relative">
            {/* Wave background pattern */}
            <div className="fixed inset-0 pointer-events-none opacity-30">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="wave-contribution" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0 20 Q 25 10, 50 20 T 100 20" fill="none" stroke="#3b82f630" strokeWidth="1.5" />
                            <path d="M0 25 Q 25 15, 50 25 T 100 25" fill="none" stroke="#3b82f620" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#wave-contribution)" />
                </svg>
            </div>

            {/* Navigation */}
            <SiteHeader />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Back button */}
                <div className="mb-6">
                    <Link href="/usv-market">
                        <Button
                            variant="outline"
                            className="border-2 cursor-pointer border-black rounded-none hover:bg-black hover:text-blue-500 transition-all font-mono text-xs tracking-wider"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            BACK TO USV DATABASE
                        </Button>
                    </Link>
                </div>

                {/* Page header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Contribute to Database</h1>
                    <p className="text-gray-600 text-sm sm:text-base">Help us expand the USV market database with your knowledge</p>
                </div>

                {/* Responsive iframe container */}
                <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSfGnz8I8ShNJXI7saYNWf5nZdjPgTqB18pYHAcYVwAtMrhPYg/viewform?embedded=true"
                        className="w-full h-[2000px] sm:h-[1800px] md:h-[1727px]"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        title="Contribute to Database Form"
                    >
                        Loading…
                    </iframe>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}