import {IoHookMock} from './io-hook-mock';

export function ioHookFactory() {

  if (typeof ioHook !== 'undefined') {
    return ioHook;
  }

  console.warn('Use ioHook as a mock');
  return new IoHookMock();
}
