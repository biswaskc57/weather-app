import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const appEl = document.getElementById('root')!;

const root = ReactDOM.createRoot(appEl);
root
	.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
