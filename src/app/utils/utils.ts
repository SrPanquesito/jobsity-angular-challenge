export function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

export function firstWeekdayInMonth(month, year) {
    return new Date(year, month, 1).getDay();
}

export function arrayToMatrix(array, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < array.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(array[i]);
    }

    return matrix;
}