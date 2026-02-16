"use client";

import type { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/toaster";
import { SessionBootstrap } from "@/components/providers/session-bootstrap";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <>
      <SessionBootstrap />
      {children}
      <Toaster />
    </>
  );
}
