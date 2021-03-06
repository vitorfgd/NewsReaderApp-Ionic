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
import { PostServiceProvider } from '../../providers/post-service/post-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  host: {'class': 'home-page'}
})

export class HomePage {

  @ViewChild(Content) content: Content;

  public feeds: Array <any>;
  private pagerParam : any = 1;
  private url : string = "";

  public saved_feeds: string = '';
  public hasFilter: boolean = false;
  public noFilter: Array<any>;
  public searchTerm: string = '';
  public searchTermControl: FormControl;

  private itensSalvos: string = '';
  private remove: string = '';
  private slug: string = '';
  private toggled: boolean;

  constructor(private _postsvc: PostServiceProvider, public navCtrl: NavController, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: Http, public actionSheetCtrl: ActionSheetController, private sharingVar: SocialSharing, public storage: Storage) {

    this.remove = '';
    this.toggled = false;

    _postsvc.savedPosts.subscribe(sp => this.itensSalvos = sp);

    this.fetchContent();

    this.searchTermControl = new FormControl();
    this.searchTermControl.valueChanges.debounceTime(1000).distinctUntilChanged().subscribe(search => {
      if (search !== '' && search) {
        this.filterItems();
      }
    })

    // Código para implementação futura das editorias.
    // this.storage.get ('slug').then(itens => this.slug = itens);
    // if (this.slug == null || this.slug == ''){
    //   this.slug = "";
    // } else {
    //   this.url = this.url + '?categories=';
    //   this.url = this.url + this.slug;
    //
  }


  getUrl(){
    this.url = "http://www.ielusc.br/aplicativos/wordpress_revi/wp-json/app/v1/posts?page=" + this.pagerParam;
    return this.url;
  }

  toggleSearch() {
    this.toggled = this.toggled ? false : true;
  }

  fetchContent ():void {
    let loading = this.loadingCtrl.create({
      content: 'Buscando conteúdo...'
    });

    // alert (this.itensSalvos);

    loading.present();

    this.http.get(this.getUrl()).map(res => res.json())
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


  swipeEvent (e, feed){
    if(e.direction == 2){
      this.navCtrl.push (NoticiaPage, {
        feed: feed
      });
    }
  }

  saveItem (post) {

    if (this.itensSalvos == null){
      this.itensSalvos = '';
    }

    if (this.itensSalvos.includes(post)){
      let alert = this.alertCtrl.create({
        title: 'Matéria removida com sucesso!',
        subTitle: 'Esta matéria foi removida de sua lista de favoritos',
        buttons: ['OK']
      });
      this.remove = post + ",";
      this.itensSalvos = this.itensSalvos.replace (this.remove, "");
      this.storage.set ('saved_posts', this.itensSalvos);
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Matéria salva com sucesso!',
        subTitle: 'Esta matéria foi salva em sua lista de favoritos com sucesso.',
        buttons: ['OK']
      });
      this.itensSalvos = this.itensSalvos + post;
      this.itensSalvos = this.itensSalvos + (",");
      this.storage.set ('saved_posts', this.itensSalvos);
      alert.present();
    }
  }


  doRefresh(refresher) {
    refresher.complete();
    this.fetchContent ();
  }


  doInfinite(infiniteScroll) {
    this.pagerParam ++;
    console.log(this.pagerParam);
    this.http.get(this.getUrl()).map(res => res.json()).subscribe(data => {
        this.feeds = this.feeds.concat(data.data);
        this.noFilter = this.feeds;
        infiniteScroll.complete();
    });
  }
  

  filterItems() {
    this.hasFilter = false;
    this.feeds = this.noFilter.filter((item) => {
        return item.post_title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }


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


  otherShare(post_content:string, post_title:string, link:string){
    this.sharingVar.share(post_content, post_title, null, link)
    .then(
      ()=>{ },
      ()=>{ }
    )
  }
}
