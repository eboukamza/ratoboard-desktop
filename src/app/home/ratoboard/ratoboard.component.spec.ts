import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from 'ionic-angular';

import {RatoBoard} from './ratoboard.component';
import {RatoKeyDirective} from './ratokey.directive';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('Ratoboard Component', () => {
  let comp: RatoBoard;
  let fixture: ComponentFixture<RatoBoard>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [RatoBoard, RatoKeyDirective],
      imports: [
        IonicModule.forRoot(RatoBoard)
      ]
    });

    fixture = TestBed.createComponent(RatoBoard);
    comp = fixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should active selected keys', () => {
    fixture.detectChanges();
    comp.currentIndex = 2;
    comp.currentIndex2 = 1;
    fixture.detectChanges();

    let de: DebugElement[] = fixture.debugElement.queryAll(By.css('.active'));

    expect(de.length).toEqual(2);

    let active1 = de[0].nativeElement.textContent;
    expect(active1).toBe('e');

    let active2 = de[1].nativeElement.textContent;
    expect(active2).toBe(comp.ABC[comp.currentIndex2][comp.currentIndex])
  });

  it('should emit the char of the key selected', () => {
    fixture.detectChanges();
    comp.currentIndex2 = 2;
    comp.currentIndex = 1;
    comp.first = false;
    fixture.detectChanges();

    let expectedChar = comp.ABC[2][1];
    spyOn(comp.newChar, 'emit').and.callThrough();

    comp.selectKey();

    expect(comp.newChar.emit).toHaveBeenCalledWith(expectedChar);
  });

  it('should emit the char in row 0 if no index2', () => {
      fixture.detectChanges();
      comp.currentIndex = 1;
      comp.first = false;
      fixture.detectChanges();

      let expectedChar = comp.ABC[0][1];
      spyOn(comp.newChar, 'emit').and.callThrough();

      comp.selectKey();

      expect(comp.newChar.emit).toHaveBeenCalledWith(expectedChar);
    });

  it('should not emit when the index are not valid', () => {
       fixture.detectChanges();
       spyOn(comp.newChar, 'emit').and.callThrough();
       comp.startNewCycle();

       comp.selectKey();
       comp.selectKey();

       expect(comp.first).toBeTruthy();
       expect(comp.newChar.emit).toHaveBeenCalledTimes(0);
     });
});
