import React, { PropsWithChildren, useEffect, useState } from 'react';

import styles from './header.module.scss';
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { getWeather } from '../../Hooks/useWeatherHook';
import { useLocationContext } from '../../Contexts/LocationContext';
import { UNITS, useAppContext } from '../../Contexts/UserContext';
import { capitalizeFirstLetter } from '../../Pages/utils';
import LoadingBar from '../LoadingBar/LoadingBar';
import axios from 'axios';

const Header: React.FunctionComponent<PropsWithChildren> = ({children}) => {
	const { state } = useAppContext();
	const navigate = useNavigate();
	const initialValue = useLocationContext();

	const [userAddress, setUserAddress] = useState<string | null>('');
	const [currentLocationWeather, setCurrentLocationWeather]= useState<any | null>('');;

	useEffect( ()=>{
		async function fetchAddress () {
			try {
				const currentAddressAPI = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${initialValue.lat}&lon=${initialValue.lng}&addressdetails=1`;
				const address = await axios.get(currentAddressAPI);
				const formattedCurrentAddress = address.data.display_name.split(', ').length > 4 ?
					address.data.display_name.split(', ').splice(0, 3).join(', ') : address.data.display_name;
				sessionStorage.setItem('currentAddress', formattedCurrentAddress.trim());
				setUserAddress(formattedCurrentAddress);

				const weather = await getWeather(initialValue.lat, initialValue.lng);
				setCurrentLocationWeather(weather);

			} catch(ex){
				return null;
			};
			
		}
		const userCurrentAddress = sessionStorage.getItem('currentAddress');
		if (userCurrentAddress) {
			setUserAddress(userCurrentAddress);
			return;
		}
		if (initialValue.lat && initialValue.lng)
		{
			fetchAddress();
		}
		
	},[]);

	useEffect( ()=>{
		async function fetchWeather() {
			try {
				const weather = await getWeather(initialValue.lat, initialValue.lng);
				setCurrentLocationWeather(weather);

			} catch(ex){
				return null;
			};
			
		}
		if (initialValue.lat && initialValue.lng)
		{
			fetchWeather();
		}
		
	},[]);

	
	// TODO: Need to add status latitude and longitude fetching
	if (!currentLocationWeather) {
		return <>Error returing data</>;
	}

	const unit = state.units === UNITS.Celcius ? '°C' : 'K';
		
	const locationDetails =  {
		place: userAddress ?? '',
		temparature: currentLocationWeather.current.temp,
		icon: currentLocationWeather.current.weather[0].icon,
		humidity: currentLocationWeather.current.humidity,
		realFeel:currentLocationWeather.current.feels_like,
		longitude: currentLocationWeather.lon,
		latitude: currentLocationWeather.lat,
		description: currentLocationWeather.current.weather[0].description
	};
	sessionStorage.setItem('currentAddresWeather', JSON.stringify(locationDetails));
	

	return (
		<div >
			<div className={styles.header}>
				<div className={styles.appName}>Weather App</div>
				
				<div className={styles.weatherCardContainer}>
					{!locationDetails.place && <LoadingBar />}
					{locationDetails.place &&
				 	<>
				 		<div className={styles.weatherCardtitle}>{capitalizeFirstLetter(locationDetails.place?.split(', ')[1])}:</div>
				 		<div className={styles.weatherCard}>
				 			<strong>{capitalizeFirstLetter(locationDetails.description)}</strong>
				 			<div className={styles.text}>
				 				<img src={`http://openweathermap.org/img/w/${locationDetails.icon}.png` } />
				 			</div>
				 			<div className={styles.temparature}>{Math.floor(locationDetails.temparature)}{' '}{unit}</div>
				 		</div>
				 	</>
					}
				</div>
				{/* FIXME: Move it to home page. */}
				<div className={styles.logoutContainer}>
					<Button 
						style={{margin: '20px 0', height: '30px'}} 
						variant="contained" color="primary" 
						className={styles.unitsButton}
						onClick={()=>{
							sessionStorage.removeItem('user');
							navigate('/login');
						}}
					>
						Log out
					</Button>
				</div>

			</div>
			{children}
		</div>
	);
};

export default Header;
