<div align="center">
    <img src="https://storage.googleapis.com/public-jobsity-bucket/jobsity_logo_small.png"/>
</div>

# Angular Challenge

## About The Solution

- I removed Angular Material since I'm more comfortable with TailwindCSS and I wanted to show my CSS skills.
- I tried to filter a cities.json for autocompletion of the city input but the file was too big and it was causing me a lot of trouble at the compilation time even using a worker, so I decided to remove it.
- I created a custom carousel following a tutorial. It's a little bit tricky to explain but I'm playing with directives and the srcElements to play the animations.
- The custom box for rendering the list of reminders it's being rendered in an absolute manner according to the offset of the day the user pressed.
- I imported FontAwesome to use icons and the Stem and Poppins font.
- I'm saving the reminders on localStorage since I wanted persistence while using the calendar.
- I made the UI responsive for the most part so we can use the calendar on mobile devices.

Apart from that the objectives are completed but I couldn't do the unit testing. Also I think the code can be optimized for better understanding.

### Project Strucrure

I'm following my own project structure. Since I've been coding on Angular I'd seen various structures that soon can get messy so after some experience 
I think this approach is very scalable. Overview the structure consist of the following folders:

 - app
 Here we can define global components that can be projected in an absolute manner for example a snackbar component. With a corresponding app.service which can be for setting global configurations like the languages or darkmode system.

 - containers
 The main pages go into containers and they're separated by folders with their corresponding modules since we're going to load them via lazy loading in app-routing.module

 - shared
 Shared smart and dumb components that we can re-utilize across various sections of the app. Here for example we can have a custom carousel that can be funcional all across the app. Or a custom reactive form. We can also build the entire UI Design System dumb components if we have such design system.
 We also have pipes for example in this project I developed kelvinToCelsius and kelvinToFahrenheit pipes.

 - containers -> services
 Since Angular comes with Depedency Injection we don't always need to use a state managment system. For small / medium size projects we can use a basic 3 way services structure which is the *-api.service which we can configure for making API calls only for a section of the app. In this case we only have the calendar view and the API connections are only for fetching info from openWeatherAPI.
 The *-state.service is mainly used for the managment of the state and flow of data accross the view. We can see it has the raw power of functions we need in order to render data correctly in our UI.
 And finally the *-facade.service as his name implies it's a facade connecting the API and state services. It's main use is for being called in a simple manner accross the smart components of the app. Not only on his current container but also on other pages or components.

 - containers -> *
 For this challenge I nested almost all the components inside the calendar container. Since the UI of the calendar is composed of various dumb components.

```
app
│   
├── app-routing.module.ts
├── app.component.ts
├── app.module.ts
├── app.service.ts
├── app.worker.ts
├── containers
│   └── calendar
│       ├── calendar-routing.module.ts
│       ├── calendar.component.html
│       ├── calendar.component.ts
│       ├── calendar.module.ts
│       ├── components
│       │   ├── calendar-container
│       │   ├── reminder-form
│       │   └── reminders-box
│       ├── interfaces
│       ├── services
│       │   ├── api
│       │   └── state
│       └── ui
│           ├── ui-calendar
│           ├── ui-calendar-day
│           ├── ui-month-picker
│           ├── ui-reminder-button
│           └── ui-year-picker
└── shared
    ├── components
    │   ├── carousel
    │   └── header
    ├── pipes
    ├── services
    ├── shared.module.ts
    ├── ui
    │   └── ui-reminder-add-button
    └── utils
```

## Description

This project is designed to test your knowledge of front-end web technologies and assess your ability to create front-​end UI products with attention to details, cross-browser compatibility, standards, and  reusability.

## Assignment

The goal of this exercise is to create a demo calendar application using Angular.

You should start by rendering a single month view of a calendar for the current month, along the lines of the illustration below:
<div align="center">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/CalendarSample.png"/>
</div>

## Mandatory features
 - Ability to add "*reminders*" (max. 30 characters) for a day and time specified by the user. Also, include a city.
 - Ability to edit reminders - including changing text, city, day and time.
 - Add a weather service call from [OpenWeather](https://openweathermap.org/forecast16) and get the weather forecast (e.g. Rain) for the date of the calendar reminder based on the city.

## Bonus (Optional)

- Expand the calendar to support more than the current month or year.
- Properly handle overflow when multiple reminders appear on the same date.
- Unit test the functionality: *Ability to add "*reminders*" (max. 30 characters) for a day and time specified by the user. Also, include a city.*

## Considerations

 - The project is completely focused on Front-end. Ignore the Back-end.
 - Create your Calendar using the route `/calendar`
 - Feel free to use small helper libraries for:
 -- UI Elements.
 -- Date/Time handling.
 - **You must create the calendar component yourself**. Do not user calendar libraries like FullCalendar or Bootstrap Calendar.
 - Provide working API keys to any external API you use.
 - Show us your capabilities on CSS and styling, if possible.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
