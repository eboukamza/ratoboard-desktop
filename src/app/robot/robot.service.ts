import {Injectable} from '@angular/core';
import {Robot} from './robot';

const up = (mousePos) => ({x: mousePos.x, y: mousePos.y - 1});
const down = (mousePos) => ({x: mousePos.x, y: mousePos.y + 1});
const left = (mousePos) => ({x: mousePos.x - 1, y: mousePos.y});
const right = (mousePos) => ({x: mousePos.x + 1, y: mousePos.y});

@Injectable()
export class RobotService {

  constructor(private robot: Robot) {
  }

  move = (newMousePos) => this.robot.moveMouse(newMousePos.x, newMousePos.y);

  doMoveUp = () => this.move(up(this.robot.getMousePos()));
  doMoveDown = () => this.move(down(this.robot.getMousePos()));
  doMoveLeft = () => this.move(left(this.robot.getMousePos()));
  doMoveRight = () => this.move(right(this.robot.getMousePos()));

  typeString = (txt) => this.robot.typeString(txt);

  doEnter = () => this.robot.keyTap('enter');


}
