import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizatorPorukeComponent } from './organizator-poruke.component';

describe('OrganizatorPorukeComponent', () => {
  let component: OrganizatorPorukeComponent;
  let fixture: ComponentFixture<OrganizatorPorukeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizatorPorukeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizatorPorukeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
