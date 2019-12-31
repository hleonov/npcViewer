import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NpcListComponent } from './npc-list/npc-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import { ButtonComponent } from './button/button.component';
@NgModule({
  declarations: [
    AppComponent,
    NpcListComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    // RouterModule.forRoot([
    //    { path: '', component: NpcListComponent }
    // ])
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
