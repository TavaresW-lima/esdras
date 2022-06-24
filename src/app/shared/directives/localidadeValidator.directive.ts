import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
    selector: '[localidadeValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: LocalidadeValidatorDirective,  multi: true}]
})
export class LocalidadeValidatorDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors | null {
        const regexCaracteresNaoPermitidos = new RegExp('[\\/]$|[\\d]', 'g');
        const temCaracteresInvalidos = regexCaracteresNaoPermitidos.test(control.value);
        console.log(temCaracteresInvalidos);
        return temCaracteresInvalidos 
                ? {localidadeInvalida: control.value}
                : null
    }
}