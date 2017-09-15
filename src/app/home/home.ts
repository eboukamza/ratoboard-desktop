import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage';

const DEFAULT_DURATION_MS = 1500;

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  @ViewChild('textInput') textInput;

  setFocus() {
    this.textInput.setFocus();
  }

  constructor(private storage: Storage) {
  }

  ngAfterViewInit() {
    this.loadRegistry();

    this.loadDuration();
  }

  loadRegistry() {
    this.storage.get('registry')
      .then(registry => this.registry = registry || [])
  }

  loadDuration() {
    // use the duration stored if exists
    this.storage.get('duration')
      .then(duration => this.duration = duration || DEFAULT_DURATION_MS)
      .catch(err => console.error(err));
  }

  clearRegistry() {
    this.registry = [];
    this.storage.remove('registry');
  }

  saveDuration(duration) {
    console.debug('duration change');
    this.storage.set('duration', duration);
  }

  text = '';

  duration = DEFAULT_DURATION_MS;
  registry = [];

  digest(char) {
    console.debug('digest', char);
    switch (char) {
      // SPACE
      case '_':
        this.text += ' ';
        break;
      // BACKSPACE
      case '&#xf28f;':
        this.text = this.text.slice(0, -1); // backspace
        break;
      // SEND
      case '&#xf376;':
        //save into registry
        this.registry.unshift({msg: this.text, date: new Date()});
        this.storage.set('registry', this.registry);
        // speech
        this.speech(this.text);
        // clear buffer
        this.text = '';
        break;
      default:
        // addChar
        this.text += char;
    }

    this.setFocus();
  }

  speech(txt) {
    try {
      let msg = new SpeechSynthesisUtterance();

      let voices = window.speechSynthesis.getVoices();
      let spanishVoice = voices.map(voice => voice.lang).indexOf('es-ES');
      msg.voice = voices[spanishVoice];
      msg.text = txt;
      msg.lang = 'es-ES';
      speechSynthesis.speak(msg);
    } catch (e) {
      console.error(e);
    }
  }
}
