import { useState } from "react";
import {
  HALL,
  formatRub,
  isSold,
  rowTier,
  seatPrice,
  type Film,
  type SeatPick,
  type Session,
} from "@/data/cinema";

type Props = {
  film: Film;
  session: Session;
  selected: readonly SeatPick[];
  takenExtra: ReadonlySet<string>;
  onToggle: (seat: SeatPick) => void;
};

function selectedHas(selected: readonly SeatPick[], row: number, seat: number) {
  return selected.some((item) => item.row === row && item.seat === seat);
}

export function SeatPicker({ film, session, selected, takenExtra, onToggle }: Props) {
  const [hint, setHint] = useState("Наведите на место — цена появится здесь");

  const sides = [
    [1, HALL.aisleAfter],
    [HALL.aisleAfter + 1, HALL.seatsPerRow],
  ] as const;

  return (
    <div className="seat-panel">
      <div className="seat-scroll">
        <div className="seat-grid">
          <div className="screen" aria-hidden="true">
            ЭКРАН
          </div>
          <p className="screen-note">Ряд 1 ближе к экрану · ряды 6–8 — VIP</p>
          {Array.from({ length: HALL.rows }, (_, index) => index + 1).map((row) => {
            const tier = rowTier(row);
            return (
              <div key={row} className={tier.id === "vip" ? "seat-row is-vip" : "seat-row"}>
                <span className="row-label">{row}</span>
                {sides.map(([from, to], side) => (
                  <div key={side} className="contents">
                    {side === 1 ? <span className="aisle" aria-hidden="true" /> : null}
                    <div className="seat-side">
                      {Array.from({ length: to - from + 1 }, (_, offset) => from + offset).map((seat) => {
                        const sold =
                          isSold(film.id, session.id, row, seat) || takenExtra.has(`${row}-${seat}`);
                        const active = selectedHas(selected, row, seat);
                        const price = seatPrice(film, session, row);
                        const label = `Ряд ${row}, место ${seat}, ${tier.name}, ${formatRub(price)}${sold ? ", занято" : ""}`;
                        return (
                          <span
                            key={seat}
                            onMouseEnter={() =>
                              setHint(sold ? `Ряд ${row}, место ${seat} занято` : label)
                            }
                            onFocus={() => setHint(sold ? `Ряд ${row}, место ${seat} занято` : label)}
                          >
                            <button
                              type="button"
                              className={[
                                "seat",
                                tier.id === "vip" ? "is-vip" : "",
                                active ? "is-selected" : "",
                                sold ? "is-taken" : "",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              disabled={sold}
                              aria-pressed={active}
                              aria-label={label}
                              onClick={() => onToggle({ row, seat })}
                            >
                              {seat}
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <span className="row-label">{row}</span>
              </div>
            );
          })}
        </div>
      </div>
      <p className="seat-hint mt-3">{hint}</p>
      <div className="legend">
        <span>
          <i className="swatch-free" /> Свободно
        </span>
        <span>
          <i className="swatch-pick" /> Ваш выбор
        </span>
        <span>
          <i className="swatch-busy" /> Занято
        </span>
        <span>
          <i className="swatch-vip" /> Ряд VIP
        </span>
      </div>
      <p className="mt-2 text-center text-sm text-muted lg:hidden">Листайте схему зала в сторону</p>
    </div>
  );
}
