import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { showEcheancePage } from './show-echeance';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    showEcheancePage,
  ],
  imports: [
    IonicPageModule.forChild(showEcheancePage),
    TranslateModule
  ],
  exports: [
    showEcheancePage
  ]
})
export class ShowEcheanceModule {}
