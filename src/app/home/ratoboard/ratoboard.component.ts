import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'ratoboard',
  templateUrl: 'ratoboard.component.html'
})
export class RatoBoard implements OnInit {

  public ABC = [
    ['', 'a', 'e', 'i', 'o', 'u'],
    ['_', 'b', 'c', 'd', 'f', 'g'],
    ['&#xf28f;', 'h', 'j', 'k', 'l', 'm'],
    ['!', 'n', 'ñ', 'p', 'q', 'r'],
    ['?', 's', 't', 'v', 'w', 'x'],
    ['&#xf376;', 'y', 'z', '', '', '&#xf2e6']
  ];

  @Input()
  duration = 1500;

  @Input()
  disabled = false;

  currentIndex;
  currentIndex2;
  first;

  keySelected = false;

  @Output()
  newChar: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  set select(selectEvent: Observable<void>) {
    selectEvent.subscribe(() => this.handleSelect());
  }

  handleSelect() {
    if (this.currentIndex === -1) { return; }

    if (this.first) {
      this.first = false;
      return;
    }
    let index1 = this.currentIndex;
    // (double-click) when the currentIndex2 is not selected then use the first line
    let index2 = this.currentIndex2 === -1 ? 0 : this.currentIndex2;

    let newChar = this.ABC[index2][index1];
    this.newChar.emit(newChar);

    this.keySelected = true;
  }

  ngOnInit() {
    this.reset();
    // init clock
    this.clockTick();
  }

  reset(fast = false) {
    this.keySelected = false;
    this.first = true;
    this.currentIndex = fast ? 0 : -1 ;
    this.currentIndex2 = -1;
  }

  clockTick() {
    this.updateIndex();
    setTimeout(() => this.clockTick(), this.duration);
  }

  private updateIndex() {
    const sleeping = this.disabled || this.keySelected;
    if (sleeping) {
      this.reset();
      return;
    }

    let selectIndex = this.first ? ++this.currentIndex : ++this.currentIndex2;
    let maxIndex = this.first ? this.ABC[0].length : this.ABC.length;

    if (selectIndex >= maxIndex) {
      this.reset(this.first);
    }
  }

}
