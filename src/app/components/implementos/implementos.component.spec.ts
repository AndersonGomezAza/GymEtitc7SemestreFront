import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementosComponent } from './implementos.component';

describe('ImplementosComponent', () => {
  let component: ImplementosComponent;
  let fixture: ComponentFixture<ImplementosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImplementosComponent]
    });
    fixture = TestBed.createComponent(ImplementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
