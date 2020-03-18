import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-random-selection',
  templateUrl: './random-selection.component.html',
  styleUrls: ['./random-selection.component.css']
})
export class RandomSelectionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
    for (let i in data.arr) {
      console.log("item: "+JSON.stringify(data.arr[i]));
    }
   }

  ngOnInit() {
  }

}
