export interface City {
    country: string;
    name: string;
    lat: string | number;
    lon: string | number;
}

export interface Reminder {
    text: string;
    dateTime: Date;
    color: string;
    city?: string;
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
}