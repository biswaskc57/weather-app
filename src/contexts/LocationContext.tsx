import React, { createContext, useContext, useReducer, Dispatch, PropsWithChildren } from 'react';

interface AppState {
  user: {
    email: string,
    password: string
  },
  selectedLocation: SelectedLocation,
  checkedLocations: Location [],
  curretLocation: Location,
  units:  UNITS; 
}

interface User {
    email: string,
    password: string 
}

interface SelectedLocation {
    longitude: string,
    latitude: string
}

export interface Location {
    place: string,
    temparature: string,
    icon: string;
    humidity: string,
    realFeel:string,
    longitude: string;
    latitude: string
	description: string
}

export enum UNITS{
	Celcius = 'celcius',
	Farhenheight = 'farhenheight'
}

export type Action =
  | { type: 'ADD_USER',user: User }
  | { type: 'ADD_USER_CURRENT_LOCATION', currentLocation: Location }
  | { type: 'ADD_LOCATION', location: Location }
  | { type: 'UPDATE_CHECKED_LOCATION', selectedLocation: SelectedLocation }
  | { type: 'UPDATE_UNITS', units: UNITS }; 


const changeUnits = (value: string, unit: UNITS) => {
	if (unit === UNITS.Farhenheight) {
		return ((Number(value) * 9/5) + 32).toFixed(1).toString();
	} 
	return ((Number(value) - 32) * 5/9).toFixed(1).toString();
};

const AppContext = createContext<{ state: AppState; dispatch: Dispatch<Action>,  } | undefined>(undefined);

const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within an AppProvider');
	}
	return context;
};

const appReducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {

	case 'ADD_USER': {
		return { ...state, user: action.user};
	}

	case 'ADD_USER_CURRENT_LOCATION':
		return { ...state, curretLocation: action.currentLocation};

	case 'ADD_LOCATION':{
		const locationExists = state.checkedLocations.some((checkedLocation)=> 
			checkedLocation.place === action.location.place);

		if (locationExists) {
			return { ...state } ;
		}

		if (state.checkedLocations.length < 5) {
			state.checkedLocations.unshift(action.location); 
		}
		else {
			state.checkedLocations.pop(); 
			state.checkedLocations.unshift(action.location); 
		}    
		return { ...state };
	};

	case 'UPDATE_CHECKED_LOCATION':
		return { ...state, selectedLocation: action.selectedLocation };
	
	case 'UPDATE_UNITS': {
		const newCheckedLocation = state.checkedLocations.map((checkedLocation)=> {

			checkedLocation.temparature = changeUnits(checkedLocation.temparature,action.units);
			checkedLocation.realFeel = changeUnits(checkedLocation.realFeel,action.units);
			return checkedLocation;
		});
		const newCurrentLocation = {
			...state.curretLocation, temparature : changeUnits(state.curretLocation.temparature,action.units),
			realFeel : changeUnits(state.curretLocation.realFeel,action.units),
		};
		return { ...state, checkedLocations: newCheckedLocation, 
			curretLocation: newCurrentLocation,
			units: state.units === UNITS.Celcius ? UNITS.Farhenheight : UNITS.Celcius };
	};

	default:
		return {...state};
	};
};


export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {

	const [state, dispatch] = useReducer(appReducer, {
		user:{} as User,
		selectedLocation: {} as SelectedLocation,
		checkedLocations: [],
		units: UNITS.Celcius,
		curretLocation: {} as Location,
	});

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
};

export { useAppContext };
