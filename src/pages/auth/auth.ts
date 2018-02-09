import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController, AlertController, LoadingController} from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { ConditionPage } from '../auth/conditions';


@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})

export class Auth {

  @ViewChild(Slides) slides: Slides;

  steps: any;
/*  results: any;*/
  complete_name: any;
  user={};
  active=true;
  contracts={};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: Http, public modalCtrl: ModalController,
              private alertCtrl: AlertController, public loadingCtrl: LoadingController) {

    this.steps = "step1"
  }

  goForward(number) {
    // there will be only two steps to create a user instead of 4
/*    if (this.steps === "step1") {
      var url = "https://921012d9.ngrok.io/api/jsonws/WsForMob-portlet.wsmob/getCtaDetail/num_cta/"+this.user["contract"];
        this.http.get(url).map((res:Response) => res.json())
      .subscribe(data => {
        console.log(data);
        var splitted = data.split("|");
         this.complete_name = splitted[6];
      });
    }*/

    // go to next slide
    this.slides.lockSwipes(false);
    this.slides.slideNext(50);
    this.slides.lockSwipes(true);
    this.steps = "step"+number
  }

  getBack(number) {
    this.slides.lockSwipes(false);
    this.slides.slidePrev(50);
    this.slides.lockSwipes(true);
    this.steps = "step"+number
  }

  register(){

        // init loading spinner
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    console.log("register");

    var titre = this.user['titre'];
    var prenom = this.user['prenom'];
    var name = this.user['name'];
    var piece_identite = this.user['piece_identite'];
    var email = this.user['email'];
    var mot_de_passe = this.user['mot_de_passe'];
    var telephone = this.user['telephone'];

    console.log(this.user);
    var url = "https://921012d9.ngrok.io/api/jsonws/WsForMob-portlet.wsmob/creer-utilisateur/name/"
    +name+"/prenom/" +prenom+"/piece_identite/"+piece_identite+"/titre/"+titre+"/email/"+email+
    "/telephone/"+telephone+"/mot_de_passe/"+mot_de_passe;

    console.log(url);
    // Api call start
    loading.present();

    this.http.get(url).map((res:Response) => res.json()).subscribe(data => {
      console.log(data);
      // api call done
      loading.dismiss();

      if (data.includes("ion")) {
        this.presentAlert("Cet Email exist déja");
      } else {
        // creation avec succées
        this.presentAlert("Vieuillez valider votre inscription en cliquant sur le lien reçu par Email");
      }
/*      this.results = data;*/
    });

  }

  // open modal to read condition of use
  openModal(e:any) {
    if (e.checked) {
      console.log("checked");
      let myModal = this.modalCtrl.create(ConditionPage);
      myModal.present();
    }
  }

  // display Alert when user created or not
  presentAlert(content:any) {
    let alert = this.alertCtrl.create({
      title: 'Message Info',
      subTitle: content,
      buttons: ['Ok']
    });
    alert.present();
  }


  ionViewDidLoad() {
    this.slides.lockSwipes(true);
    console.log('ionViewDidLoad Auth');
  }



}