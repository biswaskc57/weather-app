import React, { createContext, useContext, PropsWithChildren, useState, useEffect } from 'react';

interface UserLocation {
  lng: string;
  lat: string;
}

interface LocationContextProps {
  lng: string;
  lat: string;
  error: string | undefined;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

const useLocationContext = () => {
	const context = useContext(LocationContext);
	if (!context) {
		throw new Error('useLocationContext must be used within a LocationProvider');
	}
	return context;
};

export const LocationProvider: React.FC<PropsWithChildren> = ({ children }) => {
	// Use an initial value for the context
	const [userLocation, setUserLocation] = useState({} as UserLocation);
	const [error, setError] = useState('');
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setUserLocation({ lat:latitude.toString() , lng: longitude.toString() });
					if (!localStorage.getItem('currentUserLocation')) {
						localStorage.setItem('currentUserLocation', JSON.stringify({ lat:latitude.toString() , lng: longitude.toString() }));
					}
				},
				(ex) => {
					setError(`Got the following error: ${ex}`);
				}
			);
		} else {
			setError('Geolocation is not supported by your browser.');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [localStorage.getItem('currentUserLocation')]);
	const initialValue: LocationContextProps = {
		lat: userLocation.lat,
		lng: userLocation.lng,
		error: error
	};

	return (
		<LocationContext.Provider value={initialValue}>
			{children}
		</LocationContext.Provider>
	);
};

export { useLocationContext };
