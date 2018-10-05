import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'ratocontrol',
  templateUrl: 'ratocontrol.component.html'
})
export class RatoControl implements OnInit {

  @Input()
  duration = 1500;

  @Input()
  disabled = false;

  currentIndex;
  keySelected = false;

  controls = ['left-click', 'up', 'down', 'left', 'right', 'right-click', 'keyboard'];

  @Output()
  newMove: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  set select(selectEvent: Observable<void>) {
    selectEvent.subscribe(() => this.handleSelect());
  }

  handleSelect() {
    if (this.currentIndex === -1) {
      return;
    }
    this.keySelected = !this.keySelected;
    if (this.keySelected) {
      this.newMove.emit(this.controls[this.currentIndex.toString()]);
    } else {
      this.reset();
    }
  }

  ngOnInit() {
    this.reset();
    // init clock
    this.clockTick();
  }

  reset() {
    this.currentIndex = -1;
    this.keySelected = false;
  }

  clockTick() {
    this.updateIndex();
    setTimeout(() => this.clockTick(), this.duration);
  }

  updateIndex() {
    const sleeping = this.disabled || this.keySelected;
    if (sleeping) {
      return;
    }

    this.currentIndex = ++this.currentIndex % this.controls.length;
  }

}
