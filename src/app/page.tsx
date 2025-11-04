import Link from "next/link";
import { Button } from "@/components/ui/button";

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
        <div className="max-w-4xl w-full">
          {/* Main content box */}
          <div className="border-2 border-black bg-white p-12 space-y-8">
            {/* Header with designation */}
            <div className="border-b-2 border-black pb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono tracking-wider text-gray-600">DEEP TECH INNOVATION</span>
                <span className="text-xs font-mono tracking-wider text-gray-600">AT THE FOREFRONT SINCE 2017</span>
              </div>
              <h1 className="text-7xl font-bold tracking-tighter">
                SYNDICATE 708
              </h1>
            </div>

            {/* Mission statement */}
            <div className="border-l-4 border-black pl-6">
              <p className="text-xl text-gray-800 leading-relaxed font-light">
                Forge a foundation for America companies to innovate, build & manufacture
                with partners in a uniquely American way, defending our ability to compete
                on the world stage
              </p>
            </div>

            {/* Navigation */}
            <div className="pt-6 border-t-2 border-black space-y-4">
              <Link href="/collection">
                <Button
                  size="lg"
                  className="w-full text-lg px-8 py-6 mb-2 bg-black text-white hover:bg-gray-800 rounded-none font-mono tracking-wider border-2 border-black transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)]"
                >
                  → MARKETS
                </Button>
              </Link>

              <div className="grid grid-cols-2 gap-4">
                <Link href="/portfolio">
                  <Button
                    size="lg"
                    className="w-full px-6 py-6 bg-white text-black hover:bg-gray-50 rounded-none font-mono tracking-wider border-2 border-black transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    PORTFOLIO
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    className="w-full px-6 py-6 bg-white text-black hover:bg-gray-50 rounded-none font-mono tracking-wider border-2 border-black transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    ABOUT
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
