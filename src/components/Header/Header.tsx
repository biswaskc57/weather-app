import React, { PropsWithChildren } from 'react';

import styles from './header.module.scss';
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useWeatherHook } from '../../Hooks/useWeatherHook';
import { useLocationContext } from '../../Contexts/LocationContext';
import { useCurrentAddressHook } from '../../Hooks/useCurrentAddressHook';
import { UNITS, useAppContext } from '../../Contexts/UserContext';
import { capitalizeFirstLetter } from '../../Pages/utils';
import LoadingBar from '../LoadingBar/LoadingBar';

const Header: React.FunctionComponent<PropsWithChildren> = ({children}) => {
	const { state } = useAppContext();
	const navigate = useNavigate();
	const initialValue = useLocationContext();
	const {lat ,lng, currentAddress}  = useCurrentAddressHook(Number(initialValue.lat),Number(initialValue.lng));
	const currentLocationWeather = useWeatherHook(lat ,lng, currentAddress);

	const unit = state.units === UNITS.Celcius ? '°C' : 'K';

	return (
		<div >
			<div className={styles.header}>
				<div className={styles.appName}>Weather App</div>
				
				<div className={styles.weatherCardContainer}>
					{!currentLocationWeather.place && <LoadingBar />}
					{currentLocationWeather.place &&
				 	<>
				 		<div className={styles.weatherCardtitle}>{capitalizeFirstLetter(currentLocationWeather.place?.split(', ')[1])}:</div>
				 		<div className={styles.weatherCard}>
				 			<strong>{capitalizeFirstLetter(currentLocationWeather.description)}</strong>
				 			<div className={styles.text}>
				 				<img src={`http://openweathermap.org/img/w/${currentLocationWeather.icon}.png` } />
				 			</div>
				 			<div>{Math.floor(currentLocationWeather.temparature)}</div>{unit}
				 		</div>
				 	</>
					}
				</div>
				<div className={styles.logoutContainer}>
					<Button 
						style={{margin: '20px 0', height: '30px'}} 
						variant="contained" color="primary" 
						className={styles.unitsButton}
						onClick={()=>{
							localStorage.removeItem('user');
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
