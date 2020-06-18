import { FormGroup } from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import { CityService } from './../services/city/city.service';

export class MyValidators {
    static isDateValid(control: AbstractControl) {
        if (control.value == null) {
            return null;
        }
        const value = control.value.toString();
        const data = value.split(' ');
        if (data.length <= 1) {
            return {date: true};
        }
        return null;
    }

    static isCityValid(control: AbstractControl) {
        const value = control.value.city;
        const cities = new CityService().getCities();
        let valid = false;
        cities.forEach(element => {
            if (element.city.toString() === value) {
                valid = true;
            }
        });
        if (valid) {
            return null;
        } else {
            return {cityv: true};
        }
    }
}


// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
