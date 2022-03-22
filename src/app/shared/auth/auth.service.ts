import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
    api = environment.apiBaseUrl;
    private httpOptions: any;

    getBasicHeader() {
        this.httpOptions = new HttpHeaders({
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin',
        });
        return {headers: this.httpOptions};
    }

    constructor(private http: HttpClient,private router: Router) {
    }

    public login(admin): Observable<any>{
        return this.http.post<any>(this.api+'login',admin,this.getBasicHeader());
    }

    public forgotPassword(email): Observable<any>{
        return this.http.post(this.api+'forgot-password',email,this.getBasicHeader());
    }

    public resetPassword(password): Observable<any>{
        return this.http.post<any>(this.api+'reset-password',password,this.getBasicHeader());
    }

    setToken(token: string): void{
        localStorage.setItem('token',token);
    }
    getToken(): string | null{
        return localStorage.getItem('token');
    }
    setUserDetails(user){
        localStorage.setItem('user',JSON.stringify(user));
    }
    isLoggedIn(){
        return this.getToken() !== null;
    }
    logout(){
        localStorage.removeItem('token');
        // localStorage.removeItem('user');
        this.router.navigate(['login']);
    }
}
