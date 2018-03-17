import {RobotMock} from './robot-mock';
declare const robot: any;

export function robotFactory() {
  try {
    robot.setMouseDelay(2);
    return robot;
  } catch (err) {
    console.warn('Use Robot as Mock');
    return new RobotMock;
  }
}
