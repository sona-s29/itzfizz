import { useId } from "react";

const WHEELS = [
  { x: 66, y: 13 },
  { x: 270, y: 13 },
  { x: 66, y: 123 },
  { x: 270, y: 123 },
];

export default function Car({ className = "" }) {
  const gradientId = useId().replace(/:/g, "");
  const ids = {
    body: `${gradientId}-body`,
    bodyEdge: `${gradientId}-body-edge`,
    glass: `${gradientId}-glass`,
    reflection: `${gradientId}-reflection`,
    beam: `${gradientId}-beam`,
    lamp: `${gradientId}-lamp`,
  };

  return (
    <svg
      viewBox="0 0 400 160"
      className={`overflow-visible ${className}`}
      role="img"
      aria-label="Top view of a yellow sports car"
    >
      <defs>
        <linearGradient id={ids.body} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff5ae" />
          <stop offset="0.2" stopColor="#ffd23f" />
          <stop offset="0.72" stopColor="#ffad19" />
          <stop offset="1" stopColor="#eb6900" />
        </linearGradient>
        <linearGradient id={ids.bodyEdge} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.48" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#741e45" stopOpacity="0.48" />
        </linearGradient>
        <linearGradient id={ids.glass} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5ae9ff" />
          <stop offset="0.22" stopColor="#20245c" />
          <stop offset="1" stopColor="#09051f" />
        </linearGradient>
        <linearGradient id={ids.reflection} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.42" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={ids.beam} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff3a0" stopOpacity="0.4" />
          <stop offset="1" stopColor="#fff3a0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={ids.lamp}>
          <stop stopColor="#fff" />
          <stop offset="0.45" stopColor="#fff9ce" />
          <stop offset="1" stopColor="#ffd23f" />
        </radialGradient>
      </defs>

      <g aria-hidden="true">
        {/* Headlight spill and soft ground shadow */}
        <path d="M380 55L400 48L400 10L610 0L610 80Z" fill={`url(#${ids.beam})`} />
        <path d="M380 105L400 112L400 150L610 160L610 80Z" fill={`url(#${ids.beam})`} />
        <ellipse cx="207" cy="88" rx="184" ry="61" fill="#050313" opacity="0.42" />
        <ellipse cx="218" cy="87" rx="150" ry="43" fill="#ff3d81" opacity="0.08" />

        {/* Tires */}
        {WHEELS.map(({ x, y }) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width="66" height="27" rx="10" fill="#080716" />
            <rect x={x + 5} y={y + 4} width="56" height="19" rx="7" fill="#211d32" />
            <path
              d={`M${x + 12} ${y + 5}v17M${x + 20} ${y + 4}v19M${x + 46} ${y + 4}v19M${x + 54} ${y + 5}v17`}
              stroke="#59566a"
              strokeOpacity="0.55"
              strokeWidth="1.5"
            />
          </g>
        ))}

        {/* Rear wing and supports */}
        <path d="M25 28h9v104h-9z" fill="#15102e" />
        <path d="M18 25h22v7H18zm0 103h22v7H18z" fill="#29204b" />
        <path d="M35 50h7v12h-7zm0 48h7v12h-7z" fill="#ff1744" />

        {/* Sculpted body */}
        <path
          d="M29 80c0-27 18-45 48-51 18-4 38-5 64-5h111c60 0 105 13 128 37l12 13c6 7 6 15 0 22l-12 13c-23 24-68 37-128 37H141c-26 0-46-1-64-5-30-6-48-24-48-51Z"
          fill={`url(#${ids.body})`}
          stroke="#fff0a3"
          strokeOpacity="0.72"
          strokeWidth="2"
        />
        <path
          d="M34 80c0-23 16-38 45-44 20-4 40-5 63-5h110c57 0 99 12 121 34l11 12-11 12c-22 22-64 34-121 34H142c-23 0-43-1-63-5-29-6-45-21-45-44Z"
          fill="none"
          stroke={`url(#${ids.bodyEdge})`}
          strokeWidth="5"
        />

        {/* Hood creases, vents and racing stripes */}
        <path d="M281 48c33 3 59 12 78 27M281 112c33-3 59-12 78-27" fill="none" stroke="#fff4bd" strokeOpacity="0.48" strokeWidth="2" />
        <path d="M274 69h91" stroke="#ff3d81" strokeWidth="5" strokeLinecap="round" />
        <path d="M274 91h91" stroke="#ff3d81" strokeWidth="5" strokeLinecap="round" />
        <path d="M247 57v13m0 20v13" stroke="#9b4615" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
        <path d="M247 58v11m0 22v11" stroke="#fff0a3" strokeOpacity="0.65" strokeWidth="1" strokeLinecap="round" />

        {/* Panoramic canopy with windshield and rear glass */}
        <path
          d="M126 43c8-10 20-16 34-17l78-2c18 0 33 20 37 56-4 36-19 56-37 56l-78-2c-14-1-26-7-34-17-9-20-9-54 0-74Z"
          fill="#11102c"
          stroke="#fff1b0"
          strokeOpacity="0.72"
          strokeWidth="2"
        />
        <path d="M139 43c6-6 14-10 24-11l65-2c9 7 15 20 18 35h-91c-8-6-13-13-16-22Z" fill={`url(#${ids.glass})`} />
        <path d="M155 105h91c-3 15-9 28-18 35l-65-2c-10-1-18-5-24-11 3-9 8-16 16-22Z" fill={`url(#${ids.glass})`} />
        <path d="M143 43c5-5 11-8 17-9l61-2c-13 8-24 19-32 32h-31c-7-6-12-13-15-21Z" fill={`url(#${ids.reflection})`} />
        <path d="M249 33c-3 15-4 30-4 47m0 0c0 17 1 32 4 47" fill="none" stroke="#8beeff" strokeOpacity="0.42" strokeWidth="2" />
        <path d="M139 80h128" stroke="#fff" strokeOpacity="0.24" strokeWidth="1.5" />

        {/* Side mirrors and door details */}
        <path d="M118 48 105 42c-5-2-10 1-10 6v8l19 5m4 51-13 6c-5 2-10-1-10-6v-8l19-5" fill="#f7b52e" stroke="#fff0a3" strokeWidth="1.5" />
        <path d="M91 62v36m18-34 10 4m-10 26 10-4" fill="none" stroke="#a84b19" strokeOpacity="0.48" strokeWidth="1.5" />

        {/* Headlights and tail lamps */}
        <path d="M378 51q10 5 10 11t-10 11" fill={`url(#${ids.lamp})`} stroke="#fff" strokeWidth="1.5" />
        <path d="M378 85q10 5 10 11t-10 11" fill={`url(#${ids.lamp})`} stroke="#fff" strokeWidth="1.5" />
        <path d="M31 51h7v14h-7zm0 44h7v14h-7z" fill="#ff1744" />
        <path d="M31 53h2v10h-2zm0 44h2v10h-2z" fill="#ffb3c4" />
      </g>
    </svg>
  );
}
