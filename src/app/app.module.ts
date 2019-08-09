import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {KasService} from './kas/data-grid/kas.service';
import {KasDatagridComponent} from './kas/data-grid/kas-datagrid.component';

@NgModule({
  declarations: [
    AppComponent,
    KasDatagridComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
  ],
  providers: [KasService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
