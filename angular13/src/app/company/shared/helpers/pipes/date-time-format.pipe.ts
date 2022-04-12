import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DtFormat } from './dt-format';

@Pipe({
  name: 'DateTimeFormatPipe'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {

  override transform(value: any): any {
    value =  super.transform(value, DtFormat._DATE_FMT);
    return null;
  }

}
