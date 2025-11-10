import Link from "next/link";

export default function About() {
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
                  NEW MARITIME HUB
                </button>
              </Link>
              <div className="flex gap-4 text-xs font-mono tracking-wider">
                <Link href="/scaleforgeusa/markets" className="text-gray-600 hover:text-black transition-colors">
                  MARKETS
                </Link>
                <Link href="/scaleforgeusa/about" className="text-black font-bold transition-colors">
                  ABOUT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 py-16">
        <div className="mb-16 border-2 border-black bg-white p-8">
          <div className="border-b-2 border-black pb-4 mb-4">
            <span className="text-xs font-mono tracking-wider text-gray-600">AMERICAN MANUFACTURING</span>
            <h1 className="text-5xl font-bold tracking-tight mt-2">ABOUT SCALE FORGE USA</h1>
          </div>
          <p className="text-xl text-gray-700 leading-relaxed">
            Forge a foundation for American companies to innovate, build, and manufacture with partners
            in a uniquely American way, defending our ability to compete on the world stage.
          </p>
          <p className="text-sm text-gray-600 mt-4">
            Scale Forge USA is an endeavor of <Link href="https://syndicate708.com" target="_blank" className="text-black font-bold hover:underline">Syndicate 708</Link>, active since 2017.
          </p>
        </div>

        <div className="space-y-8">
          {/* First Vertical Section */}
          <section className="border-2 border-black bg-white p-8">
            <div className="border-l-4 border-blue-600 pl-4 mb-6">
              <h2 className="text-3xl font-bold tracking-tight">Our First Vertical</h2>
              <span className="text-xs font-mono text-gray-600 tracking-wider">MARITIME SECTOR</span>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We're starting with the burgeoning new maritime sector, specifically unmanned surface vehicles.
                The market is fragmented with limited visibility into who's building what, which suppliers are
                reliable, and how technologies can work together.
              </p>

              <p>
                <strong>This platform creates that visibility.</strong> By centralizing market intelligence and
                connecting engineers with the right suppliers and partners, we help companies move faster from
                concept to deployment.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-5 my-6">
                <h3 className="font-bold text-lg mb-2 text-black">Why Information Sharing Matters</h3>
                <p className="text-sm">
                  The defense tech ecosystem thrives on collaboration. When companies, engineers, and government
                  stakeholders can see the full picture—who's solving what problems, which technologies are mature,
                  where the gaps exist—we all move faster.
                </p>
              </div>

              <h3 className="font-bold text-xl mt-6 mb-3 text-black">What's In This Database?</h3>

              <div className="space-y-2 ml-4">
                <div>
                  <p className="font-bold text-black">✓ USV Manufacturers & System Integrators</p>
                </div>
                <div>
                  <p className="font-bold text-black">✓ Component & Subsystem Suppliers</p>
                </div>
                <div>
                  <p className="font-bold text-black">✓ Maritime Technology Providers</p>
                </div>
                <div>
                  <p className="font-bold text-black">✓ Commercial & Defense Players</p>
                </div>
              </div>

              <div className="pt-4">
                <p>
                  Visit{" "}
                  <Link href="/" className="text-blue-600 font-bold hover:underline">
                    New Maritime Hub
                  </Link>
                  {" "}to explore the full database, contribute companies, and connect with suppliers.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
