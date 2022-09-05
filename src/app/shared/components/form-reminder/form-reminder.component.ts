import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Reminder } from 'src/app/interfaces/reminder';
import { Weather } from 'src/app/interfaces/weather';
import { City } from 'src/app/interfaces/city';
import { CalendarService } from 'src/app/services/calendar.service';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-form-reminder',
  templateUrl: './form-reminder.component.html',
  styles: [
  ]
})
export class FormReminderComponent implements OnInit {
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Reminder & Weather,
    private _CalendarService: CalendarService,
  ) { }

  ngOnInit(): void {
    this.cityAutocompleteOptions = this._CalendarService.cities;

    if (this.cityAutocompleteOptions) {
      this.filteredOptions = this.city.valueChanges
      .pipe(
        debounceTime(250),
        startWith(''),
        map(value => { this.cityFilteredOptions = this._filter(value); return this.cityFilteredOptions.length > 5 ? this.cityFilteredOptions.slice(0,5) : this.cityFilteredOptions.slice(0,1) })
      );
    }

    this.data?.dateTime ? this.date.setValue(this.formatDate(this.data.dateTime)) : null;
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

}

