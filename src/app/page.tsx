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

            {/* CTA Section */}
            <div className="pt-6 space-y-6">
              <div className="border-t-2 border-black pt-6">
                <Link href="/usv-market">
                  <Button
                    size="lg"
                    className="w-full text-lg px-8 py-6 bg-black text-white hover:bg-gray-800 rounded-none font-mono tracking-wider border-2 border-black transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    → THE US USV MARKET LANDSCAPE
                  </Button>
                </Link>
              </div>

              {/* About link */}
              <div className="text-center pt-4">
                <Link
                  href="/about"
                  className="text-sm font-mono text-gray-600 hover:text-black transition-colors tracking-wider border-b border-gray-400 hover:border-black pb-1"
                >
                  WHAT IS SYNDICATE 708?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
