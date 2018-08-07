import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from './store';
import {Observable} from 'rxjs/Observable';
import {Weather} from '../model/weather';

@Component({
  selector: 'app-weather',
  template: `
  <app-search (citySearchEmitter)="citySearch($event)"></app-search>
  <app-results></app-results>  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherContainerComponent implements OnInit {

  cities$: Observable<Weather[]>;

  constructor(private store: Store<fromStore.WeatherState>) {}

  ngOnInit() {
    this.cities$ = this.store.select(fromStore.getAllWeatherAsArray);
  }

  citySearch(input: string) {
    this.store.dispatch(new fromStore.AddWeather(input));
  }
}
