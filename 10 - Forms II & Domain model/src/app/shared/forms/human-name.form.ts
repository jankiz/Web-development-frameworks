import { FormGroup, FormControl, FormArray } from '@angular/forms';

export function getHumanName(use: string): FormGroup {
    return new FormGroup({
        use: new FormControl(use),
        text: new FormControl(),
        family: new FormControl(),
        given: new FormArray([])
    });
}

