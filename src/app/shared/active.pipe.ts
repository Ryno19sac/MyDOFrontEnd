import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'active'})
export class ActivePipe implements PipeTransform {
    transform(booleanValue: boolean): any {
        if (booleanValue) {
            return 'Active';
        }
        return 'Inactive'
    }
}
