import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CSVRecord } from '../CSVRecord';


@Component({
  selector: 'app-npc-list',
  templateUrl: './npc-list.component.html',
  styleUrls: ['./npc-list.component.css']
})
export class NpcListComponent implements OnInit {

  csvRecords: any[] = [];
  headers: any[] = [];
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
    var dataArr = []

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let data = csvRecordsArray[i].split(',');
      console.log(data);
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

  constructor(private http: HttpClient) {
  this.loadData(); }

  loadData() {
    //let input = $event.target;
    // let reader = new FileReader();
   let inputFile = "assets/fake_NPC_list.csv";

    // reader.readAsText(inputFile);
  // this.http.get<File>(inputFile, {responseType: "text"});

    // and then:
     this.http.get(inputFile, {responseType: 'text'})
              .subscribe(csvData => {
                let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
                let headersRow = this.getHeaderArray(csvRecordsArray);
                console.log("headers: " + headersRow);
                console.log("no. of items: " + headersRow.length);
                this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
                this.headers = headersRow;
              });
  }

  ngOnInit() {
    this.loadData();
  }

}
