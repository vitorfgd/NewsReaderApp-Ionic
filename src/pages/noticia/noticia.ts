import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-noticia',
  templateUrl: 'noticia.html',
})
export class NoticiaPage {

  feed: Array <any>;
  private itensSalvos: string;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public storage: Storage, private sharingVar: SocialSharing, public navParams: NavParams) {
    this.feed = [];
    this.feed = navParams.get ('feed');
    this.storage.get('saved_posts').then(itens => this.itensSalvos = itens);
  }

  saveItem (post) {
    if (this.itensSalvos.includes(post)){
      let alert = this.alertCtrl.create({
        title: 'Esta matéria não foi salva!',
        subTitle: 'Esta matéria foi salva em sua lista anteriormente.',
        buttons: ['OK']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Item foi salvo com sucesso!',
        subTitle: 'Esta matéria foi salva em sua lista com sucesso. + ',
        buttons: ['OK']
      });
      this.itensSalvos = this.itensSalvos.concat (post);
      this.itensSalvos = this.itensSalvos.concat (",")
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
