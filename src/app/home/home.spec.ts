import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {DebugElement} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';

import {HomePage} from './home';
import {RatoBoard} from './ratoboard/ratoboard.component';
import {RatoKeyDirective} from './ratoboard/ratokey.directive';

describe('HomePage', () => {
  let de: DebugElement;
  let comp: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage, RatoBoard, RatoKeyDirective],
      imports: [
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(HomePage)
      ]
    });

    fixture = TestBed.createComponent(HomePage);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('ion-title'));
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should have a title', () => {
    const title = de.nativeElement;
    expect(title.innerText).toMatch('RatoBoard!');
  });
});
