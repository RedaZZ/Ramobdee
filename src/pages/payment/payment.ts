import { Component, Injectable, ViewChild } from '@angular/core';
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
  customerName: any;
  totalTTC: any;

  @ViewChild('allCheckbox') allCheckbox ;

  constructor( private http: Http,  public navParams: NavParams, public navCtrl: NavController) {
    this.factures = this.retrievefactures();
    this.contract = navParams.get("contract");
  }

  getfactures() {
    return this.http.get('http://www.fatourati.ma/RM-Rest/rest/rm/customerInvoices/'+this.navParams.get("contract")).map((res:Response) => res.json());
  }

  retrievefactures() {
    return this.getfactures().subscribe((response) => {
        console.log("response");
        console.log(response);
        this.factures = response;
        this.customerName = response.customerName;
        this.totalTTC = this.getTotal(response.invoices);
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

  getValue(facture, e:any) {
    if (e.checked) {
      console.log("checked");
      this.totalTTC = facture.montantTTC;
    } else {
      console.log("not checked");
      this.allCheckbox.checked  = false;
    }

    console.log(facture);
  }

  getTotal(invoices) {
    var sum = 0;
    invoices.forEach(function(invoice) {
      var total = Number(invoice.montantTTC);
      sum += total;
    });
    return sum.toFixed(2);
  }
}
