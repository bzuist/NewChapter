import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpageSettingsComponent } from './userpage.settings.component';

describe('UserpageSettingsComponent', () => {
  let component: UserpageSettingsComponent;
  let fixture: ComponentFixture<UserpageSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserpageSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserpageSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
