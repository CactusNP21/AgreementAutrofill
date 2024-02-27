import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormDataStoreService} from "../service/form-data-store.service";


@Component({
  selector: 'app-additional-form',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: 'agreement-form.component.html',
  styleUrl: 'agreement-form.component.css'
})
export class AgreementFormComponent {
  constructor(private fb: FormBuilder, private store: FormDataStoreService) {
  }
  form = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', Validators.required],
      parentName: ['', Validators.required],
      taxNum: ['', [Validators.required, Validators.maxLength(10)]],
      propiska: ['', Validators.required],
      adresa: ['', Validators.required],
      passportNum: ['', Validators.required],
      passportBy: ['', Validators.required],
      bankAccount: ['', Validators.required],
      bankName: ['', Validators.required],
      bankMFO: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      project: ['', Validators.required],
      oldDate: ['', Validators.required],
    }
  )

  test() {
    if (this.form.valid) {
      console.log(this.form.value)
      //@ts-ignore
      this.store.setStore(this.form.value)
    }
  }
}
