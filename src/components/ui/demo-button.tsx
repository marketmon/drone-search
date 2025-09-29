import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DemoButtonProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "lg" | "default";
  variant?: "default" | "outline";
  onClick?: () => void;
}

export function DemoButton({ children, className, size = "default", variant = "default", onClick }: DemoButtonProps) {
  const baseClasses = variant === "outline"
    ? "border-gray-600 text-gray-500 bg-gray-900 hover:bg-gray-800 hover:text-gray-400 cursor-not-allowed opacity-60"
    : "bg-gray-700 text-gray-500 hover:bg-gray-600 hover:text-gray-400 cursor-not-allowed opacity-60";

  return (
    <div className="relative inline-block">
      <Button
        className={cn(baseClasses, className)}
        size={size}
        variant={variant}
        onClick={onClick}
        disabled
      >
        {children}
      </Button>
      <Badge
        variant="outline"
        className="absolute -top-2 -right-2 text-xs border-gray-600 bg-gray-800 text-gray-400 pointer-events-none"
      >
        Demo
      </Badge>
    </div>
  );
}

interface DemoLinkProps {
  children: ReactNode;
  className?: string;
  href?: string;
}

export function DemoLink({ children, className, href = "#" }: DemoLinkProps) {
  return (
    <div className="relative inline-block">
      <a
        href={href}
        className={cn("text-gray-500 hover:text-gray-400 cursor-not-allowed opacity-60", className)}
        onClick={(e) => e.preventDefault()}
      >
        {children}
      </a>
      <Badge
        variant="outline"
        className="absolute -top-1 -right-8 text-xs border-gray-600 bg-gray-800 text-gray-400 pointer-events-none"
      >
        Demo
      </Badge>
    </div>
  );
}