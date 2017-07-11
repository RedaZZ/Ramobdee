import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { showEcheancePage} from '../echeances/show-echeance';


@IonicPage()
@Component({
  selector: 'page-echeances',
  templateUrl: 'echeances.html',
})
export class Echeances {

  echeance = {};
  echeances: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.echeances = this.getMesEcheances();
  }

  getMesEcheances() {
    this.http.get('libresources/echeances.json').map((res:Response) => res.json())
    .subscribe(data => {
       this.echeances = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Echeances');
  }

  showEcheance(echeance){
    this.navCtrl.push(showEcheancePage, {
      numeroFacilite: echeance.numeroFacilite,
      etatFacilite: echeance.etatFacilite,
      montantFacilite: echeance.montantFacilite,
      facilites: echeance.facilites
    });
  }
}
