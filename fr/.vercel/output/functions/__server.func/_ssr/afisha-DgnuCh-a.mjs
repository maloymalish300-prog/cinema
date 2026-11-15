import { i as __toESM } from "../_runtime.mjs";
import { a as films } from "./cinema-BwtH7t-S.mjs";
import { C as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as ScheduleTable, t as FilmCard } from "./schedule-table-CvU-RTMh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/afisha-DgnuCh-a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AfishaPage() {
	const genres = ["Все", ...new Set(films.map((film) => film.genre))];
	const [genre, setGenre] = (0, import_react.useState)("Все");
	const shown = genre === "Все" ? films : films.filter((film) => film.genre === genre);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		id: "content",
		className: "page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "wrap",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Афиша"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display-md mt-3",
					children: "Что смотреть на этой неделе"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-muted",
					children: "Шесть авторских картин. Откройте фильм — сеанс, ряд и сумма билета считаются сразу."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "filters mt-6",
					role: "tablist",
					"aria-label": "Жанры",
					children: genres.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: item === genre ? "chip is-on" : "chip",
						"aria-pressed": item === genre,
						onClick: () => setGenre(item),
						children: item
					}, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "film-grid mt-6",
					children: shown.map((film) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmCard, { film }, film.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "section",
					id: "schedule",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "section-head",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Расписание"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display-md mt-2",
							children: "Четыре сеанса каждый день"
						})] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduleTable, {})]
				})
			]
		})
	});
}
//#endregion
export { AfishaPage as component };
