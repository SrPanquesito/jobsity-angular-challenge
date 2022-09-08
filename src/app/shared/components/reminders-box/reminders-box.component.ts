import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RemindersBoxService } from '@shared/services/reminders-box.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-reminders-box',
  templateUrl: './reminders-box.component.html',
  styles: [
  ]
})
export class RemindersBoxComponent implements OnInit, OnDestroy {
  public show: boolean = false;
  public offsetX: string = '';
  public offsetY: string = '';
  public styleSearchList = '';

  private destroy$: Subject<unknown> = new Subject<unknown>();

  constructor(
    private eRef: ElementRef,
    private _RemindersBoxService: RemindersBoxService,
  ) { }

  /* Hide if user clicks outside of the box component */
  isFirstOutsideClickTriggered = false;
  @HostListener('document:click', ['$event'])
  clickout(event:any) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      if (this.isFirstOutsideClickTriggered && this.show) {
        this.isFirstOutsideClickTriggered = false;
        this._RemindersBoxService.hide();
      }
      else { this.isFirstOutsideClickTriggered = true; }
    }
  }

  ngOnInit(): void {
    this.doSubscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete(); 
  }

  /* Reminders box will always be active */
  private doSubscribe(): void {
    this._RemindersBoxService.stateObs$
      .pipe(
        map(payload => {
          this.show = payload.show;
          this.styleSearchList = payload.offsetX ? `left: ` + payload.offsetX + `px;` : ``;
          this.styleSearchList = payload.offsetY ? this.styleSearchList + `top: ` + payload.offsetY + `px;` : ``;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

}