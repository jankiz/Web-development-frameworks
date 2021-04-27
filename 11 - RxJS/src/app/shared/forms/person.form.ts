import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { getContactPoint } from './contact-point.form';
import { getHumanName } from './human-name.form';
import { getIdentifierForm } from './identifier.form';

export function getPersonForm(): FormGroup {
    return new FormGroup({
        address: new FormArray([]),
        active: new FormControl(),
        birthDate: new FormControl(),
        gender: new FormControl('Egyéb'),

        id: new FormControl(),
        identifier: new FormArray([
            getIdentifierForm('uid'),
            getIdentifierForm('email'),
        ]),

        name: new FormArray([
            getHumanName('official'),
            getHumanName('maiden')
        ]),
        telecom: new FormArray([
            getContactPoint('email'),
            getContactPoint('phone'),
        ])
    });
}
