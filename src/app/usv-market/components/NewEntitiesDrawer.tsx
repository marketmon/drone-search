"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Sparkles, X } from "lucide-react";
import { Company } from "../types";
import { createSlug } from "../utils";

interface NewEntitiesDrawerProps {
  newEntities: Company[];
  dateAdded: string;
}

export function NewEntitiesDrawer({ newEntities, dateAdded }: NewEntitiesDrawerProps) {
  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button className="relative cursor-pointer font-mono text-xs tracking-wider px-4 py-2 rounded-none transition-all bg-white text-black border-2 border-gray-300 hover:border-black hover:bg-gray-50 flex items-center gap-2">
          <Sparkles className="w-3 h-3 opacity-60" />
          <span className="hidden sm:inline">NEW AS OF {dateAdded}</span>
          <span className="sm:hidden">NEW</span>
          <span className="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 ml-1 animate-pulse">
            {newEntities.length}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-t-2 border-black bg-white">
        <DrawerHeader className="border-b-2 border-black">
          <div className="flex items-center justify-between">
            <DrawerTitle className="font-mono text-sm font-bold">NEW AS OF {dateAdded} ({newEntities.length})</DrawerTitle>
            <DrawerClose asChild>
              <button className="w-7 h-7  bg-white cursor-pointer flex items-center justify-center hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4 text-black" />
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="overflow-y-auto p-4 max-h-[60vh]">
          {newEntities.length === 0 ? (
            <div className="text-center py-8 text-gray-500 font-mono text-sm">
              No new entities
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {newEntities.map((entity, index) => (
                <Link
                  key={`${entity.name}-${index}`}
                  href={`/usv-market/company/${createSlug(entity.name)}`}
                  className="flex flex-col items-center gap-2 p-3 border border-gray-300 bg-white hover:bg-gray-50 hover:border-black transition-all"
                >
                  <div className="w-16 h-16 bg-white flex items-center justify-center overflow-hidden">
                    {entity.imageUrl ? (
                      <img
                        src={entity.imageUrl}
                        alt={entity.name}
                        className="object-contain w-full h-full"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-xs font-mono text-gray-400">NO IMG</span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-center text-black leading-tight line-clamp-2">
                    {entity.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
