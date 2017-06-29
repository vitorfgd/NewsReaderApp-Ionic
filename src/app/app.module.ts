import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AboutPage } from '../pages/about/about';
import { LeitorPage } from '../pages/leitor/leitor';
import { SalvosPage } from '../pages/salvos/salvos';
import { EditoriasPage } from '../pages/editorias/editorias';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { NoticiaPage } from '../pages/noticia/noticia';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PostServiceProvider } from '../providers/post-service/post-service';
import { UrlControlProvider } from '../providers/url-control/url-control';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AboutPage,
    LeitorPage,
    EditoriasPage,
    SalvosPage,
    TutorialPage,
    NoticiaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({name: '__mydb',driverOrder: ['indexeddb', 'sqlite', 'websql']})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AboutPage,
    LeitorPage,
    EditoriasPage,
    SalvosPage,
    TutorialPage,
    NoticiaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PostServiceProvider,
    UrlControlProvider
  ]
})
export class AppModule {}
