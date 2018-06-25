import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Conso } from './conso';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    Conso,
  ],
  imports: [
    IonicPageModule.forChild(Conso),
    TranslateModule
  ],
  exports: [
    Conso
  ]
})
export class ConsoModule {}


