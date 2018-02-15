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
      var url = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/getCtaDetail/num_cta/"+this.user["contract"];
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
    var url = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/creer-utilisateur/name/"
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
        //url to get hash to send email confirmation
        var urlHash = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/get-hash/id-user/"+data+"/action/A";
        this.http.get(urlHash).map((res:Response) => res.json()).subscribe(dataHash => {
          var hashSplitted = dataHash.split("|");
          if (hashSplitted[0] === "1" ) {
            var hash = hashSplitted[1];
            // url to send email
            var subject = "Confirmation creation compte";
            var link = "https://www.radeema.ma/bienvenue-dans-votre-espace-client/activation-de-mon-espace?p_p_id=activationcompte_WAR_RADEEMAportlet%26email="+email+"%26id="+data+"%26hash="+hash;
            var content = "<p>Pour confirmer votre inscription sur le site de la RADEEMA, cliquer sur le lien suivant: <br>"+link+"</p>";

            var urlSender = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/envoyer-mail?mail="+email+"&subject="+subject+"&content="+content;
            this.http.get(urlSender).map((res:Response) => res.json()).subscribe(dtaEmail => {
            },
            error => {
              console.log(error);
            });
          }
        },
        error => {
          console.log(error);
        });
        this.presentAlert("Vieuillez valider votre inscription en cliquant sur le lien reçu par Email");
      }
      console.log("step 2");
/*      this.results = data;*/
    },
    error => {
      console.log(error);
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