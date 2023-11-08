import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizatorIzmeniRadionicuComponent } from './organizator-izmeni-radionicu.component';

describe('OrganizatorIzmeniRadionicuComponent', () => {
  let component: OrganizatorIzmeniRadionicuComponent;
  let fixture: ComponentFixture<OrganizatorIzmeniRadionicuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizatorIzmeniRadionicuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizatorIzmeniRadionicuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
