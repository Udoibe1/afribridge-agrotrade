import { createHash } from "crypto";

type RateLimitBucket = {
  timestamps: number[];
};

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

const buckets = new Map<string, RateLimitBucket>();

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  const allowedOrigins = new Set(
    (process.env.AFRIBRIDGE_ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
  );

  if (allowedOrigins.has(origin)) {
    return true;
  }

  try {
    const originUrl = new URL(origin);
    const requestHost =
      request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    return Boolean(requestHost && originUrl.host === requestHost);
  } catch {
    return false;
  }
}

export function clientIpHash(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const rawIp =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown";
  const salt = process.env.AFRIBRIDGE_RATE_LIMIT_SALT ?? "afribridge-agrotrade";

  return createHash("sha256").update(`${salt}:${rawIp}`).digest("hex").slice(0, 32);
}

export function rateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const windowMs = parsePositiveInt(
    process.env.AFRIBRIDGE_RATE_LIMIT_WINDOW_MS,
    10 * 60 * 1000
  );
  const maxAttempts = parsePositiveInt(process.env.AFRIBRIDGE_RATE_LIMIT_MAX, 5);
  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((timestamp) => now - timestamp < windowMs);

  if (bucket.timestamps.length >= maxAttempts) {
    buckets.set(key, bucket);
    const oldestTimestamp = bucket.timestamps[0] ?? now;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((windowMs - (now - oldestTimestamp)) / 1000)
    );

    return {
      allowed: false,
      retryAfterSeconds
    };
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);

  if (buckets.size > 1000) {
    pruneBuckets(now, windowMs);
  }

  return {
    allowed: true,
    retryAfterSeconds: 0
  };
}

export function hasValidSubmissionTiming(startedAt: unknown): boolean {
  const startedTimestamp =
    typeof startedAt === "number"
      ? startedAt
      : typeof startedAt === "string"
        ? Number(startedAt)
        : NaN;

  if (!Number.isFinite(startedTimestamp)) {
    return false;
  }

  const elapsedMs = Date.now() - startedTimestamp;
  return elapsedMs >= 1500 && elapsedMs <= 2 * 60 * 60 * 1000;
}

export function looksSpammy(values: Record<string, string | boolean>): boolean {
  const text = Object.values(values)
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLowerCase();

  const urlMatches = text.match(/https?:\/\//g) ?? [];
  const repeatedCharacters = /(.)\1{24,}/.test(text);
  const obviousSpamTerms = [
    "crypto recovery",
    "casino bonus",
    "loan offer",
    "seo backlink"
  ];

  return (
    urlMatches.length > 3 ||
    repeatedCharacters ||
    obviousSpamTerms.some((term) => text.includes(term))
  );
}

function pruneBuckets(now: number, windowMs: number) {
  for (const [key, bucket] of buckets.entries()) {
    bucket.timestamps = bucket.timestamps.filter((timestamp) => now - timestamp < windowMs);
    if (bucket.timestamps.length === 0) {
      buckets.delete(key);
    }
  }
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}
