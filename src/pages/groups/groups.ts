import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class GroupsPage {


  public favouriteCategories = [];
  public checkedList = [];
  private meetupForm : FormGroup;

  constructor(public navCtrl: NavController,
              public localStorage: LocalStorageProvider,
              private formBuilder: FormBuilder ) {

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

    var body = "location=" + this.meetupForm.value.location + "&category=" +this.checkedList ;
    console.log(body);
  }

}
