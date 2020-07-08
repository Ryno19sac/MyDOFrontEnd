import {Pipe, PipeTransform} from '@angular/core';
import {CountryCode, parsePhoneNumber} from 'libphonenumber-js/min';

@Pipe({name: 'phone'})
export class PhonePipe implements PipeTransform {
    /* value input should be changed to ParsedNumber if internationalizing code */
    transform(phoneValue: string | string, country: string): any {
        try {
            // check for international
            if(country == 'e164') {
                const phoneNumber = parsePhoneNumber(phoneValue, 'US');
                return phoneNumber.format('E.164');
            }
            // else use the specified country

            const phoneNumber = parsePhoneNumber(phoneValue + '', country as CountryCode);
            return phoneNumber.formatNational();
        } catch (error) {
            return phoneValue;
        }
    }
}
