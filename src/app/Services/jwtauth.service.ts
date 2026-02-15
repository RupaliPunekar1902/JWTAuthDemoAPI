import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JWTAuthService {

  apiURL = 'https://localhost:7034/api/JWTAuth/';

  constructor(private http:HttpClient) { }

  signup(data:any){
    return this.http.post('https://localhost:7034/api/JWTAuth/signup', data);
  }

  login(data:any){
    return this.http.post('https://localhost:7034/api/JWTAuth/login' , data);
  }
}
