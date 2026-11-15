import { Link } from "@tanstack/react-router";
import { SESSIONS, films, formatDelta, formatRub } from "@/data/cinema";

export function ScheduleTable() {
  return (
    <div>
      <div className="schedule-wrap">
        <table className="schedule">
          <thead>
            <tr>
              <th scope="col">Фильм</th>
              {SESSIONS.map((session) => (
                <th key={session.id} scope="col">
                  <time dateTime={session.time}>{session.time}</time>
                  {session.label} {formatDelta(session.delta)} ₽
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {films.map((film) => (
              <tr key={film.id}>
                <th scope="row">{film.title}</th>
                {SESSIONS.map((session) => (
                  <td key={session.id}>
                    <Link
                      to="/ticket"
                      search={{ film: film.id, session: session.id }}
                      className="price-chip"
                      title={`Партер · ${session.label}`}
                    >
                      {formatRub(film.basePrice + session.delta)}
                    </Link>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-muted">
        В таблице цена партера, ряды 1–2. Центр +120 ₽, VIP +280 ₽. Нажмите цену, чтобы выбрать места.
      </p>
    </div>
  );
}
