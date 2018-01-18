import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { JsonpModule } from '@angular/http';

import { MyApp } from './app.component';
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
import { showFacturePage } from '../pages/factures/show-facture';
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
import { Auth } from '../pages/auth/auth';
import { Abonnement } from '../pages/abonnement/abonnement';
import { AlertPage } from '../pages/domiciliation/alert';
import { PasswordForgot } from '../pages/password-forgot/password-forgot';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService }   from './translate/translate.service';
import { TranslatePipe }   from './translate/translate.pipe';
import { TRANSLATION_PROVIDERS}   from './translate/translation';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ActualitesPage,
    showNewsPage,
    showVideosPage,
    Payment,
    Reseau,
    Contact,
    showDataPage,
    Settings,
    Factures,
    showFacturePage,
    Echeances,
    showEcheancePage,
    Conso,
    Reclamations,
    FormPage,
    Devis,
    Simulation,
    resultsPage,
    Domiciliation,
    Profil,
    Auth,
    Abonnement,
    TranslatePipe,
    AlertPage,
    PasswordForgot
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
/*      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false*/
    }),
    HttpModule,
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ActualitesPage,
    showNewsPage,
    showVideosPage,
    Payment,
    Reseau,
    Contact,
    showDataPage,
    Settings,
    Factures,
    showFacturePage,
    Echeances,
    showEcheancePage,
    Conso,
    Reclamations,
    FormPage,
    Devis,
    Simulation,
    resultsPage,
    Abonnement,
    Domiciliation,
    Auth,
    AlertPage,
    PasswordForgot
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    CallNumber,
    TRANSLATION_PROVIDERS, TranslateService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
