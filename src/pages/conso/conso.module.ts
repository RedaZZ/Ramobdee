import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Conso } from './conso';

@NgModule({
  declarations: [
    Conso,
  ],
  imports: [
    IonicPageModule.forChild(Conso),
  ],
  exports: [
    Conso
  ]
})
export class ConsoModule {}
