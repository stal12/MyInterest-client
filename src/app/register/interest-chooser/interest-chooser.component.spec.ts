import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestChooserComponent } from './interest-chooser.component';

describe('InterestChooserComponent', () => {
  let component: InterestChooserComponent;
  let fixture: ComponentFixture<InterestChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
