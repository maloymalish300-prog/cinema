import { Link } from "@tanstack/react-router";
import { films, formatRub, minPrice } from "@/data/cinema";

export function PosterMarquee() {
  const half = [...films, ...films, ...films];
  const track = [...half, ...half];

  return (
    <section className="billboard" aria-label="Сейчас в прокате">
      <div className="billboard-label">
        <p className="eyebrow">Бегущая афиша</p>
        <strong>В прокате</strong>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {track.map((film, index) => {
            const hidden = index >= half.length;
            return (
              <Link
                key={`${film.id}-${index}`}
                to="/ticket"
                search={{ film: film.id }}
                className="marquee-card"
                tabIndex={hidden ? -1 : undefined}
                aria-hidden={hidden ? true : undefined}
              >
                <img src={film.poster} alt={hidden ? "" : `Кадр фильма «${film.title}»`} />
                <span className="marquee-caption">
                  <b>{film.title}</b>
                  <span>от {formatRub(minPrice(film))}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
