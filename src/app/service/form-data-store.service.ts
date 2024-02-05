import {Injectable, signal, WritableSignal} from '@angular/core';


interface StoreI {
  bankAccount: string;
  date: string;
  docNum: string;
  initials: string;
  bankName: string;
  propiska: string;
  parentName: string;
  bankMFO: string;
  passportNum: string;
  surname: string;
  name: string;
  adresa: string;
  passportBy: string;
  tel: string;
  taxNum: string;
  email: string;
  parentNameCaps: string
}


@Injectable({
  providedIn: 'root'
})
export class FormDataStoreService {
  $store: WritableSignal<StoreI> = signal({
    name: '',
    surname: '',
    parentName: '',
    taxNum: '',
    propiska: '',
    adresa: '',
    passportNum: '',
    passportBy: '',
    bankAccount: '',
    bankName: '',
    bankMFO: '',
    tel: '',
    email: '',
    initials: '',
    date: '',
    docNum: '',
    parentNameCaps: ''
  })

  constructor() {
  }

  get store() {
    return this.$store
  }

  setStore(v: StoreI) {
    this.$store.set(v)
  }

}
