import React, { useEffect, useState } from 'react';

import Map from './Map';
import LocationSearch from '../../components/Header/LocationSearch';
import Wrapper from '../../components/Wrapper/Wrapper';
import { useAppContext } from '../../contexts/UserContext';
import WeatherCard from '../Weather/WeatherCard';
import WeatherDetails from '../Weather/WeatherDetails';

import styles from './home.module.scss';
import { useNavigate } from 'react-router-dom';
import WeatherChart from '../Charts/WeatherChart';

interface HomeProps {
  userLocation?: { lat: number; lon: number };
  searchResults?: Array<{ id: number; name: string; coord: { lat: number; lon: number } }>;
}

interface Location {
	latitude: number, 
	longitude: number,
}

const Home: React.FC<HomeProps> = () => {
	const [location, setLocation] = useState<null | Location>(null);
	const { state, dispatch } = useAppContext();

	const user =  localStorage.getItem('user') || undefined;

	const navigate = useNavigate();

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLocation({ latitude, longitude });

					dispatch({type:'UPDATE_CHECKED_LOCATION', selectedLocation: {
						latitude: latitude.toString(),
						longitude: longitude.toString()
					}});
				},
				(error) => {
					alert(`Got the following error: ${error}`);
				}
			);
		} else {
			console.error('Geolocation is not supported by your browser.');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!user) {
		navigate('/login');
		return <></>; 
	}

	if (!location) {
		return <>Loading...</>;
	}

	return (
		<Wrapper>
			{state.checkedLocations.length > 0 && 
			<>
				<div className={styles.weatherCardtitle}> Recently Searched</div>
				<div className={styles.recentlyVisited}>
					{state.checkedLocations.map((checkedLocation, index)=>{
						return (
							<div key={index} className={styles.weatherCard}>
								<WeatherCard  weatherDetails={checkedLocation}/>
							</div>);
					})}
				</div>
			</>
			}
			<Map center={{
				lat:location.latitude, 
				lon:location.longitude,
			}}/>
			<WeatherDetails />
			{/* <WeatherChart/> */}
		</Wrapper>
	);
};

export default Home;

