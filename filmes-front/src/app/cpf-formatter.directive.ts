/*import { Directive } from '@angular/core';

@Directive({
  selector: '[appCpfFormatter]'
})
export class CpfFormatterDirective {

  constructor() { }

}*/

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCpfFormatter]'
})
export class CpfFormatterDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Permitir todos os caracteres
    input.value = value;

    // Verificar se o valor é composto apenas por números
    const numericValue = value.replace(/\D/g, '');
    if (/^\d+$/.test(numericValue)) {
      if (numericValue.length <= 3) {
        // Sem formatação
        input.value = numericValue;
      } else if (numericValue.length <= 6) {
        // Formata como xxx.xxx
        input.value = numericValue.replace(/(\d{3})(\d+)/, '$1.$2');
      } else if (numericValue.length <= 9) {
        // Formata como xxx.xxx.xxx
        input.value = numericValue.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
      } else {
        // Formata como xxx.xxx.xxx-xx
        input.value = numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }
    }
  }
}

