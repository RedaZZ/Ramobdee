import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EFacture } from './e-facture';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    EFacture,
  ],
  imports: [
    IonicPageModule.forChild(EFacture),
    TranslateModule
  ],
  exports: [
    EFacture
  ]
})
export class EFactureModule {}
