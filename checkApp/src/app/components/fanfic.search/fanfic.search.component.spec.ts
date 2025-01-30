import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanficSearchComponent } from './fanfic.search.component';

describe('FanficSearchComponent', () => {
  let component: FanficSearchComponent;
  let fixture: ComponentFixture<FanficSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FanficSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FanficSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
