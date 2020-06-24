import { Component, OnInit, ViewChild } from '@angular/core';
import { CSVCase } from './../../../models/csv-case.model';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { CaseRegister } from 'src/app/models/case-register.model';
import { Format } from './../../../utils/formaters';
import {CityService} from './../../../services/city/city.service';
import { CaseService } from './../../../services/case/case.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-csv-form',
  templateUrl: './csv-form.component.html',
  styleUrls: ['./csv-form.component.scss']
})
export class CsvFormComponent implements OnInit {
  displayedColumns: string[] = ['age', 'updateDate', 'gender', 'municipality', 'origin'];
  dataSource = new MatTableDataSource<CSVCase>();
  disabledUpload = true;
  showCharger = false;
  response;
  errorApi = null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  records: CSVCase[] = [];
  constructor(
    private router: Router,
    private cityService: CityService,
    private caseService: CaseService
    ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }


  onFileSelected($event: any) {

    // tslint:disable: prefer-const
    let text = [];
    let files = $event.srcElement.files;
    if (this.isValidCSVFile(files[0])) {
      this.disabledUpload = false;
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordArray = (csvData as string).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordArray, headersRow.length);
        console.log(this.records);
        this.dataSource = new MatTableDataSource<CSVCase>(this.records);
        this.dataSource.paginator = this.paginator;
      };
      reader.onerror = () => {
        console.log('error is ocured while reading file!');
      };
    } else {
      alert('Please import valid .csv file');
      // this.fileReset();
    }
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any) {
    const headers = (csvRecordsArr[0].split(',') as string);
    // tslint:disable-next-line: prefer-const
    let headerArray = [];
    // tslint:disable-next-line: prefer-for-of
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];
    const tam = csvRecordsArray.length;
    for (let i = 1; i < tam; i++) {
      let currentRecord = (csvRecordsArray[i] as string).split(',');
      if (currentRecord.length === headerLength) {
        let csvRecord: CSVCase = new CSVCase();
        csvRecord.age = currentRecord[0].trim();
        csvRecord.updateDate = currentRecord[1].trim();
        csvRecord.gender = currentRecord[2].trim();
        csvRecord.municipality = currentRecord[3].trim();
        csvRecord.origin = currentRecord[4].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  uploadData() {
    this.errorApi = null;
    console.log('Upload');
    let data: CaseRegister[] = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.records.length; i++) {
      const row: CaseRegister = {
        // tslint:disable-next-line: radix
        age: parseInt(this.records[i].age),
        updateDate: this.records[i].updateDate,
        district: '',
        zone: '',
        ganderId: Format.formatGender(this.records[i].gender),
        medCondId: 1,
        municipallyId: this.cityService.getIdCityFromString (this.records[i].municipality),
        oriContgId: Format.formatOrigin(this.records[i].origin)
      };
      data.push(row);
    }
    console.log(data);
    // Send Data
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < data.length ; i++) {
      this.fetchDataSend(data[i]).then(
        response => {
        }
      );
      if (this.errorApi != null) {
        alert('Revise su archivo, se ha encontrado un problema');
        return;
      }
    }
    alert('Datos subidos con exito');
  }
  fetchDataSend(data): Promise<void | CaseRegister> {
    return this.caseService.registerCase(data).toPromise().then(res => this.response = res)
    .catch(msg => {
      this.errorApi = msg;
      console.log(msg);
    });
  }

}
