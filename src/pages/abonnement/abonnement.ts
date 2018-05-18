import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController, AlertController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { AuthService } from '../../providers/auth-service';


@IonicPage()
@Component({
  selector: 'page-abonnement',
  templateUrl: 'abonnement.html',
})
export class Abonnement {
  @ViewChild(Slides) slides: Slides;
  abonnement = {};
  active = true;
  steps: any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController,
              public navParams: NavParams, private http: Http,
              private alertCtrl: AlertController, private auth: AuthService) {
    this.steps = "step1"
  }

  goForward(number) {
    // heck if tournée correct

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if (number === 2) {
      console.log("verif tournée");
      loading.present();

      var tournee = this.abonnement["tourne"];
      var service = this.abonnement["service"];
      var url = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/Check-tournee/tournee/"+tournee+"/type_resau/"+service;

      this.http.get(url).map((res:Response) => res.json()).subscribe(data => {
        console.log(data);
        var code = data.split("|")[0];
        var message = data.split("|")[1]
        loading.dismiss();
        if (code === "1") {
          this.slides.lockSwipes(false);
          this.slides.slideNext( 100);
          this.slides.lockSwipes(true);
          this.steps = "step"+number;
        }else{
          this.presentAlert(message);
        }
      });

    }else{
      this.slides.lockSwipes(false);
      this.slides.slideNext( 100);
      this.slides.lockSwipes(true);
      this.steps = "step"+number
    }


  }

  getBack(number) {
    this.slides.lockSwipes(false);
    this.slides.slidePrev(100);
    this.slides.lockSwipes(true);
    console.log(this.abonnement);
    this.steps = "step"+number
  }

  sendForm(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    var user = JSON.parse(this.auth.getUserInfo()) ;
    var id_usr = user["id"];

    var service = this.abonnement["service"];
    var tourne = this.abonnement["tourne"];
    var first_name = this.abonnement["first_name"];
    var last_name = this.abonnement["last_name"];
    var identite = this.abonnement["identite"];
    var number_id = this.abonnement["number_id"];
    var email = this.abonnement["email"];
    var tel = this.abonnement["tel"];
    var address = this.abonnement["address"];
    var usage_elec = this.abonnement["usage_elec"];
    var usage_eau = this.abonnement["usage_eau"];
    var abonne_type = this.abonnement["abonne_type"];
    var abonne_state = this.abonnement["abonne_state"];


    var url = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/envoyerDemandeAbonnement/p_id_geo/"+tourne+"/-p_num_cli/p_rai_soc_cli/"+first_name+"/-p_cod_ttr_cli_cli/p_adr_pal_cli/"+address+"/p_no_tel_1_cli/"+tel+"/p_pno_cli/"+last_name+"/p_cod_typ_pce/"+identite+"/p_pce_idt/"+number_id+"/p_mail_cli/"+email+"/p_cod_typ_res/"+service+"/-p_i_cat_abt_abt/-p_i_cat_fac_abt/p_usr_id/"+id_usr;
    this.http.get(url).map((res:Response) => res.json()).subscribe(data => {
        console.log(data);

      });
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
    console.log('ionViewDidLoad abonnement');
  }

  presentAlert(content:any) {
    let alert = this.alertCtrl.create({
      title: 'Message Info',
      subTitle: content,
      buttons: ['Ok']
    });
    alert.present();
  }

}
