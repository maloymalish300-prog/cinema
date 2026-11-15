import { i as __toESM } from "../_runtime.mjs";
import { a as films, c as freeSeatCount, f as quote, g as sessionById, h as seatPrice, i as filmById, l as hashString, m as seatKey, n as SESSIONS, o as formatDelta, p as rowTier, s as formatRub, t as HALL, u as isSold } from "./cinema-BwtH7t-S.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as saveBookings, r as takenKeys, t as loadBookings } from "./bookings-DQ6d3GD3.mjs";
import { n as Route } from "./router-BlGmSfDZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ticket-D1N92pAY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function selectedHas(selected, row, seat) {
	return selected.some((item) => item.row === row && item.seat === seat);
}
function SeatPicker({ film, session, selected, takenExtra, onToggle }) {
	const [hint, setHint] = (0, import_react.useState)("Наведите на место — цена появится здесь");
	const sides = [[1, HALL.aisleAfter], [HALL.aisleAfter + 1, HALL.seatsPerRow]];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "seat-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "seat-scroll",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "seat-grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "screen",
							"aria-hidden": "true",
							children: "ЭКРАН"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "screen-note",
							children: "Ряд 1 ближе к экрану · ряды 6–8 — VIP"
						}),
						Array.from({ length: HALL.rows }, (_, index) => index + 1).map((row) => {
							const tier = rowTier(row);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: tier.id === "vip" ? "seat-row is-vip" : "seat-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "row-label",
										children: row
									}),
									sides.map(([from, to], side) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "contents",
										children: [side === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "aisle",
											"aria-hidden": "true"
										}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "seat-side",
											children: Array.from({ length: to - from + 1 }, (_, offset) => from + offset).map((seat) => {
												const sold = isSold(film.id, session.id, row, seat) || takenExtra.has(`${row}-${seat}`);
												const active = selectedHas(selected, row, seat);
												const price = seatPrice(film, session, row);
												const label = `Ряд ${row}, место ${seat}, ${tier.name}, ${formatRub(price)}${sold ? ", занято" : ""}`;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													onMouseEnter: () => setHint(sold ? `Ряд ${row}, место ${seat} занято` : label),
													onFocus: () => setHint(sold ? `Ряд ${row}, место ${seat} занято` : label),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														className: [
															"seat",
															tier.id === "vip" ? "is-vip" : "",
															active ? "is-selected" : "",
															sold ? "is-taken" : ""
														].filter(Boolean).join(" "),
														disabled: sold,
														"aria-pressed": active,
														"aria-label": label,
														onClick: () => onToggle({
															row,
															seat
														}),
														children: seat
													})
												}, seat);
											})
										})]
									}, side)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "row-label",
										children: row
									})
								]
							}, row);
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "seat-hint mt-3",
				children: hint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "legend",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "swatch-free" }), " Свободно"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "swatch-pick" }), " Ваш выбор"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "swatch-busy" }), " Занято"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "swatch-vip" }), " Ряд VIP"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-sm text-muted lg:hidden",
				children: "Листайте схему зала в сторону"
			})
		]
	});
}
function ticketCode(seed) {
	return `VNR-${hashString(seed).toString(36).toUpperCase().padStart(6, "0").slice(-6)}`;
}
function Barcode({ code }) {
	const bars = Array.from(code.replace("-", ""));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: "barcode",
		viewBox: "0 0 64 40",
		"aria-hidden": "true",
		children: bars.map((char, index) => {
			const height = 16 + char.charCodeAt(0) % 22;
			const width = index % 3 === 0 ? 2.2 : 1.2;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: index * 6.2,
				y: 40 - height,
				width,
				height,
				fill: "currentColor"
			}, `${char}-${index}`);
		})
	});
}
function TicketPage() {
	const search = Route.useSearch();
	const navigate = useNavigate();
	const film = filmById(search.film);
	const session = sessionById(search.session);
	const key = `${film.id}:${session.id}`;
	const [prevKey, setPrevKey] = (0, import_react.useState)(key);
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [stage, setStage] = (0, import_react.useState)("pick");
	const [bookings, setBookings] = (0, import_react.useState)([]);
	const [name, setName] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(null);
	const [note, setNote] = (0, import_react.useState)("");
	const summaryRef = (0, import_react.useRef)(null);
	if (prevKey !== key) {
		setPrevKey(key);
		setSelected([]);
		setStage("pick");
		setDone(null);
	}
	(0, import_react.useEffect)(() => {
		setBookings(loadBookings());
	}, []);
	(0, import_react.useEffect)(() => {
		const filmOk = films.some((item) => item.id === search.film);
		const sessionOk = SESSIONS.some((item) => item.id === search.session);
		if (filmOk && sessionOk) return;
		navigate({
			to: "/ticket",
			search: {
				film: filmOk ? search.film : films[0].id,
				session: sessionOk ? search.session : "evening"
			},
			replace: true
		});
	}, [
		navigate,
		search.film,
		search.session
	]);
	(0, import_react.useEffect)(() => {
		if (!note) return;
		const timer = window.setTimeout(() => setNote(""), 2400);
		return () => window.clearTimeout(timer);
	}, [note]);
	const takenExtra = takenKeys(bookings, film.id, session.id);
	const priced = quote(film, session, selected);
	const free = freeSeatCount(film.id, session.id, takenExtra);
	function toggle(seat) {
		const id = seatKey(seat);
		setSelected((current) => {
			if (current.some((item) => seatKey(item) === id)) return current.filter((item) => seatKey(item) !== id);
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
			summaryRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		});
	}
	function confirm() {
		if (!priced.lines.length) return;
		const booking = {
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
				price: line.price
			})),
			total: priced.total,
			name: name.trim() || "Гость",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		const next = [booking, ...bookings];
		setBookings(next);
		saveBookings(next);
		setDone(booking);
		setSelected([]);
		setStage("done");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "content",
		className: "page ticket-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "wrap",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Касса"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display-md mt-3",
					children: "Выбор ряда и стоимость"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 max-w-2xl text-muted",
					children: [
						film.title,
						": база ",
						formatRub(film.basePrice),
						", сеанс «",
						session.label,
						"» ",
						formatDelta(session.delta),
						" ₽. Свободно ",
						free,
						" из ",
						HALL.total,
						"."
					]
				}),
				done && stage === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "ticket",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ticket-main",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Бронь оформлена"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "film-title mt-2",
									children: done.filmTitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-muted",
									children: [
										done.sessionLabel,
										" · ",
										done.time,
										" · зал «",
										HALL.name,
										"» · ",
										done.name
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "summary-lines",
									children: done.seats.map((seat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "summary-line",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Ряд ",
											seat.row,
											", место ",
											seat.seat,
											" · ",
											seat.tier
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatRub(seat.price) })]
									}, `${seat.row}-${seat.seat}`))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "summary-total",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Итого" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatRub(done.total) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "note mt-3",
									children: "Покажите код на входе. Это бронь, не списание с карты."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ticket-side",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Barcode, { code: done.code }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "code",
								children: done.code
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-primary",
							onClick: () => setStage("pick"),
							children: "Ещё билет"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/orders",
							className: "btn btn-ghost",
							children: "Мои билеты"
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ticket-layout mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "film-switch",
							"aria-label": "Фильм",
							children: films.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: item.id === film.id ? "mini-film is-on" : "mini-film",
								"aria-pressed": item.id === film.id,
								onClick: () => {
									navigate({
										to: "/ticket",
										search: {
											film: item.id,
											session: session.id
										},
										replace: true
									});
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.poster,
									alt: ""
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.title })]
							}, item.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-5 text-sm text-muted",
							children: [
								film.director,
								" · ",
								film.genre,
								" · ",
								film.age,
								" · ",
								film.duration
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-2xl",
							children: film.synopsis
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "film-title mt-6",
							children: "Сеанс"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "session-grid mt-3",
							role: "radiogroup",
							"aria-label": "Время сеанса",
							children: SESSIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								role: "radio",
								"aria-checked": item.id === session.id,
								className: item.id === session.id ? "session-btn is-on" : "session-btn",
								onClick: () => {
									navigate({
										to: "/ticket",
										search: {
											film: film.id,
											session: item.id
										},
										replace: true
									});
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.time }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									item.label,
									" · ",
									formatDelta(item.delta),
									" ₽"
								] })]
							}, item.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "film-title mt-6",
							children: "Схема зала"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeatPicker, {
								film,
								session,
								selected,
								takenExtra,
								onToggle: toggle
							})
						}),
						note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "note mt-3",
							children: note
						}) : null
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "summary summary-sticky",
						ref: summaryRef,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Ваш билет"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "film-title mt-2",
								children: film.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									session.time,
									" · ",
									session.label,
									" · база ",
									formatRub(film.basePrice),
									" ",
									formatDelta(session.delta),
									" ₽"
								]
							}),
							priced.lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm text-muted",
								children: "Выберите места. Цена пересчитается по каждому ряду."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "summary-lines",
								children: priced.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "summary-line text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Ряд ",
										line.row,
										", место ",
										line.seat,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: line.tier
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatRub(line.price) })]
								}, seatKey(line)))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "summary-total",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Итого" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatRub(priced.total) })]
							}),
							stage === "pay" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mt-4",
								onSubmit: (event) => {
									event.preventDefault();
									confirm();
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm text-muted",
										htmlFor: "guest-name",
										children: "Имя на билете"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "guest-name",
										className: "field mt-2",
										maxLength: 40,
										placeholder: "Гость",
										autoComplete: "name",
										value: name,
										onChange: (event) => setName(event.target.value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "note mt-3",
										children: "Оплаты картой нет — оформим бронь и код для входа."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "btn btn-primary mt-4 w-full",
										children: "Подтвердить бронь"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "btn btn-ghost mt-2 w-full",
										onClick: () => setStage("pick"),
										children: "Изменить места"
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "btn btn-primary mt-4 w-full",
								onClick: goPay,
								children: ["Оформить ", selected.length > 0 ? formatRub(priced.total) : ""]
							})
						]
					})]
				})
			]
		}), stage !== "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "paybar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: selected.length > 0 ? `${selected.length} мест` : "Места не выбраны"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatRub(priced.total) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: stage === "pay" ? confirm : goPay,
				children: stage === "pay" ? "Подтвердить" : "Оформить"
			})]
		}) : null]
	});
}
//#endregion
export { TicketPage as component };
