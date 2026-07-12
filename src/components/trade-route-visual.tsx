export function TradeRouteVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute right-[-24rem] top-[-5rem] h-[42rem] w-[54rem] max-w-none opacity-45 sm:right-[-18rem] sm:opacity-70 md:right-[-8rem] lg:right-[-1rem] lg:top-[-3rem] lg:h-[45rem] lg:w-[58rem] lg:opacity-95"
        viewBox="0 0 920 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="routeGradient" x1="240" x2="720" y1="190" y2="560">
            <stop stopColor="#D6BD74" />
            <stop offset="1" stopColor="#2E6F46" />
          </linearGradient>
          <radialGradient id="mapGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(520 345) rotate(90) scale(280 390)">
            <stop stopColor="#D6BD74" stopOpacity="0.24" />
            <stop offset="1" stopColor="#0A1322" stopOpacity="0" />
          </radialGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" stroke="#D6BD74" strokeOpacity="0.18" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="920" height="720" fill="url(#mapGlow)" />
        <rect x="168" y="86" width="672" height="542" rx="28" fill="#0A1322" fillOpacity="0.72" />
        <rect x="168" y="86" width="672" height="542" rx="28" fill="url(#grid)" />

        <path
          d="M445 112C487 106 529 131 558 164C584 195 631 207 676 204C711 202 757 216 773 252C789 289 760 326 730 345C695 367 667 382 662 424C657 467 617 485 575 489C526 494 507 549 458 562C411 574 365 551 329 522C291 491 244 481 217 439C193 402 205 356 224 319C246 277 241 230 271 195C311 148 382 121 445 112Z"
          fill="#F4EEE2"
          fillOpacity="0.08"
          stroke="#F2E8CC"
          strokeOpacity="0.16"
        />
        <path
          d="M611 260C638 257 671 273 684 297C697 323 679 349 661 365C638 386 631 418 602 429C574 440 540 428 522 406C502 382 509 345 526 321C546 292 575 264 611 260Z"
          fill="#F4EEE2"
          fillOpacity="0.09"
          stroke="#F2E8CC"
          strokeOpacity="0.17"
        />
        <path
          d="M392 391C426 384 461 402 475 431C489 462 466 494 441 510C412 529 373 526 348 503C322 480 316 440 335 414C348 397 370 396 392 391Z"
          fill="#F4EEE2"
          fillOpacity="0.1"
          stroke="#F2E8CC"
          strokeOpacity="0.17"
        />

        <path
          d="M646 224C563 251 493 303 437 381C407 423 381 468 355 519"
          stroke="url(#routeGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M646 224C571 277 526 359 493 462C484 491 474 520 460 548"
          stroke="#D6BD74"
          strokeOpacity="0.55"
          strokeWidth="2"
          strokeDasharray="9 12"
          strokeLinecap="round"
        />
        <path
          d="M646 224C594 301 564 377 530 459C515 494 495 531 468 560"
          stroke="#F2E8CC"
          strokeOpacity="0.28"
          strokeWidth="2"
          strokeDasharray="4 10"
          strokeLinecap="round"
        />

        <g>
          <circle cx="646" cy="224" r="14" fill="#D6BD74" />
          <circle cx="646" cy="224" r="28" stroke="#D6BD74" strokeOpacity="0.35" />
          <text className="hidden sm:block" x="680" y="217" fill="#FBF8F1" fontSize="18" fontWeight="700">Russia</text>
          <text className="hidden sm:block" x="680" y="241" fill="#F2E8CC" fontSize="13">Supplier engagement</text>
        </g>

        <g>
          <circle cx="355" cy="519" r="12" fill="#2E6F46" />
          <circle cx="355" cy="519" r="25" stroke="#2E6F46" strokeOpacity="0.45" />
          <text className="hidden sm:block" x="244" y="554" fill="#FBF8F1" fontSize="17" fontWeight="700">Ghana</text>
          <text className="hidden sm:block" x="244" y="577" fill="#F2E8CC" fontSize="13">Qualified buyers</text>
        </g>

        <g>
          <circle cx="460" cy="548" r="12" fill="#2E6F46" />
          <circle cx="460" cy="548" r="25" stroke="#2E6F46" strokeOpacity="0.45" />
          <text className="hidden sm:block" x="489" y="552" fill="#FBF8F1" fontSize="17" fontWeight="700">Nigeria</text>
          <text className="hidden sm:block" x="489" y="575" fill="#F2E8CC" fontSize="13">Trade demand</text>
        </g>

        <g className="hidden sm:block" opacity="0.94">
          <rect x="214" y="129" width="216" height="74" rx="8" fill="#FBF8F1" fillOpacity="0.1" stroke="#F2E8CC" strokeOpacity="0.18" />
          <text x="236" y="161" fill="#FBF8F1" fontSize="15" fontWeight="700">Verification first</text>
          <text x="236" y="184" fill="#F2E8CC" fontSize="12">Transparent documentation flow</text>
        </g>
      </svg>
    </div>
  );
}
