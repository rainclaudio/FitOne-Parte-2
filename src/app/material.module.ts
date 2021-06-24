import { NgModule } from "@angular/core";
import {
  MatTableModule
} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  imports: [
    MatTableModule,
  ],
  exports: [
    MatTableModule,
  ]
})
export class MaterialModule{

}
