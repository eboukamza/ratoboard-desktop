import {Directive, ElementRef, Input} from '@angular/core';

@Directive({selector: '[ratoKey]'})
export class RatoKeyDirective {

  private _key: string = '';

  constructor(private el: ElementRef) {
  }

  @Input('ratoKey')
  get key(): string {
    return this._key;
  }

  set key(val: string) {
    //TODO explain
    if (/^&/.test(val)) {
      this.el.nativeElement.style.fontFamily = 'Ionicons';
      this.el.nativeElement.style.fontSize= '20px';

    }
    this.el.nativeElement.innerHTML = val;
  }


}
