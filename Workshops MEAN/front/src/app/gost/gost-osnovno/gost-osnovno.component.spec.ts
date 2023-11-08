import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GostOsnovnoComponent } from './gost-osnovno.component';

describe('GostOsnovnoComponent', () => {
  let component: GostOsnovnoComponent;
  let fixture: ComponentFixture<GostOsnovnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GostOsnovnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GostOsnovnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
