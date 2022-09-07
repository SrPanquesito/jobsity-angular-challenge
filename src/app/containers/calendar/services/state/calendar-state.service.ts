import { Injectable } from '@angular/core';
import { Day } from '@containers/calendar/interfaces/calendar.interface';

@Injectable({
  providedIn: 'root'
})
export class CalendarStateService {
  private currentYear: number;
  private currentMonthIndex: number;
  private currentDay: number;

  constructor() {
    let date = new Date();
    this.currentYear = date.getFullYear();
    this.currentMonthIndex = date.getMonth(); 
    this.currentDay = date.getDate(); 
  }

  public getCurrentDate() {
    return { year: this.currentYear, monthIndex: this.currentMonthIndex, day: this.currentDay }
  }

  private isDateCurrentDate(day: Day) {
    return (this.getCurrentDate().year === day.year && this.getCurrentDate().monthIndex === day.monthIndex && this.getCurrentDate().day === day.number)
  }

  public getCurrentMonthDays(): Day[] {
    return this.getMonthDays(this.currentMonthIndex, this.currentYear);
  }

  /* Create days without reminders nor weather */
  public getMonthDays(monthIndex: number, year: number): Day[] {
    let days = [];

    let firstday = this.createDay(1, monthIndex, year);

    /* Create first days starting from previous month and his corresponding year */
    days = this.fillPreviousMonthDays(firstday);
    days.push(firstday);

    /* Fill the current days of the month */
    let countDaysInMonth = new Date(year, monthIndex +1, 0).getDate();
    for (let i = 2; i < countDaysInMonth +1; i++) {
      let day = this.createDay(i, monthIndex, year);
      this.isDateCurrentDate(day) ? day.isCurrentDay = true : null;
      days.push(day);
    }

    /* Fill the days of the next month and his corresponding year. Fixed with 35 elements maximum for the 5x7 calendar default grid. */
    let nextDays = this.fillNextMonthDays(days[days.length-1], days.length, 35);
    days = days.concat(nextDays);

    return days;
  }

  private fillPreviousMonthDays(firstday: Day) {
    let days = [];

    let prevMonthAndYear = this.calculatePrevMonthYear(firstday.monthIndex, firstday.year);
    let prevTotalMonthDays = this.totalDaysInMonth(prevMonthAndYear.monthIndex, prevMonthAndYear.year);
    prevTotalMonthDays = prevTotalMonthDays-(firstday.weekDayNumber-1);
    
    for (let i = 0; i < firstday.weekDayNumber; i++) {
      days.push(this.createDay(prevTotalMonthDays, prevMonthAndYear.monthIndex, prevMonthAndYear.year));
      prevTotalMonthDays++;
    }

    return days
  }

  /* Fill remaining days of the current month view with the days of the next month and his corresponding year */
  private fillNextMonthDays(lastDay: Day, startLength: number, endLength: number) {
    let days = [];
    if (startLength < endLength) {
      let nextMonthAndYear = this.calculateNextMonthYear(lastDay.monthIndex, lastDay.year);
      let dayNumber = 1;
      for (let i = startLength; i < endLength; i++) {
        days.push(this.createDay(dayNumber, nextMonthAndYear.monthIndex, nextMonthAndYear.year));
        dayNumber++;
      }
    }
    return days
  }

  private totalDaysInMonth(monthIndex: number, year: number) {
      return new Date(year, monthIndex+1, 0).getDate();
  }

  private calculatePrevMonthYear(monthIndex: number, year: number) {
    if (monthIndex === 0) return { monthIndex: 11, year: year-1 };
    return { monthIndex: monthIndex-1, year: year }
  }

  private calculateNextMonthYear(monthIndex: number, year: number) {
    if (monthIndex === 11) return { monthIndex: 0, year: year+1 };
    return { monthIndex: monthIndex+1, year: year }
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

  public getMonthIndex(month: string): number {
    switch (month) {
      case "January":
        return 1;
      case "February":
        return 2;
      case "March":
        return 3;
      case "April":
        return 4;
      case "May":
        return 5;
      case "June":
        return 6;
      case "July":
        return 7;
      case "August":
        return 8;
      case "September":
        return 9;
      case "October":
        return 10;
      case "November":
        return 11;
      case "December":
        return 12;

      default:
        return 0;
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