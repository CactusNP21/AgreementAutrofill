import {Component, EventEmitter, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormDataStoreService} from "../../service/form-data-store.service";

@Component({
  selector: 'app-main-form',
  standalone: true,
    imports: [
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.css'
})
export class MainFormComponent {
  @Output() emitForm = new EventEmitter()
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
    }
  )

  test() {
    if (this.form.valid) {
      const v = this.form.value
      v.date = `${new Date().toLocaleString('uk-UA', options)}`
      v.initials = `${v.name.at(0)}.${v.parentName.at(0)}`
      v.taxNum = v.taxNum.toString()
      v.parentNameCaps = v.parentName.toUpperCase()
      v.docNum = `${v.taxNum.slice(-5)}` + v.project
      this.emitForm.emit(this.form.value)
    }
  }
}
