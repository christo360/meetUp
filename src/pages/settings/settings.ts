import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { MeetupServiceProvider } from '../../providers/meetup-service/meetup-service';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public categories = [];

  constructor(public navCtrl: NavController, 
              public meetupService: MeetupServiceProvider,
              public localStorageService: LocalStorageProvider,
              public alertController: AlertController,
              public toastController: ToastController,
              public loadingController: LoadingController) {

  }


 ionViewDidLoad() {
  let loader = this.loadingController.create(
    {
      content:'Loading Categories!',
      spinner:'dots'
    });

    loader.present().then(()=>{
      this.meetupService.getCategories().subscribe(result => {
        var responseData = result as any;
        this.categories = responseData.results;
        loader.dismiss();
      });
    });
 }

  
  itemSelected(category){

      let confirm = this.alertController.create({
        title:'Add to favourite?',
        message:'Are you sure you want to add this category as a favourite?',
        buttons: [{

          text:'Yes',
          handler:() => {
      
            this.localStorageService.addInterestedCategory(category)
            let toast = this.toastController.create({
              message:'You have added the category',
              duration: 3000,
              position:'bottom'

            });
            toast.present();
          }
        },
        {text:'No'}
      ]
      });
      confirm.present(); 
  }
  
}
