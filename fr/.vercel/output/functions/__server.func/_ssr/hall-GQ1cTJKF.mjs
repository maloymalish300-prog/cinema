import { n as SESSIONS, o as formatDelta, r as TIERS, s as formatRub, t as HALL } from "./cinema-BwtH7t-S.mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hall-GQ1cTJKF.js
var import_jsx_runtime = require_jsx_runtime();
var specs = [
	{
		title: "96 кресел",
		text: "8 рядов по 12 мест, проход по центру."
	},
	{
		title: "Лазер 4K",
		text: "Белый экран держит чёрный, без серой пелены."
	},
	{
		title: "Звук «Орбита»",
		text: "48 каналов вокруг зала, без чужого бренда на стене."
	},
	{
		title: "Шаг 1,15 м",
		text: "В VIP — реклайнер и больше воздуха для ног."
	}
];
function HallPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		id: "content",
		className: "page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "wrap",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Зал"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display-md mt-3",
					children: "«Орбита» — один экран, три цены"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-muted",
					children: "Стоимость билета = база фильма + надбавка сеанса + категория ряда. Ниже — из чего она складывается, до того как вы сядете в схему."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hall-banner mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/posters/hero.jpg",
							alt: "Зал «Орбита» до сеанса"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hall-banner-shade",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hall-banner-copy",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "eyebrow",
								children: [HALL.total, " мест · касса до 01:00"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "display-md mt-2",
								children: "Свет ведёт к вашему ряду"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "spec-grid mt-6",
					children: specs.map((spec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "spec-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: spec.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: spec.text
						})]
					}, spec.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-md mt-12",
					children: "Ряды"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "tier-grid mt-5",
					children: TIERS.map((tier) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "tier-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "eyebrow",
								children: ["Ряды ", tier.rows]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "mt-2",
								children: tier.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted",
								children: tier.note
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "price-from mt-3",
								children: tier.delta === 0 ? "без надбавки" : `${formatDelta(tier.delta)} ₽ к билету`
							})
						]
					}, tier.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-md mt-12",
					children: "Сеансы"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "tier-grid mt-5",
					children: SESSIONS.map((session) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "tier-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: session.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "mt-2",
								children: session.time
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "price-from mt-3",
								children: [formatDelta(session.delta), " ₽ к базе фильма"]
							})
						]
					}, session.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Пример"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-muted",
							children: [
								"«Пурпурная орбита», база ",
								formatRub(560),
								". Вечер ",
								formatDelta(80),
								" ₽. Ряд VIP",
								" ",
								formatDelta(280),
								" ₽. Итог одного места — ",
								formatRub(920),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/ticket",
							search: {
								film: "orbit",
								session: "evening"
							},
							className: "btn btn-primary mt-5",
							children: "Собрать свой билет"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { HallPage as component };
