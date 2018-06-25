import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Settings } from './settings';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    Settings,
  ],
  imports: [
    IonicPageModule.forChild(Settings),
    TranslateModule
  ],
  exports: [
    Settings
  ]
})
export class SettingsModule {}
