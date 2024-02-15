import axios from 'axios';
import { error } from 'highcharts';
import { useEffect, useState } from 'react';
import { CurrentLocationWeather } from '../pages/Weather/CurrentLocationWeather';

export  function useWeatherHook(lat: number, lng: number , address: string) {
	const [currentLocation, setCurrentLocation] = useState({} as CurrentLocationWeather);
	useEffect(() => {
		const fetchWeather = async () => {
			const apiKey = 'd763e9e5a37ce1d7bde6af9100b11e66';
			const weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,daily&units=metric&appid=${apiKey}`;
			try {
				const currentWeather = await axios.get(weatherApi);				
				const locationDetails = {
					place: address,
					temparature: currentWeather.data.current.temp || '',
					icon: currentWeather.data.current.weather[0].icon,
					humidity: currentWeather.data.current.humidity,
					realFeel:currentWeather.data.current.feels_like,
					longitude: currentWeather.data.lon,
					latitude: currentWeather.data.lat,
					description: currentWeather.data.current.weather[0].description
				};
				setCurrentLocation(locationDetails);

			} catch (ex) {
				console.error('Error fetching weather:', error);
			}
		};
		if (lat && lng) {
			fetchWeather();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lat, lng]);
	return currentLocation;
}
