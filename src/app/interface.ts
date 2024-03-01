
export interface FormModel {
  name: string;
  surname: string;
  parentName: string;
  taxNum: string;
  propiska: string;
  adresa: string;
  passportNum: string;
  passportBy: string;
  bankAccount: string;
  bankName: string;
  bankMFO: string;
  tel: string;
  email: string;
  project: string;
}
export interface Agreement extends FormModel{
  date: string
  initials?: string;
  docNum?: string;
  parentNameCaps?: string;
}
