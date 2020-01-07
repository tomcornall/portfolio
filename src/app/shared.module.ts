import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HoverClassDirective } from './hover-class.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [],
  declarations: [
    HoverClassDirective
  ],
  exports: [
    FormsModule,
    CommonModule,
    HoverClassDirective
  ]
})
export class SharedModule { }
