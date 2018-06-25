import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { showDataPage } from './show';
import { TranslateModule }   from '../../app/translate/translate.module';


@NgModule({
  declarations: [
    showDataPage,
  ],
  imports: [
    IonicPageModule.forChild(showDataPage),
    TranslateModule
  ],
  exports: [
    showDataPage
  ]
})
export class ShowModule {}
