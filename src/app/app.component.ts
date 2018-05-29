import { Component, ViewChild, OnInit} from '@angular/core';
import { Nav, Platform, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ActualitesPage } from '../pages/actualites/actualites';
import { showNewsPage } from '../pages/actualites/news';
import { showVideosPage } from '../pages/actualites/videos';
import { Payment } from '../pages/payment/payment';
import { Reseau } from '../pages/reseau/reseau';
import { showDataPage } from '../pages/reseau/show';
import { Contact } from '../pages/contact/contact';
import { Settings } from '../pages/settings/settings';
import { AssocierContrat } from '../pages/associer-contrat/associer-contrat';
import { Factures } from '../pages/factures/factures';
import { Echeances } from '../pages/echeances/echeances';
import { showEcheancePage} from '../pages/echeances/show-echeance';
import { Conso } from '../pages/conso/conso';
import { Reclamations } from '../pages/reclamations/reclamations';
import { FormPage } from '../pages/reclamations/new_reclamation';
import { Devis } from '../pages/devis/devis';
import { Simulation } from '../pages/simulation/simulation';
import { resultsPage} from '../pages/simulation/resultats';
import { Domiciliation } from '../pages/domiciliation/domiciliation';
import { Profil } from '../pages/profil/profil';
import { Abonnement } from '../pages/abonnement/abonnement';
import { Auth } from '../pages/auth/auth';
import { ConditionPage } from '../pages/auth/conditions';
import { AlertPage } from '../pages/domiciliation/alert';
import { PasswordForgot } from '../pages/password-forgot/password-forgot';
import { AuthService } from '../providers/auth-service';
import { TranslateService }   from './translate/translate.service';
import { Events } from 'ionic-angular';
import { MesContrats } from '../pages/mes-contrats/mes-contrats';

/*import {NglModule} from 'ng-lightning/ng-lightning';
import { LoaderService } from './loader.service';*/

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  objLoaderStatus: boolean;
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, needAuth: boolean}>;
  pages2: Array<{title: string, component: any, needAuth: boolean}>;
  activePage: any;

  // for spinner
  showLoader: boolean;


  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen, private auth: AuthService,
              private alertCtrl: AlertController, public events: Events) {
    this.objLoaderStatus = false;

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'home' , component: HomePage, needAuth: false },
      { title: 'actu', component: ActualitesPage, needAuth: false },
      { title: 'Paiement', component: Payment, needAuth: false},
      { title: 'reso', component: Reseau ,needAuth: false},
      { title: 'contact', component: Contact, needAuth: false },
      { title: 'params', component: Settings, needAuth: false }
    ];
    this.pages2 = [
      { title: 'AssocierContrat', component: AssocierContrat, needAuth: true },
      { title: 'MesContrats', component: MesContrats, needAuth: true },
      { title: 'Mes Factures', component: Factures, needAuth: true },
      { title: 'Echéance', component: Echeances, needAuth: true },
      { title: 'Historique consommation', component: Conso, needAuth: true },
      { title: 'Réclamations', component: Reclamations, needAuth: true },
      { title: 'Devis', component: Devis, needAuth: true },
      { title: 'Simulation', component: Simulation, needAuth: true },
      { title: "Domiciliation Bancaire", component: Domiciliation, needAuth: true },
      { title: "Demande d'abonnement", component: Abonnement, needAuth: true },
      { title: 'Inscription', component: Auth, needAuth: false }
    ];
    this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.manageMenu();
    });
  }

  openPage(page) {
    if (this.currentUser() || !page.needAuth) {
      this.nav.setRoot(page.component);
      this.activePage = page;
    } else {
      this.checkConnect();
    }
  }

  checkActive(page){
    return page == this.activePage;
  }

  currentUser(){
    var user = JSON.parse(this.auth.getUserInfo()) ;
    return user;
  }

  checkConnect(){
    let confirm = this.alertCtrl.create({
      title: 'Authentification',
      message: 'Vieuillez vous authentifier',
      buttons: [
        {
          text: 'Non',
          handler: () => {
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.nav.setRoot(HomePage);
          }
        }
      ]
    });
    confirm.present();
  }

  manageMenu(){
    var $title = $(".menu-title");
    var $menu = $("#list-connect");
    $title.click(function() {
      if ($menu.hasClass("hidden")) {
        $(this).find("#right-arrow").attr("name", "arrow-down");
        $menu.removeClass("hidden");
      } else {
        $(this).find("#right-arrow").attr("name", "arrow-up");
        $menu.addClass("hidden");
      }
    });
  }

}
