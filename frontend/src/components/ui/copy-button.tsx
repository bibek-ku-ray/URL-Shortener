"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Particle {
  id: string;
  dx: number;
  dy: number;
  rot: number;
  delay: number;
  color: string;
}

interface CopyButtonProps {
  copyValue: string;
  label?: string;
  className?: string;
  size?: React.ComponentProps<typeof Button>["size"];
  variant?: React.ComponentProps<typeof Button>["variant"];
  successTitle?: string;
  successDescription?: string;
}

const confettiPalette = ["#06B6D4", "#22D3EE", "#67E8F9", "#0891B2", "#A5F3FC"];

function createParticle(index: number): Particle {
  const spread = 24 + Math.random() * 50;
  const angle = (Math.PI * 2 * index) / 12;
  return {
    id: `${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`,
    dx: Math.cos(angle) * spread,
    dy: Math.sin(angle) * spread - 12 - Math.random() * 12,
    rot: -140 + Math.random() * 280,
    delay: Math.random() * 100,
    color: confettiPalette[index % confettiPalette.length],
  };
}

export function CopyButton({
  copyValue,
  label = "Copy",
  className,
  size = "sm",
  variant = "secondary",
  successTitle = "Copied",
  successDescription = "URL copied to clipboard.",
}: CopyButtonProps) {
  const toast = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn("relative overflow-visible", isCopied && "copy-ripple", className)}
      onClick={async () => {
        await navigator.clipboard.writeText(copyValue);
        setIsCopied(true);
        setParticles(Array.from({ length: 12 }, (_, index) => createParticle(index)));
        toast.success(successTitle, successDescription);

        window.setTimeout(() => setIsCopied(false), 320);
        window.setTimeout(() => setParticles([]), 900);
      }}
    >
      {isCopied ? <Check className="mr-1 size-3.5" aria-hidden="true" /> : <Copy className="mr-1 size-3.5" aria-hidden="true" />}
      {label}
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="confetti-piece"
          style={
            {
              "--dx": `${particle.dx}px`,
              "--dy": `${particle.dy}px`,
              "--rot": `${particle.rot}deg`,
              "--delay": `${particle.delay}ms`,
              "--confetti-color": particle.color,
            } as React.CSSProperties
          }
          aria-hidden="true"
        />
      ))}
    </Button>
  );
}
