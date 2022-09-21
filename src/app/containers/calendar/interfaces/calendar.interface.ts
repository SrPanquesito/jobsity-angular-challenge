export interface City {
    country: string;
    name: string;
    state?: string;
    lat?: string | number;
    lon?: string | number;
}

export interface Reminder {
    originalCreationDate?: Date;
    previousDate?: Date;
    text: string;
    city: string | City;
    dateTime: Date;
    time: string;
    color: Color;
    weather?: Weather;
}

export interface Weather {
    dt: Date | number,
    sunrise: Date | number,
    sunset: Date | number,
    moonrise: Date | number,
    moonset: Date | number,
    temp: {
        day: number,
        min: number,
        max: number,
        night: number,
        eve: number,
        morn: number,
    },
    feels_like: {
        day: number,
        night: number,
        eve: number,
        morn: number,
    },
    weather: Array<{
        id: number,
        main: string,
        description: string,
        icon: string,
    }>,
    pressure: number,
    humidity: number,
    dew_point: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust?: number,
    clouds?: number,
    rain?: number,
    snow?: number,
    uvi?: number,
    timezone?: string,
}

export class Day {
    number: number;
    year: number;
    month: string;
    monthIndex: number;
    weekDayNumber: number;

    activeCell?: boolean;
    isCurrentDay?: boolean;
    reminders?: Array<Reminder>;
    weather?: Weather;
}

export type Color = 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'indigo' | 'purple' | 'pink';