type ProductGlyphProps = {
  name: string;
};

export function ProductGlyph({ name }: ProductGlyphProps) {
  const isFertilizer = name.toLowerCase().includes("fertilizer");
  const isOil = name.toLowerCase().includes("oil");
  const isWheat = name.toLowerCase().includes("wheat");

  return (
    <svg
      aria-hidden="true"
      className="h-10 w-10 text-forest-700"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="5" width="38" height="38" rx="8" fill="#EEF7F0" />
      {isFertilizer ? (
        <>
          <path d="M15 19h18l3 18H12l3-18Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M18 15h12l3 4H15l3-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M20 28h8M18 33h12" stroke="#B08A3C" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : isOil ? (
        <>
          <path d="M23 13c5 6 9 11 9 17a8 8 0 1 1-16 0c0-6 4-11 7-17Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M20 31c1 2 3 3 6 2" stroke="#B08A3C" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : isWheat ? (
        <>
          <path d="M24 13v24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 18c-5 0-8-3-8-7 5 0 8 3 8 7ZM24 24c-5 0-8-3-8-7 5 0 8 3 8 7ZM24 30c-5 0-8-3-8-7 5 0 8 3 8 7ZM24 18c5 0 8-3 8-7-5 0-8 3-8 7ZM24 24c5 0 8-3 8-7-5 0-8 3-8 7ZM24 30c5 0 8-3 8-7-5 0-8 3-8 7Z" stroke="#B08A3C" strokeWidth="2" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <path d="M16 16h16v20H16V16Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M19 20h10M19 25h10M19 30h7" stroke="#B08A3C" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
