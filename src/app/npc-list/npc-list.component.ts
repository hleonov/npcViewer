import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CSVRecord } from '../CSVRecord';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Observable, of, from} from "rxjs";
@Component({
  selector: 'app-npc-list',
  templateUrl: './npc-list.component.html',
  styleUrls: ['./npc-list.component.css']
})

export class NpcListComponent implements OnInit {
  //var dataArr: CSVRecord[] = [];
  private loading: boolean = false;
  public csvRecords: CSVRecord[] = [];
  dataSource;
  headers: any[] = [];
  columnsToDisplay = ['firstName', 'lastName', 'gender'];
  displayedColumns: string[] = ['firstName', 'lastName', 'gender', 'race', 'nationality',
  'class', 'looks', 'role', 'context', 'source'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  //  http: HttpClient;
  // GET CSV FILE HEADER COLUMNS
  getHeaderArray(csvRecordsArr: any)
  {
    let headers = csvRecordsArr[0].split(',');
    let headerArray = [];

    for (let j = 0; j < headers.length; j++) {
      // if (headers[j] != "") {
      headerArray.push(headers[j]);
      // }
    }
    return headerArray;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any)
  {
    var dataArr: CSVRecord[] = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let data = csvRecordsArray[i].split(',');
      // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
      // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA
      if (data.length > 1) {//== headerLength) {
        var csvRecord: CSVRecord = new CSVRecord();
        csvRecord.number = data[0].trim();
        csvRecord.firstName = data[1].trim();
        csvRecord.lastName = data[2].trim();
        csvRecord.gender = data[3].trim();
        csvRecord.race = data[4].trim();
        csvRecord.nationality = data[5].trim();
        csvRecord.religion = data[6].trim();
        csvRecord.class = data[7].trim();
        csvRecord.looks = data[8].trim();
        csvRecord.role = data[9].trim();
        csvRecord.context = data[10].trim();
        csvRecord.source = data[11].trim();

        dataArr.push(csvRecord);
      }
    }
    return dataArr;
  }

  async loadData() {
    console.log("in loadData");
    //let input = $event.target;
    let inputFile = "assets/fake_NPC_list.csv";

    const csvData = await this.http.get(inputFile, {responseType: 'text'}).toPromise();

    let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
    let headersRow = this.getHeaderArray(csvRecordsArray);
    console.log("headers: " + headersRow);
    this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
    console.log("no. of items: " + this.csvRecords.length);
    this.headers = headersRow;
    return from(this.csvRecords);
    //return this.csvRecords;
  }

  async setDataSource() {
    //console.log("in setDataSource: "+this.csvRecords.length);
    await this.loadData().then(()=> {
      this.dataSource = new MatTableDataSource<CSVRecord>(this.csvRecords);
      this.dataSource.sort = this.sort;
      console.log("+++++++++++++++++++++ finished loadData with: "+this.csvRecords.length)
    });
  }

  constructor(private http: HttpClient) {
    //console.log("in constructor");
    this.loading = true;
    this.setDataSource().then(() => {
      this.loading = false;
    });
  }

  ngOnInit() {
    //console.log("in ngOnInit");
  }
}
// loadData() {//: Observable<CSVRecord[]>{
//   //let input = $event.target;
//   let inputFile = "assets/fake_NPC_list.csv";
//   //subscribe to the result of http.get (the entire csv file), process the data
//   //and in the end assign to a class property to be available to the template
//   this.http.get(inputFile, {responseType: 'text'})
//   .subscribe(csvData => {
//     let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
//     let headersRow = this.getHeaderArray(csvRecordsArray);
//     console.log("headers: " + headersRow);
//     this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
//     console.log("no. of items: " + this.csvRecords.length);
//     this.headers = headersRow;
//   });
//   //  return this.csvRecords;
//   return of(this.csvRecords);
// }
