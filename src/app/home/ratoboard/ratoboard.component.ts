import {AfterViewInit, Component, EventEmitter, Input, Output} from "@angular/core";
import {Subject} from "rxjs";

type Vowel = 'a' | 'e' | 'i' | 'o' | 'u';

@Component({
  selector: 'ratoboard',
  templateUrl: 'ratoboard.component.html'
})
export class RatoBoard implements AfterViewInit {

  public ABC = [
    ['a', 'e', 'i', 'o', 'u'],
    ['b', 'c', 'd', 'f', 'g'],
    ['h', 'j', 'k', 'l', 'm'],
    ['n', 'ñ', 'p', 'q', 'r'],
    ['s', 't', 'v', 'w', 'x'],
    ['y', 'z', ' ', '<-', '<-|']
  ];

  currentIndex;
  currentIndex2;

  first;
  vowelSubject: Subject<Vowel> = new Subject<Vowel>();

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
    const vowels: [Vowel] = this.ABC[0] as [Vowel];
    let getIndex = () => this.first ? this.currentIndex : this.currentIndex2;
    document.addEventListener('click', () => {
      let key = vowels[getIndex()];
      this.vowelSubject.next(key);
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

    if (selectIndex >= this.ABC.length - 1) {
      this.vowelSubject.next(undefined);
    }
  }

  async cycle(): Promise<string> {
    let streamVowels = this.vowelSubject.asObservable();

    this.first = true;
    this.currentIndex = -1;
    this.currentIndex2 = -1;

    let vowel1 = await streamVowels.take(1).toPromise();

    if (!vowel1) {
      // CASE return nothing
      return '';
    }

    this.first = false;

    let vowel2 = await streamVowels.take(1).toPromise();

    if (!vowel2) {
      // CASE return vowel
      return vowel1;
    }

    // CASE return Character
    let getVowelIndex = (vowel: Vowel): number => {
      const vowelsIndex = {'a': 0, 'e': 1, 'i': 2, 'o': 3, 'u': 4};
      return vowelsIndex[vowel];
    };
    const consonants = this.ABC.slice(1);

    let vowelIndex1 = getVowelIndex(vowel1);
    let vowelIndex2 = getVowelIndex(vowel2);
    // vowel2 and vowel1 are switched because the first vowel is the the cols.
    return consonants[vowelIndex2][vowelIndex1];
  }
}
