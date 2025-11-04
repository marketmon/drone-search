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
            <Link href="/" className="font-mono text-xs tracking-wider text-gray-600 hover:text-black transition-colors">
              ← HOME
            </Link>
            <div className="flex gap-4 items-center">
              <Link href="/market-scouting">
                <button className="px-4 py-2 bg-black text-white hover:bg-gray-800 border-2 border-black rounded-none font-mono text-xs tracking-wider transition-all">
                  CREATE DEMAND
                </button>
              </Link>
              <div className="flex gap-4 text-xs font-mono tracking-wider">
                <Link href="/collection" className="text-gray-600 hover:text-black transition-colors">
                  MARKETS
                </Link>
                <Link href="/portfolio" className="text-gray-600 hover:text-black transition-colors">
                  PORTFOLIO
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
            <span className="text-xs font-mono tracking-wider text-gray-600">ORGANIZATION PROFILE</span>
            <h1 className="text-5xl font-bold tracking-tight mt-2">ABOUT SYNDICATE 708</h1>
          </div>
          <p className="text-xl text-gray-700 leading-relaxed">
            Syndicate 708 is a leading organization dedicated to forging a foundation for American
            companies to innovate, build, and manufacture with partners in a uniquely American way,
            defending our ability to compete on the world stage.
          </p>
        </div>

        <div className="space-y-8">
          {/* Mission Section */}
          <section className="border-2 border-black bg-white p-8">
            <div className="border-l-4 border-black pl-4 mb-6">
              <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
              <span className="text-xs font-mono text-gray-600 tracking-wider">DEFENSE INNOVATION ECOSYSTEM</span>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              For eight years, Syndicate 708 has been a central player in the defense innovation
              ecosystem, helping organizations navigate the complex landscape of defense technology
              commercialization and scale.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We work at the intersection of defense, technology, and entrepreneurship to strengthen
              American manufacturing capabilities and foster strategic partnerships that enhance
              national security.
            </p>
          </section>

          {/* Ellen Chang - The Difference Maker */}
          <section className="border-2 border-black bg-white p-8">
            <div className="mb-8 border-b-2 border-black pb-6">
              <span className="text-xs font-mono tracking-wider text-gray-600">MANAGING PARTNER</span>
              <h2 className="text-4xl font-bold tracking-tight mt-2">ELLEN CHANG</h2>
            </div>

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Ellen Chang is the central voice and driving force behind Syndicate 708. With decades
                of distinguished experience across defense, technology, and entrepreneurship, she has
                established herself as a uniquely positioned leader in the defense innovation ecosystem.
              </p>

              <p>
                As a former <strong>Navy Captain</strong>, Ellen developed deep operational expertise
                in naval systems and defense operations. This hands-on military experience provides her
                with an invaluable perspective on what warfighters actually need, not just what companies
                want to sell them.
              </p>

              <p>
                Her career at <strong>Northrop Grumman</strong>, one of America's largest defense
                contractors, gave her unparalleled insight into large-scale defense manufacturing,
                systems integration, and the complexities of working with the Department of Defense.
                She understands both the operational requirements and the industrial capabilities needed
                to deliver defense solutions at scale.
              </p>

              <p>
                What truly sets Ellen apart is her proven track record of impact. Over her career, she
                has helped <strong>hundreds of startups</strong> successfully commercialize their
                technologies, scale their operations, and navigate the labyrinth of defense contracting.
                Her expertise spans business development, strategic partnerships, government contracting,
                and defense technology adoption.
              </p>

              <p>
                Ellen is also the <strong>Founder and President of Wharton Aerospace</strong>, the
                premier community for aerospace and defense executives. Through Wharton Aerospace, she
                has built one of the most powerful networks in the industry, connecting leaders,
                innovators, and decision-makers across the entire defense ecosystem—from startups to
                primes, from government stakeholders to investors.
              </p>

              <p>
                This unique combination of military operations experience, large-scale defense industry
                expertise, startup commercialization success, and deep network makes Ellen the central
                differentiator for Syndicate 708. She doesn't just understand the defense innovation
                ecosystem—she has spent decades building it, shaping it, and helping companies succeed
                within it.
              </p>
            </div>
          </section>

          {/* Team Section */}
          <section className="border-2 border-black bg-white p-8">
            <div className="border-l-4 border-black pl-4 mb-6">
              <h2 className="text-3xl font-bold tracking-tight">Team</h2>
              <span className="text-xs font-mono text-gray-600 tracking-wider">SUPPORTING PERSONNEL</span>
            </div>

            <div className="bg-gray-50 border-2 border-gray-300 p-6">
              <h3 className="text-xl font-bold mb-2 tracking-tight">Ethan Markwalter</h3>

              <div className="text-gray-700">
                <p className="leading-relaxed">
                  Ethan is a Wharton School graduate with six years of experience in the deep tech space.
                  His background includes roles at Orbit Fab and BMNT, and he was a semi-finalist in
                  Penn's President Innovation Prize. Ethan has worked with numerous startups on
                  commercialization and scaling strategies, and contributes to Common Mission Project,
                  revolutionizing education to help students solve pressing national issues.
                </p>
              </div>
            </div>
          </section>

          {/* Impact Section */}
          <section className="border-2 border-black bg-white p-8">
            <div className="border-l-4 border-black pl-4 mb-6">
              <h2 className="text-3xl font-bold tracking-tight">Our Impact</h2>
              <span className="text-xs font-mono text-gray-600 tracking-wider">TRACK RECORD</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 border-2 border-gray-300 p-6">
                <h3 className="text-xl font-bold mb-3 tracking-tight">8 Years</h3>
                <p className="text-gray-700 text-sm">
                  Operating at the center of defense innovation and manufacturing ecosystems
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-gray-300 p-6">
                <h3 className="text-xl font-bold mb-3 tracking-tight">Hundreds of Startups</h3>
                <p className="text-gray-700 text-sm">
                  Guided through commercialization, scaling, and defense market entry
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-gray-300 p-6">
                <h3 className="text-xl font-bold mb-3 tracking-tight">Strategic Network</h3>
                <p className="text-gray-700 text-sm">
                  Deep connections across primes, startups, shipyards, and government stakeholders
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-gray-300 p-6">
                <h3 className="text-xl font-bold mb-3 tracking-tight">Wharton Aerospace</h3>
                <p className="text-gray-700 text-sm">
                  Premier executive community advancing aerospace and defense leadership
                </p>
              </div>
            </div>
          </section>

          {/* Expertise Section */}
          <section className="border-2 border-black bg-white p-8">
            <div className="border-l-4 border-black pl-4 mb-6">
              <h2 className="text-3xl font-bold tracking-tight">Our Expertise</h2>
              <span className="text-xs font-mono text-gray-600 tracking-wider">CORE CAPABILITIES</span>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-black pl-6 py-3 bg-gray-50">
                <h3 className="font-bold text-lg mb-1 tracking-tight">Defense Technology Commercialization</h3>
                <p className="text-gray-700 text-sm">
                  Helping innovative technologies transition from development to deployment
                </p>
              </div>

              <div className="border-l-4 border-black pl-6 py-3 bg-gray-50">
                <h3 className="font-bold text-lg mb-1 tracking-tight">Strategic Partnerships</h3>
                <p className="text-gray-700 text-sm">
                  Connecting companies across the defense industrial base to form powerful collaborations
                </p>
              </div>

              <div className="border-l-4 border-black pl-6 py-3 bg-gray-50">
                <h3 className="font-bold text-lg mb-1 tracking-tight">Manufacturing & Scale</h3>
                <p className="text-gray-700 text-sm">
                  Building capabilities for American companies to manufacture and scale domestically
                </p>
              </div>

              <div className="border-l-4 border-black pl-6 py-3 bg-gray-50">
                <h3 className="font-bold text-lg mb-1 tracking-tight">Market Development</h3>
                <p className="text-gray-700 text-sm">
                  Comprehensive understanding of defense markets, trends, and opportunities
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
