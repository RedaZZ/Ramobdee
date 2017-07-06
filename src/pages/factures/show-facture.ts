import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-show-facture',
  templateUrl: 'show-facture.html'
})

export class showFacturePage{
  public number;
  public period;
  public amount;
  public dueDate;
  public typeFacture;
  public solde;
  public amountDone;
  public regulationType;
  public regulationMode;
  public regulationDate;

  constructor(public navCtrl: NavController, public navParams: NavParams ){
    this.number = navParams.get("number");
    this.period = navParams.get("period");
    this.amount = navParams.get("amount");
    this.dueDate = navParams.get("dueDate");
    this.typeFacture ="Facture Relève";
    this.solde ="0.0";
    this.amountDone ="65.0";
    this.regulationType ="Réglement M2T";
    this.regulationMode ="Espéces";
    this.regulationDate ="10/01/2017";
  }
}
