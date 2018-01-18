import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { resultsPage} from '../simulation/resultats';


@IonicPage()
@Component({
  selector: 'page-simulation',
  templateUrl: 'simulation.html',
})
export class Simulation {
  simulation = {};
  active = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  simulate(){
    console.log(this.simulation);
    this.navCtrl.push(resultsPage, {
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Simulation');
  }

}
