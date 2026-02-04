"use client";

import Image from "next/image";
import { BUTTON_CLASSNAME } from "@/lib/constant";

interface ToggleButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ToggleButton({
  isExpanded,
  onToggle,
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`bg-bg-gray text-text-secondary ${BUTTON_CLASSNAME}`}
    >
      <div className="flex justify-center gap-1">
        <span>상세보기</span>
        <Image
          src={isExpanded ? "/arrow-up.svg" : "/arrow-down.svg"}
          alt={isExpanded ? "접기" : "펼치기"}
          width={14}
          height={14}
        />
      </div>
    </button>
  );
}
