import { Routes } from '@angular/router';
import {NavigationComponent} from "./navigation/navigation.component";
import {AgreementComponent} from "./agreement/agreement.component";

export const routes: Routes = [
  {path: '', component: NavigationComponent},
  {path: 'agreement', component: AgreementComponent}
];
