import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Radionica } from './models/radionica';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(kor_ime, lozinka){
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/users/login`, data);
  }

  register(ime, prezime, kor_ime, lozinka, telefon, email, tip, organizacija, adresa, maticni, status, profilna){
    const data={
      ime: ime,
      prezime: prezime,
      kor_ime: kor_ime,
      lozinka: lozinka,
      telefon: telefon,
      email: email,
      tip: tip,
      organizacija: organizacija,
      adresa: adresa,
      maticni: maticni,
      status: status,
      profilna: profilna
    }

    return this.http.post(`${this.uri}/users/register`, data);
  }

  promena_lozinke_reg(email, lozinka_nova, lozinka_stara){
    const data = {email: email, lozinka_nova: lozinka_nova, lozinka_stara: lozinka_stara}
    return this.http.post(`${this.uri}/users/promena_lozinke_reg`, data);
  }

  promena_lozinke_zab(email, lozinka){
    const data = {email: email, lozinka: lozinka}
    return this.http.post(`${this.uri}/users/promena_lozinke_zab`, data);
  }

  promena_lozinke(email){
    const data = {email: email}
    return this.http.post(`${this.uri}/users/promena_lozinke`, data);
  }

  nova_lozinka(email, lozinka_nova, lozinka_stara){
    const data = {
      email: email,
      lozinka_nova: lozinka_nova,
      lozinka_stara: lozinka_stara
    }
    return this.http.post(`${this.uri}/users/nova_lozinka`, data);
  }

  validacija_tokena(token){
    const data = {token: token}
    return this.http.post(`${this.uri}/users/validacija_tokena`, data);
  }

  uploadProfilna(fd){
    console.log(fd.get("profilna"))
    return this.http.post(`${this.uri}/users/uploadProfilna`, fd);
  }

  getKorisnici(){
    return this.http.get(`${this.uri}/users/getKorisnici`);
  }

  deleteKorisnik(username){
    const data = {username: username}
    return this.http.post(`${this.uri}/users/obrisiKorisnika`, data);
  }

  azurirajKorisnik(korisnik){
    const data = {ime: korisnik.ime, prezime: korisnik.prezime, email: korisnik.email, telefon: korisnik.telefon, kor_ime: korisnik.kor_ime}
    return this.http.post(`${this.uri}/users/azurirajKorisnika`, data);
  }

  getKorisniciNaCekanju(){
    return this.http.get(`${this.uri}/users/getKorisniciNaCekanju`);
  }

  setStatus(username, status){
    const data = {username: username, status: status}
    return this.http.post(`${this.uri}/users/setStatus`, data);
  }

  getRadioniceByStatus(status){
    return this.http.get(`${this.uri}/users/getRadioniceStatus/${status}`); 
  }

  setRadionicaStatus(naziv, organizator, status){
    const data = {naziv: naziv, organizator: organizator, status: status}
    return this.http.post(`${this.uri}/users/setRadionicaStatus`, data);
  }
}
