import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderFormComponent } from './reminder-form.component';
import { HttpClient } from '@angular/common/http';
import { CalendarApiService } from '@containers/calendar/services/api/calendar-api.service';
import { CalendarStateService } from '@containers/calendar/services/state/calendar-state.service';
import { CalendarFacadeService } from '@containers/calendar/services/calendar-facade.service';
import { DialogRef } from '@ngneat/dialog';
import { AppService } from 'src/app/app.service';

fdescribe('SomethingComponent', () => {
    let _CalendarFacadeService: CalendarFacadeService;
    let _AppService: AppService;
    let _DialogRef: DialogRef;
    let component: ReminderFormComponent;
    let fixture: ComponentFixture<ReminderFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ ReminderFormComponent ],
        providers: [
            DialogRef,
            AppService,
            CalendarFacadeService,
        ]
        })
        .compileComponents();

        TestBed.inject(DialogRef);
        TestBed.inject(AppService);
        TestBed.inject(CalendarFacadeService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReminderFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });
});
