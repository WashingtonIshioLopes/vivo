/*(import { Directive } from '@angular/core';

@Directive({
  selector: '[appDateFormatter]'
})
export class DateFormatterDirective {

  constructor() { }

}*/

import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDateFormatter]'
})
export class DateFormatterDirective {

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent): void {
    const input = this.el.nativeElement;
    let formatted = input.value.replace(/[^0-9]/g, '');
    if (formatted.length > 2) {
      formatted = formatted.slice(0, 2) + '/' + formatted.slice(2);
    }
    if (formatted.length > 5) {
      formatted = formatted.slice(0, 5) + '/' + formatted.slice(5, 9);
    }
    if (this.control && this.control.control) {
      this.control.control.setValue(formatted);
    }
  }
}

