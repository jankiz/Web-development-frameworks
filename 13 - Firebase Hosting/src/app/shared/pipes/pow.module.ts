import { PowPipe } from './pow.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [PowPipe],
    imports: [CommonModule],
    exports: [PowPipe],
    providers: [],
})
export class PowModule { }
