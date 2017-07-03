import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { NoticiaPage } from '../noticia/noticia';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-salvos',
  templateUrl: 'salvos.html',
})
export class SalvosPage {

  public feeds: Array<any>;
  public noFilter: Array<any>;
  public saved_feeds: string = '';
  private urlBase: string = "http://www.ielusc.br/aplicativos/wordpress_revi/wp-json/app/v1/posts";

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public http: Http, public storage: Storage) {
    // this.fetchContent();
    this.returnURL ();
  }

  returnURL () {

    let urlToSearch = '';

    this.storage.get('saved_posts').then((itens) => {
      if (itens == "" || itens == null){
        let alert = this.alertCtrl.create({
          title: 'Não há itens salvos.',
          subTitle: 'Tente salvar algumas matérias na área principal do aplicativo!',
          buttons: ['Entendi']
        });
        alert.present();
        urlToSearch = this.urlBase + ('?ids=-1');
        this.fetchContent(urlToSearch);
      } else {
        this.saved_feeds = itens;
        this.saved_feeds = this.saved_feeds.substring (0, this.saved_feeds.length - 1);
        urlToSearch = this.urlBase + ('?ids=');
        urlToSearch += this.saved_feeds;
        this.fetchContent(urlToSearch);
      }
    });
  }

  fetchContent (urlToSearch:string):void {

    let loading = this.loadingCtrl.create({
      content: 'Buscando conteúdo...'
    });

    // alert (urlToSearch);
    this.http.get(urlToSearch).map(res => res.json())
      .subscribe(data => {
        this.feeds = data.data;
        this.noFilter = this.feeds;
        loading.dismiss();
      });
  }

  itemSelected (feed) {
    this.navCtrl.push (NoticiaPage, {
      feed: feed
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalvosPage');
  }
}
