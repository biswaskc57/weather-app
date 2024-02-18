import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.scss';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import UserCreationPage from './Pages/Login/UserCreation';
import { AppProvider } from './Contexts/UserContext';
import Header from './Components/Header/Header';
import { LocationProvider } from './Contexts/LocationContext';

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
