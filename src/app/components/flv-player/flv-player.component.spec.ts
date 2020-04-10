import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlvPlayerComponent } from './flv-player.component';

describe('FlvPlayerComponent', () => {
  let component: FlvPlayerComponent;
  let fixture: ComponentFixture<FlvPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlvPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlvPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
