import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTableCellComponent } from './ui-table-cell.component';

describe('UiTableCellComponent', () => {
  let component: UiTableCellComponent;
  let fixture: ComponentFixture<UiTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
