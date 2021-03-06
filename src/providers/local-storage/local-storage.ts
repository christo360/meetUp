import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';



@Injectable()
export class LocalStorageProvider {

  constructor(public storage: Storage) {
  
  }

  addInterestedCategory(category){

    let Item = {category}
    this.storage.set(category.id.toString(), JSON.stringify(Item));
  }

  getAllInterestedCategories(){
    let results = [];
    this.storage.forEach(data =>{

      results.push(JSON.parse(data));
    });
    return results;
  }

  removeAllFromStorage(){
    this.storage.clear();
  }

}
