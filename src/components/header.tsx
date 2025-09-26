"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { droneSystems } from "@/lib/data";
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
                  DroneForge
                </h1>

              </div>
            </a>
          </div>

          {/* Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-gray-800">
                  Systems
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {droneSystems.map((system) => (
                      <a
                        key={system.id}
                        href={system.id === 'propulsion' ? '/systems/propulsion' : '#'}
                        className="flex items-center space-x-3 border border-gray-700 p-3 hover:bg-gray-800 cursor-pointer"
                      >
                        <div>
                          <div className="text-sm font-medium text-white">
                            {system.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {system.description}
                          </div>
                        </div>
                      </a>
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
                      href="/companies/apex-propulsion-dynamics"
                      className="flex items-center space-x-3 border border-gray-700 p-3 hover:bg-gray-800 cursor-pointer"
                    >
                      <div>
                        <div className="text-sm font-medium text-white">
                          Apex Propulsion Dynamics
                        </div>
                        <div className="text-xs text-gray-400">
                          Leading manufacturer of high-performance propulsion systems
                        </div>
                      </div>
                    </a>
                    <a
                      href="/companies"
                      className="flex items-center space-x-3 border border-gray-700 p-3 hover:bg-gray-800 cursor-pointer"
                    >
                      <div>
                        <div className="text-sm font-medium text-white">
                          View All Companies
                        </div>
                        <div className="text-xs text-gray-400">
                          Browse all verified suppliers in our marketplace
                        </div>
                      </div>
                    </a>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Button variant="ghost" className="text-white hover:bg-gray-800">
                  Certifications
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10 w-64 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <User className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}