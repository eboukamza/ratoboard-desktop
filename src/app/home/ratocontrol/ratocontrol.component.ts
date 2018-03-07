import {Component} from '@angular/core';

declare let robot: any;

@Component({
  selector: 'ratocontrol',
  templateUrl: 'ratocontrol.component.html'
})
export class RatoControl {

  up() {
    console.log('upppp');
    let mousePos = robot.getMousePos();
    robot.moveMouse(mousePos.x, mousePos.y+2);
  }
}
