import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Response } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-conso',
  templateUrl: 'conso.html',
})
export class Conso {

  conso = {};
  consos: any;
  listCta:any;
  shownGroup = null;
  defaultCta:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public loadingCtrl: LoadingController) {
    var ctaArray = JSON.parse(window.localStorage.getItem('listCta'));
    this.defaultCta=ctaArray[0];

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

      this.listCta = array
      this.consos = this.getMaConso(this.defaultCta);
    }else{
      this.listCta = [];
      this.consos = [];
    }

  }

  getMaConso(ctaNum) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.http.get('https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/get-conso/numero_contrat/'+ctaNum).map((res:Response) => res.json())
    .subscribe(data => {
      loading.dismiss();
      console.log(data);
      this.consos = data;
    });
  }

  changeConso(e:any){
    console.log(this.conso["objet"]);
    this.consos = this.getMaConso(this.conso["objet"]);
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
