import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Echeances } from './echeances';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    Echeances,
  ],
  imports: [
    IonicPageModule.forChild(Echeances),
    TranslateModule
  ],
  exports: [
    Echeances
  ]
})
export class EcheancesModule {}
