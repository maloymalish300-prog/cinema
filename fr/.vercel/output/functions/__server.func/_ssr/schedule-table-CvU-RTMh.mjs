import { a as films, d as minPrice, n as SESSIONS, o as formatDelta, s as formatRub } from "./cinema-BwtH7t-S.mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schedule-table-CvU-RTMh.js
var import_jsx_runtime = require_jsx_runtime();
function FilmCard({ film, featured = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/ticket",
		search: { film: film.id },
		className: featured ? "film-card film-card-featured" : "film-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "poster-frame",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: film.poster,
				alt: `Кадр фильма «${film.title}»`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "age-badge",
				children: film.age
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "film-body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "film-meta",
					children: [
						film.genre,
						" · ",
						film.duration
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "film-title",
					children: film.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: film.synopsis
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "price-from",
					children: ["от ", formatRub(minPrice(film))]
				})
			]
		})]
	});
}
function ScheduleTable() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "schedule-wrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "schedule",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				scope: "col",
				children: "Фильм"
			}), SESSIONS.map((session) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
				scope: "col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
						dateTime: session.time,
						children: session.time
					}),
					session.label,
					" ",
					formatDelta(session.delta),
					" ₽"
				]
			}, session.id))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: films.map((film) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				scope: "row",
				children: film.title
			}), SESSIONS.map((session) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/ticket",
				search: {
					film: film.id,
					session: session.id
				},
				className: "price-chip",
				title: `Партер · ${session.label}`,
				children: formatRub(film.basePrice + session.delta)
			}) }, session.id))] }, film.id)) })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-3 text-sm text-muted",
		children: "В таблице цена партера, ряды 1–2. Центр +120 ₽, VIP +280 ₽. Нажмите цену, чтобы выбрать места."
	})] });
}
//#endregion
export { ScheduleTable as n, FilmCard as t };
