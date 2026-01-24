import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deleteclientmodal } from './deleteclientmodal';

describe('Deleteclientmodal', () => {
  let component: Deleteclientmodal;
  let fixture: ComponentFixture<Deleteclientmodal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deleteclientmodal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deleteclientmodal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
