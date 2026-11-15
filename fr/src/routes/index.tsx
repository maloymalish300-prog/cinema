import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FilmCard } from "@/components/film-card";
import { PosterMarquee } from "@/components/poster-marquee";
import { ScheduleTable } from "@/components/schedule-table";
import { films, formatRub, minPrice } from "@/data/cinema";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Венера — кинотеатр" }],
  }),
  component: Home,
});

function Home() {
  const lead = films[1];
  const [when, setWhen] = useState("Сегодня");

  useEffect(() => {
    const formatted = new Intl.DateTimeFormat("ru-RU", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(new Date());
    setWhen(formatted.charAt(0).toUpperCase() + formatted.slice(1));
  }, []);

  return (
    <main id="content">
      <section className="hero">
        <img
          className="hero-media"
          src="/posters/hero.jpg"
          alt="Пустой зал «Орбита»: чёрные кресла и экран с фиолетовым светом"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-wash" aria-hidden="true" />
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Кинотеатр · Москва</p>
            <h1 className="display-xl wordmark-gradient mt-4">Венера</h1>
            <p className="hero-lead mt-5">
              Чёрный зал, белый свет экрана и фиолетовый контур ночи. Выбираете ряд, сразу видите
              цену кресла и забираете код брони.
            </p>
            <div className="hero-actions">
              <Link to="/ticket" search={{ film: lead.id, session: "evening" }} className="btn btn-primary">
                Купить билет
              </Link>
              <Link to="/afisha" className="btn btn-ghost">
                Смотреть афишу
              </Link>
            </div>
            <ul className="hero-stats">
              <li>
                <strong>96</strong>
                <span>мест в зале</span>
              </li>
              <li>
                <strong>4K</strong>
                <span>лазерный экран</span>
              </li>
              <li>
                <strong>01:00</strong>
                <span>закрытие кассы</span>
              </li>
            </ul>
          </div>
          <aside className="hero-card">
            <img src={lead.poster} alt={`Кадр фильма «${lead.title}»`} />
            <div>
              <p className="eyebrow">Сегодня · 18:10</p>
              <h2 className="film-title mt-2">{lead.title}</h2>
              <p className="mt-2 text-sm text-muted">
                {lead.genre} · {lead.age} · {lead.duration}
              </p>
              <p className="price-from mt-3">от {formatRub(minPrice(lead))}</p>
              <Link
                to="/ticket"
                search={{ film: lead.id, session: "evening" }}
                className="btn btn-primary mt-4"
              >
                Взять место
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <PosterMarquee />

      <section className="section" id="repertoire">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Репертуар</p>
              <h2 className="display-md mt-2">Шесть картин этой недели</h2>
            </div>
            <Link to="/afisha" className="btn btn-ghost">
              Вся афиша
            </Link>
          </div>
          <div className="film-grid">
            {films.map((film, index) => (
              <FilmCard key={film.id} film={film} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="schedule">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">{when}</p>
              <h2 className="display-md mt-2">Сеансы и цена партера</h2>
            </div>
            <Link to="/hall" className="btn btn-ghost">
              Как считается цена
            </Link>
          </div>
          <ScheduleTable />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="hall-banner">
            <img src="/posters/hero.jpg" alt="" />
            <div className="hall-banner-shade" aria-hidden="true" />
            <div className="hall-banner-copy">
              <p className="eyebrow">Зал «Орбита»</p>
              <h2 className="display-md mt-2">Экран как прибор, не как комната</h2>
              <p className="mt-3 max-w-xl text-muted">
                Лазер 4K, пространственный звук и три категории рядов. Цена собирается на глазах:
                база фильма, время сеанса и выбранный ряд.
              </p>
              <div className="hero-actions">
                <Link to="/hall" className="btn btn-primary">
                  Смотреть зал
                </Link>
                <Link to="/ticket" className="btn btn-ghost">
                  Выбрать места
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
