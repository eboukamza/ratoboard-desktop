import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {HomePage} from './home/home';
import {IonicStorageModule} from '@ionic/storage';
import {RatoBoard} from "./home/ratoboard/ratoboard.component";


@NgModule({
  declarations: [
    HomePage,
    RatoBoard
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(HomePage),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HomePage,
    RatoBoard
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
