import {Component, EventEmitter, Output} from '@angular/core';
import * as XLSX from "xlsx";
import {MatRipple} from "@angular/material/core";

@Component({
  selector: 'app-excel-reader',
  standalone: true,
  imports: [
    MatRipple
  ],
  templateUrl: './excel-reader.component.html',
  styleUrl: './excel-reader.component.css'
})
export class ExcelReaderComponent {
  @Output() retrieve = new EventEmitter<{name: string, price: number}[]>()
  async extractData(data: any) {
    const file: File | undefined = data.target.files[0];

    if (!file) {
      console.error('No file selected');
      return;
    }

    try {
      const arrayBuffer = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: any) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsArrayBuffer(file);
      });

      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Assuming the first sheet
      const worksheet = workbook.Sheets[sheetName];

      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Assuming header row exists
      // @ts-ignore

      const filteredData = data.filter((row) => row[1]) // Filter rows with value in column 2 (index 1)
        .slice(7) // Extract elements from index 7 onwards (excluding first 7 rows)
        // @ts-ignore
        .map((row) => ({ name: row[1], price: row[2] })); // Map each row to { name, price } object
      console.log(filteredData)
      await this.retrieve.emit(filteredData);
    } catch (error) {
      console.error('Error reading XLSX file:', error);
    }
  }

}
