import Link from "next/link";

export default function Collection() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Grid background pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-mono text-xs tracking-wider text-gray-600 hover:text-black transition-colors">
              ← HOME
            </Link>
            <div className="flex gap-4 items-center">
              <Link href="/market-scouting">
                <button className="px-4 py-2 bg-black text-white hover:bg-gray-800 border-2 border-black rounded-none font-mono text-xs tracking-wider transition-all">
                  SUBMIT DEMAND SIGNAL
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16 border-2 border-black bg-white p-8">
          <div className="border-b-2 border-black pb-4 mb-4">
            <span className="text-xs font-mono tracking-wider text-gray-600">ADAPTIVE INTELLIGENCE</span>
            <h1 className="text-5xl font-bold tracking-tight mt-2">MARKETS</h1>
          </div>
          <p className="text-xl text-gray-700 leading-relaxed">
            Deep-dive market intelligence and demand aggregation across critical defense technology markets
          </p>
        </div>

        {/* USV Domain */}
        <div className="mb-12">
          <div className="border-2 border-black bg-white">
            {/* Domain Header */}
            <div className="border-b-2 border-black bg-gray-50 p-6">
              <span className="text-xs font-mono tracking-wider text-gray-600">ACTIVE MARKET</span>
              <h2 className="text-3xl font-bold tracking-tight mt-1">Unmanned Surface Vehicles</h2>
              <p className="text-sm text-gray-700 mt-2">
                Market landscape, system architecture, and demand signals for autonomous maritime platforms
              </p>
            </div>

            {/* Content Artifacts */}
            <div className="p-6">
              <h3 className="text-xs font-mono tracking-wider text-gray-600 mb-4">CONTENT ARTIFACTS</h3>
              <div className="space-y-3 mb-6">
                <Link href="/usv-market" className="block">
                  <div className="border-2 border-black bg-white hover:bg-gray-50 p-4 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold tracking-tight">US USV Market Landscape</h4>
                        <p className="text-xs text-gray-600 mt-1">Company directory, collaborations, and market structure</p>
                      </div>
                      <span className="font-mono text-gray-600">→</span>
                    </div>
                  </div>
                </Link>

                <Link href="/usv-systems" className="block">
                  <div className="border-2 border-black bg-white hover:bg-gray-50 p-4 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold tracking-tight">USV System Architecture Breakdown</h4>
                        <p className="text-xs text-gray-600 mt-1">Technical deep-dive on components and integration</p>
                      </div>
                      <span className="font-mono text-gray-600">→</span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Demand Signals */}
              <div className="border-t-2 border-black pt-6">
                <h3 className="text-xs font-mono tracking-wider text-gray-600 mb-4">DEMAND AGGREGATION</h3>
                <Link href="/market-scouting">
                  <div className="border-2 border-black bg-black text-white hover:bg-gray-800 p-6 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold tracking-tight text-lg">Submit USV Demand Signal</h4>
                        <p className="text-sm text-gray-400 mt-2">
                          Share your USV requirements and help us identify market demand patterns
                        </p>
                      </div>
                      <span className="font-mono text-white text-2xl">→</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Future Domains */}
        <div>
          <div className="border-2 border-black bg-white">
            <div className="border-b-2 border-black bg-gray-50 p-6">
              <span className="text-xs font-mono tracking-wider text-gray-600">FUTURE MARKETS</span>
              <h2 className="text-3xl font-bold tracking-tight mt-1">Coming Soon</h2>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                <div className="border-2 border-gray-300 bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold tracking-tight text-gray-600">Electric Stack</h4>
                      <p className="text-xs text-gray-500 mt-1">Shift to electrification & addressing challenges facing our power systems</p>
                    </div>
                    <span className="font-mono text-gray-400">→</span>
                  </div>
                </div>

                <div className="border-2 border-gray-300 bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold tracking-tight text-gray-600">Commercial Maritime</h4>
                      <p className="text-xs text-gray-500 mt-1">Next generation containerships, bulk carriers made competively in the US</p>
                    </div>
                    <span className="font-mono text-gray-400">→</span>
                  </div>
                </div>

                <div className="border-2 border-gray-300 bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold tracking-tight text-gray-600">Aerial Drones</h4>
                      <p className="text-xs text-gray-500 mt-1">FPV, etc</p>
                    </div>
                    <span className="font-mono text-gray-400">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
