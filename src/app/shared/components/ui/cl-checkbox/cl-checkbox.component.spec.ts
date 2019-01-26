import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClCheckboxComponent } from './cl-checkbox.component';

describe('ClCheckboxComponent', () => {
  let component: ClCheckboxComponent;
  let fixture: ComponentFixture<ClCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
