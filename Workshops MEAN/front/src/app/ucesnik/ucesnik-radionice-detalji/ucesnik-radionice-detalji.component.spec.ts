import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcesnikRadioniceDetaljiComponent } from './ucesnik-radionice-detalji.component';

describe('UcesnikRadioniceDetaljiComponent', () => {
  let component: UcesnikRadioniceDetaljiComponent;
  let fixture: ComponentFixture<UcesnikRadioniceDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcesnikRadioniceDetaljiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UcesnikRadioniceDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
