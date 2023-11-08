import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaLozinkeRegularnoComponent } from './promena-lozinke-regularno.component';

describe('PromenaLozinkeRegularnoComponent', () => {
  let component: PromenaLozinkeRegularnoComponent;
  let fixture: ComponentFixture<PromenaLozinkeRegularnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromenaLozinkeRegularnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromenaLozinkeRegularnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
