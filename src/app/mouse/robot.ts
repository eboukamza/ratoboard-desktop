export abstract class Robot {

  abstract moveMouse(posX, posY);
  abstract getMousePos();
  abstract typeString (txt);
  abstract keyTap (key);
  abstract mouseClick(button?: 'left'| 'right', double?: boolean);

}
