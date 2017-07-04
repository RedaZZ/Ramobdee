import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Reclamations } from './reclamations';

@NgModule({
  declarations: [
    Reclamations,
  ],
  imports: [
    IonicPageModule.forChild(Reclamations),
  ],
  exports: [
    Reclamations
  ]
})
export class ReclamationsModule {}
