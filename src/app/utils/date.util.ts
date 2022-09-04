export function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

export function firstWeekdayInMonth(month, year) {
    return new Date(year, month, 1).getDay();
}