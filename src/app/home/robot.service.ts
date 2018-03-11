import {Injectable} from '@angular/core';

declare let robot: any;

@Injectable()
export class RobotService {

  constructor() {
    // Speed up the mouse.
    try {
      robot.setMouseDelay(2);
    } catch (e) {
      console.warn('no robot available');
    }
  }

  getMousePos = () => robot.getMousePos();


  doMoveUp = () => this.moveUp(this.getMousePos());
  doMoveDown = () => this.moveDown(this.getMousePos());
  doMoveLeft = () => this.moveLeft(this.getMousePos());
  doMoveRight = () => this.moveRight(this.getMousePos());

  moveUp = (mousePos) => robot.moveMouse(mousePos.x, mousePos.y - 1);
  moveDown = (mousePos) => robot.moveMouse(mousePos.x, mousePos.y + 1);
  moveLeft = (mousePos) => robot.moveMouse(mousePos.x - 1, mousePos.y);
  moveRight = (mousePos) => robot.moveMouse(mousePos.x + 1, mousePos.y);
  leftClick = () => robot.mouseClick();


}
