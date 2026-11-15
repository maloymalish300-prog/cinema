//#region node_modules/.nitro/vite/services/ssr/assets/bookings-DQ6d3GD3.js
var STORAGE_KEY = "venera-bookings";
function isBooking(value) {
	if (!value || typeof value !== "object") return false;
	const booking = value;
	return typeof booking.code === "string" && Array.isArray(booking.seats);
}
function loadBookings() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter(isBooking);
	} catch {
		return [];
	}
}
function saveBookings(bookings) {
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}
function takenKeys(bookings, filmId, sessionId) {
	const keys = /* @__PURE__ */ new Set();
	for (const booking of bookings) {
		if (booking.filmId !== filmId || booking.sessionId !== sessionId) continue;
		for (const seat of booking.seats) keys.add(`${seat.row}-${seat.seat}`);
	}
	return keys;
}
//#endregion
export { saveBookings as n, takenKeys as r, loadBookings as t };
