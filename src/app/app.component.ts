import { Component, ViewChild, OnInit} from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
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
import { EFacture } from '../pages/e-facture/e-facture';
import { Echeances } from '../pages/echeances/echeances';
import { showEcheancePage} from '../pages/echeances/show-echeance';
import { Conso } from '../pages/conso/conso';
import { Reclamations } from '../pages/reclamations/reclamations';
import { FormPage } from '../pages/reclamations/new_reclamation';
import { Devis } from '../pages/devis/devis';
import { Simulation } from '../pages/simulation/simulation';
import { resultsPage} from '../pages/simulation/resultats';
import { Domiciliation } from '../pages/domiciliation/domiciliation';
import { Abonnement } from '../pages/abonnement/abonnement';
import { Auth } from '../pages/auth/auth';
import { ConditionPage } from '../pages/auth/conditions';
import { AlertPage } from '../pages/domiciliation/alert';
import { PasswordForgot } from '../pages/password-forgot/password-forgot';
import { AuthService } from '../providers/auth-service';
import { TranslateService }   from './translate/translate.service';
import { Events } from 'ionic-angular';
import { MesContrats } from '../pages/mes-contrats/mes-contrats';
import { ChartPage } from '../pages/conso/chart';
import { Network } from '@ionic-native/network';
/*import { TranslateService } from '@ngx-translate/core';*/
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

  //language
  lang: string;
  home: string;
  menu: string;
  espace_cli: string;
  actu: string;
  paiement: string;
  reso: string;
  contact: string;
  params: string;
  associerContrat: string;
  mesContrats: string;
  mesFactures: string;
  eFacture: string;
  echeances: string;
  maConso: string;
  reclamations: string;
  devis: string;
  simulation: string;
  domiciliation: string;
  abonnement: string;
  inscription: string;

  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen, private auth: AuthService,
              private alertCtrl: AlertController, public event: Events,
              public translate: TranslateService, private network: Network) {

    this.objLoaderStatus = false;
    this.initializeApp();
    this.espace_cli = translate.instant('espace_cli');
    this.menu = translate.instant('menu');
    this.pages = [
      { title: translate.instant('home'), component: HomePage, needAuth: false },
      { title: translate.instant('actu'), component: ActualitesPage, needAuth: false },
      { title: translate.instant('paiement'), component: Payment, needAuth: false},
      { title: translate.instant('reso'), component: Reseau ,needAuth: false},
      { title: translate.instant('contact'), component: Contact, needAuth: false },
      { title: translate.instant('params'), component: Settings, needAuth: false }
    ];
    this.pages2 = [
      { title: translate.instant('associerContrat'), component: AssocierContrat, needAuth: true },
      { title: translate.instant('mesContrats'), component: MesContrats, needAuth: true },
      { title: translate.instant('mesFactures'), component: Factures, needAuth: true },
      { title: translate.instant('eFacture'), component: EFacture, needAuth: true },
      { title: translate.instant('echeances'), component: Echeances, needAuth: true },
      { title: translate.instant('maConso'), component: Conso, needAuth: true },
      { title: translate.instant('reclamations'), component: Reclamations, needAuth: true },
      { title: translate.instant('devis'), component: Devis, needAuth: true },
      { title: translate.instant('simulation'), component: Simulation, needAuth: true },
      { title: translate.instant('domiciliation'), component: Domiciliation, needAuth: true },
      { title: translate.instant('abonnement'), component: Abonnement, needAuth: true },
      { title: translate.instant('inscription'), component: Auth, needAuth: false }
    ];
    event.subscribe('lang.changed', lang => {
      if(lang !== undefined && lang !== ""){
        this.lang = lang;
        this.translate.use(lang);
        this.espace_cli = translate.instant('espace_cli');
        this.menu = translate.instant('menu');
        this.home = translate.instant('home');
        this.actu = translate.instant('actu');
        this.paiement = translate.instant('paiement');
        this.reso = translate.instant('reso');
        this.contact = translate.instant('contact');
        this.params = translate.instant('params');
        this.associerContrat = translate.instant('associerContrat');
        this.mesContrats = translate.instant('mesContrats');
        this.mesFactures = translate.instant('mesFactures');
        this.eFacture = translate.instant('eFacture');
        this.echeances = translate.instant('echeances');
        this.maConso = translate.instant('maConso');
        this.reclamations = translate.instant('reclamations');
        this.devis = translate.instant('devis');
        this.simulation = translate.instant('simulation');
        this.domiciliation = translate.instant('domiciliation');
        this.abonnement = translate.instant('abonnement');
        this.inscription = translate.instant('inscription');

        this.pages = [
          { title: this.home , component: HomePage, needAuth: false },
          { title: this.actu, component: ActualitesPage, needAuth: false },
          { title: this.paiement, component: Payment, needAuth: false},
          { title: this.reso, component: Reseau ,needAuth: false},
          { title: this.contact, component: Contact, needAuth: false },
          { title: this.params, component: Settings, needAuth: false }
        ];
        this.pages2 = [
          { title: this.associerContrat, component: AssocierContrat, needAuth: true },
          { title: this.mesContrats, component: MesContrats, needAuth: true },
          { title: this.mesFactures, component: Factures, needAuth: true },
          { title: this.eFacture, component: EFacture, needAuth: true },
          { title: this.echeances, component: Echeances, needAuth: true },
          { title: this.maConso, component: Conso, needAuth: true },
          { title: this.reclamations, component: Reclamations, needAuth: true },
          { title: this.devis, component: Devis, needAuth: true },
          { title: this.simulation, component: Simulation, needAuth: true },
          { title: this.domiciliation, component: Domiciliation, needAuth: true },
          { title: this.abonnement, component: Abonnement, needAuth: true },
          { title: this.inscription, component: Auth, needAuth: false }
        ];

        this.activePage = this.pages[0];
      }
    })
  }


  initializeApp() {

    this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
   /*   this.manageMenu();*/

      // if no internet show alert
      this.network.onDisconnect().subscribe(() => {
        let alert = this.alertCtrl.create({
          title: 'Connexion internet',
          subTitle: "Pas de connexion Internet",
          buttons: ['Ok']
        });
        alert.present();
      });
    });

    this.translate.use('fr');
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

/*  manageMenu(){
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
  }*/

}
