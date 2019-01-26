import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClIconComponent } from './cl-icon.component';

describe('ClIconComponent', () => {
  let component: ClIconComponent;
  let fixture: ComponentFixture<ClIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
