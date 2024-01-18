import React, { PropsWithChildren } from 'react';

import styles from './wrapper.module.scss';
const Wrapper: React.FunctionComponent<PropsWithChildren> = ({children}) => {
	return (
		<div className={styles.mainContainer}>
			{children}
		</div>
	);
};

export default Wrapper;
