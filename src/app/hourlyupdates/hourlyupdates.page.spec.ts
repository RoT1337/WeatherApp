import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HourlyupdatesPage } from './hourlyupdates.page';

describe('HourlyupdatesPage', () => {
  let component: HourlyupdatesPage;
  let fixture: ComponentFixture<HourlyupdatesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyupdatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
