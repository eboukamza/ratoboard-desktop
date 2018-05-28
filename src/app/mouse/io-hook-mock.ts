import {IoHook} from './io-hook';

export class IoHookMock implements IoHook {

  enableClickPropagation() {
    console.debug('mock enable click propagation');
  }

  disableClickPropagation() {
    console.debug('mock disable click propagation');
  }

}
