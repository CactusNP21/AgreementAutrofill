import { Routes } from '@angular/router';
import {NavigationComponent} from "./navigation/navigation.component";
import {AgreementComponent} from "./agreement/agreement.component";

export const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: 'agreement'},
  {path: 'agreement', component: AgreementComponent}
];
