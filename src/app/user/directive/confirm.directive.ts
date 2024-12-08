import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appConfirm]',
})
export class ConfirmDirective {
  @Input() appConfirm: () => void;
  @Input() confirmMessage: string;

  constructor() {}

  @HostListener('click', ['$event'])
  onConfirmClick(event: Event) {
    event.preventDefault();
    let confirm = window.confirm(this.confirmMessage);
    if (confirm) {
      this.appConfirm();
    }
  }
}
