import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  api = environment.apiBaseUrl;
  private httpOptions: any;
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
  }

  getBasicHeader() {
    this.httpOptions = new HttpHeaders({
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin',
      'Authorization': 'Bearer '+this.token
    });
    return {headers: this.httpOptions};
  }
}
