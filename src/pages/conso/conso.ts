import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-conso',
  templateUrl: 'conso.html',
})
export class Conso {

  conso = {};
  consos: any;
  shownGroup = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.consos = this.getMaConso();
  }

  getMaConso() {
  this.http.get('http://9e5a89d6.ngrok.io/api/jsonws/WsForMob-portlet.wsmob/get-conso/numero_contrat/575648').map((res:Response) => res.json())
  .subscribe(data => {
     this.consos = data;
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Conso');
  }

  toggleGroup(group) {
    console.log(group);
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };

}
