import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';



@Injectable()
export class LocalStorageProvider {

  constructor(public storage: Storage) {
  
  }

  addInterestedCategory(category){

    let Item = {category: category}
    this.storage.set(category.id.toString(), JSON.stringify(Item));
    this.getAllInterestedCategories()
  }

  removeCategory(category){
    this.storage.remove(category.id.toString());
  }

  getAllInterestedCategories(){
    let results = [];
    this.storage.forEach(data =>{
      console.log(data);
      results.push(JSON.parse(data));
    });
    return results;
  }

}
