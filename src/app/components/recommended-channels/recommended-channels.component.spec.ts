import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedChannelsComponent } from './recommended-channels.component';

describe('RecommendedChannelsComponent', () => {
  let component: RecommendedChannelsComponent;
  let fixture: ComponentFixture<RecommendedChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedChannelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
