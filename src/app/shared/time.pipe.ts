import {Pipe, PipeTransform} from '@angular/core';
import {TimeConverter} from "./timeConverter";

@Pipe({ name: 'time' })
export class TimePipe implements PipeTransform {
  transform(value: string, args?: string): any {
    if (!value) {
      return value;
    } else {
      return TimeConverter.convertTo12Hr(value);
    }
  }
}
