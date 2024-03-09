import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import styles from './home.module.scss';
import { useAppContext } from '../../Contexts/UserContext';

interface MapProps {
  center: { lat: number; lon: number };
}

const Map: React.FC<MapProps> = ({ center }) => {
	const { state } = useAppContext();
	const [mapLocation, setMapLocation] = useState([center.lat, center.lon]);
	
	useEffect(()=> {
		if (state.selectedLocation.latitude && state.selectedLocation.longitude){
			setMapLocation([Number(state.selectedLocation.latitude), Number(state.selectedLocation.longitude)]);
		}
	},[state.selectedLocation.latitude,state.selectedLocation.longitude]);

	return (
		<MapContainer 
			key={mapLocation[0].toString()}
			className={styles.map} center={[mapLocation[0], mapLocation[1]]} zoom={13} scrollWheelZoom={true} >
			<TileLayer 
				attribution="Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community"
				url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
			/>
			<Marker position={[mapLocation[0], mapLocation[1]]} riseOnHover autoPanOnFocus >
				<Popup>
				  	 location {Number(state.selectedLocation.latitude)}, {Number(state.selectedLocation.longitude)}
				</Popup>
			</Marker>
		</MapContainer>
	);
};

export default Map;
