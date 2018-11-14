import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class GroupsPage {


  public favouriteCategories = [];
  public checkedList = [];

  constructor(public navCtrl: NavController,
              public localStorage: LocalStorageProvider) {

  }

  ionViewDidLoad() {
    this.favouriteCategories = this.localStorage.getAllInterestedCategories()
   }

   checkboxChange(item, event) {
    if(event.checked) {
      this.checkedList.push(item.id);
    } else {
      for(var i = 0 ; i < this.favouriteCategories.length; i++) {
        if(this.checkedList[i] == item.id){
          this.checkedList.splice(i,1);
        }
      }
    }
  }

}
