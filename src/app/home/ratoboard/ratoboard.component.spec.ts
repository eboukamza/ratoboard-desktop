import {ComponentFixture, TestBed} from "@angular/core/testing";
import {IonicModule} from "ionic-angular";

import {RatoBoard} from "./ratoboard.component";
import {RatoKeyDirective} from "./ratokey.directive";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";

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

});
