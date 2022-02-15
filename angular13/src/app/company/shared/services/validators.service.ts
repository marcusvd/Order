import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  // public _socialNetworks: SocialNetworkDto[]=[];
  public _contactForm: FormGroup;
  public _addressForm: FormGroup;
  public _characters: string = ' caracteres.';
  //length of min or max
  public _length: number;
  public _controlName: string;
  public _minLen: string = 'Preenchimento, mínimo de pelo menos ';
  public _maxLen: string = 'Preenchimento não pode ultrapassar ';
  public _req: string = ' é de preenchimento obrigatório.';

  constructor(private _Fb: FormBuilder) { }

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



/* OLD VERSION


  required(form: FormGroup, ctrl: string, msgMin?: string, msgMax?: string, msgReq?: string) {
    return form.get(ctrl).hasError('minlength')
      ? msgMin
      : form.get(ctrl).hasError('maxlength')
        ? msgMax
        : form.get(ctrl).hasError('required')
          ? msgReq : '';
  }

*/



  // AddressForm(): FormGroup {
  //   return this._addressForm = this._Fb.group({
  //     zipcode: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     street: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     number: ['', [Validators.minLength(2), Validators.maxLength(15)]],
  //     district: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     city: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     state: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     complement: ['', [Validators.minLength(2), Validators.maxLength(500)]]
  //   });
  // };

  // ContactForm(): FormGroup {
  //   //this._Fb.array(this._socialNetworks)
  //   return this._contactForm = this._Fb.group({
  //     email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
  //     cel: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     zap: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     landline: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     socialnetworks: []
  //   });

  // };


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
