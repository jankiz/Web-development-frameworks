import { FormGroup, FormControl } from '@angular/forms';

export function getAddressForm(): FormGroup {
    return new FormGroup({
        text: new FormControl()
    });
}
