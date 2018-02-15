import { Component, Injectable, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from '../../providers/auth-service';


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

  constructor( private http: Http,  public navParams: NavParams,
              public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.contract = navParams.get("contract");
    this.factures = this.retrievefactures();

    var url = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/getCtaDetail/num_cta/"+this.contract;
     this.http.get(url).map((res:Response) => res.json())
    .subscribe(data => {
      this.customerName = data.split("|")[6];
    });
  }

  retrievefactures() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.http.get('https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/get-facture/cta/'+this.contract).map((res:Response) => res.json())
    .subscribe(data => {
      console.log(data);
      loading.dismiss();
      var result  = data.filter(function(o){return o.SLD_ECR !== "0,00" } );
      console.log(result);
      this.factures = result;
      this.totalTTC = this.getTotal(this.factures);
    });
/*        this.factures = response;
        this.customerName = response.customerName;
        this.totalTTC = this.getTotal(response.invoices);*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Payment');
  }

  checkAll(e:any) {
    this.factures.forEach((f) => {
      if (e.checked) {
        f.checked = true;
      } else {
        f.checked = false;
      }
    })
    this.totalTTC = this.getTotal(this.factures);
  }

  getValue(facture, e:any) {
    if (e.checked) {
      console.log("checked");
      this.totalTTC = facture.MNT_FAC;
    } else {
      console.log("not checked");
      this.allCheckbox.checked  = false;
    }

    console.log(facture);
  }

  getTotal(invoices) {
    console.log(invoices);
    var sum = 0;
    invoices.forEach(function(invoice) {
      var total = Number(invoice.MNT_FAC);
      sum += total;
    });
    return sum.toFixed(2);
  }
}
