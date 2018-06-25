import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Devis } from './devis';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    Devis,
  ],
  imports: [
    IonicPageModule.forChild(Devis),
    TranslateModule
  ],
  exports: [
    Devis
  ]
})
export class DevisModule {}
