import React, { useState, useEffect, useCallback } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from 'axios';

import styles from './header.module.scss';

import { UNITS, useAppContext } from '../../Contexts/UserContext';
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
	const { state, dispatch } = useAppContext();

	const [location, setLocation] = useState<string>('');
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

	const [suggestedLocations, setSuggestedLocations] = useState<Location[]>([]);


	useEffect(() => {
		async function fetchLocations(){
			// Only search item if the search term is more than two characters
			// TODO: This needs to be checked and fixed that the max API calls of 2500 per day is not exceeded.
			if (location && location.trim() !== '' && location.length > 2) {
				const apiKey = 'edfc7e48452f47dcb92465f5bc962093';
				const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}&limit=5`;

				try {
					const response = await axios.get(apiUrl);	
					const locations: Location[] = response.data.results.map((item: LocationDetails) => 
					{
						const arr = item.formatted.split(',');
						const placeAndCountryName = `${arr[0]}, ${arr[arr.length -1]}`;
						return { 
							name: placeAndCountryName,
							latitude: item.geometry.lat, 
							longitude : item.geometry.lng
						};
					});
					setSuggestedLocations(locations);
				}
				catch(error) {
					// TODO: Add a error components
					console.error('Error fetching weather data:', error);
				}
			}
		}
		fetchLocations();
	}, [location]);

	const handleWeatherFetch = useCallback(async () => {
		if (selectedLocation) {
			const apiKey = 'd763e9e5a37ce1d7bde6af9100b11e66';
			const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${selectedLocation.latitude}&lon=${selectedLocation.longitude}&exclude=minutely,daily&units=metric&appid=${apiKey}`;
			try {
				const response = await axios.get(apiUrl);

				dispatch({type: 'ADD_LOCATION', location: {
					place: selectedLocation.name,
					temparature: response.data.current.temp,
    				icon: response.data.current.weather[0].icon,
    				humidity: response.data.current.humidity,
					realFeel:response.data.current.feels_like,
					longitude: response.data.lon,
					latitude: response.data.lat,
					description: response.data.current.weather[0].description
				}});
				dispatch({type: 'UPDATE_CHECKED_LOCATION', selectedLocation: {
					longitude: response.data.lon,
					latitude: response.data.lat
				}});

				const hasCheckedLocations = sessionStorage.getItem('checkedLocations');
				const checkedLocations = hasCheckedLocations ? JSON.parse(hasCheckedLocations) : [];
				sessionStorage.setItem('checkedLocations',checkedLocations);	
			}
			catch(error) {
				console.error('Error fetching weather data:', error);
			}
		};
	},[dispatch, selectedLocation]);

	const handleLocationSelect = (_: React.SyntheticEvent<Element, Event>, value: Location | null) => {
		if (value){
			setSelectedLocation(value);
			return;
		}
		// If the
		setSelectedLocation(null);
	};

	return (
		<div className={styles.searchBar}>
			<div className={styles.searchBarTopRow}>
				<Autocomplete
					style={{padding: 'none !important', background: '#fafafafa'}}
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
			</div>
			<div className={styles.searchBarBottomRow}>
				<Button style={{margin: '20px 0'}}
					variant="outlined" color="info"
					onClick={handleWeatherFetch}
					disabled={!selectedLocation}
				>
						Fetch Weather
				</Button>
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
		</div>
	);
};

export default LocationSearch;
