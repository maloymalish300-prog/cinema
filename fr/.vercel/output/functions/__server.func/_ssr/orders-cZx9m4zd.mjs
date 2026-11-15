import { i as __toESM } from "../_runtime.mjs";
import { s as formatRub } from "./cinema-BwtH7t-S.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as saveBookings, t as loadBookings } from "./bookings-DQ6d3GD3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-cZx9m4zd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatWhen(iso) {
	return new Intl.DateTimeFormat("ru-RU", {
		day: "numeric",
		month: "long",
		hour: "2-digit",
		minute: "2-digit"
	}).format(new Date(iso));
}
function OrdersPage() {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [bookings, setBookings] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setBookings(loadBookings());
		setReady(true);
	}, []);
	function cancel(code) {
		const next = bookings.filter((booking) => booking.code !== code);
		setBookings(next);
		saveBookings(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		id: "content",
		className: "page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "wrap",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Брони"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display-md mt-3",
					children: "Мои билеты"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-muted",
					children: "Коды хранятся только на этом устройстве. Покажите их на входе — оплаты картой на сайте нет."
				}),
				!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-muted",
					children: "Открываем ваши билеты…"
				}) : null,
				ready && bookings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "empty-state mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "film-title",
							children: "Пока пусто"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted",
							children: "Выберите фильм, ряд и оформите бронь — билет появится здесь."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/ticket",
							className: "btn btn-primary mt-5",
							children: "Купить билет"
						})
					]
				}) : null,
				ready && bookings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "order-list mt-8",
					children: bookings.map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "ticket",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ticket-main",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: booking.code
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "film-title mt-2",
									children: booking.filmTitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-muted",
									children: [
										booking.sessionLabel,
										" · ",
										booking.time,
										" · ",
										booking.name
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 text-sm",
									children: booking.seats.map((seat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"Ряд ",
										seat.row,
										", место ",
										seat.seat,
										" · ",
										seat.tier,
										" · ",
										formatRub(seat.price)
									] }, `${seat.row}-${seat.seat}`))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted",
									children: formatWhen(booking.createdAt)
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ticket-side",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "code",
								children: formatRub(booking.total)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-ghost",
								onClick: () => cancel(booking.code),
								children: "Отменить"
							})]
						})]
					}, booking.code))
				}) : null
			]
		})
	});
}
//#endregion
export { OrdersPage as component };
