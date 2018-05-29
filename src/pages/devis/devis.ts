import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Response } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-devis',
  templateUrl: 'devis.html',
})
export class Devis {
  devis= {};
  deviss: any;
  listCta: any;
  defaultCta: any;
  isEmpty: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public loadingCtrl: LoadingController) {
    var ctaArray = JSON.parse(window.localStorage.getItem('listCta'));
    this.defaultCta=ctaArray[0];
    this.isEmpty = true;

    if (ctaArray.length > 0) {
      var array = [];

      ctaArray.forEach((cta, index) => {
        this.http.get('https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/getCtaDetail/num_cta/'+cta).map((res:Response) => res.json())
        .subscribe(data => {
          var result = data.split("|");
          array.push({'num':result[0], 'type':result[3]});
        });
      });

      this.listCta = array
      this.deviss = this.getMesDevis(this.defaultCta);
    }else{
      this.listCta = [];
      this.deviss = [];
    }

  }

  getMesDevis(cta) {
    let loading = this.loadingCtrl.create({
      content: 'Merci de patienter...'
    });

    loading.present();
    var url ="https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/get-devis/cta/"+cta;
    this.http.get(url).map((res:Response) => res.json())
    .subscribe(data => {
      loading.dismiss();
      console.log(data);
      this.deviss = data;
      if (this.deviss[0].ERR_COD !=="007") {
        this.isEmpty = false;
      }
    });
  }

  changeDevis(e:any){
    this.isEmpty = true;
    this.deviss = this.getMesDevis(this.devis["objet"]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Devis');
  }

}
