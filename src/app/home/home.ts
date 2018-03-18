import {AfterViewInit, Component, EventEmitter, HostListener, ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage';
import {RobotService} from '../robot/robot.service';

const DEFAULT_DURATION_MS = 1500;

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  @ViewChild('textInput') textInput;

  text = '';

  duration = DEFAULT_DURATION_MS;

  keySelectEmitter = new EventEmitter<void>();
  mouseSelectEmitter = new EventEmitter<void>();

  activeBoard: string;
  ratoControlActive = true;

  selectKey() {
    if (this.activeBoard === 'ratocontrol') {
      this.mouseSelectEmitter.next();
    } else {
      this.keySelectEmitter.next();
    }
  }

  setFocus() {
    this.textInput.setFocus();
  }

  constructor(private storage: Storage, private robotService: RobotService) {
  }

  ngAfterViewInit() {

    // should be global for allow the control outside the window
    document.addEventListener('virtual-click', () => {
      this.selectKey();
    });

    this.activeBoard = 'ratocontrol';

    this.loadDuration();
  }

  loadDuration() {
    // use the duration stored if exists
    this.storage.get('duration')
      .then(duration => this.duration = duration || DEFAULT_DURATION_MS)
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
        this.robotService.typeString(this.text);
        this.robotService.doEnter();
        // clear buffer
        this.text = '';
        break;
      case 'exit':
        // select ratocontrol;
        this.activeBoard = 'ratocontrol';
        // notify ratocontrol
        this.mouseSelectEmitter.next();
        break;
      default:
        // addChar
        this.text += char;
    }

    this.setFocus();

  }

  handleMove(move) {
    switch (move) {
      case 'enter':
        this.doEnter();
        return;
      case 'keyboard':
        this.doKeyBoard();
        return;
      default:
        this.doMouseMove(move);
    }
  }

  doEnter() {
    this.robotService.doEnter();
    this.robotService.typeString(this.text);
    this.mouseSelectEmitter.next();
  }

  doKeyBoard() {
    this.setFocus();
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
        action = this.robotService.doMoveUp;
        break;
      case 'down':
        action = this.robotService.doMoveDown;
        break;
      case 'left':
        action = this.robotService.doMoveLeft;
        break;
      case 'right':
        action = this.robotService.doMoveRight;
        break;
    }

    let intervalId = setInterval(() => {
      console.log(move);
      action();
    }, 10);

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

}
