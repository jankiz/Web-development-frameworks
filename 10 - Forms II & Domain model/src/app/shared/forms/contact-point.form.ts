import { FormGroup, FormControl } from '@angular/forms';
export function getContactPoint(system: string): FormGroup {
    return new FormGroup({
        system: new FormControl(system),
        value: new FormControl()
    });
}
