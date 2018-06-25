import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Abonnement } from './abonnement';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    Abonnement,
  ],
  imports: [
    IonicPageModule.forChild(Abonnement),
    TranslateModule
  ],
  exports: [
    Abonnement
  ]
})
export class AbonnementModule {}
