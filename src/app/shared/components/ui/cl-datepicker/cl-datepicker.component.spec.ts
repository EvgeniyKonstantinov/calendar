import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClDatepickerComponent } from './cl-datepicker.component';

describe('ClDatepickerComponent', () => {
  let component: ClDatepickerComponent;
  let fixture: ComponentFixture<ClDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
