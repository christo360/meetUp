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
  public newGroups = [];
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
        var location = "location=Johannesburg";
        this.meetupService.getGroups(location,this.checkedList).subscribe(result => {
          var responseData = result as any;
          this.groups = responseData;
          console.log(this.groups);
          loader.dismiss();
        })
      });
  }

  refineSearch(category){
   this.groups = [];
   let loader = this.loadingController.create(
    {
      content:'Loading Groups!',
      spinner:'dots'
    });
    loader.present().then(()=>{
      var location = "location=Johannesburg";
      this.meetupService.getGroups(location,category).subscribe(result => {
        var responseData = result as any;
        this.groups = responseData;
        console.log(this.groups);
        loader.dismiss();
      })
    });
  }

  clearStorage() {

    let confirm = this.alertController.create({
      title:'Remove favourite Category',
      message:'Are you sure you want to remove your favourite category?',
      buttons: [{

        text:'Yes',
        handler:() => {
    
          this.localStorage.removeAllFromStorage()
          let toast = this.toastController.create({
            message:'Category Removed',
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
