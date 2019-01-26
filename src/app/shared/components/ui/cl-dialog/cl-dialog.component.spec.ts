import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClDialogComponent } from './cl-dialog.component';

describe('ClDialogComponent', () => {
  let component: ClDialogComponent;
  let fixture: ComponentFixture<ClDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
