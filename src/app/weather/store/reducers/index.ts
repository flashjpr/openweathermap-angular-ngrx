import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromWeather from './weather.reducers';

export interface WeatherState {
  weather: fromWeather.WeatherState;
}

export const reducers: ActionReducerMap<WeatherState> = {
  weather: fromWeather.reducer,
};

// selector for the entirely lazy-loaded weather module
export const getWeatherState = createFeatureSelector<WeatherState>('weather');

// weather state: create a selector starting from the weather, down to data
export const getWeatherData = createSelector(
  getWeatherState,
  (state: WeatherState) => state.weather
);

export const getWeatherEntities = createSelector(getWeatherData, fromWeather.getWeatherEntities);

export const getAllWeatherAsArray = createSelector(
  getWeatherEntities,
  (entities) => {
    return Object.keys(entities).map(id => entities[id]);
  }
);
