import Link from "next/link";
import Image from "next/image";

const portfolioCompanies = [
  { name: "OSK", logo: "/portfolio/portfolio_osk.png" },
  { name: "Kubos", logo: "/portfolio/portfolio_kubos.png" },
  { name: "P4", logo: "/portfolio/portfolio_p4.jpg" },
  { name: "Saber", logo: "/portfolio/portfolio_saber.jpg" },
  { name: "Scout", logo: "/portfolio/portfolio_scout.jpg" },
  { name: "Seasats", logo: "/portfolio/portfolio_seasats.jpg" },
  { name: "H3X", logo: "/portfolio/portfolio_h3x.png" },
  { name: "Holocron", logo: "/portfolio/portfolio_holocron.jpeg" },
  { name: "Auriga", logo: "/portfolio/portfolio_auriga.jpeg" },
  { name: "Firestorm", logo: "/portfolio/portfolio_firestorm.jpg" }
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Grid background pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/syndicate708" className="font-mono text-xs tracking-wider text-gray-600 hover:text-black transition-colors">
              ← HOME
            </Link>
            <div className="flex gap-4 items-center">
              <div className="flex gap-4 text-xs font-mono tracking-wider">
                <Link href="/syndicate708/about" className="text-gray-600 hover:text-black transition-colors">
                  ABOUT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16 border-2 border-black bg-white p-8">
          <div className="border-b-2 border-black pb-4 mb-4">
            <span className="text-xs font-mono tracking-wider text-gray-600">INVESTMENTS</span>
            <h1 className="text-5xl font-bold tracking-tight mt-2">PORTFOLIO</h1>
          </div>
          <p className="text-xl text-gray-700 leading-relaxed">
            Strategic investments in companies building the future of American defense manufacturing
            and autonomous systems
          </p>
        </div>

        {/* Investment Thesis */}
        <div className="space-y-8 mb-16">
          <section className="border-2 border-black bg-white p-8">
            <div className="border-l-4 border-black pl-4 mb-6">
              <h2 className="text-3xl font-bold tracking-tight">Investment Thesis</h2>
              <span className="text-xs font-mono text-gray-600 tracking-wider">OUR STRATEGIC FOCUS</span>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Named after US 708—the fastest star in the Milky Way—Syndicate 708 functions as an
                agile investment partnership supporting earliest-stage deep tech founders. We emphasize
                relationships and shared values among our member partners, investing in companies built
                on substantial scientific breakthroughs and high-tech engineering innovation.
              </p>

              <div className="border-l-4 border-black pl-6 py-4 bg-gray-50">
                <h3 className="text-xl font-bold tracking-tight mb-3">Investment Stage & Philosophy</h3>
                <p className="text-sm mb-3">
                  We target <strong>early stage to pre-seed</strong> companies that have moved beyond concept,
                  launched operations, and secured initial friends-and-family funding, but haven't reached
                  commercial scale. We adopt a long-term view, recognizing that portfolio companies require
                  patience during technology development and market building phases.
                </p>
                <p className="text-sm italic">
                  "The most important ingredient to a startup's success is the entrepreneur and his/her team."
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold tracking-tight mb-4 border-b-2 border-black pb-2">
                  Deep Tech Specialization
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="border-2 border-black p-4 bg-white">
                    <p className="text-sm font-bold">Semiconductors</p>
                  </div>
                  <div className="border-2 border-black p-4 bg-white">
                    <p className="text-sm font-bold">Aerospace</p>
                  </div>
                  <div className="border-2 border-black p-4 bg-white">
                    <p className="text-sm font-bold">Power Electronics</p>
                  </div>
                  <div className="border-2 border-black p-4 bg-white">
                    <p className="text-sm font-bold">AI / Machine Learning</p>
                  </div>
                  <div className="border-2 border-black p-4 bg-white">
                    <p className="text-sm font-bold">Vision & Speech Algorithms</p>
                  </div>
                  <div className="border-2 border-black p-4 bg-white">
                    <p className="text-sm font-bold">Haptics</p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-black p-6 bg-gray-50 mt-6">
                <h3 className="text-xl font-bold tracking-tight mb-3">"Picks and Shovels" Strategy</h3>
                <p className="text-sm">
                  We back foundational technology platforms that enable downstream product creation
                  rather than final consumer products. This approach mitigates market risk while
                  capitalizing on commoditized building blocks that enable previously infeasible solutions.
                </p>
              </div>
            </div>
          </section>

          <section className="border-2 border-black bg-white p-8">
            <div className="border-l-4 border-black pl-4 mb-6">
              <h2 className="text-3xl font-bold tracking-tight">Value Beyond Capital</h2>
              <span className="text-xs font-mono text-gray-600 tracking-wider">HOW WE SUPPORT FOUNDERS</span>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 border-2 border-black bg-black text-white flex items-center justify-center font-mono text-xl font-bold">
                  01
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 tracking-tight">Network Access</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Leveraging our network across primes, shipyards, government stakeholders, and the
                    defense industrial base to help portfolio companies navigate complex markets and
                    accelerate commercialization.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 border-2 border-black bg-black text-white flex items-center justify-center font-mono text-xl font-bold">
                  02
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 tracking-tight">Advisor Matching</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Matching companies with accomplished advisors who provide genuine operational support.
                    We prioritize mutual chemistry and authentic partnerships over superficial board seats.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 border-2 border-black bg-black text-white flex items-center justify-center font-mono text-xl font-bold">
                  03
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 tracking-tight">Community Building</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Committed to community building and founder education programming that strengthens
                    portfolio company networks and enables mutual acceleration across the syndicate.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Portfolio Companies */}
        <div className="border-2 border-black bg-white p-8">
          <div className="border-l-4 border-black pl-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Portfolio Companies</h2>
            <span className="text-xs font-mono text-gray-600 tracking-wider">
              {portfolioCompanies.length} INVESTMENTS
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {portfolioCompanies.map((company) => (
              <div
                key={company.name}
                className="border-2 border-black bg-white p-6 flex items-center justify-center hover:bg-gray-50 transition-colors aspect-square"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={120}
                    height={120}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t-2 border-black">
            <p className="text-sm text-gray-600 font-mono tracking-wider">
              These companies represent critical capabilities in electric propulsion, autonomous control,
              trusted manufacturing, and defense technology innovation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
