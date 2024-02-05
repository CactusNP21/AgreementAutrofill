import {Injectable, signal, WritableSignal} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";


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
  private $store: Subject<StoreI> =  new Subject()

  constructor() {
  }

  get store() {
    return this.$store
  }

  setStore(v: StoreI) {
    this.$store.next(v)
  }

}
