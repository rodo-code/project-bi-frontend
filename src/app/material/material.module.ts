import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    LayoutModule
  ],
  exports: [
    MatButtonModule,
    LayoutModule
  ]
})
export class MaterialModule { }
