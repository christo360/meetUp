import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MeetupServiceProvider } from '../../providers/meetup-service/meetup-service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public categories = [];

  constructor(public navCtrl: NavController, public meetupService: MeetupServiceProvider) {

  }


 ionViewDidLoad() {
  this.getCategories()
 }

  

  public getCategories() {
    this.meetupService.getCategories().subscribe(result => {
      var responseData = result as any;
      this.categories = responseData.results;
    });
  }

  itemSelected(category) {
    console.log(category)
  }
}
