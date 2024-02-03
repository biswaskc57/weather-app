import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.scss';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import UserCreationPage from './pages/Login/UserCreation';
import { AppProvider } from './contexts/UserContext';
import Header from './components/Header/Header';
import { LocationProvider } from './contexts/LocationContext';

const App: React.FC = () => {
	return (
		<AppProvider>
			<LocationProvider>
				<Router>
					<Header></Header>
					<Fragment>
						<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/login" element={<Login />} />
							<Route path="/home" element={<Home />} />
							<Route path="/create-user" element = {<UserCreationPage />} />
						</Routes>
					</Fragment>
				</Router>
			</LocationProvider>
		</AppProvider>
	);
};

export default App;
