import { i as __toESM } from "../_runtime.mjs";
import { a as films, d as minPrice, s as formatRub } from "./cinema-BwtH7t-S.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as ScheduleTable, t as FilmCard } from "./schedule-table-CvU-RTMh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CkcYw0pT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PosterMarquee() {
	const half = [
		...films,
		...films,
		...films
	];
	const track = [...half, ...half];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "billboard",
		"aria-label": "Сейчас в прокате",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "billboard-label",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Бегущая афиша"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "В прокате" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "marquee",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "marquee-track",
				children: track.map((film, index) => {
					const hidden = index >= half.length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/ticket",
						search: { film: film.id },
						className: "marquee-card",
						tabIndex: hidden ? -1 : void 0,
						"aria-hidden": hidden ? true : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: film.poster,
							alt: hidden ? "" : `Кадр фильма «${film.title}»`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "marquee-caption",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: film.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["от ", formatRub(minPrice(film))] })]
						})]
					}, `${film.id}-${index}`);
				})
			})
		})]
	});
}
function Home() {
	const lead = films[1];
	const [when, setWhen] = (0, import_react.useState)("Сегодня");
	(0, import_react.useEffect)(() => {
		const formatted = new Intl.DateTimeFormat("ru-RU", {
			weekday: "long",
			day: "numeric",
			month: "long"
		}).format(/* @__PURE__ */ new Date());
		setWhen(formatted.charAt(0).toUpperCase() + formatted.slice(1));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "hero-media",
						src: "/posters/hero.jpg",
						alt: "Пустой зал «Орбита»: чёрные кресла и экран с фиолетовым светом"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hero-shade",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hero-wash",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-grid",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Кинотеатр · Москва"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "display-xl wordmark-gradient mt-4",
								children: "Венера"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hero-lead mt-5",
								children: "Чёрный зал, белый свет экрана и фиолетовый контур ночи. Выбираете ряд, сразу видите цену кресла и забираете код брони."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hero-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/ticket",
									search: {
										film: lead.id,
										session: "evening"
									},
									className: "btn btn-primary",
									children: "Купить билет"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/afisha",
									className: "btn btn-ghost",
									children: "Смотреть афишу"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "hero-stats",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "96" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "мест в зале" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "4K" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "лазерный экран" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "01:00" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "закрытие кассы" })] })
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "hero-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: lead.poster,
								alt: `Кадр фильма «${lead.title}»`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Сегодня · 18:10"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "film-title mt-2",
									children: lead.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-muted",
									children: [
										lead.genre,
										" · ",
										lead.age,
										" · ",
										lead.duration
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "price-from mt-3",
									children: ["от ", formatRub(minPrice(lead))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/ticket",
									search: {
										film: lead.id,
										session: "evening"
									},
									className: "btn btn-primary mt-4",
									children: "Взять место"
								})
							] })]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterMarquee, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "section",
				id: "repertoire",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Репертуар"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display-md mt-2",
							children: "Шесть картин этой недели"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/afisha",
							className: "btn btn-ghost",
							children: "Вся афиша"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "film-grid",
						children: films.map((film, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmCard, {
							film,
							featured: index === 0
						}, film.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "section",
				id: "schedule",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: when
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display-md mt-2",
							children: "Сеансы и цена партера"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/hall",
							className: "btn btn-ghost",
							children: "Как считается цена"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduleTable, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "section",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hall-banner",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/posters/hero.jpg",
								alt: ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hall-banner-shade",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hall-banner-copy",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "eyebrow",
										children: "Зал «Орбита»"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "display-md mt-2",
										children: "Экран как прибор, не как комната"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 max-w-xl text-muted",
										children: "Лазер 4K, пространственный звук и три категории рядов. Цена собирается на глазах: база фильма, время сеанса и выбранный ряд."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hero-actions",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/hall",
											className: "btn btn-primary",
											children: "Смотреть зал"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/ticket",
											className: "btn btn-ghost",
											children: "Выбрать места"
										})]
									})
								]
							})
						]
					})
				})
			})
		]
	});
}
//#endregion
export { Home as component };
