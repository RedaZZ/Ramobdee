import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { showFacturePage } from './show-facture';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    showFacturePage,
  ],
  imports: [
    IonicPageModule.forChild(showFacturePage),
    TranslateModule
  ],
  exports: [
    showFacturePage
  ]
})
export class ShowFactureModule {}
