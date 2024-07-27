import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsGalleryComponent } from './hotels-gallery.component';

describe('HotelsGalleryComponent', () => {
  let component: HotelsGalleryComponent;
  let fixture: ComponentFixture<HotelsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelsGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
