import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrendingUp, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Corner accent lines */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-black"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-black"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-black"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-black"></div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-5xl w-full">
          {/* Main content box */}
          <div className="border-2 border-black bg-white p-16 space-y-12">
            {/* Header */}
            <div className="text-center space-y-6">
              <div className="inline-block border-2 border-black px-6 py-2 bg-gray-50">
                <span className="text-xs font-mono tracking-wider text-gray-600">MARKET DEFINING INTELLIGENCE + SCALE READY SUPPLIERS</span>
              </div>

              <h1 className="text-7xl font-bold tracking-tighter leading-tight">
                SCALE FORGE USA
              </h1>

              <p className="text-2xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                A foundation to manufacture emerging technology at scale
              </p>

              <div className="border-t-2 border-black pt-6 max-w-xl mx-auto">

              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <Link href="/market-scouting">
                <Button
                  size="lg"
                  className="w-full h-32 text-xl px-8 bg-black text-white hover:bg-gray-800 rounded-none font-mono tracking-wider border-2 border-black transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-[-8px_-8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-3"
                >
                  <MessageSquare className="w-10 h-10" />
                  <div className="space-y-1">
                    <div>SUBMIT DEMAND SIGNAL</div>
                    <div className="text-xs text-gray-300 font-sans tracking-normal">Tell us what you need</div>
                  </div>
                </Button>
              </Link>

              <Link href="/markets">
                <Button
                  size="lg"
                  className="w-full h-32 text-xl px-8 bg-white text-black hover:bg-gray-50 rounded-none font-mono tracking-wider border-2 border-black transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-[-8px_-8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-3"
                >
                  <TrendingUp className="w-10 h-10" />
                  <div className="space-y-1">
                    <div>EXPLORE MARKETS</div>
                    <div className="text-xs text-gray-500 font-sans tracking-normal">Adaptive intelligence</div>
                  </div>
                </Button>
              </Link>
            </div>
          </div>

          {/* Attribution footer */}
          <div className="mt-8 text-center mb-3">
            <p className="text-sm text-gray-600 font-mono">
              by{" "}
              <a href="https://syndicate708.com" target="_blank" className="text-black font-bold hover:underline">
                Syndicate 708
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
