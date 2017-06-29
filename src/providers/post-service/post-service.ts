import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class PostServiceProvider {

  // savedPosts = new Subject<string>();
  //
  // constructor(public _storage: Storage) {
  //   _storage.get('saved_posts').then((sp) => this.savedPosts.next(sp));
  // }
  //
  // setSavedPosts(sp: string): Promise<void> {
  //   return this._storage.set('saved_posts', sp).then(() => this.savedPosts.next(sp));
  // }
  //
  // addSavedPost(pid: string): Promise<void> {
  //   let sp = this.savedPosts.value;
  //   return this.setSavedPosts(sp);
  // }
  //
  // removeSavedPost(pid: string): Promise<void> {
  //   let sp = this.savedPosts.value;
  //   return this.setSavedPosts(sp);
  // }
}
