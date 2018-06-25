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
  defaultCta:any;
  isEmpty: boolean;
  noCta: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: Http, public loadingCtrl: LoadingController) {
    var ctaArray = JSON.parse(window.localStorage.getItem('listCta'));
    if (!ctaArray) {
      this.noCta = true;
    }

    if (ctaArray && ctaArray.length > 0) {
      this.defaultCta=ctaArray[0];
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
      this.factures = this.getMesFactures(this.defaultCta);
    }else{
      this.listCta = [];
      this.factures = [];
    }

  }

  getMesFactures(ctaNum) {
    let loading = this.loadingCtrl.create({
      content: 'Merci de patienter...'
    });

    loading.present();
    this.http.get('https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/get-facture/cta/'+ctaNum).map((res:Response) => res.json())
    .subscribe(data => {
      loading.dismiss();
      console.log(data);
      this.factures = data;
      if (this.factures[0].ERR_COD !=="007") {
        this.isEmpty = false;
      }else{
        this.isEmpty = true;
      }
    });
  }

  changeFacture(e:any){
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
      period: facture.NUM_PER_TAR+"/"+facture.ANNNE,
      amount: facture.MNT_FAC,
      dueDate: facture.DAT_EXG,
      typeFacture: facture.TYP_FAC,
      solde: facture.SLD_ECR,
      listEcr: facture.list_ECR
    });
  }
}
