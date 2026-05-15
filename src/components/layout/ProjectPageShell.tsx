import type { ReactNode } from "react";
import { NeuralScene } from "@/components/neural/NeuralScene";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GlowCursorTrail } from "@/components/ui/GlowCursorTrail";
import { Navbar } from "@/components/ui/Navbar";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";

const STATIC_MOUSE_POSITION = { x: 0, y: 0 };

interface ProjectPageShellProps {
  progress: number;
  children: ReactNode;
  mainClassName: string;
}

export function ProjectPageShell({ progress, children, mainClassName }: ProjectPageShellProps) {
  return (
    <div className="flex flex-col w-full">
      <CustomCursor />
      <GlowCursorTrail />
      <div className="fixed top-0 left-0 w-full h-[140px] bg-[#0b1220]/80 backdrop-blur-xl z-30" />
      <Navbar variant="project" />
      <ScrollProgressBar progress={progress} mode="fixed" />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralScene scrollProgress={progress} mousePosition={STATIC_MOUSE_POSITION} />
      </div>

      <div className="relative z-10 w-full pt-[140px]">
        <main className={`flex flex-col ${mainClassName}`}>{children}</main>
      </div>
    </div>
  );
}
