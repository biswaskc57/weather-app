import React, { PropsWithChildren } from 'react';

import styles from './header.module.scss';
import LocationSearch from './LocationSearch';
import { Button } from '@mui/material';
import CurrentlocationWeather from '../../pages/Weather/CurrentLocationWeather';
const Header: React.FunctionComponent<PropsWithChildren> = ({children}) => {
	return (
		<div >
			<div className={styles.header}>
				<CurrentlocationWeather></CurrentlocationWeather>
				<div className={styles.search}><LocationSearch></LocationSearch></div>
				<div className={styles.logoutContainer}>
					<Button 
						style={{margin: '20px 0', height: '30px'}} 
						variant="contained" color="primary" 
						className={styles.unitsButton}
						onClick={()=>{localStorage.removeItem('user');}}
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
