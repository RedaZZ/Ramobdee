import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
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
import { Factures } from '../pages/factures/factures';
import { Echeances } from '../pages/echeances/echeances';
import { showEcheancePage} from '../pages/echeances/show-echeance';
import { Conso } from '../pages/conso/conso';
import { Reclamations } from '../pages/reclamations/reclamations';
import { Devis } from '../pages/devis/devis';
import { Simulation } from '../pages/simulation/simulation';
import { Domiciliation } from '../pages/domiciliation/domiciliation';
import { Profil } from '../pages/profil/profil';
import { Auth } from '../pages/auth/auth';

import { TranslateService }   from './translate/translate.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  pages2: Array<{title: string, component: any}>;
  activePage: any;


  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accueil', component: HomePage },
      { title: 'Actualités', component: ActualitesPage },
      { title: 'Paiement', component: Payment },
      { title: 'Réseau', component: Reseau },
      { title: 'Contact', component: Contact },
      { title: 'Paramètre', component: Settings }
    ];
    this.pages2 = [
      { title: 'Mes Factures', component: Factures },
      { title: 'Echéance', component: Echeances },
      { title: 'Historique consommation', component: Conso },
      { title: 'Réclamations', component: Reclamations },
      { title: 'Devis', component: Devis },
      { title: 'Simulation', component: Simulation },
      { title: "Domiciliation Bancaire", component: Domiciliation },
      { title: 'Mon profil', component: Profil },
      { title: 'Connexion', component: Auth }
    ];
    this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  checkActive(page){
    return page == this.activePage;
  }

}
