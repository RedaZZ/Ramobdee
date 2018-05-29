import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
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

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController,
              public navParams: NavParams, private http: Http) {

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
      this.navCtrl.push(resultsPage, {
      });

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Simulation');
  }

}
