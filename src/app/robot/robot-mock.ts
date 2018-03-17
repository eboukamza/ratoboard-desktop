import {Robot} from './robot';

export class RobotMock implements Robot {

  private mousePos: {x: number, y: number} = {
    x: 100,
    y: 100
  };

  moveMouse(posX, posY) {
    this.mousePos.x = posX;
    this.mousePos.y = posY;
    console.debug('mock mouse move', this.mousePos);
  }

  getMousePos = () => (this.mousePos);
  typeString = (txt) => console.debug('mock typeString', txt);
  keyTap = (key) => console.debug('mock keyTap', key);
}
