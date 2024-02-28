import { Component } from '@angular/core';
import {FormComponent} from "../form/form.component";
import {FormDataStoreService} from "../service/form-data-store.service";
import {MainFormComponent} from "../shared/main-form/main-form.component";

@Component({
  selector: 'app-agreement',
  standalone: true,
  imports: [
    FormComponent,
    MainFormComponent
  ],
  templateUrl: './agreement.component.html',
  styleUrl: './agreement.component.css'
})
export class AgreementComponent {
  constructor(private store: FormDataStoreService) {

  }

  generate (data: any) {

  }

}
