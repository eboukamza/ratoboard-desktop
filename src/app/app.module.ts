import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {HomePage} from './home/home';
import {IonicStorageModule} from '@ionic/storage';
import {RatoBoard} from './home/ratoboard/ratoboard.component';
import {RatoKeyDirective} from './home/ratoboard/ratokey.directive';
import {StopPropagation} from './home/stop-propagation.directive';

@NgModule({
  declarations: [
    HomePage,
    StopPropagation,
    RatoKeyDirective,
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
