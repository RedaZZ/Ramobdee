import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { showVideosPage } from './videos';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    showVideosPage,
  ],
  imports: [
    IonicPageModule.forChild(showVideosPage),
    TranslateModule
  ],
  exports: [
    showVideosPage
  ]
})
export class VideosModule {}