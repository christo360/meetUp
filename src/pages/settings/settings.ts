import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MeetupServiceProvider } from '../../providers/meetup-service/meetup-service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public Categories = [];

  constructor(public navCtrl: NavController, public meetupService: MeetupServiceProvider) {

  }

  public getCategories() {
    this.meetupService.getCategories().then(result => {
      var responseData = result as any;
      this.Categories = responseData;

      console.log(this.Categories);
    });
  }

}
