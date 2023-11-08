import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcesnikPostaniOrganizatorComponent } from './ucesnik-postani-organizator.component';

describe('UcesnikPostaniOrganizatorComponent', () => {
  let component: UcesnikPostaniOrganizatorComponent;
  let fixture: ComponentFixture<UcesnikPostaniOrganizatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcesnikPostaniOrganizatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UcesnikPostaniOrganizatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
