//#region node_modules/.nitro/vite/services/ssr/assets/cinema-BwtH7t-S.js
var HALL = {
	name: "Орбита",
	rows: 8,
	seatsPerRow: 12,
	aisleAfter: 6,
	total: 96
};
var TIERS = [
	{
		id: "parter",
		name: "Партер",
		rows: "1–2",
		delta: 0,
		note: "Ближе к экрану"
	},
	{
		id: "center",
		name: "Центр",
		rows: "3–5",
		delta: 120,
		note: "Ровный обзор зала"
	},
	{
		id: "vip",
		name: "VIP",
		rows: "6–8",
		delta: 280,
		note: "Реклайнер и больше места"
	}
];
var SESSIONS = [
	{
		id: "morning",
		time: "11:20",
		label: "Утро",
		delta: -40
	},
	{
		id: "day",
		time: "14:40",
		label: "День",
		delta: 0
	},
	{
		id: "evening",
		time: "18:10",
		label: "Вечер",
		delta: 80
	},
	{
		id: "night",
		time: "21:30",
		label: "Ночь",
		delta: 40
	}
];
var films = [
	{
		id: "tide",
		title: "Ночной прилив",
		genre: "Неонуар",
		age: "16+",
		duration: "2 ч 08 мин",
		director: "Кира Левина",
		synopsis: "Город на краю чёрной воды теряет ночь за ночью. Следовательница ищет человека, который оставляет фиолетовый след на мокром асфальте.",
		basePrice: 490,
		poster: "/posters/tide.jpg"
	},
	{
		id: "orbit",
		title: "Пурпурная орбита",
		genre: "Фантастика",
		age: "12+",
		duration: "2 ч 14 мин",
		director: "Марк Остров",
		synopsis: "Экспедиция к газовому гиганту принимает сигнал, которого не должно быть. Корабль молчит. Планета — нет.",
		basePrice: 560,
		poster: "/posters/orbit.jpg"
	},
	{
		id: "glass",
		title: "Стеклянный город",
		genre: "Фантастика",
		age: "16+",
		duration: "1 ч 59 мин",
		director: "Ева Солнцева",
		synopsis: "В мегаполисе из стекла пропали все отражения. Архитектор узнаёт, что город продолжает строить сам себя.",
		basePrice: 520,
		poster: "/posters/glass.jpg"
	},
	{
		id: "echo",
		title: "Эхо Венеры",
		genre: "Драма",
		age: "12+",
		duration: "1 ч 46 мин",
		director: "Артём Виль",
		synopsis: "Двое астрономов дежурят у телескопа и слышат в шуме планеты собственный разговор — из завтрашнего дня.",
		basePrice: 470,
		poster: "/posters/echo.jpg"
	},
	{
		id: "azimuth",
		title: "Чёрный азимут",
		genre: "Боевик",
		age: "16+",
		duration: "2 ч 21 мин",
		director: "Нора Кац",
		synopsis: "Гонщик везёт через ночную пустыню груз, который нельзя открывать до рассвета. Горизонт уже не там, где был утром.",
		basePrice: 590,
		poster: "/posters/azimuth.jpg"
	},
	{
		id: "room",
		title: "Белая комната",
		genre: "Драма",
		age: "18+",
		duration: "1 ч 37 мин",
		director: "Илья Берег",
		synopsis: "Человек просыпается в комнате без дверей. Единственный предмет — кресло, которое помнит чужие имена.",
		basePrice: 440,
		poster: "/posters/room.jpg"
	}
];
function rowTier(row) {
	if (row <= 2) return TIERS[0];
	if (row <= 5) return TIERS[1];
	return TIERS[2];
}
function sessionById(id) {
	return SESSIONS.find((session) => session.id === id) ?? SESSIONS[2];
}
function filmById(id) {
	return films.find((film) => film.id === id) ?? films[0];
}
function seatKey(seat) {
	return `${seat.row}-${seat.seat}`;
}
function hashString(input) {
	let hash = 2166136261;
	for (let index = 0; index < input.length; index += 1) {
		hash ^= input.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}
	return hash >>> 0;
}
function isSold(filmId, sessionId, row, seat) {
	const hash = hashString(`${filmId}:${sessionId}:${row}:${seat}`);
	const threshold = row >= 6 ? 180 : row <= 2 ? 340 : 260;
	return hash % 1e3 < threshold;
}
function seatPrice(film, session, row) {
	return film.basePrice + session.delta + rowTier(row).delta;
}
function minPrice(film) {
	return film.basePrice + SESSIONS[0].delta;
}
function quote(film, session, seats) {
	const lines = seats.map((seat) => {
		const tier = rowTier(seat.row);
		return {
			...seat,
			tier: tier.name,
			tierId: tier.id,
			price: film.basePrice + session.delta + tier.delta
		};
	}).sort((a, b) => a.row - b.row || a.seat - b.seat);
	return {
		lines,
		total: lines.reduce((sum, line) => sum + line.price, 0)
	};
}
function formatRub(value) {
	return `${value < 0 ? "−" : ""}${Math.abs(Math.round(value)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`;
}
function formatDelta(value) {
	if (value === 0) return "0";
	return `${value > 0 ? "+" : "−"}${Math.abs(value)}`;
}
function freeSeatCount(filmId, sessionId, extraTaken) {
	let free = 0;
	for (let row = 1; row <= HALL.rows; row += 1) for (let seat = 1; seat <= HALL.seatsPerRow; seat += 1) {
		const key = `${row}-${seat}`;
		if (!isSold(filmId, sessionId, row, seat) && !extraTaken.has(key)) free += 1;
	}
	return free;
}
//#endregion
export { films as a, freeSeatCount as c, minPrice as d, quote as f, sessionById as g, seatPrice as h, filmById as i, hashString as l, seatKey as m, SESSIONS as n, formatDelta as o, rowTier as p, TIERS as r, formatRub as s, HALL as t, isSold as u };
