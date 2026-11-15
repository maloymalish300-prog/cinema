import { Link } from "@tanstack/react-router";
import { formatRub, minPrice, type Film } from "@/data/cinema";

export function FilmCard({ film, featured = false }: { film: Film; featured?: boolean }) {
  return (
    <Link
      to="/ticket"
      search={{ film: film.id }}
      className={featured ? "film-card film-card-featured" : "film-card"}
    >
      <div className="poster-frame">
        <img src={film.poster} alt={`Кадр фильма «${film.title}»`} />
        <span className="age-badge">{film.age}</span>
      </div>
      <div className="film-body">
        <p className="film-meta">
          {film.genre} · {film.duration}
        </p>
        <h3 className="film-title">{film.title}</h3>
        <p className="text-sm text-muted">{film.synopsis}</p>
        <p className="price-from">от {formatRub(minPrice(film))}</p>
      </div>
    </Link>
  );
}
