import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Reseau } from './reseau';

@NgModule({
  declarations: [
    Reseau,
  ],
  imports: [
    IonicPageModule.forChild(Reseau),
  ],
  exports: [
    Reseau
  ]
})
export class ReseauModule {}
