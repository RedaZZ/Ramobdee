import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Abonnement } from './abonnement';

@NgModule({
  declarations: [
    Abonnement,
  ],
  imports: [
    IonicPageModule.forChild(Abonnement),
  ],
  exports: [
    Abonnement
  ]
})
export class AbonnementModule {}
