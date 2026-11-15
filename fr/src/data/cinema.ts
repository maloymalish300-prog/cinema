export type Film = {
  id: string;
  title: string;
  genre: string;
  age: string;
  duration: string;
  director: string;
  synopsis: string;
  basePrice: number;
  poster: string;
};

export type Session = {
  id: string;
  time: string;
  label: string;
  delta: number;
};

export type TierId = "parter" | "center" | "vip";

export type Tier = {
  id: TierId;
  name: string;
  rows: string;
  delta: number;
  note: string;
};

export type SeatPick = {
  row: number;
  seat: number;
};

export type PricedSeat = SeatPick & {
  tier: string;
  tierId: TierId;
  price: number;
};

export const HALL = {
  name: "Орбита",
  rows: 8,
  seatsPerRow: 12,
  aisleAfter: 6,
  total: 96,
};

export const TIERS: readonly Tier[] = [
  { id: "parter", name: "Партер", rows: "1–2", delta: 0, note: "Ближе к экрану" },
  { id: "center", name: "Центр", rows: "3–5", delta: 120, note: "Ровный обзор зала" },
  { id: "vip", name: "VIP", rows: "6–8", delta: 280, note: "Реклайнер и больше места" },
];

export const SESSIONS: readonly Session[] = [
  { id: "morning", time: "11:20", label: "Утро", delta: -40 },
  { id: "day", time: "14:40", label: "День", delta: 0 },
  { id: "evening", time: "18:10", label: "Вечер", delta: 80 },
  { id: "night", time: "21:30", label: "Ночь", delta: 40 },
];

export const films: readonly Film[] = [
  {
    id: "tide",
    title: "Ночной прилив",
    genre: "Неонуар",
    age: "16+",
    duration: "2 ч 08 мин",
    director: "Кира Левина",
    synopsis:
      "Город на краю чёрной воды теряет ночь за ночью. Следовательница ищет человека, который оставляет фиолетовый след на мокром асфальте.",
    basePrice: 490,
    poster: "/posters/tide.jpg",
  },
  {
    id: "orbit",
    title: "Пурпурная орбита",
    genre: "Фантастика",
    age: "12+",
    duration: "2 ч 14 мин",
    director: "Марк Остров",
    synopsis:
      "Экспедиция к газовому гиганту принимает сигнал, которого не должно быть. Корабль молчит. Планета — нет.",
    basePrice: 560,
    poster: "/posters/orbit.jpg",
  },
  {
    id: "glass",
    title: "Стеклянный город",
    genre: "Фантастика",
    age: "16+",
    duration: "1 ч 59 мин",
    director: "Ева Солнцева",
    synopsis:
      "В мегаполисе из стекла пропали все отражения. Архитектор узнаёт, что город продолжает строить сам себя.",
    basePrice: 520,
    poster: "/posters/glass.jpg",
  },
  {
    id: "echo",
    title: "Эхо Венеры",
    genre: "Драма",
    age: "12+",
    duration: "1 ч 46 мин",
    director: "Артём Виль",
    synopsis:
      "Двое астрономов дежурят у телескопа и слышат в шуме планеты собственный разговор — из завтрашнего дня.",
    basePrice: 470,
    poster: "/posters/echo.jpg",
  },
  {
    id: "azimuth",
    title: "Чёрный азимут",
    genre: "Боевик",
    age: "16+",
    duration: "2 ч 21 мин",
    director: "Нора Кац",
    synopsis:
      "Гонщик везёт через ночную пустыню груз, который нельзя открывать до рассвета. Горизонт уже не там, где был утром.",
    basePrice: 590,
    poster: "/posters/azimuth.jpg",
  },
  {
    id: "room",
    title: "Белая комната",
    genre: "Драма",
    age: "18+",
    duration: "1 ч 37 мин",
    director: "Илья Берег",
    synopsis:
      "Человек просыпается в комнате без дверей. Единственный предмет — кресло, которое помнит чужие имена.",
    basePrice: 440,
    poster: "/posters/room.jpg",
  },
];

export function rowTier(row: number): Tier {
  if (row <= 2) return TIERS[0];
  if (row <= 5) return TIERS[1];
  return TIERS[2];
}

export function sessionById(id: string | undefined): Session {
  return SESSIONS.find((session) => session.id === id) ?? SESSIONS[2];
}

export function filmById(id: string | undefined): Film {
  return films.find((film) => film.id === id) ?? films[0];
}

export function seatKey(seat: SeatPick): string {
  return `${seat.row}-${seat.seat}`;
}

export function hashString(input: string): number {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function isSold(filmId: string, sessionId: string, row: number, seat: number): boolean {
  const hash = hashString(`${filmId}:${sessionId}:${row}:${seat}`);
  const threshold = row >= 6 ? 180 : row <= 2 ? 340 : 260;
  return hash % 1000 < threshold;
}

export function seatPrice(film: Film, session: Session, row: number): number {
  return film.basePrice + session.delta + rowTier(row).delta;
}

export function minPrice(film: Film): number {
  return film.basePrice + SESSIONS[0].delta;
}

export function quote(film: Film, session: Session, seats: readonly SeatPick[]): {
  lines: PricedSeat[];
  total: number;
} {
  const lines = seats
    .map((seat) => {
      const tier = rowTier(seat.row);
      return {
        ...seat,
        tier: tier.name,
        tierId: tier.id,
        price: film.basePrice + session.delta + tier.delta,
      };
    })
    .sort((a, b) => a.row - b.row || a.seat - b.seat);
  const total = lines.reduce((sum, line) => sum + line.price, 0);
  return { lines, total };
}

export function formatRub(value: number): string {
  const sign = value < 0 ? "−" : "";
  const body = Math.abs(Math.round(value))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${sign}${body} ₽`;
}

export function formatDelta(value: number): string {
  if (value === 0) return "0";
  const sign = value > 0 ? "+" : "−";
  return `${sign}${Math.abs(value)}`;
}

export function freeSeatCount(
  filmId: string,
  sessionId: string,
  extraTaken: ReadonlySet<string>,
): number {
  let free = 0;
  for (let row = 1; row <= HALL.rows; row += 1) {
    for (let seat = 1; seat <= HALL.seatsPerRow; seat += 1) {
      const key = `${row}-${seat}`;
      if (!isSold(filmId, sessionId, row, seat) && !extraTaken.has(key)) free += 1;
    }
  }
  return free;
}
