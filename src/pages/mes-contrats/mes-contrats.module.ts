import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MesContrats } from './mes-contrats';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    MesContrats,
  ],
  imports: [
    IonicPageModule.forChild(MesContrats),
    TranslateModule
  ],
  exports: [
    MesContrats
  ]
})
export class MesContratsModule {}
