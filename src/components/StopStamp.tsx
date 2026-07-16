import type { CSSProperties } from "react";
import type { Category } from "../data/stops";
import {
  getStampColor,
  getStampImperfections,
  shortenPlaceName,
} from "../utils/stamp";

export interface StopStampProps {
  stopId: number;
  stopNumber: number;
  placeName: string;
  category: Category;
  date?: string;
  size?: "full" | "mini";
  animate?: boolean;
  sightedLabel?: string;
  ariaLabel?: string;
}

const SIZE_MAP = { full: 72, mini: 28 } as const;

export function StopStamp({
  stopId,
  stopNumber,
  placeName,
  category,
  date,
  size = "full",
  animate = false,
  sightedLabel = "FUNDORT GESICHTET",
  ariaLabel,
}: StopStampProps) {
  const px = SIZE_MAP[size];
  const color = getStampColor(category);
  const { rotation, opacity } = getStampImperfections(stopId);
  const shortName = shortenPlaceName(placeName, size === "mini" ? 14 : 22);
  const isMini = size === "mini";

  const animRotation = animate ? rotation + 2.5 : rotation;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 72 72"
      role="img"
      aria-label={ariaLabel ?? `Stempel Fundort ${String(stopNumber).padStart(2, "0")}`}
      className={animate ? "stamp-knall" : undefined}
      style={
        {
          "--stamp-rotation": `${animRotation}deg`,
          "--stamp-rotation-end": `${rotation}deg`,
          mixBlendMode: "multiply",
          opacity,
          transform: animate ? undefined : `rotate(${rotation}deg)`,
        } as CSSProperties
      }
    >
      <defs>
        {!isMini && (
          <>
            <path
              id={`stamp-top-${stopId}-${size}`}
              d="M 12 36 A 24 24 0 0 1 60 36"
              fill="none"
            />
            <path
              id={`stamp-bottom-${stopId}-${size}`}
              d="M 60 36 A 24 24 0 0 1 12 36"
              fill="none"
            />
          </>
        )}
      </defs>

      <circle
        cx="36"
        cy="36"
        r="32"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />

      {!isMini && (
        <>
          <text
            fill={color}
            fontFamily="var(--font-mono)"
            fontSize="5.2"
            letterSpacing="0.08em"
          >
            <textPath
              href={`#stamp-top-${stopId}-${size}`}
              startOffset="50%"
              textAnchor="middle"
            >
              {sightedLabel}
            </textPath>
          </text>
          <text
            fill={color}
            fontFamily="var(--font-mono)"
            fontSize="4.6"
            letterSpacing="0.06em"
          >
            <textPath
              href={`#stamp-bottom-${stopId}-${size}`}
              startOffset="50%"
              textAnchor="middle"
            >
              {shortName}
            </textPath>
          </text>
        </>
      )}

      <text
        x="36"
        y={isMini ? "38" : "35"}
        textAnchor="middle"
        fill={color}
        fontFamily="var(--font-display)"
        fontSize={isMini ? "14" : "18"}
        fontWeight="700"
      >
        {String(stopNumber).padStart(2, "0")}
      </text>

      {!isMini && date && (
        <text
          x="36"
          y="46"
          textAnchor="middle"
          fill={color}
          fontFamily="var(--font-mono)"
          fontSize="6"
          letterSpacing="0.04em"
        >
          {date}
        </text>
      )}
    </svg>
  );
}
