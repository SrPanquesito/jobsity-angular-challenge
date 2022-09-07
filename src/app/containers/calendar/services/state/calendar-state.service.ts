import { Injectable } from '@angular/core';
import { Day } from '@containers/calendar/interfaces/calendar.interface';

@Injectable({
  providedIn: 'root'
})
export class CalendarStateService {
  private currentYear: number;
  private currentMonthIndex: number;

  constructor() {
    let date = new Date();
    this.currentYear = date.getFullYear();
    this.currentMonthIndex = date.getMonth(); 
  }

  public getCurrentMonthDays(): Day[] {
    return this.getMonthDays(this.currentMonthIndex, this.currentYear);
  }

  /* Create days without reminders nor weather */
  public getMonthDays(monthIndex: number, year: number): Day[] {
    let days = [];

    let firstday = this.createDay(1, monthIndex, year);

    /* Create first empty cells */
    for (let i = 1; i < firstday.weekDayNumber; i++) {
      days.push({
        weekDayNumber: i,
        monthIndex: monthIndex,
        year: year,
      } as Day);
    }
    days.push(firstday);

    /* For some reason monthIndex calculates 0 and 1 equally as January */
    let countDaysInMonth = new Date(year, monthIndex +1, 0).getDate();
    for (let i = 2; i < countDaysInMonth +1; i++) {
      days.push(this.createDay(i, monthIndex, year));
    }

    return days;
  }

  public getMonthName(monthIndex: number): string {
    switch (monthIndex) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";

      default:
        return "|" + monthIndex;
    }
  }

  private createDay(dayNumber: number, monthIndex: number, year: number) {
    let day = new Day();

    day.monthIndex = monthIndex;
    day.month = this.getMonthName(monthIndex+1);

    day.number = dayNumber;
    day.year = year;

    day.weekDayNumber = new Date(year, monthIndex, dayNumber).getDay();

    return day;
  }

}