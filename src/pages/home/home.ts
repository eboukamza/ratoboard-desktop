import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Subject} from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidEnter(){
    this.ratoweb();
  }

  first;
  currentIndex;
  currentIndex2;

  username;

  updateIndex(currentVowelIndex) {
    if (this.first) {
      this.currentIndex = currentVowelIndex;
    } else {
      this.currentIndex2 = currentVowelIndex;
    }
  }

  async ratoweb() {
    let theMotherOfTheRato = this;
    const abc = [
      ['a', 'e', 'i', 'o', 'u'],
      ['b', 'c', 'd', 'f', 'g'],
      ['h', 'j', 'k', 'l', 'm'],
      ['n', 'ñ', 'p', 'q', 'r'],
      ['s', 't', 'v', 'w', 'x'],
      ['y', 'z', ' ', '<-', '<-|']
    ];

    const vowels: [Vowel] = abc[0] as [Vowel];
    const consonants = abc.slice(1);
    const vowelsIndex = {'a': 0, 'e': 1, 'i': 2, 'o': 3, 'u': 4};

    type Vowel = 'a' | 'e' | 'i' | 'o' | 'u';

    function getVowelIndex(vowel: Vowel): number {
      return vowelsIndex[vowel];
    }

    function getChar(vowel1: Vowel, vowel2: Vowel) {
      console.debug('getChar', vowel1, vowel2);
      let vowelIndex1 = getVowelIndex(vowel1);
      let vowelIndex2 = getVowelIndex(vowel2);
      return consonants[vowelIndex1][vowelIndex2];
    }

    let subject = new Subject<Vowel>();

    let currentVowelIndex;
    let interval = newCicle();

    async function cycle() {

      async function selectVowel1 () {
        theMotherOfTheRato.first = true;
        return streamVowels.take(1).toPromise();
      }

      let streamVowels = subject.asObservable();

      let vowel1 = await selectVowel1();

      if (!vowel1) {
        return '';
      }

      interval = newCicle();

      async function selectVowel2 () {
        theMotherOfTheRato.first = false;
        return streamVowels.take(1).toPromise();
      }

      let vowel2 = await selectVowel2();

      if (!vowel2) {
        return vowel1;
      }

      // vowel2 and vowel1 are inversed because the first vowel is the the cols.
      return getChar(vowel2, vowel1);
    }

    function backspace() {
      buffer = buffer.slice(0, -1);
    }

    function getBuffer() {
      return buffer;
    }

    function clearBuffer() {
      buffer = '';
    }

    function speach(txt) {
      console.info(txt);
    }

    function addChar(char) {
      buffer += char;
    }

    function digest(char) {
      console.debug('digest', char);
      switch (char) {
        case '<-':
          backspace();
          break;
        case '<-|':
          speach(getBuffer());
          clearBuffer();
          break;
        default:
          addChar(char);
      }
      theMotherOfTheRato.username = getBuffer();
      theMotherOfTheRato.first = true;
      theMotherOfTheRato.currentIndex = -1;
      theMotherOfTheRato.currentIndex2 = -1;
    }

    function newCicle() {
      currentVowelIndex = -1;

      return setInterval(() => {
        currentVowelIndex++;

        if (currentVowelIndex >= vowels.length) {
          clearInterval(interval);
          currentVowelIndex = -1;
          console.debug('done!');
          subject.next(undefined);
        } else {
          console.log('--> ', vowels[currentVowelIndex]);
        }

        theMotherOfTheRato.updateIndex(currentVowelIndex);
      }, 1500);
    }


    document.addEventListener('click', () => {
      console.log('select vowel: ', vowels[currentVowelIndex]);
      subject.next(vowels[currentVowelIndex]);
      clearInterval(interval);
    });

    //test
    let buffer = '';

    while(true){
      digest(await cycle());

      interval = newCicle();
    }

  }

}
