import {Injectable} from '@angular/core';
import {Robot} from './robot';
import {IoHook} from './io-hook';

const up = (mousePos) => ({x: mousePos.x, y: mousePos.y - 1});
const down = (mousePos) => ({x: mousePos.x, y: mousePos.y + 1});
const left = (mousePos) => ({x: mousePos.x - 1, y: mousePos.y});
const right = (mousePos) => ({x: mousePos.x + 1, y: mousePos.y});

@Injectable()
export class MouseService {

  constructor(private robot: Robot, private ioHook: IoHook) {
  }

  move = (newMousePos) => this.robot.moveMouse(newMousePos.x, newMousePos.y);

  doMoveUp = () => this.move(up(this.robot.getMousePos()));
  doMoveDown = () => this.move(down(this.robot.getMousePos()));
  doMoveLeft = () => this.move(left(this.robot.getMousePos()));
  doMoveRight = () => this.move(right(this.robot.getMousePos()));

  typeString = (txt) => this.robot.typeString(txt);

  doEnter = () => this.robot.keyTap('enter');

  doClick() {
    this.ioHook.enableClickPropagation();
    setTimeout(() => {
      this.robot.mouseClick();
      setTimeout(() => {
        this.ioHook.disableClickPropagation();
      }, 100);
    }, 100);
  }

  disableClickPropagation() {
    this.ioHook.disableClickPropagation();
  }

  enableClickPropagation() {
    this.ioHook.enableClickPropagation();
  }
}
