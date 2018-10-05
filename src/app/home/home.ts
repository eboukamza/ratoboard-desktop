import {AfterViewInit, Component, EventEmitter, HostListener} from '@angular/core';
import {Storage} from '@ionic/storage';
import {MouseService} from '../mouse/mouse.service';

const DEFAULT_DURATION_MS = 1500;
const DEFAULT_MOUSE_SPEED = 10;


@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  constructor(private storage: Storage, private mouseService: MouseService) {
  }

  duration = DEFAULT_DURATION_MS;

  activeBoard: string;
  text = '';

  keySelectEmitter = new EventEmitter<void>();
  mouseSpeed = DEFAULT_MOUSE_SPEED;
  ratoControlActive = true;

  mouseSelectEmitter = new EventEmitter<void>();


  @HostListener('virtual-click')
  selectKey() {
    if (this.activeBoard === 'ratocontrol') {
      this.mouseSelectEmitter.next();
    } else {
      this.keySelectEmitter.next();
    }
  }

  ngAfterViewInit() {
    this.activeBoard = 'ratocontrol';

    this.loadConfig();
  }

  loadConfig() {
    // use the duration stored if exists
    this.storage.get('duration')
      .then(duration => this.duration = duration || DEFAULT_DURATION_MS)
      .then(() => this.storage.get('mouseSpeed'))
      .then(mouseSpeed => this.mouseSpeed = mouseSpeed || DEFAULT_MOUSE_SPEED)
      .catch(err => console.error(err));
  }

  saveDuration(duration) {
    console.debug('duration change');
    this.storage.set('duration', duration);
  }

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
        this.doSend();
        break;
      case '&#xf2e6':
        // send before switch
        this.doSend();
        // select ratocontrol
        this.activeBoard = 'ratocontrol';
        // notify ratocontrol
        this.mouseSelectEmitter.next();
        break;
      default:
        // addChar
        this.text += char;
    }

  }

  handleMove(move) {
    switch (move) {
      case 'left-click':
        this.doLeftClick();
        return;
      case 'right-click':
        this.doRightClick();
        return;
      case 'keyboard':
        this.doKeyBoard();
        return;
      default:
        this.doMouseMove(move);
    }
  }

  doLeftClick() {
    this.mouseService.doLeftClick();
    this.mouseSelectEmitter.next();
  }

  doRightClick() {
    this.mouseService.doRightClick();
    this.mouseSelectEmitter.next();
  }

  doSend() {
    this.mouseService.typeString(this.text);
    this.mouseService.doEnter();
    // clear buffer
    this.text = '';
  }

  doKeyBoard() {
    this.activeBoard = 'ratoboard';
  }

  doMouseMove(move) {
    console.log(move);
    if (!move) {
      return;
    }
    let action;
    switch (move) {
      case 'up':
        action = this.mouseService.doMoveUp;
        break;
      case 'down':
        action = this.mouseService.doMoveDown;
        break;
      case 'left':
        action = this.mouseService.doMoveLeft;
        break;
      case 'right':
        action = this.mouseService.doMoveRight;
        break;
    }

    let intervalId = setInterval(() => {
      console.log(move);
      action();
    }, this.mouseSpeed);

    this.mouseSelectEmitter.subscribe(() => {
      clearInterval(intervalId);
    });
  }

  isRatoControlActive() {
    return !this.ratoControlActive;
  }

  isRatoBoardActive() {
    return this.activeBoard === 'ratoboard';
  }

  saveMouseSpeed(mouseSpeed) {
    this.storage.set('mouseSpeed', mouseSpeed);
  }

  setEnable(ratoControlActive) {
    setTimeout(() => ratoControlActive ? this.mouseService.disableClickPropagation() : this.mouseService.enableClickPropagation(),
        100);
  }

}
