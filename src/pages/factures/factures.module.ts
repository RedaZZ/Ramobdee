import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Factures } from './factures';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    Factures,
  ],
  imports: [
    IonicPageModule.forChild(Factures),
    TranslateModule
  ],
  exports: [
    Factures
  ]
})
export class FacturesModule {}
