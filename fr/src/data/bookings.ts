export type StoredSeat = {
  row: number;
  seat: number;
  tier: string;
  price: number;
};

export type Booking = {
  code: string;
  filmId: string;
  filmTitle: string;
  sessionId: string;
  time: string;
  sessionLabel: string;
  seats: StoredSeat[];
  total: number;
  name: string;
  createdAt: string;
};

const STORAGE_KEY = "venera-bookings";

function isBooking(value: unknown): value is Booking {
  if (!value || typeof value !== "object") return false;
  const booking = value as Booking;
  return typeof booking.code === "string" && Array.isArray(booking.seats);
}

export function loadBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isBooking);
  } catch {
    return [];
  }
}

export function saveBookings(bookings: readonly Booking[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function takenKeys(bookings: readonly Booking[], filmId: string, sessionId: string): Set<string> {
  const keys = new Set<string>();
  for (const booking of bookings) {
    if (booking.filmId !== filmId || booking.sessionId !== sessionId) continue;
    for (const seat of booking.seats) keys.add(`${seat.row}-${seat.seat}`);
  }
  return keys;
}
