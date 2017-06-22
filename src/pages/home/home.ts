import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController, ActionSheetController, Content } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { FormControl } from '@angular/forms';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { NoticiaPage } from '../noticia/noticia';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild(Content) content: Content;

  public feeds: Array <any>;

  private url: string = "https://api.myjson.com/bins/1awtvn";

  public saved_feeds: string = '';
  private itensSalvos: string = '';
  private remove: string = '';

  private toggled: boolean;

  public hasFilter: boolean = false;
  public noFilter: Array<any>;

  public searchTerm: string = '';
  public searchTermControl: FormControl;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: Http, public actionSheetCtrl: ActionSheetController, private sharingVar: SocialSharing, public storage: Storage) {

    this.remove = '';
    this.toggled = false;
    this.fetchContent();

    this.storage.get('saved_posts').then(itens => this.itensSalvos = itens);
    if (this.itensSalvos == ""){
      this.itensSalvos = "";
    } else {
      alert (this.itensSalvos);
    }

    this.searchTermControl = new FormControl();
    this.searchTermControl.valueChanges.debounceTime(1000).distinctUntilChanged().subscribe(search => {
      if (search !== '' && search) {
        this.filterItems();
      }
    })
  }

  toggleSearch() {
    this.toggled = this.toggled ? false : true;
  }


  fetchContent ():void {
    let loading = this.loadingCtrl.create({
      content: 'Buscando conteúdo...'
    });

    loading.present();

    this.http.get(this.url).map(res => res.json())
      .subscribe(data => {
        this.feeds = data.data;
        this.noFilter = this.feeds;
        loading.dismiss();
      });
  }

  // itemSelected (url: string):void {
  //   let browser = new InAppBrowser(url, '_system');
  // }

  itemSelected (feed) {
    this.navCtrl.push (NoticiaPage, {
      feed: feed
    });
  }

  saveItem (post) {
    this.storage.get('saved_posts').then(itens => this.itensSalvos = itens);
    this.doSave (this.itensSalvos, post);
  }

  doSave (itensSalvos, post){
    if (itensSalvos.includes(post)){
      let alert = this.alertCtrl.create({
        title: 'Esta matéria foi removida com sucesso!',
        subTitle: 'Esta matéria foi removida de sua lista de favoritos' + post,
        buttons: ['OK']
      });
      this.remove = post + ",";
      itensSalvos = itensSalvos.replace (this.remove, "");
      alert.present();
      this.storage.set ('saved_posts', itensSalvos);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Item foi salvo com sucesso!',
        subTitle: 'Esta matéria foi salva em sua lista de favoritos com sucesso.' + post,
        buttons: ['OK']
      });
      itensSalvos = itensSalvos + post;
      itensSalvos = itensSalvos + (",");
      alert.present();
      this.storage.set ('saved_posts', itensSalvos);
    }
  }

  doRefresh(refresher) {
    refresher.complete();
    this.fetchContent ();
  }

  filterItems() {
    this.hasFilter = false;
    this.feeds = this.noFilter.filter((item) => {
        return item.post_title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }
























  // SOCIAL SHARE NÃO MECHER

  whatsappShare(){
    this.sharingVar.shareViaWhatsApp("Message via WhatsApp", null /*Image*/,  "http://www.google.com" /* url */)
    .then(
      ()=>{ },
      ()=>{ }
    )
  }

  geralShare (){
    this.sharingVar.share ("Message", null, "http://www.google.com")
    .then(
      ()=>{ },
      ()=>{ }
    )
  }

  twitterShare(){
    this.sharingVar.shareViaTwitter("Message via Twitter",null /*Image*/,"http://www.google.com")
    .then(
      ()=>{ },
      ()=>{ }
    )
  }

  facebookShare(){
    this.sharingVar.shareViaFacebook("Message via Twitter",null /*Image*/,"http://www.google.com")
    .then(
      ()=>{ },
      ()=>{ }
    )
  }

  otherShare(link:string){
    this.sharingVar.share("Genral Share Sheet", null, null, link)
    .then(
      ()=>{ },
      ()=>{ }
    )
  }
}
