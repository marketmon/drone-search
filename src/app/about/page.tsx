import Link from "next/link";
import { Ship } from "lucide-react";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";

export default function About() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Wave background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-about" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q 25 10, 50 20 T 100 20" fill="none" stroke="#3b82f630" strokeWidth="1.5" />
              <path d="M0 25 Q 25 15, 50 25 T 100 25" fill="none" stroke="#3b82f620" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-about)" />
        </svg>
      </div>

      {/* Navigation */}
      <SiteHeader />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="mb-8 sm:mb-16 border-2 border-black bg-white p-5 sm:p-8">
          <div className="border-b-2 border-blue-600 pb-3 sm:pb-4 mb-3 sm:mb-4 flex items-center gap-3 sm:gap-4">
            <Ship className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 flex-shrink-0" />
            <div>
              <span className="text-[10px] sm:text-xs font-mono tracking-wider text-blue-600 block">USV MARKET INTELLIGENCE</span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-1">USV HUB</h1>
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
            The comprehensive directory for America's autonomous maritime ecosystem—connecting engineers, suppliers, and innovators in the unmanned surface vehicle market.
          </p>
        </div>

        <div className="space-y-8">
          {/* Background Section */}
          <section className="border-2 border-black bg-white p-8">
            <div className="border-l-4 border-blue-600 pl-4 mb-6">
              <h2 className="text-3xl font-bold tracking-tight">Background</h2>
              <span className="text-xs font-mono text-gray-600 tracking-wider">WHY WE EXIST</span>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We're at the beginning of a transformative era in maritime operations. Unmanned surface vehicles represent a critical capability for the U.S. Navy, Coast Guard, and commercial maritime operations. Yet the market remains fragmented—limited visibility into who's building what, which suppliers are reliable, and how these technologies integrate.
              </p>

              <p>
                <strong>USV Hub exists to solve this.</strong> By creating a centralized, curated database of companies, capabilities, and market intelligence, we help engineers and decision-makers find the right partners and move faster from concept to deployment.
              </p>

              <p>
                The defense tech ecosystem thrives on collaboration, not isolation. When companies, engineers, and government stakeholders can see the full picture—who's solving what problems, which technologies are mature, where the gaps exist—we all move faster.
              </p>
            </div>
          </section>

          {/* What Belongs Section */}
          <section className="border-2 border-black bg-white p-8">
            <div className="border-l-4 border-blue-600 pl-4 mb-6">
              <h2 className="text-3xl font-bold tracking-tight">What Belongs in USV Hub?</h2>
              <span className="text-xs font-mono text-gray-600 tracking-wider">INCLUSION CRITERIA</span>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2 text-black">Operational Realm</h3>
                <p className="text-sm text-gray-700">
                  Companies operating in the unmanned surface vehicle ecosystem—from complete platform manufacturers to component suppliers. This includes autonomy, propulsion, sensors, communications, and maritime-specific subsystems.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-black">Market Focus</h3>
                <p className="text-sm text-gray-700">
                  Both commercial innovators and defense contractors serving the U.S. maritime market. We focus on companies with operational capabilities or proven track records, not just concepts.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-black">What We Include</h3>
                <div className="space-y-2 ml-4 text-sm text-gray-700">
                  <p>✓ USV platform manufacturers and system integrators</p>
                  <p>✓ Component and subsystem suppliers (propulsion, sensors, autonomy, communications)</p>
                  <p>✓ Maritime technology providers with USV-applicable capabilities</p>
                  <p>✓ Startups and established defense contractors</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-black">What We Don't Include</h3>
                <div className="space-y-2 ml-4 text-sm text-gray-700">
                  <p>✗ Pure aerial or ground autonomy (unless maritime-applicable)</p>
                  <p>✗ Companies without clear USV market relevance</p>
                  <p>✗ Research projects without commercialization path</p>
                </div>
              </div>
            </div>
          </section>

          {/* Initiative Section */}
          <section className="border-2 border-black bg-white p-8">
            <div className="border-l-4 border-blue-600 pl-4 mb-6">
              <h2 className="text-3xl font-bold tracking-tight">Localize Opportunity</h2>
              <span className="text-xs font-mono text-gray-600 tracking-wider">STRENGTHEN AMERICAN MANUFACTURING</span>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Our mission is to forge a foundation for American companies to innovate, build, and manufacture with partners in a uniquely American way, defending our ability to compete on the world stage.
              </p>

              <p>
                The maritime sector is our first vertical. By creating transparency and connectivity in this market, we're demonstrating how information sharing and collaboration can accelerate American manufacturing and deployment of critical technologies.
              </p>


            </div>
          </section>

          {/* Contribute Section */}
          <section className="border-2 border-black bg-white p-8">
            <div className="border-l-4 border-blue-600 pl-4 mb-6">
              <h2 className="text-3xl font-bold tracking-tight">Contribute</h2>
              <span className="text-xs font-mono text-gray-600 tracking-wider">HELP BUILD THE DATABASE</span>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                This database grows through community contributions. If you see a company missing, information that needs updating, or have insights on the market, we'd love to hear from you.
              </p>

              <div className="bg-blue-50 border-2 border-blue-600 p-6">
                <h3 className="font-bold text-lg mb-3 text-black">Ways to Contribute</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-bold text-black">Add a Company or Vehicle</p>
                    <p>Use the "Contribute to Database" button on any page to suggest additions. All submissions are reviewed before being added.</p>
                  </div>

                  <div>
                    <p className="font-bold text-black">Share the Resource</p>
                    <p>The more engineers and companies that participate, the stronger the ecosystem becomes. Help spread the word.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Community Section */}
          <section id="community" className="border-2 border-black bg-white p-8">
            <div className="border-l-4 border-blue-600 pl-4 mb-6">
              <h2 className="text-3xl font-bold tracking-tight">Join the Community</h2>
              <span className="text-xs font-mono text-gray-600 tracking-wider">CONNECT & COLLABORATE</span>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Interested in joining the conversation?
              </p>

              <div className="pt-2">
                <a
                  href="https://forms.gle/Y1kJ34ZPvyaikgxq7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-mono text-sm tracking-wider border-2 border-black hover:bg-blue-700 transition-colors"
                >
                  Sign Up for Updates
                </a>
              </div>
            </div>
          </section>

          {/* About the Creator */}
          <section className="border-2 border-black bg-white p-8">


            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                USV Hub was created and is maintained by{" "}
                <a
                  href="https://www.linkedin.com/in/ethan-markwalter/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                >
                  Ethan Markwalter
                </a>
              </p>

              <p className="text-sm">
                Questions, feedback, or want to contribute?{" "}
                <span className="font-mono">ethan[at]syndicate708[dot]com</span>
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
