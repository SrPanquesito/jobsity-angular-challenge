import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'calendar-container',
  templateUrl: './calendar-container.component.html',
  styles: [`
    aside {
      position: relative;
      overflow: hidden;
    }

    aside:after {
      position: absolute;
      z-index: 0;
      left: 55%;
      --tw-border-opacity: 1;
      content: "";
      height: 120vh;
      border-left: 500px solid white;
      border-bottom: 0 solid transparent;
      border-right: 0 solid transparent;
      border-top: 0 solid transparent;
      border-radius: 100%;
    }

    aside:before {
      content: '';
      height: 100vh;
      width: 25vh;
      position: absolute;
      left: 20%;
      background-color: #f2f2ff;
      z-index: -1;
    }
  `]
})
export class CalendarContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onYearChanged(e: any) {
    console.warn(e);
  }

}
