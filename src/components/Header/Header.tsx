import React, { PropsWithChildren } from 'react';

import styles from './header.module.scss';
import LocationSearch from './LocationSearch';
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useWeatherHook } from '../../hooks/useWeatherHook';
import { useLocationContext } from '../../contexts/LocationContext';
import { useCurrentAddressHook } from '../../hooks/useCurrentAddressHook';
import { UNITS, useAppContext } from '../../contexts/UserContext';

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
				{currentLocationWeather.place && 
				<div className={styles.weatherCardContainer}>
					{/* TODO: Changed the split below later*/}
					<div className={styles.weatherCardtitle}>{currentLocationWeather.place?.split(', ')[1]}:</div>
					<div className={styles.weatherCard}>
						<strong>{currentLocationWeather.description}</strong>
						<div className={styles.text}>
							<img src={`http://openweathermap.org/img/w/${currentLocationWeather.icon}.png` } />
						</div>
						<div>{currentLocationWeather.temparature}</div>{unit}
					</div>
				</div>}
				<div className={styles.search}><LocationSearch></LocationSearch></div>
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
