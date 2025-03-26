import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyforecastsPage } from './dailyforecasts.page';

describe('DailyforecastsPage', () => {
  let component: DailyforecastsPage;
  let fixture: ComponentFixture<DailyforecastsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyforecastsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
