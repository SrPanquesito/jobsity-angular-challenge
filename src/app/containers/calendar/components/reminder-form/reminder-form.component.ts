import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Reminder, City, Weather, Day, Color, WeatherResponseAPI } from '@containers/calendar/interfaces/calendar.interface';
import { AppService } from 'src/app/app.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, startWith, takeUntil } from 'rxjs/operators';
import { CalendarFacadeService } from '@containers/calendar/services/calendar-facade.service';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styles: [
  ]
})
export class ReminderFormComponent implements OnInit, OnDestroy {
  public form: FormGroup = new FormGroup({
    'text': new FormControl('', [Validators.required, Validators.maxLength(30)]),
    'city': new FormControl('', [Validators.required]),
    'date': new FormControl('', [Validators.required]),
    'time': new FormControl('', [Validators.required]),
    'color': new FormControl('red', [Validators.required]),
  });

  private cityAutocompleteOptions: Array<City> = [];
  private cityFilteredOptions: Array<City> = [];
  public filteredOptions: Observable<Array<City>>;

  get text() { return this.form.get('text') }
  get city() { return this.form.get('city') }
  get date() { return this.form.get('date') }
  get time() { return this.form.get('time') }
  get color() { return this.form.get('color') }

  private previousDateOfReminder?: any;

  public colorOptions: Array<Color> = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'];

  public temperatureInCelsius = true;

  public showErrors = false;
  private previousCity?: string;
  
  public weatherOutOfForecast: boolean = false;
  public weather?: Weather | null;

  private destroy$: Subject<unknown> = new Subject<unknown>();

  constructor(
    public _ref: DialogRef,
    private _AppService: AppService,
    private _CalendarFacadeService: CalendarFacadeService,
  ) { }

  ngOnInit(): void {
    // Autocomplete cities from citiesJson on app.worker
    this.cityAutocompleteOptions = this._AppService.cities;
    if (this.cityAutocompleteOptions) {
      this.filteredOptions = this.city.valueChanges
      .pipe(
        debounceTime(250),
        startWith(''),
        map(value => { this.cityFilteredOptions = this._filter(value); return this.cityFilteredOptions.length > 5 ? this.cityFilteredOptions.slice(0,5) : this.cityFilteredOptions.slice(0,1) })
      );
    }

    // Subscribe to forecast weather week
    this._CalendarFacadeService.weatherForecastObs$
    .pipe(
      takeUntil(this.destroy$),
      map((res: WeatherResponseAPI | null) => {
        if (res?.current) {
          const selectedDate = new Date(this._ref.data.day.year, this._ref.data.day.monthIndex, this._ref.data.day.number);
          const currentWeatherDate = new Date(res.current.dt);
  
          if (selectedDate.getFullYear() === currentWeatherDate.getFullYear() &&
              selectedDate.getMonth() === currentWeatherDate.getMonth() &&
              selectedDate.getDate() === currentWeatherDate.getDate()) {
            this.weather = res.current;
            this.weatherOutOfForecast = false;
          }
          else if (res?.daily) {
            this.weather = null;
            this.weatherOutOfForecast = true;

            for (let i = 0; i < res.daily.length; i++) {
              let weatherDate = new Date(res.daily[i].dt);
              if (selectedDate.getFullYear() === weatherDate.getFullYear() &&
                  selectedDate.getMonth() === weatherDate.getMonth() &&
                  selectedDate.getDate() === weatherDate.getDate()) {
                this.weather = res.daily[i];
                this.weatherOutOfForecast = false;
                break;
              }
            }
          }
          else {
            this.weather = null;
            this.weatherOutOfForecast = true;
          }
        }
      })
    ).subscribe();

    // Set selected date into date input
    if (this._ref?.data?.reminder) {
      this.fillFields(this._ref.data.reminder);
      this.fetchWeather();
    }
    if (this._ref?.data?.day) { 
      console.log(this._ref.data.day)
      this.date.setValue(this.formatDate(this._ref.data.day));
      this.previousDateOfReminder = this._ref.data.day;
    }
  }

  ngOnDestroy(): void {
    this._CalendarFacadeService.weatherForecast = null; 
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public displayDate(date: number | Date): string {
    return new Date(Number(date)).toDateString()
  }

  private fillFields(reminder: Reminder) {
    this.text.setValue(reminder.text);
    this.city.setValue(reminder.city);
    this.time.setValue(reminder.time);
    this.color.setValue(reminder.color);
  }

  private formatDate(day: Partial<Day>) {
    return new Date(day.year, day.monthIndex, day.number).toISOString().split('T')[0];
  }

  private _filter(value: string): Array<City> {
    const filterValue = value.toLowerCase();
    return this.cityAutocompleteOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onSelectedCity(e: City) {
    this.city.setValue(e.name.charAt(0).toUpperCase() + e.name.slice(1));
    this.fetchWeather();
  }

  keyEnter(e: any) {
    e.preventDefault();
    this.onSubmit();
  }

  keyEnterGetWeather(e: any) {
    e.preventDefault();
    this.fetchWeather();
  }

  private fetchWeather() {
    if (!this.previousCity && this.city.value !== '') {
      this.previousCity = this.city.value;
      this._CalendarFacadeService.getWeatherInformation(this.city.value)
    }
    else if (this.previousCity !== this.city.value && this.city.value !== '') {
      this.previousCity = this.city.value;
      this._CalendarFacadeService.getWeatherInformation(this.city.value)
    }
  }

  onSubmit() {
    this.showErrors = true;
    if (this.form.valid) {
      let date = this.date.value.split('-');
      let reminder: Reminder = {
        text: this.text.value,
        city: this.city.value,
        dateTime: new Date( Number(date[0]), Number(date[1])-1, Number(date[2]) ),
        time: this.time.value,
        color: this.color.value,
      };

      if (this._ref?.data?.reminder) {
        reminder.originalCreationDate = this._ref.data.reminder.originalCreationDate
        reminder.previousDate = new Date(this.previousDateOfReminder.year, this.previousDateOfReminder.monthIndex, this.previousDateOfReminder.number);
        this._CalendarFacadeService.editReminder(reminder);
      }
      else {
        reminder.originalCreationDate = new Date()
        this._CalendarFacadeService.createReminder(reminder);
      }
      this._ref.close();
    }
  }

  onDelete() {
    if (this._ref?.data?.reminder) {
      this._CalendarFacadeService.deleteReminder(this._ref.data.reminder);
      this._ref.close();
    }
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

