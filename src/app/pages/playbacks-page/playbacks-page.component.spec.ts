import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybacksPageComponent } from './playbacks-page.component';

describe('PlaybacksPageComponent', () => {
  let component: PlaybacksPageComponent;
  let fixture: ComponentFixture<PlaybacksPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybacksPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybacksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
