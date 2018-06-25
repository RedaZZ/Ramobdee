import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { showNewsPage } from './news';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    showNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(showNewsPage),
    TranslateModule
  ],
  exports: [
    showNewsPage
  ]
})
export class NewsModule {}