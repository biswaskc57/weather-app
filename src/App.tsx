import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.scss';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import UserCreationPage from './pages/Login/UserCreation';
import { AppProvider } from './contexts/LocationContext';

const App: React.FC = () => {
	return (
		<AppProvider>
			<Router>
				<Fragment>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/login" element={<Login />} />
						<Route path="/home" element={<Home />} />
						<Route path="/create-user" element = {<UserCreationPage />} />
					</Routes>
				</Fragment>
			</Router>
			
		</AppProvider>
	);
};

export default App;
