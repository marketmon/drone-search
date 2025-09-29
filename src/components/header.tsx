"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DemoButton, DemoLink } from "@/components/ui/demo-button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { unmannedSystems, getSystemsByDomain } from "@/lib/data";
import { Shield, Search, User, ShoppingCart } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <a href="/" className="flex items-center space-x-2">
              <div>
                <h1 className="text-xl font-bold text-white">
                  USForge
                </h1>

              </div>
            </a>
          </div>

          {/* Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-gray-800">
                  Aerial Systems
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1">
                    <a
                      href="/systems/aerial"
                      className="flex items-center space-x-3 border border-gray-700 p-3 hover:bg-gray-800 cursor-pointer bg-blue-950 border-blue-600"
                    >
                      <div>
                        <div className="text-sm font-medium text-white">
                          🎯 Interactive Systems Breakdown
                        </div>
                        <div className="text-xs text-blue-400 mb-1">
                          Click to explore all aerial systems with detailed breakdowns
                        </div>
                        <Badge variant="outline" className="text-xs text-blue-400 border-blue-400">
                          FPV • Multi-rotor • Fixed Wing • VTOL
                        </Badge>
                      </div>
                    </a>
                    {getSystemsByDomain('aerial').slice(0, 3).map((system) => (
                      system.id === 'propulsion' ? (
                        <a
                          key={system.id}
                          href="/systems/propulsion"
                          className="flex items-center space-x-3 border border-gray-700 p-3 hover:bg-gray-800 cursor-pointer transition-colors"
                        >
                          <div className="flex-1">
                            <div className="text-sm font-medium text-white">
                              {system.name}
                            </div>
                            <div className="text-xs text-gray-400 mb-1">
                              {system.description}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {system.vehicleType}
                            </Badge>
                          </div>
                        </a>
                      ) : (
                        <div
                          key={system.id}
                          className="flex items-center space-x-3 border border-gray-700 p-3 hover:bg-gray-800 cursor-not-allowed opacity-60 relative"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium text-white">
                                {system.name}
                              </div>
                              <Badge variant="outline" className="text-xs border-gray-600 bg-gray-800 text-gray-400">
                                Demo
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-400 mb-1">
                              {system.description}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {system.vehicleType}
                            </Badge>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-gray-800">
                  Marine Systems
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1">
                    <a
                      href="/systems/marine"
                      className="flex items-center space-x-3 border border-gray-700 p-3 hover:bg-gray-800 cursor-pointer bg-cyan-950 border-cyan-600"
                    >
                      <div>
                        <div className="text-sm font-medium text-white">
                          🎯 Interactive Systems Breakdown
                        </div>
                        <div className="text-xs text-cyan-400 mb-1">
                          Click to explore all marine systems with detailed breakdowns
                        </div>
                        <Badge variant="outline" className="text-xs text-cyan-400 border-cyan-400">
                          Surface USV • Undersea UUV
                        </Badge>
                      </div>
                    </a>
                    {getSystemsByDomain('marine').slice(0, 3).map((system) => (
                      <div
                        key={system.id}
                        className="flex items-center space-x-3 border border-gray-700 p-3 hover:bg-gray-800 cursor-not-allowed opacity-60 relative"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-white">
                              {system.name}
                            </div>
                            <Badge variant="outline" className="text-xs border-gray-600 bg-gray-800 text-gray-400">
                              Demo
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-400 mb-1">
                            {system.description}
                          </div>
                          <div className="flex gap-1">
                            <Badge variant="outline" className="text-xs">
                              {system.vehicleType}
                            </Badge>
                            {'vehicleCategory' in system && (
                              <Badge variant="secondary" className="text-xs">
                                {system.vehicleCategory}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-gray-800">
                  Companies
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1">
                    <a
                      href="/companies"
                      className="flex items-center space-x-3 border border-gray-700 p-3 hover:bg-gray-800 cursor-pointer bg-green-950 border-green-600"
                    >
                      <div>
                        <div className="text-sm font-medium text-white">
                          🏭 Browse All Partners
                        </div>
                        <div className="text-xs text-green-400 mb-1">
                          Complete directory of NDAA-compliant suppliers
                        </div>
                        <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                          12 Verified Partners
                        </Badge>
                      </div>
                    </a>
                    <a
                      href="/companies/voltaic-marine-systems"
                      className="flex items-center space-x-3 border border-gray-700 p-3 hover:bg-gray-800 cursor-pointer"
                    >
                      <div>
                        <div className="text-sm font-medium text-white">
                          Voltaic Marine Systems
                        </div>
                        <div className="text-xs text-gray-400 mb-1">
                          Dual-environment battery systems for marine and aerial platforms
                        </div>
                        <Badge variant="outline" className="text-xs text-blue-400 border-blue-400">
                          Expert Team
                        </Badge>
                      </div>
                    </a>
                    <a
                      href="/companies/razor-dynamics-fpv"
                      className="flex items-center space-x-3 border border-gray-700 p-3 hover:bg-gray-800 cursor-pointer"
                    >
                      <div>
                        <div className="text-sm font-medium text-white">
                          Razor Dynamics FPV
                        </div>
                        <div className="text-xs text-gray-400 mb-1">
                          High-performance FPV racing motors and ESC systems
                        </div>
                        <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                          Racing Specialist
                        </Badge>
                      </div>
                    </a>
                    <a
                      href="/companies/apex-propulsion-dynamics"
                      className="flex items-center space-x-3 border border-gray-700 p-3 hover:bg-gray-800 cursor-pointer"
                    >
                      <div>
                        <div className="text-sm font-medium text-white">
                          Apex Propulsion Dynamics
                        </div>
                        <div className="text-xs text-gray-400 mb-1">
                          Enterprise propulsion systems for defense applications
                        </div>
                        <Badge variant="outline" className="text-xs text-purple-400 border-purple-400">
                          Defense Grade
                        </Badge>
                      </div>
                    </a>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <a href="/manufacturing">
                  <Button variant="ghost" className="text-white hover:bg-gray-800 cursor-pointer">
                    RFI
                  </Button>
                </a>
              </NavigationMenuItem>


            </NavigationMenuList>
          </NavigationMenu>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10 w-64 bg-gray-900 border-gray-700 text-white placeholder-gray-400 cursor-not-allowed opacity-60"
                disabled
              />
              <Badge
                variant="outline"
                className="absolute -top-2 -right-2 text-xs border-gray-600 bg-gray-800 text-gray-400 pointer-events-none"
              >
                Demo
              </Badge>
            </div>

            <div className="relative">
              <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-800 cursor-not-allowed opacity-60" disabled>
                <User className="h-5 w-5" />
              </Button>
              <Badge
                variant="outline"
                className="absolute -top-1 -right-1 text-xs border-gray-600 bg-gray-800 text-gray-400 pointer-events-none"
              >
                Demo
              </Badge>
            </div>

            <div className="relative">
              <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-800 cursor-not-allowed opacity-60" disabled>
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Badge
                variant="outline"
                className="absolute -top-1 -right-1 text-xs border-gray-600 bg-gray-800 text-gray-400 pointer-events-none"
              >
                Demo
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}