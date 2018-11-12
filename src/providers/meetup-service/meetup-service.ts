import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class MeetupServiceProvider {

  private baseUrl ='https://api.meetup.com';
  private apiKey = '4458554c4b22ad705541556f762b7c'

  constructor(public http: HttpClient) {

  }

  getCategories() {
    return new Promise(resolve => {
      let headers = new HttpHeaders();
      headers.append("Content-Type", "application/json");

      this.http.get(this.baseUrl+'/2/categories?key='+this.apiKey).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
