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
  private urlBase: string = "https://api.myjson.com/bins/1awtvn";
  public saved_feeds: string;
  private url: string;
  public noFilter: Array<any>;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public http: Http, public storage: Storage) {
    this.storage.get('saved_posts').then(itens => this.saved_feeds = itens);
    this.url = this.urlBase + ('?id=');
    this.url = this.url + (JSON.stringify(this.saved_feeds));
    alert (this.url);
    this.fetchContent();
  }

  fetchContent ():void {

    let loading = this.loadingCtrl.create({
      content: 'Buscando conteúdo...'
    });

    this.http.get(this.url).map(res => res.json())
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
