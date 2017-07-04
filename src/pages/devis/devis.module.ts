import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Devis } from './devis';

@NgModule({
  declarations: [
    Devis,
  ],
  imports: [
    IonicPageModule.forChild(Devis),
  ],
  exports: [
    Devis
  ]
})
export class DevisModule {}
