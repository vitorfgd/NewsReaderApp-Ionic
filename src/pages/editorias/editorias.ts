import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the EditoriasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-editorias',
  templateUrl: 'editorias.html',
})
export class EditoriasPage {

  private url: string = "https://api.myjson.com/bins/1as3cr";

  variavel: string = '';
  slug: string = '';
  public ids: Array <any>;
  public names: Array <any>;
  public names_string: string;

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, public navParams: NavParams, public storage: Storage) {
    this.names = [];
    this.slug = '?categories=';
    this.names_string = '';
    this.fetchContent();
  }

  fetchContent ():void {
    let loading = this.loadingCtrl.create({
      content: 'Buscando categorias...'
    });

    loading.present();

    this.http.get(this.url).map(res => res.json())
      .subscribe(data => {
        this.ids = data.data;
        loading.dismiss();
        this.createCategories ();
      });
  }

  createCategories (){
    for (let entry in this.ids){
      this.names.push (this.ids["name"]);
    }
    this.createSlug();
  }

  createSlug (){
    for (let name in this.names){
      this.slug += name;
      this.slug += ",";
      alert (this.slug);
    }
  }

  showCategories (){
    for (let name in this.names){
      alert (name);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditoriasPage');
  }
}
