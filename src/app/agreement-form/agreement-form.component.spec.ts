import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementFormComponent } from './agreement-form.component';

describe('AgreementFormComponent', () => {
  let component: AgreementFormComponent;
  let fixture: ComponentFixture<AgreementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgreementFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgreementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
