import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { showEcheancePage} from '../echeances/show-echeance';


@IonicPage()
@Component({
  selector: 'page-echeances',
  templateUrl: 'echeances.html',
})
export class Echeances {

  echeance = {};
  echeances: any;
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
      this.echeances = this.getMesEcheances(this.defaultCta);
    }else{
      this.listCta = [];
      this.echeances = [];
    }

  }

  getMesEcheances(cta) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    var url ="https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/get-echeances/cta/"+cta;
    this.http.get(url).map((res:Response) => res.json())
    .subscribe(data => {
      loading.dismiss();
      console.log(data);
      this.echeances = data;
      console.log("check empty");
      if (this.echeances[0].ERR_COD !=="007") {
        this.isEmpty = false;
      }
    });
  }

  changeEcheance(e:any){
    console.log("change echeance");
    this.isEmpty = true;
    this.echeances = this.getMesEcheances(this.echeance["objet"]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Echeances');
  }

  showEcheance(echeance){
    this.navCtrl.push(showEcheancePage, {
      numeroFacilite: echeance.NUM_FPA,
      etatFacilite: echeance.ETA_FPA,
      montantFacilite: echeance.MNT_FPA,
      facilites: echeance.list_ECH
    });
  }
}
