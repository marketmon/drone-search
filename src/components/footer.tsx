'use client'

import { Badge } from "@/components/ui/badge";
import { DemoLink } from "@/components/ui/demo-button";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold text-white mb-2">
                USForge
              </h3>
              <p className="text-sm text-gray-400">Unmanned System Forge</p>
            </Link>
            <Badge variant="outline" className="text-xs text-green-400 border-green-400 mb-3">
              NDAA COMPLIANT
            </Badge>
            <p className="text-gray-400 text-sm leading-relaxed">
              The premier marketplace for NDAA-compliant unmanned system components, connecting buyers with verified suppliers.
            </p>
          </div>

          {/* Systems */}
          <div>
            <h4 className="text-white font-semibold mb-4">Systems</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/systems/aerial" className="hover:text-white transition-colors">Aerial Systems</Link></li>
              <li><Link href="/systems/marine" className="hover:text-white transition-colors">Marine Systems</Link></li>
              <li><Link href="/systems/propulsion" className="hover:text-white transition-colors">Propulsion Systems</Link></li>
            </ul>
          </div>

          {/* Companies */}
          <div>
            <h4 className="text-white font-semibold mb-4">Partners</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/companies" className="hover:text-white transition-colors">All Companies</Link></li>
              <li><Link href="/companies/voltaic-marine-systems" className="hover:text-white transition-colors">Voltaic Marine Systems</Link></li>
              <li><Link href="/companies/razor-dynamics-fpv" className="hover:text-white transition-colors">Razor Dynamics FPV</Link></li>
              <li><Link href="/companies/apex-propulsion-dynamics" className="hover:text-white transition-colors">Apex Propulsion</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/manufacturing" className="hover:text-white transition-colors">Manufacturing RFIs</Link></li>
              <li><DemoLink href="#rfq">Request Components</DemoLink></li>
              <li><DemoLink>NDAA Compliance</DemoLink></li>
              <li><DemoLink>Enterprise Support</DemoLink></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2025 USForge (Unmanned System Forge). All rights reserved.</p>
          </div>

          <div className="flex flex-wrap gap-6">
            <DemoLink>Privacy Policy</DemoLink>
            <DemoLink>Terms of Service</DemoLink>
            <DemoLink>Contact Us</DemoLink>
          </div>
        </div>
      </div>
    </footer>
  );
}