import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    LayoutModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    LayoutModule,
    MatInputModule
  ]
})
export class MaterialModule { }
