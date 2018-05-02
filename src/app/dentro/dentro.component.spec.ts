import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DentroComponent } from './dentro.component';

describe('DentroComponent', () => {
  let component: DentroComponent;
  let fixture: ComponentFixture<DentroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DentroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
