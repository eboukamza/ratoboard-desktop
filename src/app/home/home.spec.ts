import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {DebugElement} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';

import {HomePage} from './home';
import {RatoBoard} from './ratoboard/ratoboard.component';
import {RatoKeyDirective} from './ratoboard/ratokey.directive';
import {RatoControl} from './ratocontrol/ratocontrol.component';
import {Robot} from '../robot/robot';
import {RobotMock} from '../robot/robot-mock';
import {RobotService} from '../robot/robot.service';

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
        {provide: Robot, useClass: RobotMock},
        RobotService
      ]
    });

    fixture = TestBed.createComponent(HomePage);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('ion-title'));
  });

  it('should create component', () => expect(comp).toBeDefined());

});
