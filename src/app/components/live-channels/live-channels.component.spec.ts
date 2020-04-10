import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveChannelsComponent } from './live-channels.component';

describe('LiveChannelsComponent', () => {
  let component: LiveChannelsComponent;
  let fixture: ComponentFixture<LiveChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveChannelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
