import { format, subDays } from 'date-fns'

const lastSaturday: Date = new Date(getLastFridayOf(Date.now()));

function getLastFridayOf(date: number): number {
    const d: Date = new Date(date);
    const day: number = d.getDay();
    const diff: number = (day <= 6) ? (7 - 6 + day) : (day - 6);

    d.setDate(d.getDate() - diff);
    //d.setHours(0);
    //d.setMinutes(0);
    //d.setSeconds(0);

    return d.getTime();
}

const pastDates: string[] = [];
for (let i = 0; i < 7 * 52 * 15; i += 7) {//100; i += 7) {
    pastDates.push(format(subDays(lastSaturday, i), "yyyy-MM-dd"));
}

for (const pastDate of pastDates) {
    const dateBillboardChartURL: string = require('path').resolve('https://raw.githubusercontent.com/mhollingshead/billboard-hot-100/main/date/<DATE>.json').replace('', pastDate);
    try {
        const response = await fetch(dateBillboardChartURL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error.message);
    }
}
