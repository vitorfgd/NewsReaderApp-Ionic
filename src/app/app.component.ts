import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { LoadingController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { LeitorPage } from '../pages/leitor/leitor';
import { SalvosPage } from '../pages/salvos/salvos';
import { EditoriasPage } from '../pages/editorias/editorias';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;
  hasShown: string = "false";
  loader: any;

  constructor(public platform: Platform, public loadingCtrl: LoadingController, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage) {

    this.initializeApp();
    this.presentLoading();
    this.platform.ready().then(() => {
      this.storage.get('introShown').then((result) => {
        if(result){
          this.rootPage = HomePage;
        } else {
          this.rootPage = TutorialPage;
          this.storage.set('introShown', true);
        }
        this.loader.dismiss();
      });
    });

    this.pages = [

      { title: 'Home', component: HomePage },
      // { title: 'Editorias', component: EditoriasPage},
      { title: 'Itens Salvos', component: SalvosPage},
      { title: 'Área do Leitor', component: LeitorPage},
      { title: 'Sobre a Equipe', component: AboutPage}

    ];
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
