import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GostService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  dohvati_radionice(){
    return this.http.get(`${this.uri}/gost/get_radionice`);
  }

  // pretraga(naziv, mesto){
  //   const data = {naziv: naziv, mesto: mesto}
  //   return this.http.post(`${this.uri}/gost/get_radionice`, data);
  // }


}
