import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { UNITS, useAppContext } from '../../contexts/UserContext';

import styles from './weather.module.scss';
import WeatherChart from '../Charts/WeatherChart';
import { useLocationContext } from '../../contexts/LocationContext';

interface CurrentLocationWeather {
	place: string,
	temparature: number,
	icon: string,
	humidity: number,
	realFeel:number,
	description: string
}
const CurrentlocationWeather: React.FC = () => {
	const { state, dispatch } = useAppContext();
	const [weatherData, setWeatherData] = useState({hourly: []} as any);
	const {lat, lng, error} = useLocationContext();
	const [currentLocationWeather, setCurrentLocationWeather] = useState({} as CurrentLocationWeather);
	
	console.log(lat, lng);
	useEffect(() => {
		const fetchWeather = async () => {
			const apiKey = 'd763e9e5a37ce1d7bde6af9100b11e66';
			const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,daily&units=metric&appid=${apiKey}`;
			
			const currentAddressAPI = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
			try {
				console.log('sdsd',apiUrl);
				const currentWeather = await axios.get(apiUrl);
				setWeatherData(currentWeather.data);
				

				const currentAddress = await axios.get(currentAddressAPI);

				const formattedCurrentAddress = currentAddress.data.display_name.split(', ').length > 4 ? 
					currentAddress.data.display_name.split(', ').splice(0,3).join(', '): currentAddress.data.display_name;

				setCurrentLocationWeather({
					place: formattedCurrentAddress,
					temparature: currentWeather.data.current.temp,
    				icon: currentWeather.data.current.weather[0].icon,
    				humidity: currentWeather.data.current.humidity,
					realFeel:currentWeather.data.current.feels_like,
					description: currentWeather.data.current.weather[0].description
				});
				dispatch({
					type: 'ADD_USER_CURRENT_LOCATION', 
					currentLocation: {
						place: formattedCurrentAddress,
						temparature: currentWeather.data.current.temp,
    					icon: currentWeather.data.current.weather[0].icon,
    					humidity: currentWeather.data.current.humidity,
						realFeel:currentWeather.data.current.feels_like,
						longitude: currentWeather.data.lon,
						latitude: currentWeather.data.lat,
						description: currentWeather.data.current.weather[0].description
					}});

			} catch (ex) {
				console.error('Error fetching weather:', error);
			}
		};
		if (lat && lng) {
			fetchWeather();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lat, lng]);

	if (error) {
		return <div>{error}</div>;
	}

	if (!lat || !lng ) {
		return <div>No current location found.</div>;
	}

	const unit = state.units === UNITS.Celcius ? '°C' : 'K';

	return (
		<div className={styles.weatherCardContainer}>
			<div className={styles.weatherCardtitle}> Current weather in {currentLocationWeather.place}:</div>
			<div className={styles.weatherCard}>
				<div className={styles.text}>
					<strong>{currentLocationWeather.description}</strong>
				</div>
				<div className={styles.text}>
					<img src={`http://openweathermap.org/img/w/${currentLocationWeather.icon}.png` } />
				</div>
				<div className={styles.text}>Temperature: 
					<span>{currentLocationWeather.temparature}</span>{unit}
				</div>
				<div className={styles.text}>Humidity:  
					<span>{currentLocationWeather.humidity}</span>%
				</div>
				<div className={styles.text}>realFeel: 
					<span>{currentLocationWeather.realFeel}</span>{unit}
				</div>
			</div>
		</div>
	);
};

export default CurrentlocationWeather;
