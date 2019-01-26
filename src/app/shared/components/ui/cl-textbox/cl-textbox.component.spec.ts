import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClTextboxComponent } from './cl-textbox.component';

describe('ClTextboxComponent', () => {
  let component: ClTextboxComponent;
  let fixture: ComponentFixture<ClTextboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClTextboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
