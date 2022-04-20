import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public _contactForm: FormGroup;
  public _addressForm: FormGroup;
  public _characters: string = ' caracteres.';
  //length of min or max
  public _length: number;
  public _controlName: string;
  public _minLen: string = 'Preenchimento, mínimo de pelo menos ';
  public _maxLen: string = 'Preenchimento não pode ultrapassar ';
  public _req: string = ' é de preenchimento obrigatório.';

  constructor() { }

  public touchedErrors(ctrl: string, formGroup: FormGroup) {
    return formGroup.get(ctrl).errors
      && formGroup.get(ctrl).touched
      ? true : false;
  }
  commonFields(ctrl: string, msgMin: string, msgMax: string, form: FormGroup) {
    return form.get(ctrl).hasError('minlength')
      ? msgMin : form.get(ctrl).hasError('maxlength')
        ? msgMax : '';
  }
  required2(form: FormGroup, ctrl: string, ctrlToShow: string, lengthMin?: number, lengthMax?: number) {
    return form.get(ctrl).hasError('minlength')
      ? `${this._minLen}${lengthMin}${this._characters}`
      : form.get(ctrl).hasError('maxlength')
        ? `${this._maxLen}${lengthMax}${this._characters}`
        : form.get(ctrl).hasError('required')
          ? `${ctrlToShow + ' '}${this._req}` : '';
  }
  mailField(ctrl: string, msgEmail: string, msgMax: string, msgReq: string, form: FormGroup) {
    return form.get(ctrl).hasError('email')
      ? msgEmail
      : form.get(ctrl).hasError('maxlength')
        ? msgMax
        : form.get(ctrl).hasError('required')
          ? msgReq : '';
  }
  requiredArray(formArray: FormArray, ctrl: string, ctrlToShow: string, lengthMin?: number, lengthMax?: number) {

    return formArray.get(ctrl).hasError('minlength')
      ? `${this._minLen}${lengthMin}${this._characters}`
      : formArray.get(ctrl).hasError('maxlength')
        ? `${this._maxLen}${lengthMax}${this._characters}`
        : formArray.get(ctrl).hasError('required')
          ? `${ctrlToShow + ' '}${this._req}` : '';
  }

  public touchedErrorsArray(formArray: FormArray, ctrl: string) {
    return formArray.get(ctrl).errors && formArray.get(ctrl).touched ? true : false;
  }


  cleanAfters(toClean: string[], form?: FormGroup) {
    if (toClean.length != -1) {
      toClean.forEach((item) => {
        if (item.toLocaleLowerCase() === 'contact') {
          if (this._contactForm != undefined) {
            this._contactForm.reset();
            (<HTMLInputElement>document.getElementById('socialnetName')).value = '';
            (<HTMLInputElement>document.getElementById('socialnetUrl')).value = '';
            // this._socialNetworks = [];
          }
        }
        if (item.toLocaleLowerCase() === 'address') {
          if (this._addressForm != undefined) {
            this._addressForm.reset();
          }
        }
        if (form != undefined) {
          form.reset();
        }
        if (form != null) {
          form.reset();
        }
      })
    }

  }
}
