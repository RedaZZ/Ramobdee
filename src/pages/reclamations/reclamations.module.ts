import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Reclamations } from './reclamations';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    Reclamations,
  ],
  imports: [
    IonicPageModule.forChild(Reclamations),
    TranslateModule
  ],
  exports: [
    Reclamations
  ]
})
export class ReclamationsModule {}


