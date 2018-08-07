import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SearchComponent {
  @Output()
  citySearchEmitter: EventEmitter<string> = new EventEmitter<string>();
  searchCityForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.searchCityForm = this.formBuilder.group({
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z ]*')
      ])
    });
  }

  get city() {
    return this.searchCityForm.get('city');
  }

  prepareSearchForm(): SearchCity {
    const formModel = this.searchCityForm.value;
    return {
      city: formModel.city as string
    };
  }

  search(): void {
    const cityUserInput = this.prepareSearchForm().city;
    this.citySearchEmitter.emit(cityUserInput);
    this.searchCityForm.reset();
  }
}

export interface SearchCity {
  city: string;
}
