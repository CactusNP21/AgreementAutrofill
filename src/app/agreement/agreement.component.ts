import { Component } from '@angular/core';
import {FormComponent} from "../form/form.component";
import {FormDataStoreService} from "../service/form-data-store.service";
import {MainFormComponent} from "../shared/main-form/main-form.component";
import {ExcelReaderComponent} from "../shared/excel-reader/excel-reader.component";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import PizZipUtils from "pizzip/utils";
//@ts-ignore
import { saveAs } from 'file-saver';
import {cdkUpgradeData} from "@angular/cdk/schematics";
function loadFile(url: string, callback: (err: Error, data: string) => void) {
  PizZipUtils.getBinaryContent(url, callback);
}

@Component({
  selector: 'app-agreement',
  standalone: true,
  imports: [
    FormComponent,
    MainFormComponent,
    ExcelReaderComponent
  ],
  templateUrl: './agreement.component.html',
  styleUrl: './agreement.component.css'
})
export class AgreementComponent {
  constructor(private store: FormDataStoreService) {

  }
  test(data: any) {
    console.log(data.then((d: any) => console.log(d)))
  }
  generate (data: any) {
    console.log(data)
      loadFile("https://agreement-autrofill-klts.vercel.app/api/hello",  function (error: Error | null, content: string) {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });
        doc.setData(data);
        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render();
        } catch (error) {
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
          function replaceErrors(key: any, value: { [x: string]: any; }) {
            if (value instanceof Error) {
              return Object.getOwnPropertyNames(value).reduce(function (
                  error,
                  key
                ) {
                  // @ts-ignore
                  error[key] = value[key];
                  return error;
                },
                {});
            }
            return value;
          }
          console.log(JSON.stringify({ error: error }, replaceErrors));

          // @ts-ignore
          if (error.properties && error.properties.errors instanceof Array) {
            // @ts-ignore
            const errorMessages = error.properties.errors
              .map(function (error: { properties: { explanation: any; }; }) {
                return error.properties.explanation;
              })
              .join('\n');
            console.log('errorMessages', errorMessages);
            // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
          }
          throw error;
        }
        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        // Output the document using Data-URI
        saveAs(out, `${data.surname}_${data.name}_договір.docx`);
      })
    }
}
