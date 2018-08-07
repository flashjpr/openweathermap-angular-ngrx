import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherContainerComponent } from './weather.container';
import {Store, StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {WeatherState} from './store/reducers/weather.reducers';
import * as fromStore from './store';
import {AddWeather} from './store/actions';

describe('WeatherContainerComponent', () => {
  let component: WeatherContainerComponent;
  let fixture: ComponentFixture<WeatherContainerComponent>;
  let store: Store<WeatherState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherContainerComponent ],
      imports: [StoreModule.forRoot(reducers)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    store = TestBed.get( Store );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the weather container component', () => {
    expect(component).toBeTruthy();
  });

  it('should create an observable of type Weather[]', () => {
    expect(component.cities$).toBeTruthy();
  });

  describe('citySearch method', () => {
    it('should dispatch the action with the correct value', () => {
      spyOn(store, 'dispatch').and.callThrough();
      const input = 'Seoul';
      const addWeatherAction: AddWeather = new fromStore.AddWeather(input);
      component.citySearch(input);
      expect(store.dispatch).toHaveBeenCalledWith(addWeatherAction);
    });
  });

});
