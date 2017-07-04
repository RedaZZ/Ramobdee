import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Simulation } from './simulation';

@NgModule({
  declarations: [
    Simulation,
  ],
  imports: [
    IonicPageModule.forChild(Simulation),
  ],
  exports: [
    Simulation
  ]
})
export class SimulationModule {}
