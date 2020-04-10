import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseSerchComponent } from './browse-serch.component';

describe('BrowseSerchComponent', () => {
  let component: BrowseSerchComponent;
  let fixture: ComponentFixture<BrowseSerchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseSerchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseSerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
