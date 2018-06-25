import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssocierContrat } from './associer-contrat';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    AssocierContrat,
  ],
  imports: [
    IonicPageModule.forChild(AssocierContrat),
    TranslateModule
  ],
  exports: [
    AssocierContrat
  ]
})
export class AssocierContratModule {}
