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
    return this.http.get(this.baseUrl+'/2/categories?key='+this.apiKey);
}

  public getGroups(location,categories): Observable<any> {
    let params = new HttpParams()
        .set('location',location)
        .set('category',categories)
        return this.http.get(this.baseUrl+'/find/groups?key='+this.apiKey,{ params: params });
  }

}
