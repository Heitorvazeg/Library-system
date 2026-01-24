import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebookModal } from './createbook-modal';

describe('CreatebookModal', () => {
  let component: CreatebookModal;
  let fixture: ComponentFixture<CreatebookModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatebookModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatebookModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
