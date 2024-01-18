import React, { PropsWithChildren } from 'react';

import styles from './errorMessage.module.scss';

const InputErrorMessage: React.FunctionComponent<PropsWithChildren> = ({children}) => {
	return (
		<div className={styles.inputErrorMessage}>
			{children}
		</div>
	);
};

export default InputErrorMessage;
