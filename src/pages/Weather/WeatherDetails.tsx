import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { UNITS, useAppContext } from '../../contexts/LocationContext';

import styles from './weather.module.scss';
import WeatherChart from '../Charts/WeatherChart';

const WeatherDetails: React.FC = () => {
	const { state, dispatch } = useAppContext();
	const [weatherData, setWeatherData] = useState({hourly: []} as any);
	
	useEffect(() => {
		const fetchWeather = async () => {
			const apiKey = 'd763e9e5a37ce1d7bde6af9100b11e66';
			const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${state.selectedLocation.latitude}&lon=${state.selectedLocation.longitude}&exclude=minutely,daily&units=metric&appid=${apiKey}`;
			
			const currentAddressAPI = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${state.selectedLocation.latitude}&lon=${state.selectedLocation.longitude}&addressdetails=1`;
			try {
				const currentWeather = await axios.get(apiUrl);
				setWeatherData(currentWeather.data);

				const currentAddress = await axios.get(currentAddressAPI);

				const formattedCurrentAddress = currentAddress.data.display_name.split(', ').length > 4 ? 
					currentAddress.data.display_name.split(', ').splice(0,3).join(', '): currentAddress.data.display_name;

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

			} catch (error) {
				console.error('Error fetching weather:', error);
			}
		};
		if (state.selectedLocation.latitude && state.selectedLocation.longitude) {
			fetchWeather();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!state.selectedLocation.latitude && !state.selectedLocation.longitude) {
		return <div>No current location found.</div>;
	}

	const unit = state.units === UNITS.Celcius ? '°C' : 'K';

	return (
		<div className={styles.weatherCardContainer}>
			<div className={styles.weatherCardtitle}> Current weather in {state.curretLocation.place}:</div>
			<div className={styles.weatherCard}>
				<div className={styles.text}>
					<strong>{state.curretLocation.description}</strong>
				</div>
				<div className={styles.text}>
					<img src={`http://openweathermap.org/img/w/${state.curretLocation.icon}.png` } />
				</div>
				<div className={styles.text}>Temperature: 
					<span>{state.curretLocation.temparature}</span>{unit}
				</div>
				<div className={styles.text}>Humidity:  
					<span>{state.curretLocation.humidity}</span>%
				</div>
				<div className={styles.text}>realFeel: 
					<span>{state.curretLocation.realFeel}</span>{unit}
				</div>
			</div>
			<WeatherChart data={weatherData.hourly}/>
		</div>
	);
};

export default WeatherDetails;
