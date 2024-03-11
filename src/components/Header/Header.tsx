import React, { PropsWithChildren, useEffect, useState } from 'react';

import styles from './header.module.scss';
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { getWeather } from '../../Services/GetWeather';
import { useLocationContext } from '../../Contexts/LocationContext';
import { UNITS, useAppContext } from '../../Contexts/UserContext';
import { capitalizeFirstLetter } from '../../Pages/utils';
import axios from 'axios';

const Header: React.FunctionComponent<PropsWithChildren> = ({children}) => {
	const { state } = useAppContext();
	const navigate = useNavigate();
	const {lat, lng} = useLocationContext();

	const [userAddress, setUserAddress] = useState<string | null>('');
	const [userLocationWeather, setUserLocationWeather]= useState<any | null>('');;

	useEffect( ()=>{
		async function fetchAddress () {
			try {
				const currentAddressAPI = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
				const address = await axios.get(currentAddressAPI);
				const formattedCurrentAddress = address.data.display_name.split(', ').length > 4 ?
					address.data.display_name.split(', ').splice(0, 3).join(', ') : address.data.display_name;
				sessionStorage.setItem('currentAddress', formattedCurrentAddress.trim());
				setUserAddress(formattedCurrentAddress);
			} catch(ex){
				// TODO: Add error message
				return null;
			};
			
		}
		const userCurrentAddress = sessionStorage.getItem('currentAddress');
		if (userCurrentAddress) {
			setUserAddress(userCurrentAddress);
			return;
		}
		if (lat && lng){
			fetchAddress();
		}
		
	},[lat, lng]);

	useEffect( ()=>{
		async function fetchWeather() {
			try {
				const weather = await getWeather(lat, lng);
				const weatherDetails = await weather?.data ?? {} as Location;
				const locationDetails =  {
					place: userAddress ?? '',
					temparature: weatherDetails.current.temp,
					icon: weatherDetails.current.weather[0].icon,
					humidity: weatherDetails.current.humidity,
					realFeel:weatherDetails.current.feels_like,
					longitude: weatherDetails.lon,
					latitude: weatherDetails.lat,
					description: weatherDetails.current.weather[0].description
				};
				setUserLocationWeather(locationDetails);
				sessionStorage.setItem('currentAddresWeather', JSON.stringify(locationDetails));

			} catch(ex){
				// TODO: ADD error message.
				return null;
			};
			
		}
		if (lat && lng) {
			const currentAddressWeather = sessionStorage.getItem('currentAddresWeather');
			if (currentAddressWeather){
				setUserLocationWeather(JSON.parse(currentAddressWeather));
				return;
			}
			fetchWeather();

		}
		
	},[lat, lng, userAddress]);

	const unit = state.units === UNITS.Celcius ? '°C' : 'K';

	return (
		<div >
			<div className={styles.header}>
				<div className={styles.appName}>Weather App</div>
				
				{userLocationWeather && 
				<div className={styles.weatherCardContainer}>
				 	<>
				 		<div className={styles.weatherCardtitle}>{userLocationWeather.place && capitalizeFirstLetter(userLocationWeather.place?.split(', ')[1])}:</div>
				 		<div className={styles.weatherCard}>
				 			<strong>{capitalizeFirstLetter(userLocationWeather.description)}</strong>
				 			<div className={styles.text}>
				 				<img src={`http://openweathermap.org/img/w/${userLocationWeather.icon}.png` } />
				 			</div>
				 			<div className={styles.temparature}>{Math.floor(userLocationWeather.temparature)}{' '}{unit}</div>
				 		</div>
				 	</>
					
				</div>}
				{/* TODO: Move it to home page. */}
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
