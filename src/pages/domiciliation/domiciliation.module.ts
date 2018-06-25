import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Domiciliation } from './domiciliation';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    Domiciliation,
  ],
  imports: [
    IonicPageModule.forChild(Domiciliation),
    TranslateModule
  ],
  exports: [
    Domiciliation
  ]
})
export class DomiciliationModule {}
