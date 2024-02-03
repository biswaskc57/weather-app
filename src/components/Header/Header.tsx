import React, { PropsWithChildren } from 'react';

import styles from './header.module.scss';
import LocationSearch from './LocationSearch';
import { Button } from '@mui/material';
const Header: React.FunctionComponent<PropsWithChildren> = ({children}) => {
	return (
		<div >
			<div className={styles.header}>
				<div className={styles.search}><LocationSearch></LocationSearch></div>
				<div className={styles.logoutContainer}>
					<Button style={{margin: '20px 0', height: '30px'}} variant="contained" color="primary" className={styles.unitsButton}>Log out</Button>
				</div>

			</div>
			{children}
		</div>
	);
};

export default Header;
