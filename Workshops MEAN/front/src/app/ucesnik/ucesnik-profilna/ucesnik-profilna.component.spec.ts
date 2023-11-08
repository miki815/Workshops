import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcesnikProfilnaComponent } from './ucesnik-profilna.component';

describe('UcesnikProfilnaComponent', () => {
  let component: UcesnikProfilnaComponent;
  let fixture: ComponentFixture<UcesnikProfilnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcesnikProfilnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UcesnikProfilnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
