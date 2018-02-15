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
  public listEcr;
  public typeFacture;
  public solde;
/*  public amountDone;
  public regulationType;
  public regulationMode;
  public regulationDate;*/

  constructor(public navCtrl: NavController, public navParams: NavParams ){
    console.log(navParams);
    this.number = navParams.get("number");
    this.period = navParams.get("period");
    this.amount = navParams.get("amount");
    this.dueDate = navParams.get("dueDate");
    this.typeFacture = navParams.get("typeFacture");
    this.solde = navParams.get("solde");
    this.listEcr = navParams.get("listEcr");
  }
}
