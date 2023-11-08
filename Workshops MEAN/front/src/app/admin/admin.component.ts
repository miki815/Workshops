import { Component, OnInit } from '@angular/core';
import { Radionica } from '../models/radionica';
import { User } from '../models/user';
import { UcesnikService } from '../services/ucesnik.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  korisnici: User[];
  korisniciCekanje: User[];
  radioniceAktivne: Radionica[];
  radionicePredlog: Radionica[];
  ime: string;
  prezime: string;
  kor_ime: string;
  lozinka: string;
  tip: string;
  telefon: string;
  email: string;
  organizacija: string;
  adresa: string;
  maticni: string;
  profilnaFile: File = null;
  novaRadionica: Radionica;
  radionicaProfilna: File = null;
  radionicaGalerija: File[] = [];
  azuriranje: Array<number>;
  profilna: string;

  constructor(private userService: UserService, private ucesnikService: UcesnikService) { }

  ngOnInit(): void {
    this.novaRadionica = new Radionica();
    this.userService.getKorisnici().subscribe((korisnici: User[])=>{
      this.korisnici = korisnici;
    })
    this.userService.getKorisniciNaCekanju().subscribe((korisnici: User[])=>{
      this.korisniciCekanje = korisnici;
    })
    this.userService.getRadioniceByStatus('aktivna').subscribe((radionice: Radionica[])=>{
      this.radioniceAktivne = radionice;
      this.azuriranje = new Array(this.radioniceAktivne.length).fill(0);
    })
    this.userService.getRadioniceByStatus('predlog').subscribe((radionice: Radionica[])=>{
      this.radionicePredlog = radionice;
    })
  }

  azuriraj(korisnik: User){
    this.userService.azurirajKorisnik(korisnik).subscribe(res=>{
      if(res['poruka'] == 'ok') console.log('Korisnik ' + korisnik.kor_ime + ' azuriran.')
      window.location.reload()
    })
  }

  obrisi(username){
    this.userService.deleteKorisnik(username).subscribe(res=>{
      if(res['poruka'] == 'ok') console.log('Korisnik ' + username + ' obrisan.')
      window.location.reload()
    })
  }

  register(){
    this.userService.register(this.ime, this.prezime,
      this.kor_ime, this.lozinka, this.telefon, this.email, this.tip, 
      this.organizacija, this.adresa, this.maticni, 'odobren', this.profilna).subscribe(ob=>{
        if(ob['message']=='usser added'){
          alert('User added')
        } else{
          alert('Register Error!')
        }
      })
  }

  onFileSelected(event){
    this.profilnaFile = <File>event.target.files[0]
  }


  uploadImage(){
    let fd = new FormData();
    console.log(fd)
    fd.append("profilna", this.profilnaFile, this.profilnaFile.name);
    console.log(fd.getAll('profilna'))
    this.userService.uploadProfilna(fd).subscribe(res=>{
      if(res['uspeh']) console.log("TEST PROSAO")
    });
  }
  
  setStatus(username, status){
    this.userService.setStatus(username, status).subscribe(res=>{
      if(res['poruka'] == 'ok') {
        alert('promenjen status korisnika ' + username + ' na ' + status)
        window.location.reload();
      }
    });
  }

  setRadionicaStatus(naziv, organizator, status){
    this.userService.setRadionicaStatus(naziv, organizator, status).subscribe(res=>{
      if(res['poruka'] == 'ok') {
        alert('promenjen status radionice ' + naziv + ' na ' + status)
        window.location.reload();
      }
      else if(res['poruka'] == 'aktivan ucesnik'){
        alert('Zahtev odbijen! Korisnik ' + organizator + ' je aktivan ucesnik!')
      }
    });
  }

  onFileSelectedG(event){
    this.radionicaProfilna = <File>event.target.files[0];
  }

  onGalerijaFileSelected(event){
    this.radionicaGalerija = []
    let limit = event.target.files.length;
    if(limit > 5){
      alert('Mozete dodati najvise 5 slika')
      limit = 5
    }
    for(let i = 0;i < limit;i++){
      this.radionicaGalerija.push(<File>event.target.files[i])
      console.log(this.radionicaGalerija)
    }
  }

  uploadImageG(){
    let fd = new FormData();
    fd.append("radionicaGlavna", this.radionicaProfilna, this.radionicaProfilna.name);
    this.ucesnikService.uploadProfilna(fd).subscribe(res=>{
      this.novaRadionica.glavna_slika = res['putanja']
    });
  }

  uploadImages(){
    let fd = new FormData();
    for(let i = 0;i < this.radionicaGalerija.length; i++)
      fd.append("radionicaGalerija", this.radionicaGalerija[i], this.radionicaGalerija[i].name);
    this.ucesnikService.uploadGalerija(fd).subscribe(res=>{
      this.novaRadionica.galerija_slike = res['galerija']
      console.log(this.novaRadionica.galerija_slike)
    });
  }

  predlogRadionice(){
    this.ucesnikService.predlogRadionice(this.novaRadionica.naziv, this.novaRadionica.mesto, 
      this.novaRadionica.datum, this.novaRadionica.opis_kratak, this.novaRadionica.opis_duzi, 'aktivna',
      this.novaRadionica.glavna_slika, this.novaRadionica.galerija_slike,
      this.novaRadionica.slobodnih_mesta, this.novaRadionica.organizator).subscribe(res=>{
       alert("Radionica dodata!")
    })
  }

  obrisiRadionicu(id){
    this.ucesnikService.obrisiRadionicu(id).subscribe(res=>{
      if(res['poruka'] == 'ok') {
        alert("Radionica obrisana!");
        window.location.reload();
      }
    })
  }

  azurirajRadionicu(i){
    this.azuriranje[i] = 1;
    console.log(i)
  }

  sacuvajRadionicu(r){
    this.ucesnikService.sacuvajRadionicu(r).subscribe(res=>{
      if(res['poruka'] == 'ok') {
        alert("Radionica azurirana!");
        window.location.reload();
      }
    })
  }

}
