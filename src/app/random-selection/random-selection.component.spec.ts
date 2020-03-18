import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomSelectionComponent } from './random-selection.component';

describe('RandomSelectionComponent', () => {
  let component: RandomSelectionComponent;
  let fixture: ComponentFixture<RandomSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
