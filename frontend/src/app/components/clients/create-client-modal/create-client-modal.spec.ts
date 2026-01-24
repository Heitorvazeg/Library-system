import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClientModal } from './create-client-modal';

describe('CreateClientModal', () => {
  let component: CreateClientModal;
  let fixture: ComponentFixture<CreateClientModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateClientModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClientModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
