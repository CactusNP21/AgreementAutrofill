import {Component, EventEmitter, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormDataStoreService} from "../../service/form-data-store.service";
import {Agreement} from "../../interface";
import * as XLSX from 'xlsx';
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

interface Data {
  values: any[];
  prices: any[];
}

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
      surname: ['', [Validators.required]],
      parentName: ['', [Validators.required]],
      taxNum: ['', [Validators.required, Validators.maxLength(10)]],
      propiska: ['', [Validators.required]],
      adresa: ['', [Validators.required]],
      passportNum: ['', [Validators.required]],
      passportBy: ['', [Validators.required]],
      bankAccount: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      bankMFO: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      project: ['', [Validators.required]],
    }
  )

  isFile = true


  test() {
    if (this.form.valid) {
      const v: Agreement = this.form.value as Agreement
      v.date = `${new Date().toLocaleString('uk-UA',
        {day: 'numeric', month: 'numeric', year: 'numeric'}
      )}`
      v.initials = `${v.name.at(0)}.${v.parentName.at(0)}`
      v.taxNum = v.taxNum.toString()
      v.parentNameCaps = v.parentName.toUpperCase()
      v.docNum = `${v.taxNum.slice(-5)}` + v.project
      this.emitForm.emit(this.form.value)
    }
  }
}
