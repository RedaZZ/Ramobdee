import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { showFacturePage} from '../factures/show-facture';

@IonicPage()
@Component({
  selector: 'page-factures',
  templateUrl: 'factures.html',
})
export class Factures {
  facture = {};
  factures: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.factures = this.getMesFactures();
  }

  getMesFactures() {
    this.http.get('libresources/factures.json').map((res:Response) => res.json())
    .subscribe(data => {
       this.factures = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Factures');
  }

    /* Show Facture Page*/
  showFacture(facture){
    this.navCtrl.push(showFacturePage, {
      number: facture.number,
      period: facture.period,
      amount: facture.amount,
      dueDate: facture.dueDate
    });
  }
}
