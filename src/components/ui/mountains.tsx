export function Mountains({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 200"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m0 190 90-76 43 35L266 16l94 100 62-57 66 80 58-37 94 88"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="m166 116 61-35 39-65 22 68 42 13m-103-16 28 24 33-21m72 32 21 24 41-81 20 71 46 9M50 166l40-52 13 43 30-8m355-10 22 29 36-66 26 59"
        stroke="currentColor"
        strokeWidth=".8"
      />
      <path
        d="m0 198 142-41 78 27 119-53 63 45 85-26 153 48"
        stroke="currentColor"
        strokeWidth=".7"
      />
    </svg>
  );
}
export function MountainMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="44"
      height="36"
      viewBox="0 0 44 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 29 15 12l5 7L30 4l12 25H2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m24 13 6 4 3-6M9 20l6 3 3-5M8 34h28"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
