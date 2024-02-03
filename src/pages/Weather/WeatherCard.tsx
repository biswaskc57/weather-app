import React from 'react';

import styles from './weather.module.scss';
import { Location, UNITS, useAppContext } from '../../contexts/UserContext';

interface WeatherCardProps {
	weatherDetails: Location
}
 
const WeatherCard: React.FC <WeatherCardProps> = ({weatherDetails}) => {
	const { state } = useAppContext();
	const unit = state.units === UNITS.Celcius ? '°C' : 'K';

	return (
		<div className={styles.weatherCardRecent}>
			<div className={styles.title}>{weatherDetails.place}</div>
			<div className={styles.textImage}>
				<img width="30px" src={`http://openweathermap.org/img/w/${weatherDetails.icon}.png` } />
				<div className={styles.text}>Temperature: 
					<span>{weatherDetails.temparature}</span>{unit}
				</div>
			</div>
		</div>
	);
};

export default WeatherCard;
