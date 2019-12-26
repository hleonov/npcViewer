import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NpcListComponent } from './npc-list/npc-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NpcListComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    // RouterModule.forRoot([
    //    { path: '', component: NpcListComponent }
    // ])
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
