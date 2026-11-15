import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FilmCard } from "@/components/film-card";
import { ScheduleTable } from "@/components/schedule-table";
import { films } from "@/data/cinema";

export const Route = createFileRoute("/afisha")({
  head: () => ({
    meta: [{ title: "Афиша — Венера" }],
  }),
  component: AfishaPage,
});

function AfishaPage() {
  const genres = ["Все", ...new Set(films.map((film) => film.genre))];
  const [genre, setGenre] = useState("Все");
  const shown = genre === "Все" ? films : films.filter((film) => film.genre === genre);

  return (
    <main id="content" className="page">
      <div className="wrap">
        <p className="eyebrow">Афиша</p>
        <h1 className="display-md mt-3">Что смотреть на этой неделе</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Шесть авторских картин. Откройте фильм — сеанс, ряд и сумма билета считаются сразу.
        </p>
        <div className="filters mt-6" role="tablist" aria-label="Жанры">
          {genres.map((item) => (
            <button
              key={item}
              type="button"
              className={item === genre ? "chip is-on" : "chip"}
              aria-pressed={item === genre}
              onClick={() => setGenre(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="film-grid mt-6">
          {shown.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
        <section className="section" id="schedule">
          <div className="section-head">
            <div>
              <p className="eyebrow">Расписание</p>
              <h2 className="display-md mt-2">Четыре сеанса каждый день</h2>
            </div>
          </div>
          <ScheduleTable />
        </section>
      </div>
    </main>
  );
}
