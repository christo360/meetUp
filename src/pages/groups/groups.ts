import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
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
              public loadingController: LoadingController ) {

              this.meetupForm = this.formBuilder.group({
                  location: ['', Validators.required],
              });

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

}
