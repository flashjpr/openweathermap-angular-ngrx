import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {SearchCity, SearchComponent} from './search.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const mockCity: SearchCity = {city: 'Singapore'};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // create reusable function for a dry spec.
  function updateForm(input: string) {
    component.searchCityForm.controls['city'].setValue(input);
  }

  it('should create the search component', () => {
    expect(component).toBeTruthy();
  });

  describe('search reactive form', () => {
    it('should create the form', () => {
      expect(component.searchCityForm).toBeTruthy();
    });

    it('should have default empty input', () => {
      expect(component.searchCityForm.value.city).toEqual('');
    });

    it('should have default empty input', () => {
      expect(component.searchCityForm.value.city).toEqual('');
    });

    it('should update form value on form changes', () => {
      updateForm('London');
      expect(component.searchCityForm.value.city).toEqual('London');
    });

    it('form should be invalid on input is less than 2 chars', () => {
      updateForm('L');
      expect(component.searchCityForm.value.city).toEqual('L');
      expect(component.searchCityForm.valid).toBe(false);
    });

    it('form should be invalid empty input', () => {
      updateForm('');
      expect(component.searchCityForm.value.city).toEqual('');
      expect(component.searchCityForm.valid).toBe(false);
    });

    it('form should be valid on input is more than 2 chars', () => {
      updateForm('Lon');
      expect(component.searchCityForm.value.city).toEqual('Lon');
      expect(component.searchCityForm.valid).toBe(true);
    });
  });

  describe('search', () => {
    it('should return a SearchCity object with the correct value on prepareSearchForm', () => {
      updateForm('Singapore');
      expect(component.prepareSearchForm()).toEqual(mockCity);
    });

    it('should emit the search input when search is called ', () => {
      updateForm('Singapore');
      spyOn(component.citySearchEmitter, 'emit');
      component.search();
      expect(component.citySearchEmitter.emit).toHaveBeenCalled();
      expect(component.citySearchEmitter.emit).toHaveBeenCalledWith('Singapore');
    });
  });

});
