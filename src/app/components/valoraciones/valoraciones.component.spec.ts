import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoracionesComponent } from './valoraciones.component';

describe('ValoracionesComponent', () => {
  let component: ValoracionesComponent;
  let fixture: ComponentFixture<ValoracionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValoracionesComponent]
    });
    fixture = TestBed.createComponent(ValoracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
