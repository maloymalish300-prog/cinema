import { Link, createFileRoute } from "@tanstack/react-router";
import { HALL, SESSIONS, TIERS, formatDelta, formatRub } from "@/data/cinema";

export const Route = createFileRoute("/hall")({
  head: () => ({
    meta: [{ title: "Зал «Орбита» — Венера" }],
  }),
  component: HallPage,
});

const specs = [
  { title: "96 кресел", text: "8 рядов по 12 мест, проход по центру." },
  { title: "Лазер 4K", text: "Белый экран держит чёрный, без серой пелены." },
  { title: "Звук «Орбита»", text: "48 каналов вокруг зала, без чужого бренда на стене." },
  { title: "Шаг 1,15 м", text: "В VIP — реклайнер и больше воздуха для ног." },
];

function HallPage() {
  return (
    <main id="content" className="page">
      <div className="wrap">
        <p className="eyebrow">Зал</p>
        <h1 className="display-md mt-3">«Орбита» — один экран, три цены</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Стоимость билета = база фильма + надбавка сеанса + категория ряда. Ниже — из чего она
          складывается, до того как вы сядете в схему.
        </p>

        <div className="hall-banner mt-8">
          <img src="/posters/hero.jpg" alt="Зал «Орбита» до сеанса" />
          <div className="hall-banner-shade" aria-hidden="true" />
          <div className="hall-banner-copy">
            <p className="eyebrow">
              {HALL.total} мест · касса до 01:00
            </p>
            <h2 className="display-md mt-2">Свет ведёт к вашему ряду</h2>
          </div>
        </div>

        <div className="spec-grid mt-6">
          {specs.map((spec) => (
            <article key={spec.title} className="spec-card">
              <strong>{spec.title}</strong>
              <p className="text-sm text-muted">{spec.text}</p>
            </article>
          ))}
        </div>

        <h2 className="display-md mt-12">Ряды</h2>
        <div className="tier-grid mt-5">
          {TIERS.map((tier) => (
            <article key={tier.id} className="tier-card">
              <p className="eyebrow">Ряды {tier.rows}</p>
              <strong className="mt-2">{tier.name}</strong>
              <p className="text-muted">{tier.note}</p>
              <p className="price-from mt-3">
                {tier.delta === 0 ? "без надбавки" : `${formatDelta(tier.delta)} ₽ к билету`}
              </p>
            </article>
          ))}
        </div>

        <h2 className="display-md mt-12">Сеансы</h2>
        <div className="tier-grid mt-5">
          {SESSIONS.map((session) => (
            <article key={session.id} className="tier-card">
              <p className="eyebrow">{session.label}</p>
              <strong className="mt-2">{session.time}</strong>
              <p className="price-from mt-3">{formatDelta(session.delta)} ₽ к базе фильма</p>
            </article>
          ))}
        </div>

        <div className="panel mt-8">
          <p className="eyebrow">Пример</p>
          <p className="mt-3 text-muted">
            «Пурпурная орбита», база {formatRub(560)}. Вечер {formatDelta(80)} ₽. Ряд VIP{" "}
            {formatDelta(280)} ₽. Итог одного места — {formatRub(560 + 80 + 280)}.
          </p>
          <Link to="/ticket" search={{ film: "orbit", session: "evening" }} className="btn btn-primary mt-5">
            Собрать свой билет
          </Link>
        </div>
      </div>
    </main>
  );
}
