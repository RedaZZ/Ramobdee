import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { resultsPage } from './resultats';
import { TranslateModule }   from '../../app/translate/translate.module';



@NgModule({
  declarations: [
    resultsPage,
  ],
  imports: [
    IonicPageModule.forChild(resultsPage),
    TranslateModule
  ],
  exports: [
    resultsPage
  ]
})
export class ResultsModule {}
