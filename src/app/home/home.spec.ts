import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {DebugElement} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';

import {HomePage} from './home';
import {RatoBoard} from './ratoboard/ratoboard.component';
import {RatoKeyDirective} from './ratoboard/ratokey.directive';
import {RatoControl} from './ratocontrol/ratocontrol.component';
import {Robot} from '../mouse/robot';
import {RobotMock} from '../mouse/robot-mock';
import {MouseService} from '../mouse/mouse.service';
import {IoHook} from '../mouse/io-hook';
import {IoHookMock} from '../mouse/io-hook-mock';

describe('HomePage', () => {
  let de: DebugElement;
  let comp: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage, RatoBoard, RatoKeyDirective, RatoControl],
      imports: [
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(HomePage)
      ],
      providers: [
        {provide: IoHook, useClass: IoHookMock},
        {provide: Robot, useClass: RobotMock},
        MouseService
      ]
    });

    fixture = TestBed.createComponent(HomePage);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('ion-title'));
  });

  it('should create component', () => expect(comp).toBeDefined());

});
