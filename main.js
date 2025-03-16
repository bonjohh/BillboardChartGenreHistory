"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const lastSaturday = new Date(getLastFridayOf(Date.now()));
function getLastFridayOf(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day <= 6) ? (7 - 6 + day) : (day - 6);
    d.setDate(d.getDate() - diff);
    //d.setHours(0);
    //d.setMinutes(0);
    //d.setSeconds(0);
    return d.getTime();
}
const pastDates = [];
for (let i = 0; i < 7 * 52 * 15; i += 7) { //100; i += 7) {
    pastDates.push((0, date_fns_1.format)((0, date_fns_1.subDays)(lastSaturday, i), "yyyy-MM-dd"));
}
for (const pastDate of pastDates) {
    const url = 'https://raw.githubusercontent.com/mhollingshead/billboard-hot-100/main/date/<DATE>.json'.replace('', pastDate);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    }
    catch (error) {
        console.error(error.message);
    }
}
//# sourceMappingURL=main.js.map