import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SeatPicker } from "@/components/seat-picker";
import {
  HALL,
  SESSIONS,
  filmById,
  films,
  formatDelta,
  formatRub,
  freeSeatCount,
  hashString,
  quote,
  seatKey,
  sessionById,
  type SeatPick,
} from "@/data/cinema";
import { loadBookings, saveBookings, takenKeys, type Booking } from "@/data/bookings";

type TicketSearch = {
  film?: string;
  session?: string;
};

export const Route = createFileRoute("/ticket")({
  validateSearch: (search: Record<string, unknown>): TicketSearch => ({
    film: typeof search.film === "string" ? search.film : undefined,
    session: typeof search.session === "string" ? search.session : undefined,
  }),
  head: () => ({
    meta: [{ title: "Купить билет — Венера" }],
  }),
  component: TicketPage,
});

function ticketCode(seed: string) {
  const body = hashString(seed).toString(36).toUpperCase().padStart(6, "0").slice(-6);
  return `VNR-${body}`;
}

function Barcode({ code }: { code: string }) {
  const bars = Array.from(code.replace("-", ""));
  return (
    <svg className="barcode" viewBox="0 0 64 40" aria-hidden="true">
      {bars.map((char, index) => {
        const height = 16 + (char.charCodeAt(0) % 22);
        const width = index % 3 === 0 ? 2.2 : 1.2;
        return (
          <rect
            key={`${char}-${index}`}
            x={index * 6.2}
            y={40 - height}
            width={width}
            height={height}
            fill="currentColor"
          />
        );
      })}
    </svg>
  );
}

function TicketPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const film = filmById(search.film);
  const session = sessionById(search.session);
  const key = `${film.id}:${session.id}`;
  const [prevKey, setPrevKey] = useState(key);
  const [selected, setSelected] = useState<SeatPick[]>([]);
  const [stage, setStage] = useState<"pick" | "pay" | "done">("pick");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [name, setName] = useState("");
  const [done, setDone] = useState<Booking | null>(null);
  const [note, setNote] = useState("");
  const summaryRef = useRef<HTMLElement>(null);

  if (prevKey !== key) {
    setPrevKey(key);
    setSelected([]);
    setStage("pick");
    setDone(null);
  }

  useEffect(() => {
    setBookings(loadBookings());
  }, []);

  useEffect(() => {
    const filmOk = films.some((item) => item.id === search.film);
    const sessionOk = SESSIONS.some((item) => item.id === search.session);
    if (filmOk && sessionOk) return;
    void navigate({
      to: "/ticket",
      search: {
        film: filmOk ? search.film : films[0].id,
        session: sessionOk ? search.session : "evening",
      },
      replace: true,
    });
  }, [navigate, search.film, search.session]);

  useEffect(() => {
    if (!note) return;
    const timer = window.setTimeout(() => setNote(""), 2400);
    return () => window.clearTimeout(timer);
  }, [note]);

  const takenExtra = takenKeys(bookings, film.id, session.id);
  const priced = quote(film, session, selected);
  const free = freeSeatCount(film.id, session.id, takenExtra);

  function toggle(seat: SeatPick) {
    const id = seatKey(seat);
    setSelected((current) => {
      if (current.some((item) => seatKey(item) === id)) {
        return current.filter((item) => seatKey(item) !== id);
      }
      if (current.length >= 8) {
        setNote("Можно выбрать не больше 8 мест");
        return current;
      }
      return [...current, seat];
    });
    setStage("pick");
  }

  function goPay() {
    if (!selected.length) {
      setNote("Сначала выберите места в зале");
      return;
    }
    setStage("pay");
    window.requestAnimationFrame(() => {
      summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function confirm() {
    if (!priced.lines.length) return;
    const booking: Booking = {
      code: ticketCode(`${film.id}:${session.id}:${Date.now()}:${priced.total}`),
      filmId: film.id,
      filmTitle: film.title,
      sessionId: session.id,
      time: session.time,
      sessionLabel: session.label,
      seats: priced.lines.map((line) => ({
        row: line.row,
        seat: line.seat,
        tier: line.tier,
        price: line.price,
      })),
      total: priced.total,
      name: name.trim() || "Гость",
      createdAt: new Date().toISOString(),
    };
    const next = [booking, ...bookings];
    setBookings(next);
    saveBookings(next);
    setDone(booking);
    setSelected([]);
    setStage("done");
  }

  return (
    <main id="content" className="page ticket-page">
      <div className="wrap">
        <p className="eyebrow">Касса</p>
        <h1 className="display-md mt-3">Выбор ряда и стоимость</h1>
        <p className="mt-3 max-w-2xl text-muted">
          {film.title}: база {formatRub(film.basePrice)}, сеанс «{session.label}» {formatDelta(session.delta)} ₽.
          Свободно {free} из {HALL.total}.
        </p>

        {done && stage === "done" ? (
          <div className="mt-8">
            <article className="ticket">
              <div className="ticket-main">
                <p className="eyebrow">Бронь оформлена</p>
                <h2 className="film-title mt-2">{done.filmTitle}</h2>
                <p className="mt-2 text-muted">
                  {done.sessionLabel} · {done.time} · зал «{HALL.name}» · {done.name}
                </p>
                <ul className="summary-lines">
                  {done.seats.map((seat) => (
                    <li key={`${seat.row}-${seat.seat}`} className="summary-line">
                      <span>
                        Ряд {seat.row}, место {seat.seat} · {seat.tier}
                      </span>
                      <span>{formatRub(seat.price)}</span>
                    </li>
                  ))}
                </ul>
                <p className="summary-total">
                  <span>Итого</span>
                  <span>{formatRub(done.total)}</span>
                </p>
                <p className="note mt-3">Покажите код на входе. Это бронь, не списание с карты.</p>
              </div>
              <div className="ticket-side">
                <Barcode code={done.code} />
                <p className="code">{done.code}</p>
              </div>
            </article>
            <div className="hero-actions">
              <button type="button" className="btn btn-primary" onClick={() => setStage("pick")}>
                Ещё билет
              </button>
              <Link to="/orders" className="btn btn-ghost">
                Мои билеты
              </Link>
            </div>
          </div>
        ) : (
          <div className="ticket-layout mt-8">
            <div>
              <div className="film-switch" aria-label="Фильм">
                {films.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={item.id === film.id ? "mini-film is-on" : "mini-film"}
                    aria-pressed={item.id === film.id}
                    onClick={() => {
                      void navigate({
                        to: "/ticket",
                        search: { film: item.id, session: session.id },
                        replace: true,
                      });
                    }}
                  >
                    <img src={item.poster} alt="" />
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>

              <p className="mt-5 text-sm text-muted">
                {film.director} · {film.genre} · {film.age} · {film.duration}
              </p>
              <p className="mt-2 max-w-2xl">{film.synopsis}</p>

              <h2 className="film-title mt-6">Сеанс</h2>
              <div className="session-grid mt-3" role="radiogroup" aria-label="Время сеанса">
                {SESSIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={item.id === session.id}
                    className={item.id === session.id ? "session-btn is-on" : "session-btn"}
                    onClick={() => {
                      void navigate({
                        to: "/ticket",
                        search: { film: film.id, session: item.id },
                        replace: true,
                      });
                    }}
                  >
                    <b>{item.time}</b>
                    <span>
                      {item.label} · {formatDelta(item.delta)} ₽
                    </span>
                  </button>
                ))}
              </div>

              <h2 className="film-title mt-6">Схема зала</h2>
              <div className="mt-3">
                <SeatPicker
                  film={film}
                  session={session}
                  selected={selected}
                  takenExtra={takenExtra}
                  onToggle={toggle}
                />
              </div>
              {note ? <p className="note mt-3">{note}</p> : null}
            </div>

            <aside className="summary summary-sticky" ref={summaryRef}>
              <p className="eyebrow">Ваш билет</p>
              <h2 className="film-title mt-2">{film.title}</h2>
              <p className="mt-2 text-sm text-muted">
                {session.time} · {session.label} · база {formatRub(film.basePrice)}{" "}
                {formatDelta(session.delta)} ₽
              </p>
              {priced.lines.length === 0 ? (
                <p className="mt-4 text-sm text-muted">
                  Выберите места. Цена пересчитается по каждому ряду.
                </p>
              ) : (
                <ul className="summary-lines">
                  {priced.lines.map((line) => (
                    <li key={seatKey(line)} className="summary-line text-sm">
                      <span>
                        Ряд {line.row}, место {line.seat}
                        <br />
                        <span className="text-muted">{line.tier}</span>
                      </span>
                      <span>{formatRub(line.price)}</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="summary-total">
                <span>Итого</span>
                <span>{formatRub(priced.total)}</span>
              </p>

              {stage === "pay" ? (
                <form
                  className="mt-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    confirm();
                  }}
                >
                  <label className="text-sm text-muted" htmlFor="guest-name">
                    Имя на билете
                  </label>
                  <input
                    id="guest-name"
                    className="field mt-2"
                    maxLength={40}
                    placeholder="Гость"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <p className="note mt-3">Оплаты картой нет — оформим бронь и код для входа.</p>
                  <button type="submit" className="btn btn-primary mt-4 w-full">
                    Подтвердить бронь
                  </button>
                  <button type="button" className="btn btn-ghost mt-2 w-full" onClick={() => setStage("pick")}>
                    Изменить места
                  </button>
                </form>
              ) : (
                <button type="button" className="btn btn-primary mt-4 w-full" onClick={goPay}>
                  Оформить {selected.length > 0 ? formatRub(priced.total) : ""}
                </button>
              )}
            </aside>
          </div>
        )}
      </div>

      {stage !== "done" ? (
        <div className="paybar">
          <div>
            <p className="text-sm text-muted">
              {selected.length > 0 ? `${selected.length} мест` : "Места не выбраны"}
            </p>
            <strong>{formatRub(priced.total)}</strong>
          </div>
          <button type="button" className="btn btn-primary" onClick={stage === "pay" ? confirm : goPay}>
            {stage === "pay" ? "Подтвердить" : "Оформить"}
          </button>
        </div>
      ) : null}
    </main>
  );
}
