import { OnHoverDirective } from './on-hover.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [OnHoverDirective],
    imports: [CommonModule],
    exports: [OnHoverDirective]
})
export class OnHoverModule { }
