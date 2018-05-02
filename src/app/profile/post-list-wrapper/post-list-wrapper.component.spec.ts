import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListWrapperComponent } from './post-list-wrapper.component';

describe('PostListWrapperComponent', () => {
  let component: PostListWrapperComponent;
  let fixture: ComponentFixture<PostListWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
