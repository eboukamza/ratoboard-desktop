import {AfterViewInit, Component, EventEmitter, Input, Output} from "@angular/core";
import {Subject} from "rxjs";

@Component({
  selector: 'ratoboard',
  templateUrl: 'ratoboard.component.html'
})
export class RatoBoard implements AfterViewInit {

  public ABC = [
    ['', 'a', 'e', 'i', 'o', 'u'],
    ['_','b', 'c', 'd', 'f', 'g'],
    ['&#xf28f;','h', 'j', 'k', 'l', 'm'],
    ['!','n', 'ñ', 'p', 'q', 'r'],
    ['?','s', 't', 'v', 'w', 'x'],
    ['&#xf376;', 'y', 'z', '', '', '']
  ];

  currentIndex;
  currentIndex2;

  first;
  indexSubject: Subject<number> = new Subject<number>();

  @Input()
  duration: number = 1500;

  @Output()
  newChar: EventEmitter<string> = new EventEmitter<string>();

  ngAfterViewInit() {
    this.initRato();
  }

  async initRato() {
    //init clock
    this.clockTick();

    // add click event handler
    let getIndex = () => this.first ? this.currentIndex : this.currentIndex2;
    document.addEventListener('click', () => {
      this.indexSubject.next(getIndex());
    });

    // loop cycles
    while (true) {
      let char = await this.cycle();
      if (char !== '') {
        this.newChar.emit(char);
      }
    }
  }

  clockTick() {

    this.updateIndex();

    let theMotherOfRato = this;
    setTimeout(() => {
      // TODO check if theMotherOfRato is need
      theMotherOfRato.clockTick();
    }, this.duration);
  }

  private updateIndex() {
    let selectIndex = this.first ? ++this.currentIndex : ++this.currentIndex2;
    let maxIndex = this.first ? this.ABC[0].length : this.ABC.length - 1;

    if (selectIndex >= maxIndex) {
      this.indexSubject.next(-1); // emit nothing
    }
  }

  async cycle(): Promise<string> {
    let streamIndex = this.indexSubject.asObservable();

    this.first = true;
    this.currentIndex = -1;
    this.currentIndex2 = -1;

    let index1 = await streamIndex.take(1).toPromise();

    if (index1 === -1) {
      // CASE return nothing
      return '';
    }

    this.first = false;

    let vowel2 = await streamIndex.take(1).toPromise();

    if (vowel2 === -1) {
      // CASE return vowel
      return this.ABC[0][index1];
    }

    // CASE return Character
    const consonants = this.ABC.slice(1);

    // vowel2 and index1 are switched because the first vowel is the col.
    return consonants[vowel2][index1];
  }
}
