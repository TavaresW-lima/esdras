import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { ColetorModule } from './coletor/coletor.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import pdfmake from 'pdfmake';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule,
    FormsModule,
    ColetorModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [{
    provide: 'PDF_MAKE',
    useValue: pdfmake
  }],
  bootstrap: [AppComponent]
})export class AppModule { }
