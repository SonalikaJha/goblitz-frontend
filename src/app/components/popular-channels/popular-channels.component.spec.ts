import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularChannelsComponent } from './popular-channels.component';

describe('PopularChannelsComponent', () => {
  let component: PopularChannelsComponent;
  let fixture: ComponentFixture<PopularChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularChannelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
