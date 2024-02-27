import { Routes } from '@angular/router';
import {AgreementFormComponent} from "./agreement-form/agreement-form.component";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  {path: '', component:AppComponent},
  {path: 'additional-agreement', component: AgreementFormComponent}
];
