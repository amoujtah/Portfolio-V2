import { cn } from "../lib/utils";
import { AnimatedGradientText } from "./animate-gradient-text";
import { ChevronRight } from "lucide-react";

export function AnimatedGradientTextDemo() {
  return (
    <div className="group relative inline-flex items-center justify-center rounded-full border border-emerald-400/25 px-4 py-1.5 shadow-[inset_0_-8px_10px_rgba(16,185,129,0.12)] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_rgba(16,185,129,0.22)]">
      <span
        className={cn(
          "absolute inset-0 block h-full w-50 animate-gradient rounded-[inherit] bg-gradient-to-r from-[#10b981]/50 via-[#84cc16]/50 to-[#10b981]/50 bg-[length:300%_100%] p-[1px]"
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />
      <AnimatedGradientText
        className="text-sm font-medium"
        colorFrom="#10b981"
        colorTo="#bef264"
      >
        Cyber Security Student
      </AnimatedGradientText>
      <ChevronRight
        className="ml-1 size-4 stroke-emerald-300 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
      />
    </div>
  );
}
