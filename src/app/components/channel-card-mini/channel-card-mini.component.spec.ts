import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCardMiniComponent } from './channel-card-mini.component';

describe('ChannelCardMiniComponent', () => {
  let component: ChannelCardMiniComponent;
  let fixture: ComponentFixture<ChannelCardMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelCardMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelCardMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
