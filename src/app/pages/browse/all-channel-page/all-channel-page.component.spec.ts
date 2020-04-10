import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllChannelPageComponent } from './all-channel-page.component';

describe('AllChannelPageComponent', () => {
  let component: AllChannelPageComponent;
  let fixture: ComponentFixture<AllChannelPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllChannelPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllChannelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
