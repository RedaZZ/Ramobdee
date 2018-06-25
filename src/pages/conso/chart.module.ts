import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartPage } from './chart';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    ChartPage,
  ],
  imports: [
    IonicPageModule.forChild(ChartPage),
    TranslateModule
  ],
  exports: [
    ChartPage
  ]
})
export class ChartModule {}
