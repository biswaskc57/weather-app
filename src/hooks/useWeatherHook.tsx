import axios from 'axios';

export  function getWeather(lat: string, lng: string) {
	const fetchWeather = async () => {
		const apiKey = 'd763e9e5a37ce1d7bde6af9100b11e66';
		const weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,daily&units=metric&appid=${apiKey}`;
		try {
			const currentWeather = await axios.get(weatherApi);				
			return currentWeather;
		} catch (ex) {
			return null;
		}
	};
	if (lat && lng) {
		return fetchWeather();
	}
	return null;
}
