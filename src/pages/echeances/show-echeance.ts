import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-show-echeance',
  templateUrl: 'show-echeance.html'
})

export class showEcheancePage{
  public numeroFacilite;
  public etatFacilite;
  public montantFacilite;
  public facilites;


  constructor(public navCtrl: NavController, public navParams: NavParams ){
    this.numeroFacilite = navParams.get("numeroFacilite");
    this.etatFacilite = navParams.get("etatFacilite");
    this.montantFacilite = navParams.get("montantFacilite");
    this.facilites = navParams.get("facilites");

  }
}
