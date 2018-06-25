import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, Http, JsonpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HomeModule } from '../pages/home/home.module';
import { ActualitesPage } from '../pages/actualites/actualites';
import { ActualitesModule } from '../pages/actualites/actualites.module';
import { NewsModule } from '../pages/actualites/news.module';
import { VideosModule } from '../pages/actualites/videos.module';
import { showNewsPage } from '../pages/actualites/news';
import { showVideosPage } from '../pages/actualites/videos';
import { Payment } from '../pages/payment/payment';
import { PaymentModule } from '../pages/payment/payment.module';
import { Reseau } from '../pages/reseau/reseau';
import { ReseauModule} from '../pages/reseau/reseau.module';
import { ShowModule} from '../pages/reseau/show.module';
import { showDataPage } from '../pages/reseau/show';
import { Contact } from '../pages/contact/contact';
import { ContactModule } from '../pages/contact/contact.module';
import { Settings } from '../pages/settings/settings';
import { SettingsModule } from '../pages/settings/settings.module';
import { Factures } from '../pages/factures/factures';
import { FacturesModule } from '../pages/factures/factures.module';
import { ShowFactureModule } from '../pages/factures/show-facture.module';
import { EFacture } from '../pages/e-facture/e-facture';
import { EFactureModule } from '../pages/e-facture/e-facture.module';
import { showFacturePage } from '../pages/factures/show-facture';
import { Echeances } from '../pages/echeances/echeances';
import { EcheancesModule } from '../pages/echeances/echeances.module';
import { ShowEcheanceModule } from '../pages/echeances/show-echeance.module';
import { showEcheancePage} from '../pages/echeances/show-echeance';
import { Conso } from '../pages/conso/conso';
import { ConsoModule} from '../pages/conso/conso.module';
import { ChartModule} from '../pages/conso/chart.module';
import { Reclamations } from '../pages/reclamations/reclamations';
import { ReclamationsModule} from '../pages/reclamations/reclamations.module';
import { NewReclamationModule} from '../pages/reclamations/new_reclamation.module';
import { FormPage } from '../pages/reclamations/new_reclamation';
import { Devis } from '../pages/devis/devis';
import { DevisModule } from '../pages/devis/devis.module';
import { Simulation } from '../pages/simulation/simulation';
import { SimulationModule} from '../pages/simulation/simulation.module';
import { ResultsModule} from '../pages/simulation/resultats.module';
import { resultsPage} from '../pages/simulation/resultats';
import { Domiciliation } from '../pages/domiciliation/domiciliation';
import { DomiciliationModule } from '../pages/domiciliation/domiciliation.module';
import { Auth } from '../pages/auth/auth';
import { AuthModule } from '../pages/auth/auth.module';
import { ConditionModule } from '../pages/auth/conditions.module';
import { ConditionPage } from '../pages/auth/conditions';
import { Abonnement } from '../pages/abonnement/abonnement';
import { AbonnementModule } from '../pages/abonnement/abonnement.module';
import { AlertPage } from '../pages/domiciliation/alert';
import { PasswordForgot } from '../pages/password-forgot/password-forgot';
import { PasswordForgotModule } from '../pages/password-forgot/password-forgot.module';
import { AssocierContrat } from '../pages/associer-contrat/associer-contrat';
import { AssocierContratModule } from '../pages/associer-contrat/associer-contrat.module';
import { MesContrats } from '../pages/mes-contrats/mes-contrats';
import { MesContratsModule } from '../pages/mes-contrats/mes-contrats.module';
import { ChartPage } from '../pages/conso/chart';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//translation
import { TranslateService }   from './translate/translate.service';
import { TranslatePipe }   from './translate/translate.pipe';
import { TranslateModule }   from './translate/translate.module';
import { TRANSLATION_PROVIDERS}   from './translate/translation';

//ngx translation
/*import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';*/
//external link
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrowserTab } from '@ionic-native/browser-tab';
//Login
import { AuthService } from './../providers/auth-service';

// File export
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@NgModule({
  declarations: [
    AlertPage,
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      //scrollPadding: false,
      //scrollAssist: true,
      //autoFocusAssist: false
    }),
    HttpModule,
    JsonpModule,
    AbonnementModule,
    AssocierContratModule,
    AuthModule,
    ConditionModule,
    ConsoModule,
    ContactModule,
    DevisModule,
    DomiciliationModule,
    EFactureModule,
    EcheancesModule,
    FacturesModule,
    MesContratsModule,
    PasswordForgotModule,
    PaymentModule,
    ReclamationsModule,
    ReseauModule,
    SettingsModule,
    SimulationModule,
    HomeModule,
    ActualitesModule,
    NewsModule,
    VideosModule,
    ShowModule,
    ShowFactureModule,
    ShowEcheanceModule,
    ChartModule,
    ResultsModule,
    NewReclamationModule,
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
    AssocierContrat,
    MesContrats,
    Factures,
    EFacture,
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
    ConditionPage,
    AlertPage,
    PasswordForgot,
    ChartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    CallNumber,
    TRANSLATION_PROVIDERS, TranslateService,
    AuthService,
    InAppBrowser,
    File,
    FileOpener,
    Network,
    BrowserTab,
/*    HttpHandler,*/
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}