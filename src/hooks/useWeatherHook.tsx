import axios from 'axios';
import { error } from 'highcharts';
import { useEffect, useState } from 'react';

export  function useWeatherHook(lat: string, lng: string) {
	const [weatherData, setWeatherData] = useState([] as any []);
	useEffect(() => {
		const fetchWeather = async () => {
			const apiKey = 'd763e9e5a37ce1d7bde6af9100b11e66';
			const weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,daily&units=metric&appid=${apiKey}`;
			try {
				const currentWeather = await axios.get(weatherApi);				
				setWeatherData([currentWeather.data]);

			} catch (ex) {
				console.error('Error fetching weather:', error);
			}
		};
		
		if (lat && lng) {
			fetchWeather();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lat, lng]);
	return weatherData;
}
