import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Simulation } from './simulation';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    Simulation,
  ],
  imports: [
    IonicPageModule.forChild(Simulation),
    TranslateModule
  ],
  exports: [
    Simulation
  ]
})
export class SimulationModule {}
