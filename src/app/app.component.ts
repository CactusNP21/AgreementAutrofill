import {Component, effect} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import PizZipUtils from "pizzip/utils";
import {HttpClient} from "@angular/common/http";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
//@ts-ignore
import { saveAs } from 'file-saver';
import {FormDataStoreService} from "./service/form-data-store.service";
import {FormComponent} from "./form/form.component";
function loadFile(url: string, callback: (err: Error, data: string) => void) {
  PizZipUtils.getBinaryContent(url, callback);
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private http: HttpClient, private store: FormDataStoreService) {
    store.store.subscribe(v => {
        console.log('works')
        const options  = { day: 'numeric', month: 'numeric', year: 'numeric' }
        // @ts-ignore
        v.date = `${new Date().toLocaleString('uk-UA', options)}`
        v.initials = `${v.name.at(0)}.${v.parentName.at(0)}`
        v.taxNum = v.taxNum.toString()
        v.parentNameCaps = v.parentName.toUpperCase()
        v.docNum = `${v.taxNum.slice(-5)}\\1010`
        this.test(v)
    });
  }
  t() {
    this.http.get("http://localhost:3000/api/hello").subscribe(value => {
      console.log(value)
    })
  }
  test (data: any) {
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
      saveAs(out, 'output.docx');

    })
  }
}
