import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-devis',
  templateUrl: 'devis.html',
})
export class Devis {
  devis= {};
  deviss: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.deviss = this.getMesDevis();
  }

  getMesDevis() {
    this.http.get('libresources/deviss.json').map((res:Response) => res.json())
    .subscribe(data => {
       this.deviss = data;
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Devis');
  }

}
