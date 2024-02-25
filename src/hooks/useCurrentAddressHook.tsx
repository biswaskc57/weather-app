import axios from 'axios';
import { error } from 'highcharts';
import  { useEffect, useState } from 'react';

export  function useCurrentAddressHook(lat: number, lng: number) {
	const [currentAddress, setCurrentAddress] = useState('');
	useEffect(() => {
		const fetchWeather = async () => {

			const currentAddressAPI = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
			try {			
				const address = await axios.get(currentAddressAPI);
				const formattedCurrentAddress = address.data.display_name.split(', ').length > 4 ? 
					address.data.display_name.split(', ').splice(0,3).join(', '): address.data.display_name;
				localStorage.setItem('currentAddress',formattedCurrentAddress.trim());
				setCurrentAddress(formattedCurrentAddress);

			} catch (ex) {
				console.error('Error fetching address:', error);
			}
		};
		if (localStorage.getItem('current Address')) {
			const address= localStorage.getItem('current Address');
			setCurrentAddress(address ?? '');
			return;
		}
		if (lat && lng) {
			fetchWeather();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lat, lng]);
	return {lat ,lng, currentAddress};
}
