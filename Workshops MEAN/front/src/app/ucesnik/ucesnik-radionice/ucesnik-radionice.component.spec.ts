import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcesnikRadioniceComponent } from './ucesnik-radionice.component';

describe('UcesnikRadioniceComponent', () => {
  let component: UcesnikRadioniceComponent;
  let fixture: ComponentFixture<UcesnikRadioniceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcesnikRadioniceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UcesnikRadioniceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
