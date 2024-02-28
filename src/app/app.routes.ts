import { Routes } from '@angular/router';
import {AgreementFormComponent} from "./agreement-form/agreement-form.component";
import {AppComponent} from "./app.component";
import {NavigationComponent} from "./navigation/navigation.component";

export const routes: Routes = [
  {path: '', component: NavigationComponent},
  {path: 'additional-agreement', component: AgreementFormComponent}
];
