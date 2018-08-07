import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherContainerComponent} from './weather.container';
import {WeatherService} from './weather.service';
import {SearchComponent} from './components/search/search.component';
import {ResultsComponent} from './components/results/results.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { reducers, effects } from './store';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // StoreModule.forFeature('weather', reducers),
    // EffectsModule.forFeature(effects)
  ],
  declarations: [
    SearchComponent,
    ResultsComponent,
    WeatherContainerComponent
  ],
  providers: [
    WeatherService
  ]
})
export class WeatherModule { }
