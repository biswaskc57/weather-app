import React from 'react';
import styles from './LoadingBar.module.scss';

interface LoadingBarProps {
  text?: string; // Progress as a percentage (0 to 100)
}

const LoadingBar: React.FC<LoadingBarProps> = () => {
	return (
		<div>
			<p>Loading...</p>
			<div className={`${styles.loadingBar} ${styles.animate}`}>
				<span className={styles.spanEl}></span>
			</div>
		</div>
	);
};

export default LoadingBar;
