import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Echeances } from './echeances';

@NgModule({
  declarations: [
    Echeances,
  ],
  imports: [
    IonicPageModule.forChild(Echeances),
  ],
  exports: [
    Echeances
  ]
})
export class EcheancesModule {}
