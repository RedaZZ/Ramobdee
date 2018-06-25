import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActualitesPage } from './actualites';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    ActualitesPage,
  ],
  imports: [
    IonicPageModule.forChild(ActualitesPage),
    TranslateModule
  ],
  exports: [
    ActualitesPage
  ]
})
export class ActualitesModule {}
