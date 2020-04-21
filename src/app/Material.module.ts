import { NgModule } from "@angular/core";
import {
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule
} from "@angular/material";

const materialComponents = [];
const materialModules = [
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule
];

@NgModule({
  declarations: [materialComponents],
  imports: [materialModules],
  exports: [materialComponents, materialModules]
})
export class MaterialModule {}
