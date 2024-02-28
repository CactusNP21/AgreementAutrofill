export interface iForm {
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
  parentNameCaps: string;
  project?: string;
  oldDate?: string;
}

export interface Agreement extends iForm {
  initials?: string;
  docNum?: string;
}
