import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
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
  listCta:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public loadingCtrl: LoadingController) {
    var ctaArray = JSON.parse(window.localStorage.getItem('listCta'));
    if (ctaArray.length > 0) {
      var array = [];

      ctaArray.forEach((cta, index) => {
        this.http.get('https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/getCtaDetail/num_cta/'+cta).map((res:Response) => res.json())
        .subscribe(data => {
          console.log(data);
          var result = data.split("|");
          array.push({'num':result[0], 'type':result[3]});
        });
      });

      this.listCta = array.reverse();
      this.factures = this.getMesFactures(ctaArray[0]);
    }else{
      this.listCta = [];
      this.factures = [];
    }

  }

  getMesFactures(ctaNum) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.http.get('https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/get-facture/cta/'+ctaNum).map((res:Response) => res.json())
    .subscribe(data => {
      loading.dismiss();
      console.log(data);
      this.factures = data;
    });
  }

  changeFacture(e:any){
    console.log(this.facture["objet"]);
    this.factures = this.getMesFactures(this.facture["objet"]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Factures');
  }

    /* Show Facture Page*/
  showFacture(facture){
    console.log(facture);
    this.navCtrl.push(showFacturePage, {
      number: facture.ID_FAC_CLI,
      period: facture.NUM_PER_TAR,
      amount: facture.MNT_FAC,
      dueDate: facture.DAT_EXG,
      typeFacture: facture.TYP_FAC,
      solde: facture.SLD_ECR,
      amountDone: facture.MNT_REG,
      regulationType: facture.TYP_ECR,
      regulationMode: facture.MOD_REG,
      regulationDate: facture.DAT_ECR
    });
  }
}


/*    this.typeFacture ="Facture Relève";
    this.solde ="0.0";
    this.amountDone ="65.0";
    this.regulationType ="Réglement M2T";
    this.regulationMode ="Espéces";
    this.regulationDate ="10/01/2017";*/