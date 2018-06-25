import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Http, Response } from '@angular/http';
import { MesContrats } from '../mes-contrats/mes-contrats';


@IonicPage()
@Component({
  selector: 'page-associer-contrat',
  templateUrl: 'associer-contrat.html',
})
export class AssocierContrat {
  contracts={};
  user: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: Http, private auth: AuthService,
              private alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.user = JSON.parse(this.auth.getUserInfo()) ;
  }

  addContrat() {
    console.log(this.contracts);
    var contrat = this.contracts["contrat"];
    var service = this.contracts["service"];
    var id_usr = this.user["id"];
    var cin = this.user["pce_idt"];
    var url = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/associer-contrat/num_cta/"+contrat+"/cod_typ_res/"+service+"/id_usr/"+id_usr+"/num_pce_idt/"+cin;

    let loading = this.loadingCtrl.create({
    content: 'Merci de patienter...'
    });
    // Api call start
    loading.present();

    this.http.get(url).map((res:Response) => res.json())
    .subscribe(data => {
      var code = data.split('|')[0];
      if (code === "1") {
        var urlCtaUser = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/get-all-cta-by-id-usr/id-user/"+id_usr;
        this.http.get(urlCtaUser).map((res:Response) => res.json()).subscribe(ctaListData => {
          console.log(ctaListData);
          var arrayCta = ctaListData.split("$")[0];
          if (arrayCta !== "") {
            arrayCta = arrayCta.split('|').filter(v=>v!='');
            window.localStorage.setItem('listCta', JSON.stringify(arrayCta));
          }
        });
      }
      // get list cta of user
        loading.dismiss();

      if (code === "-1") {
        var message = data.split('|')[1];
      } else {
        message = "Contrat: "+data.split('|')[1]+" associer avec succes à "+data.split('|')[2];
      }
      this.presentAlert(message, code);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssocierContrat');
  }

   presentAlert(content:any, code) {
    let alert = this.alertCtrl.create({
      title: 'Message',
      message: content,
      buttons: [
        {
        text: 'OK',
        handler: () => {
          console.log(code);
          if (code == 1) {
            this.navCtrl.setRoot(MesContrats);
          }
        }
        }
      ]
    });
    alert.present();
  }

}
