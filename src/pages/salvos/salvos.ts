import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  private url: string;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public http: Http, public storage: Storage) {
    // this.fetchContent();
    this.returnURL ();
  }

  returnURL () {
    this.storage.get('saved_posts').then((itens) => {
      if (itens == ""){
        alert ("Não há itens salvos.");
        this.url = this.urlBase;
      } else {
        this.saved_feeds = itens;
        this.saved_feeds = this.saved_feeds.substring (0, this.saved_feeds.length - 1);
        this.url = this.urlBase + ('?id=');
        this.url += this.saved_feeds;
      }

      this.fetchContent(this.url);
    });
  }

  fetchContent (urlToSearch):void {

    let loading = this.loadingCtrl.create({
      content: 'Buscando conteúdo...'
    });

    alert (this.url);
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
