import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Reminder, City, Weather } from '@containers/calendar/interfaces/calendar.interface';
import { AppService } from 'src/app/app.service';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styles: [
  ]
})
export class ReminderFormComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    'text': new FormControl('', [Validators.required, Validators.maxLength(30)]),
    'city': new FormControl('', [Validators.required]),
    'date': new FormControl('', [Validators.required]),
    'time': new FormControl('', [Validators.required]),
  });

  private cityAutocompleteOptions: Array<City> = [];
  private cityFilteredOptions: Array<City> = [];
  public filteredOptions: Observable<Array<City>>;

  get text() { return this.form.get('text') }
  get city() { return this.form.get('city') }
  get date() { return this.form.get('date') }
  get time() { return this.form.get('time') }

  public temperatureInCelsius = true;

  public showErrors = false;

  constructor(
    public _ref: DialogRef,
    private _AppService: AppService,
  ) { }

  ngOnInit(): void {
    this.cityAutocompleteOptions = this._AppService.cities;

    if (this.cityAutocompleteOptions) {
      this.filteredOptions = this.city.valueChanges
      .pipe(
        debounceTime(250),
        startWith(''),
        map(value => { this.cityFilteredOptions = this._filter(value); return this.cityFilteredOptions.length > 5 ? this.cityFilteredOptions.slice(0,5) : this.cityFilteredOptions.slice(0,1) })
      );
    }

    this._ref?.data.dateTime ? this.date.setValue(this.formatDate(this._ref.data.dateTime)) : null;
  }

  onSelectedCity(e: City) {
    this.city.setValue(e.name.charAt(0).toUpperCase() + e.name.slice(1));

    console.log(e);
    // Fetch weather
  }

  formatDate(date: Date) {
    return date.toISOString().split('T')[0]
  }

  private _filter(value: string): Array<City> {
    const filterValue = value.toLowerCase();
    return this.cityAutocompleteOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  keyEnter(e: any) {
    e.preventDefault();
    this.onSubmit();
  }

  onSubmit() {
    this.showErrors = true;
    console.warn(this.form.valid);
  }

  applyInputClasses(fieldName: string) {
    let classes;
    if (this.form.get(fieldName)?.valid) {
      classes = 'focus:border-green-500 focus-ring-green-500 bg-green-100'
    }
    else if (this.showErrors && this.form.get(fieldName)?.invalid) {
      classes = 'focus:border-red-500 focus-ring-red-500 bg-red-100'
    }
    else {
      classes = 'focus:border-gray-500 focus-ring-gray-500 bg-gray-100'
    }

    if (fieldName === 'date' || fieldName === 'time') {
      classes = (this.form.get(fieldName)?.value !== '') ? classes + ' input--has-value' : classes;
    }

    return classes
  }

}

