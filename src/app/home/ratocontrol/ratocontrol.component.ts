import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'ratocontrol',
  templateUrl: 'ratocontrol.component.html'
})
export class RatoControl implements OnInit {

  @Input()
  duration = 1500;

  currentIndex;
  keySelected;

  controls = ['enter', 'up', 'down', 'left', 'right', 'keyboard'];

  @Input()
  set select(selectEvent: Observable<void>) {

    selectEvent.subscribe(() => {
      this.handleSelect();
    });
  }

  @Output()
  newMove: EventEmitter<string> = new EventEmitter<string>();

  reset() {
    this.currentIndex = -1;
    this.keySelected = false;
  }

  ngOnInit() {
    this.reset();
    // init clock
    this.clockTick();
  }

  clockTick() {
    this.updateIndex();
    setTimeout(() => this.clockTick(), this.duration);
  }

  private updateIndex() {
    if (!this.keySelected) {
      this.currentIndex = ++this.currentIndex % this.controls.length;
    }
  }

  handleSelect() {
    this.keySelected = !this.keySelected;
    if (!this.keySelected) {
      this.reset();
    } else {
      // TODO think about if must be once or each clockTick??
      this.newMove.emit(this.controls[this.currentIndex.toString()]);
    }
  }

}
