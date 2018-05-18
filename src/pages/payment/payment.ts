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
  totalTTC:any;

  @ViewChild('allCheckbox') allCheckbox ;

  constructor( private http: Http,  public navParams: NavParams,
              public navCtrl: NavController, public loadingCtrl: LoadingController) {
/*    this.contract = navParams.get("contract");
    this.totalTTC = 0;
    this.factures = this.retrievefactures();

    var url = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/getCtaDetail/num_cta/"+this.contract;
     this.http.get(url).map((res:Response) => res.json())
    .subscribe(data => {
      this.customerName = data.split("|")[6];
    });*/
  }

  retrievefactures() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.http.get('https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/get-facture/cta/'+this.contract).map((res:Response) => res.json())
    .subscribe(data => {
      loading.dismiss();
      var result  = data.filter(function(o){return o.SLD_ECR !== "" && o.SLD_ECR !== "0,00" } );
      this.factures = result;
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Payment');
  }

  checkAll(e:any) {
    this.totalTTC = this.getTotal(this.factures);
    this.factures.forEach((f) => {
      if (e.checked) {
        f.checked = true;
      } else {
        f.checked = false;
        this.totalTTC = 0;
      }
    })
  }

  getValue(facture, e:any) {
    if(!this.allCheckbox.checked){
      console.log("getvalue code");
      if (e.checked) {
        var checkedFactures = [];
        this.factures.forEach((f) => {
          if (f == facture) {
            checkedFactures.push(f);
          }
        });
        console.log(checkedFactures.length);
        this.totalTTC = this.getTotal(checkedFactures);
      }else{
        this.allCheckbox.checked  = false;
        this.totalTTC = 0;
      }
    }
  }

  getTotal(invoices) {
    console.log("get total");
    console.log(invoices.length);
    var sum = 0;
    invoices.forEach(function(invoice) {
      var total = parseFloat(invoice.MNT_FAC);
      sum += total;
    });
    return sum.toFixed(2);
  }

  openLink(){
    var url = "https://www.fatourati.ma/FatLite/ma/Radeema/formulaire?cid=01&fid=1010";
    window.open(url, '_system');
  }
}
