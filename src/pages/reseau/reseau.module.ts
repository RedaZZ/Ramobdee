import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Reseau } from './reseau';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    Reseau,
  ],
  imports: [
    IonicPageModule.forChild(Reseau),
    TranslateModule
  ],
  exports: [
    Reseau
  ]
})
export class ReseauModule {}

