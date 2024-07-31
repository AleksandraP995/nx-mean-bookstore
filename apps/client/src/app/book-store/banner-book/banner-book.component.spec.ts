import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerBookComponent } from './banner-book.component';

describe('BannerBookComponent', () => {
  let component: BannerBookComponent;
  let fixture: ComponentFixture<BannerBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
