import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MesContrats } from './mes-contrats';

@NgModule({
  declarations: [
    MesContrats,
  ],
  imports: [
    IonicPageModule.forChild(MesContrats),
  ],
  exports: [
    MesContrats
  ]
})
export class MesContratsModule {}
