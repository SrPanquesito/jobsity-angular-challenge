import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLetterUppercasePipe } from 'src/app/pipes/first-letter-uppercase.pipe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const APP = [
  FirstLetterUppercasePipe
];

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
];

@NgModule({
  declarations: [
    FirstLetterUppercasePipe
  ],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
  ],
  exports: [
    ...APP,
    ...MATERIAL_MODULES,
  ]
})
export class SharedModule { }
