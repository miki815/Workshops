import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UcesnikService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }


  updateInfo(ime, prezime, korime, telefon, email, username, profilna){
    const data = {
      ime: ime,
      prezime: prezime,
      korime: korime,
      telefon: telefon,
      email: email,
      username: username,
      profilna: profilna
    }
    return this.http.post(`${this.uri}/ucesnik/updateInfo`, data);
  }

  getRadionice(kor_ime){
    return this.http.get(`${this.uri}/ucesnik/getRadionice/${kor_ime}`);
  }

  getLajkovaneRadionice(kor_ime){
    return this.http.get(`${this.uri}/ucesnik/getLRadionice/${kor_ime}`);
  }

  getKomentari(kor_ime){
    return this.http.get(`${this.uri}/ucesnik/getKomentari/${kor_ime}`);
  }

  povuciLajk(nazivR, kor_ime){
    const data = {nazivR: nazivR, kor_ime: kor_ime}
    return this.http.post(`${this.uri}/ucesnik/povuciLajk/`, data);
  }

  azurirajKomentar(kor_ime, kom, rad){
    const data = {komentar: kom, kor_ime: kor_ime, radionica: rad}
    return this.http.post(`${this.uri}/ucesnik/azurirajKomentar/`, data);
  }

  obrisiKomentar(kor_ime, kom, rad){
    const data = {komentar: kom, kor_ime: kor_ime, radionica: rad}
    return this.http.post(`${this.uri}/ucesnik/obrisiKomentar/`, data);
  }

  otkaziPrijavu(kor_ime, rad){
    const data = {kor_ime: kor_ime, radionica: rad}
    return this.http.post(`${this.uri}/ucesnik/otkaziPrijavu/`, data);
  }

  prijava(radionica, kor_ime){
    const data = {kor_ime: kor_ime, radionica: radionica}
    return this.http.post(`${this.uri}/ucesnik/prijava/`, data);
  }

  cekanje(radionica, email){
    const data = {email: email, radionica: radionica}
    return this.http.post(`${this.uri}/ucesnik/cekanje/`, data);
  }

  predlogRadionice(naziv, mesto, datum, opis_kratak, opis_duzi, status, glavna_slika, 
    galerija_slike, slobodnih_mesta, organizator){
    const data = {naziv: naziv, mesto: mesto, datum: datum, opis_kratak: opis_kratak, opis_duzi: opis_duzi, 
      status: status, glavna_slika: glavna_slika, galerija_slike: galerija_slike, 
      slobodnih_mesta: slobodnih_mesta, organizator: organizator}
    return this.http.post(`${this.uri}/ucesnik/insertRadionica/`, data);
  }

  uploadProfilna(fd){
    return this.http.post(`${this.uri}/ucesnik/uploadProfilna`, fd);
  }

  uploadGalerija(fd){
    return this.http.post(`${this.uri}/ucesnik/uploadGalerija`, fd);
  }

  getPoruke(kor_ime){
    return this.http.get(`${this.uri}/ucesnik/getPoruke/${kor_ime}`);
  }

  posaljiPoruku(poruka, radionica, salje, salje_slika){
    let vreme = new Date(Date.now())
    const data = {poruka: poruka, radionica: radionica, salje: salje, salje_slika: salje_slika, vreme: vreme}
    return this.http.post(`${this.uri}/ucesnik/posaljiPoruku`, data);
  }

  posaljiKomentar(komentar, idRadionice, salje, salje_slika){
    let vreme = new Date(Date.now())
    const data = {komentar: komentar, idRadionice: idRadionice, salje: salje, slika: salje_slika, vreme: vreme}
    return this.http.post(`${this.uri}/ucesnik/posaljiKomentar`, data);
  }

  lajkujRadionicu(kor_ime, idRadionice){
    const data = {kor_ime: kor_ime, idRadionice: idRadionice}
    return this.http.post(`${this.uri}/ucesnik/lajkujRadionicu`, data);
  }

  obrisiRadionicu(id){
    const data = {id: id}
    return this.http.post(`${this.uri}/ucesnik/obrisiRadionicu`, data);
  }

  sacuvajRadionicu(r){
    const data = {radionica: r}
    return this.http.post(`${this.uri}/ucesnik/sacuvajRadionicu`, data);
  }
}
