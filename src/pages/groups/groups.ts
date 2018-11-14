import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MeetupServiceProvider } from '../../providers/meetup-service/meetup-service';

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class GroupsPage {


  public favouriteCategories = [];
  public groups = [];
  public checkedList = [];
  private meetupForm : FormGroup;

  constructor(public navCtrl: NavController,
              public localStorage: LocalStorageProvider,
              public meetupService: MeetupServiceProvider,
              private formBuilder: FormBuilder,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public toastController: ToastController ) {

              this.meetupForm = this.formBuilder.group({
                  location: ['', Validators.required],
              });

  }

  ionViewDidLoad() {
    

    let loader = this.loadingController.create(
      {
        content:'Loading!',
        spinner:'dots'
      });
      loader.present().then(()=>{
        this.favouriteCategories = this.localStorage.getAllInterestedCategories()
        loader.dismiss();
      });
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

  submitForm(){

    let loader = this.loadingController.create(
      {
        content:'Loading Groups!',
        spinner:'dots'
      });
      loader.present().then(()=>{
        var body = "location=" + this.meetupForm.value.location + "&category=" +this.checkedList ;
        console.log(body);
        this.meetupService.getGroups(this.meetupForm.value.location,this.checkedList).subscribe(result => {
          var responseData = result as any;
          this.groups = responseData;
          loader.dismiss();
        })
      });
  }

  clearStorage() {

    let confirm = this.alertController.create({
      title:'Remove all favourite Categories',
      message:'Are you sure you want to remove all categories from your favourites?',
      buttons: [{

        text:'Yes',
        handler:() => {
    
          this.localStorage.removeAllFromStorage()
          let toast = this.toastController.create({
            message:'All categories have been removed',
            duration: 3000,
            position:'bottom'

          });
          toast.present();
          window.location.reload();
        }
      },
      {text:'No'}
    ]
    });
    confirm.present();
    
  }

}
