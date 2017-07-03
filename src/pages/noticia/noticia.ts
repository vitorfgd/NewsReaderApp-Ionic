import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';
import { PostServiceProvider } from '../../providers/post-service/post-service';

@IonicPage()
@Component({
  selector: 'page-noticia',
  templateUrl: 'noticia.html',
})
export class NoticiaPage {

  feed: Array <any>;
  private itensSalvos: string;
  private remove: string = '';

  constructor(private _postsvc: PostServiceProvider, public navCtrl: NavController, private alertCtrl: AlertController, public storage: Storage, private sharingVar: SocialSharing, public navParams: NavParams) {
    this.remove = '';
    this.feed = [];
    this.feed = navParams.get ('feed');
    _postsvc.savedPosts.subscribe(sp => this.itensSalvos = sp);
  }

  saveItem (post) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticiaPage');
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
