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
  private urlBase: string = "https://api.myjson.com/bins/1awtvn";
  public saved_feeds: string = '';
  private url: string = '';

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public http: Http, public storage: Storage) {

    // this.storage.get('saved_posts').then((itens) => {
    //   if (itens == ""){
    //     alert ("Não há itens salvos.");
    //   } else {
    //     this.saved_feeds = itens;
    //     this.saved_feeds = this.saved_feeds.substring (0, this.saved_feeds.length - 1);
    //     this.url = this.urlBase + ('?id=');
    //     this.url = this.url + (this.saved_feeds);
    //     // alert (this.urlBase);
    //     // alert (this.url);
    //   }
    // });

    this.fetchContent();
  }

  returnURL (){
    return this.url;
  }

  fetchContent ():void {

    let loading = this.loadingCtrl.create({
      content: 'Buscando conteúdo...'
    });

    this.storage.get('saved_posts').then((itens) => {
      if (itens == ""){
        alert ("Não há itens salvos.");
      } else {
        this.saved_feeds = itens;
        this.saved_feeds = this.saved_feeds.substring (0, this.saved_feeds.length - 1);
        this.url = this.urlBase + ('?id=');
        this.url = this.url + (this.saved_feeds);
        alert (this.urlBase);
        alert (this.url);
      }
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
