import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoadingController, AlertController} from 'ionic-angular';
import 'rxjs/add/operator/map';

export class User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  pce_idt: string;
  titre: string;
  no_tel: string;

  constructor( id:string, nom: string, prenom: string, email: string, pce_idt: string,
              titre: string, no_tel: string) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.pce_idt = pce_idt;
    this.titre = titre;
    this.no_tel = no_tel;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;

  constructor(private http: Http, private alertCtrl: AlertController,
   public loadingCtrl: LoadingController) {
  };

  public login(credentials) {
    console.log(credentials);
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // init loading spinner
        let loading = this.loadingCtrl.create({
          content: 'Merci de patienter...'
        });

        // Api call start
        loading.present();

        var urlGetId = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/verifier-mot-passe/mail/"+
                        credentials.email+"/password/"+credentials.password;
        console.log(urlGetId);
        this.http.get(urlGetId).map((res:Response) => res.json()).subscribe(data => {
          loading.dismiss();
          console.log(data);
          var splitted = data.split("|");
          if (splitted[0] === "-1") {
            console.log(splitted[1]);
            this.presentAlert(splitted[1]);
          } else {
            // creation avec succées
            var urlGetUser = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/get-usr-by-id/id-user/"+splitted[2];
            this.http.get(urlGetUser).map((res:Response) => res.json()).subscribe(userData => {
              var id = userData["ID"];
              var nom = userData["NOM"];
              var prenom = userData["PNO"];
              var email = userData["MAIL"];
              var pce_idt = userData["PCE_IDT"];
              var titre = userData["TITRE"];
              var no_tel = userData["NO_TEL"];
              console.log(userData);
              this.currentUser = new User(id, nom, prenom, email, pce_idt, titre, no_tel);
              window.localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
              observer.next(true);
              observer.complete();
            });

            // get list cta of user
            var urlCtaUser = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/get-all-cta-by-id-usr/id-user/"+splitted[2];
            this.http.get(urlCtaUser).map((res:Response) => res.json()).subscribe(ctaListData => {
              console.log(ctaListData);
              var arrayCta = ctaListData.split("$")[0];
              if (arrayCta !== "") {
                arrayCta = arrayCta.split('|').filter(v=>v!='');
                window.localStorage.setItem('listCta', JSON.stringify(arrayCta));
              }
            });
          }
        });

      });
    }
  }

  public getUserInfo() {
    var currentUser = window.localStorage.getItem('currentUser');

    return currentUser;
  }

  presentAlert(content:any) {
    let alert = this.alertCtrl.create({
      title: 'Authentification',
      subTitle: content,
      buttons: ['Ok']
    });
    alert.present();
  }

  public logout() {
    return Observable.create(observer => {
      window.localStorage.removeItem('currentUser');
      console.log("removed");
      observer.next(true);
      observer.complete();
    });
  }
}