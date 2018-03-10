import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";

declare let robot: any;
const MAX_INDEX = 5; // num of keys.

@Component({
  selector: 'ratocontrol',
  templateUrl: 'ratocontrol.component.html'
})
export class RatoControl implements OnInit {

  @Input()
  duration = 1500;

  currentIndex;
  keySelected;

  @Input()
  set select(selectEvent: Observable<void>) {

    selectEvent.subscribe(() => {
      this.handleSelect();
    });
  }

  ngOnInit() {
    // init clock
    this.clockTick();
  }

  clockTick() {
    this.currentIndex = ++this.currentIndex % MAX_INDEX;
    setTimeout(() => this.clockTick(), this.duration);
  }

  handleSelect() {
    this.keySelected = !this.keySelected;
  }

  up() {
    console.log('upppp');
    let mousePos = robot.getMousePos();
    robot.moveMouse(mousePos.x, mousePos.y + 2);
  }
}
