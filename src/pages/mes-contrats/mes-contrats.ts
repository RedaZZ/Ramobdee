import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { AuthService } from '../../providers/auth-service';

@IonicPage()
@Component({
  selector: 'page-mes-contrats',
  templateUrl: 'mes-contrats.html',
})
export class MesContrats {
  contrats: any;
  client: any;
  compte = {};
  defaultCta:any;
  recap_compte:any;
  isEmpty:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService,
              private http: Http, public loadingCtrl: LoadingController) {

    this.client = "contrats";
    var ctaArray = JSON.parse(window.localStorage.getItem('listCta'));
    this.defaultCta=ctaArray[0];
    if (ctaArray.length > 0) {
      var array = [];
      ctaArray.forEach((cta, index) => {
        this.http.get('https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/getCtaDetail/num_cta/'+cta).map((res:Response) => res.json())
        .subscribe(data => {
          console.log(data);
          var result = data.split("|");
          array.push({'num_ct':result[0], 'type':result[3], 'num_client':result[5], 'nom_client':result[6]});
        });
      });

      this.contrats = array;
      this.recap_compte = this.getRecapCompte(this.defaultCta);
    }else{
      this.contrats = [];
      this.recap_compte = {};
    }
  }


  getRecapCompte(ctaNum) {
    let loading = this.loadingCtrl.create({
      content: 'Merci de patienter...'
    });

    loading.present();

    this.http.get('https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/getCompteClient/cta/'+ctaNum).map((res:Response) => res.json())
    .subscribe(data => {
      loading.dismiss();
      data = data.split("|");
      console.log(data);
      this.recap_compte = {'impayes':data[1], 'mt_exigible':data[2], 'credit':data[3], 'provision':data[4]};
    });
  }

  changeRecap(e:any){
    this.recap_compte = this.getRecapCompte(this.compte["objet"]);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MesContrats');
  }

}
