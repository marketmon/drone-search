"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroHeader() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-black p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
        <div className="flex-1">
          <div className="inline-block bg-blue-800 border-2 border-blue-400 px-3 py-1 mb-4">
            <span className="text-xs font-mono tracking-wider text-blue-100 font-bold">DATABASE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-none mb-4">
            USV Hub
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-blue-100 font-medium mb-3">
            Key US Players in Unmanned Surface Vehicles
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/usv-market/contribution">
            <Button
              className="bg-white hover:bg-blue-900 hover:text-white text-black border-2 border-blue-400 font-mono text-sm sm:text-base tracking-wider px-6 py-4
              rounded-none whitespace-nowrap transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(59,130,246,0.5)]
              cursor-pointer w-full"
            >
              CONTRIBUTE TO DATABASE
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
