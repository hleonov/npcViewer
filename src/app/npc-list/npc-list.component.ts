import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CSVRecord } from '../CSVRecord';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {Observable, from} from "rxjs";
@Component({
  selector: 'app-npc-list',
  templateUrl: './npc-list.component.html',
  styleUrls: ['./npc-list.component.css']
})

export class NpcListComponent implements OnInit {
  private loading: boolean = false;
  public csvRecords: CSVRecord[] = [];
  dataSource;
  headers: any[] = [];
  columnsToDisplay = ['firstName', 'lastName', 'gender', 'race', 'nationality','class', 'looks', 'role', 'context', 'source'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  globalFilter = '';
  nameFilter = new FormControl();
  filteredValues = {lastName: '', firstName: ''};
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
      this.dataSource.filterPredicate = this.myCustomFilter();
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
     this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
        this.filteredValues['firstName'] = nameFilterValue.trim().toLowerCase();
      //  this.filteredValues['name'] =  nameFilterValue.trim().toLowerCase();
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
  }

  myCustomFilter() {
      const myFilterPredicate = (data, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) { // search all text fields
        return (JSON.stringify(data).toString().trim().toLowerCase().indexOf(this.globalFilter.trim().toLowerCase()) !== -1);
      }

      //not global filter
      let searchString = JSON.parse(filter);
      return data.firstName.toString().trim().toLowerCase().includes(searchString.firstName);
             //data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1;
      };
      return myFilterPredicate;
  }
  applyFilter(filterValue: string) {
    this.globalFilter = filterValue.trim().toLowerCase(); //flag this for computing the filterPredicate
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
