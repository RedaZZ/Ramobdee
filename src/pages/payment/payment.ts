import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})

@Injectable()
export class Payment {
  factures: any;
  contract: any;

  constructor( private http: Http, public navCtrl: NavController) {
    this.factures = this.retrievefactures();
    this.contract = "156840";
  }

  getfactures() {
    return this.http.get('libresources/test.json').map((res:Response) => res.json());
  }

  retrievefactures() {
    return this.getfactures().subscribe((response) => {
        console.log("response");
        console.log(response);
        this.factures = response[0];
      }, (error) => {
        console.log("error");
        console.log(error);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Payment');
  }

  checkAll(e:any) {
    this.factures.invoices.forEach((f) => {
      if (e.checked) {
        f.checked = true;
      } else {
        f.checked = false;
      }
    })
  }

  getValue(facture) {
    console.log(facture);
  }
}
