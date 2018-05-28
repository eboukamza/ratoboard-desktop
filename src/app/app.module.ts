import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {HomePage} from './home/home';
import {IonicStorageModule} from '@ionic/storage';
import {RatoBoard} from './home/ratoboard/ratoboard.component';
import {RatoControl} from './home/ratocontrol/ratocontrol.component';
import {RatoKeyDirective} from './home/ratoboard/ratokey.directive';
import {StopPropagation} from './home/stop-propagation.directive';
import {MouseService} from './mouse/mouse.service';
import {Robot} from './mouse/robot';
import {robotFactory} from './mouse/robot.factory';
import {ioHookFactory} from './mouse/io-hook.factory';
import {IoHook} from './mouse/io-hook';

@NgModule({
  declarations: [
    HomePage,
    StopPropagation,
    RatoKeyDirective,
    RatoBoard,
    RatoControl,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(HomePage),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HomePage,
    RatoBoard,
    RatoControl
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Robot, useFactory: robotFactory},
    {provide: IoHook, useFactory: ioHookFactory},
    MouseService
  ]
})
export class AppModule {}
