export interface User {
    firstName: string;
	lastName: string;
	phone: string;
	address: string;
	email: string;
	password: string;
    location: Location;
}

interface Location {
	latitude: number, 
	longitude: number,
}

interface WeatherDetails {
	latitude: number, 
	longitude: number,
}

interface Climate {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
    currentWeather: CurrentWeather
}

interface CurrentWeather {
    dt: number,
    sunrise: number,
    sunset: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    weather: Weather []
}

interface Weather {
    id: number,
    main: string,
    description: string,
    icon: string
}

