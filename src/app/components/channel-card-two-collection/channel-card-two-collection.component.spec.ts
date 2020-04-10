import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCardTwoCollectionComponent } from './channel-card-two-collection.component';

describe('ChannelCardTwoCollectionComponent', () => {
  let component: ChannelCardTwoCollectionComponent;
  let fixture: ComponentFixture<ChannelCardTwoCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelCardTwoCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelCardTwoCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
