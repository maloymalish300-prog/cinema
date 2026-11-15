import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { formatRub } from "@/data/cinema";
import { loadBookings, saveBookings, type Booking } from "@/data/bookings";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [{ title: "Мои билеты — Венера" }],
  }),
  component: OrdersPage,
});

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function OrdersPage() {
  const [ready, setReady] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(loadBookings());
    setReady(true);
  }, []);

  function cancel(code: string) {
    const next = bookings.filter((booking) => booking.code !== code);
    setBookings(next);
    saveBookings(next);
  }

  return (
    <main id="content" className="page">
      <div className="wrap">
        <p className="eyebrow">Брони</p>
        <h1 className="display-md mt-3">Мои билеты</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Коды хранятся только на этом устройстве. Покажите их на входе — оплаты картой на сайте нет.
        </p>

        {!ready ? <p className="mt-8 text-muted">Открываем ваши билеты…</p> : null}

        {ready && bookings.length === 0 ? (
          <div className="empty-state mt-8">
            <h2 className="film-title">Пока пусто</h2>
            <p className="mt-2 text-muted">Выберите фильм, ряд и оформите бронь — билет появится здесь.</p>
            <Link to="/ticket" className="btn btn-primary mt-5">
              Купить билет
            </Link>
          </div>
        ) : null}

        {ready && bookings.length > 0 ? (
          <div className="order-list mt-8">
            {bookings.map((booking) => (
              <article key={booking.code} className="ticket">
                <div className="ticket-main">
                  <p className="eyebrow">{booking.code}</p>
                  <h2 className="film-title mt-2">{booking.filmTitle}</h2>
                  <p className="mt-2 text-muted">
                    {booking.sessionLabel} · {booking.time} · {booking.name}
                  </p>
                  <ul className="mt-3 text-sm">
                    {booking.seats.map((seat) => (
                      <li key={`${seat.row}-${seat.seat}`}>
                        Ряд {seat.row}, место {seat.seat} · {seat.tier} · {formatRub(seat.price)}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-muted">{formatWhen(booking.createdAt)}</p>
                </div>
                <div className="ticket-side">
                  <p className="code">{formatRub(booking.total)}</p>
                  <button type="button" className="btn btn-ghost" onClick={() => cancel(booking.code)}>
                    Отменить
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
