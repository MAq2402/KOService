import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

import { NgModule } from '@angular/core';

@NgModule({
  imports:[
MatTableModule,
MatCardModule,
MatToolbarModule,
MatDialogModule,
MatInputModule,
MatFormFieldModule,
MatSelectModule,
MatButtonModule,
MatSidenavModule
],
  exports: [
      MatTableModule,
      MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule
    ],
})
export class MaterialModule { }