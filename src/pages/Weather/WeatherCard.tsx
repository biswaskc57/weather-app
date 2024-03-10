import React from 'react';

import styles from './weather.module.scss';
import { Location, UNITS, useAppContext } from '../../Contexts/UserContext';

interface WeatherCardProps {
	weatherDetails: Location
}
 
const WeatherCard: React.FC <WeatherCardProps> = ({weatherDetails}) => {
	const { state } = useAppContext();
	const unit = state.units === UNITS.Celcius ? '°C' : 'K';

	return (
		<div className={styles.weatherCardRecent} onClick={()=>{alert('Done');}}>
			<div className={styles.title}>{weatherDetails.place}</div>
			<div className={styles.textImage}>
				<img src={`http://openweathermap.org/img/w/${weatherDetails.icon}.png` } />
				<div className={styles.text}>
					<span>{weatherDetails.temparature} {unit}</span>
				</div>
			</div>
		</div>
	);
};

export default WeatherCard;
