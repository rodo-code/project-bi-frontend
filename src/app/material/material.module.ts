import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    LayoutModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    LayoutModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
