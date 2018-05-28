import {RobotMock} from './robot-mock';

export function robotFactory() {
  try {
    robot.setMouseDelay(2);
    return robot;
  } catch (err) {
    console.warn('Use Robot as Mock', err);
    return new RobotMock();
  }
}
