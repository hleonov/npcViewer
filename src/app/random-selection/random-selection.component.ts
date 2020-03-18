import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { stringify } from 'querystring';

@Component({
  selector: 'app-random-selection',
  templateUrl: './random-selection.component.html',
  styleUrls: ['./random-selection.component.css']
})
export class RandomSelectionComponent implements OnInit {
  stringArray: any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
    for (let i in data.arr) {
      this.stringArray.push(this.itemToString(data.arr[i]));
    }
   }

  ngOnInit() {
  }

  itemToString(item:any) : string{
    let itemString : string = '';
    Object.entries(item).forEach(([key, value]) => {
      itemString += value+"; "
    });
    return itemString;
  }
  
}
