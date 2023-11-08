import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Radionica } from '../models/radionica';
import { User } from '../models/user';
import { OrganizatorService } from '../services/organizator.service';
import { UcesnikService } from '../services/ucesnik.service';

@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  constructor(private organizatorService: OrganizatorService, private ucesnikService: UcesnikService, private router: Router) { }

  ulogovan: User;
  sveRadionice: Radionica[];
  novaRadionica: Radionica;
  radionicaProfilna: File = null;
  radionicaSablon: File = null;
  radionicaGalerija: File[] = [];

  ngOnInit(): void {
    this.novaRadionica = new Radionica();
    this.organizatorService.getRadionice().subscribe((radionice: Radionica[])=>{
      this.sveRadionice = radionice;
      console.log(radionice)
    })
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'))
  }

  otkaziRadionicu(naziv){
    this.organizatorService.otkaziRadionicu(naziv).subscribe(res=>{
      if(res['poruka'] == 'ok') {
        alert('Radionica ' + naziv + ' otkazana');
        window.location.reload();
      }
    })
  }

  sacuvajJSON(radionica: Radionica){
    this.organizatorService.sacuvajJSON(radionica).subscribe(res=>{
      if(res['poruka'] == 'ok') {
        alert('Sablon radionice ' + radionica.naziv + ' sacuvan');
      }
    })
  }

  izmeniRadionicu(radionica: Radionica){
    localStorage.setItem('radionicaIzmena', JSON.stringify(radionica))
    this.router.navigate(['organizator/radionicaIzmena'])
  }

  pregledPoruka(radionica: Radionica){
    localStorage.setItem('radionicaPoruke', JSON.stringify(radionica))
    this.router.navigate(['organizator/radionicaPoruke'])
  }

  onFileSelected(event){
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

  uploadImage(){
    let fd = new FormData();
    fd.append("radionicaGlavna", this.radionicaProfilna, this.radionicaProfilna.name);
    this.ucesnikService.uploadProfilna(fd).subscribe(res=>{
      this.novaRadionica.glavna_slika = res['putanja']
      alert("Upload uspesan!")
    });
  }

  uploadImages(){
    let fd = new FormData();
    for(let i = 0;i < this.radionicaGalerija.length; i++)
      fd.append("radionicaGalerija", this.radionicaGalerija[i], this.radionicaGalerija[i].name);
    this.ucesnikService.uploadGalerija(fd).subscribe(res=>{
      this.novaRadionica.galerija_slike = res['galerija']
      alert("Upload uspesan!")
      console.log(this.novaRadionica.galerija_slike)
    });
  }

  predlogRadionice(){
    this.ucesnikService.predlogRadionice(this.novaRadionica.naziv, this.novaRadionica.mesto, 
      this.novaRadionica.datum, this.novaRadionica.opis_kratak, this.novaRadionica.opis_duzi, 'predlog',
      this.novaRadionica.glavna_slika, this.novaRadionica.galerija_slike,
      this.novaRadionica.slobodnih_mesta, this.ulogovan.kor_ime).subscribe(res=>{
       alert("Vas predlog je zabelezen i ceka na odobrenje administratora.")
    })
  }

  uploadSablon(){
    let fd = new FormData();
    fd.append("radionicaSablon", this.radionicaSablon, this.radionicaSablon.name);
    this.organizatorService.uploadSablon(fd).subscribe(res=>{
      this.novaRadionica.datum = (res['radionicaSablon']['datum'])
      this.novaRadionica.mesto = (res['radionicaSablon']['mesto'])
      this.novaRadionica.naziv = (res['radionicaSablon']['naziv'])
      this.novaRadionica.opis_kratak = (res['radionicaSablon']['opis_kratak'])
      this.novaRadionica.opis_duzi = (res['radionicaSablon']['opis_duzi'])
      this.novaRadionica.glavna_slika = (res['radionicaSablon']['glavna_slika'])
      this.novaRadionica.galerija_slike = (res['radionicaSablon']['galerija_slike'])
    });
  }

  onJSONFileSelected(event){
    this.radionicaSablon = <File>event.target.files[0];
  }

}
