import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToStreamComponent } from './how-to-stream.component';

describe('HowToStreamComponent', () => {
  let component: HowToStreamComponent;
  let fixture: ComponentFixture<HowToStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
