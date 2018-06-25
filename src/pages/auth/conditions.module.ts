import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConditionPage } from './conditions';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    ConditionPage,
  ],
  imports: [
    IonicPageModule.forChild(ConditionPage),
    TranslateModule
  ],
  exports: [
    ConditionPage
  ]
})
export class ConditionModule {}
