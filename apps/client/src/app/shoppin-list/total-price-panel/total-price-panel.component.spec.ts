import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPricePanelComponent } from './total-price-panel.component';

describe('TotalPricePanelComponent', () => {
  let component: TotalPricePanelComponent;
  let fixture: ComponentFixture<TotalPricePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPricePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalPricePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
