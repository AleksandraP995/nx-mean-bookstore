import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingStepperComponent } from './shopping-stepper.component';

describe('ShoppingStepperComponent', () => {
  let component: ShoppingStepperComponent;
  let fixture: ComponentFixture<ShoppingStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
