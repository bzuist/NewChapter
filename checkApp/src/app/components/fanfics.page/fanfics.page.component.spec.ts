import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanficsPageComponent } from './fanfics.page.component';

describe('FanficsPageComponent', () => {
  let component: FanficsPageComponent;
  let fixture: ComponentFixture<FanficsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FanficsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FanficsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
