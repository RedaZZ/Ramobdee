import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Domiciliation } from './domiciliation';

@NgModule({
  declarations: [
    Domiciliation,
  ],
  imports: [
    IonicPageModule.forChild(Domiciliation),
  ],
  exports: [
    Domiciliation
  ]
})
export class DomiciliationModule {}
