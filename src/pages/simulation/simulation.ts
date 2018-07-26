import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { resultsPage} from '../simulation/resultats';
import { Http, Response } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-simulation',
  templateUrl: 'simulation.html',
})
export class Simulation {
  simulation = {};
  active = true;
  listCta:any;
  defaultCta:any;
  noCta:boolean;
  metric = "";

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController,
              private alertCtrl: AlertController,public navParams: NavParams,
              private http: Http) {
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
    }else{
      this.listCta = [];
    }
  }

  simulate(){
    console.log(this.simulation);
    let loading = this.loadingCtrl.create({
      content: 'Merci de patienter...'
    });

    var cta = this.simulation["cta"];
    var vol = this.simulation["volume"];
    var url = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/simulation-contrat/cta/"+cta+"/vol/"+vol;

    loading.present();
    this.http.get(url).map((res:Response) => res.json()).subscribe(data => {
      console.log(data);
/*      var code = data.split("|")[0];
      var message = data.split("|")[1]*/
      loading.dismiss();
      if (data.length == 0) {
        // there is no response
        this.presentAlert("Une erreur est survenue, merci de réessayer ultérieurement");
      } else {
        this.navCtrl.push(resultsPage, {
        });
      }

    });

  }

  presentAlert(content:any) {
    let alert = this.alertCtrl.create({
      title: 'Erreur',
      subTitle: content,
      buttons: ['Ok']
    });
    alert.present();
  }


  ctaChange(e:any) {
    if (e.type === "BASSE TENSION") {
      this.metric = "(Kwh)";
    } else {
      this.metric = "(m3)";
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Simulation');
  }

}
