import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCardTwoComponent } from './channel-card-two.component';

describe('ChannelCardTwoComponent', () => {
  let component: ChannelCardTwoComponent;
  let fixture: ComponentFixture<ChannelCardTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelCardTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelCardTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
