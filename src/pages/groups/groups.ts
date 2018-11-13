import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class GroupsPage {

  public favouriteCategories = [];

  constructor(public navCtrl: NavController,
              public localStorage: LocalStorageProvider) {

  }

  ionViewDidLoad() {
    this.favouriteCategories = this.localStorage.getAllInterestedCategories()
console.log(this.favouriteCategories);
   }



}
