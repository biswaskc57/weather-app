import React, { useState, useEffect, useCallback } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from 'axios';

import styles from './home.module.scss';

import { UNITS, useAppContext } from '../../contexts/LocationContext';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

interface LocationDetails {
	formatted: string,
	geometry: {
		lat: number;
		lng: number;
	};
  }


const LocationSearch: React.FC = () => {
	const [location, setLocation] = useState<string>('');
	const [suggestedLocations, setSuggestedLocations] = useState<Location[]>([]);
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

	const { state, dispatch } = useAppContext();

	useEffect(() => {
		async function fetchData(){
			if (location.trim() !== '' && location.length > 2) {
				const apiKey = 'edfc7e48452f47dcb92465f5bc962093';
				const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}&limit=5`;

				try {
					const response = await axios.get(apiUrl);	 		
					const locations: Location[] = response.data.results.map((item: LocationDetails) => ({
						name: item.formatted,
						latitude: item.geometry.lat, 
						longitude : item.geometry.lng
					})
					);
					setSuggestedLocations(locations);
				}
				catch(error) {
					console.error('Error fetching weather data:', error);
				}
			}
		}
		fetchData();
	}, [location]);

	const handleWeatherFetch = useCallback(async () => {
		if (selectedLocation) {
			const apiKey = 'd763e9e5a37ce1d7bde6af9100b11e66';
			const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${selectedLocation.latitude}&lon=${selectedLocation.longitude}&exclude=minutely,daily&units=metric&appid=${apiKey}`;
			try {
				const response = await axios.get(apiUrl);

				dispatch({type: 'INCREMENT_LOCATION', location: {
					place: selectedLocation.name,
					temparature: response.data.current.temp,
    				icon: response.data.current.weather[0].icon,
    				humidity: response.data.current.humidity,
					realFeel:response.data.current.feels_like,
					longitude: response.data.lon,
					latitude: response.data.lat,
					description: response.data.current.weather[0].description
				}});
				dispatch({type: 'UPDATE_SELECTED_LOCATION', selectedLocation: {
					longitude: response.data.lon,
					latitude: response.data.lat
				}});	 		
			}
			catch(error) {
				console.error('Error fetching weather data:', error);
			}
		};
	},[dispatch, selectedLocation]);

	const handleLocationSelect = (_: React.SyntheticEvent<Element, Event>, value: Location | null) => {
		setSelectedLocation(value);
		handleWeatherFetch();
	};

	return (
		<div>
			<h2>Weather App</h2>
			<Autocomplete
				className={styles.autocomplete}
				options={suggestedLocations}
				getOptionLabel={(option) => `${option.name}`}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Location"
						onChange={(e) => {
							setLocation(e.target.value);
						}
						}
					/>
				)}
				onChange={handleLocationSelect}
			/>
			<Button style={{margin: '20px 0'}} variant="contained" onClick={handleWeatherFetch}>Fetch Weather</Button>
			<div className={styles.unitsButton}>
				<ToggleButtonGroup
					color="primary"
					value={'alignment'}
					exclusive
					onChange={(_, value) => {
						if (value !== state.units){
							dispatch({type: 'UPDATE_UNITS', units: state.units === UNITS.Celcius ? UNITS.Farhenheight 
								:UNITS.Celcius});
						};
					}}
					aria-label="Platform"
				>
					<ToggleButton disabled={state.units === UNITS.Celcius} value={UNITS.Celcius}>
						C
					</ToggleButton>
				
					<ToggleButton disabled={state.units === UNITS.Farhenheight} value={UNITS.Farhenheight}>
						F
					</ToggleButton>
				</ToggleButtonGroup>
			</div>
		</div>
	);
};

export default LocationSearch;
