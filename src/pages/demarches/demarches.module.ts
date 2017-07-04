import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Demarches } from './demarches';

@NgModule({
  declarations: [
    Demarches,
  ],
  imports: [
    IonicPageModule.forChild(Demarches),
  ],
  exports: [
    Demarches
  ]
})
export class DemarchesModule {}
