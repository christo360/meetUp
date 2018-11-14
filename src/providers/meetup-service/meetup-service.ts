import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class MeetupServiceProvider {

  private baseUrl ='https://cors.io/?https://api.meetup.com';
  private apiKey = '4458554c4b22ad705541556f762b7c'

  constructor(public http: HttpClient) {

  }


  public getCategories(): Observable<any> {
    let params = new HttpParams()
        .set("cache-control","no-cache")
        .set("Postman-Token","6417d217-133b-45f9-b9b9-ae5448f70901");
    return this.http.get(this.baseUrl+'/2/categories?key='+this.apiKey,{ params: params });
}

}
