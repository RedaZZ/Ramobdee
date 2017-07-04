import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Factures } from './factures';

@NgModule({
  declarations: [
    Factures,
  ],
  imports: [
    IonicPageModule.forChild(Factures),
  ],
  exports: [
    Factures
  ]
})
export class FacturesModule {}
