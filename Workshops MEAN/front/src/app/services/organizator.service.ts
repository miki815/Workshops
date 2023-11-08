import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class OrganizatorService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getRadionice(){
    return this.http.get(`${this.uri}/organizator/get_radionice`);
  }

  otkaziRadionicu(naziv){
    const data = {naziv: naziv}
    return this.http.post(`${this.uri}/organizator/otkaziRadionicu`, data);
  }

  sacuvajJSON(radionica){
    const data = {radionica: radionica}
    return this.http.post(`${this.uri}/organizator/sacuvajJSON`, data);
  }

  uploadSablon(fd){
    return this.http.post(`${this.uri}/organizator/uploadSablon`, fd);
  }

  obradiZahtev(kor_ime, status, naziv){
    const data = {kor_ime: kor_ime, status: status, naziv: naziv}
    return this.http.post(`${this.uri}/organizator/obradiZahtev`, data);
  }

  getRadionicaPoruke(radionica){
    const data = {naziv: radionica}
    return this.http.post(`${this.uri}/organizator/getRadionicaPoruke`, data);
  }

  posaljiPoruku(poruka, radionica, salje, salje_slika, prima){
    let vreme = new Date(Date.now())
    const data = {poruka: poruka, radionica: radionica, salje: salje, salje_slika: salje_slika, 
      vreme: vreme, prima: prima}
    return this.http.post(`${this.uri}/organizator/posaljiPoruku`, data);
  }

}
