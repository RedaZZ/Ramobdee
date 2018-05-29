import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssocierContrat } from './associer-contrat';

@NgModule({
  declarations: [
    AssocierContrat,
  ],
  imports: [
    IonicPageModule.forChild(AssocierContrat),
  ],
  exports: [
    AssocierContrat
  ]
})
export class AssocierContratModule {}
