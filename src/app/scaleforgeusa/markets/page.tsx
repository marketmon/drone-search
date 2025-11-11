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
            <Link href="/scaleforgeusa" className="font-mono text-xs tracking-wider text-gray-600 hover:text-black transition-colors">
              ← HOME
            </Link>
            <div className="flex gap-4 items-center">
              <Link href="/">
                <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-600 rounded-none font-mono text-xs tracking-wider transition-all">
                  USV TECH HUB
                </button>
              </Link>
              <Link href="/scaleforgeusa/about" className="text-xs font-mono tracking-wider text-gray-600 hover:text-black transition-colors">
                ABOUT
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
              <h3 className="text-xs font-mono tracking-wider text-gray-600 mb-4">VIEW ON USV TECH HUB</h3>
              <div className="space-y-3 mb-6">
                <Link href="/" className="block">
                  <div className="border-2 border-blue-600 bg-blue-50 hover:bg-blue-100 p-4 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold tracking-tight text-blue-900">USV Tech Hub</h4>
                        <p className="text-xs text-blue-700 mt-1">Complete USV market database, system architecture, and community resources</p>
                      </div>
                      <span className="font-mono text-blue-600 text-xl">→</span>
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
