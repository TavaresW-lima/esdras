import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appAutoFocus]'
})
export class AutoFocusDirective {
    constructor(private el: ElementRef<HTMLInputElement>) {
        this.el.nativeElement.focus();
    }
}