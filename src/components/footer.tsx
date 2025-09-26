import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-green-400" />
              <div>
                <h3 className="text-xl font-serif font-bold text-white">
                  DroneForge
                </h3>
                <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                  NDAA COMPLIANT
                </Badge>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The premier B2B marketplace for NDAA Section 848 compliant enterprise drone components
              at scale, connecting defense contractors with verified suppliers for volume procurement.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enterprise Solutions</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Browse Systems</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Volume Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Defense Contractors</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Custom Integration</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fleet Solutions</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enterprise Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About DroneForge</a></li>
              <li><a href="#" className="hover:text-white transition-colors">NDAA Compliance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Supply Chain Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contractor Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-400" />
                <span>info@droneforge.mil</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <span>Washington, DC</span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="text-white font-medium mb-2 text-sm">Security Clearance</h5>
              <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                Facility Clearance: SECRET
              </Badge>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2025 DroneForge Marketplace. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">ITAR Compliance</a>
            <a href="#" className="hover:text-white transition-colors">Export Control</a>
          </div>
        </div>


      </div>
    </footer>
  );
}