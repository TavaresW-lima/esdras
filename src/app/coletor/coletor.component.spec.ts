import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColetorComponent } from './coletor.component';

describe('ColetorComponent', () => {
  let component: ColetorComponent;
  let fixture: ComponentFixture<ColetorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColetorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
