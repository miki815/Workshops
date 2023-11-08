import { Component, OnInit } from '@angular/core';
import { Radionica } from 'src/app/models/radionica';
import { OrganizatorService } from 'src/app/services/organizator.service';
import { UcesnikService } from 'src/app/services/ucesnik.service';

@Component({
  selector: 'app-organizator-izmeni-radionicu',
  templateUrl: './organizator-izmeni-radionicu.component.html',
  styleUrls: ['./organizator-izmeni-radionicu.component.css']
})
export class OrganizatorIzmeniRadionicuComponent implements OnInit {

  constructor(private organizatorService: OrganizatorService, private ucesnikService: UcesnikService) { }

  radionicaIzmena: Radionica
  path: string;
  radionicaProfilna: File = null;
  radionicaGalerija: File[] = [];


  ngOnInit(): void {
    this.radionicaIzmena = JSON.parse(localStorage.getItem('radionicaIzmena'))
  }

  izmeniRadionicu(){
      this.ucesnikService.sacuvajRadionicu(this.radionicaIzmena).subscribe(res=>{
        if(res['poruka'] == 'ok') {
          alert("Radionica azurirana!");
          localStorage.setItem('radionicaIzmena', JSON.stringify(this.radionicaIzmena));
          window.location.reload();
        }
      })
  }

  onFileSelected(event){
    this.radionicaProfilna = <File>event.target.files[0];
  }

  uploadImage(){
    let fd = new FormData();
    fd.append("radionicaGlavna", this.radionicaProfilna, this.radionicaProfilna.name);
    this.ucesnikService.uploadProfilna(fd).subscribe(res=>{
      this.radionicaIzmena.glavna_slika = res['putanja']      
    });
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

  uploadImages(){
    let fd = new FormData();
    for(let i = 0;i < this.radionicaGalerija.length; i++)
      fd.append("radionicaGalerija", this.radionicaGalerija[i], this.radionicaGalerija[i].name);
    this.ucesnikService.uploadGalerija(fd).subscribe(res => {
      this.radionicaIzmena.galerija_slike = res['galerija']
      console.log(this.radionicaIzmena.galerija_slike)
    });
  }

  obradaZahteva(kor_ime, status){
    this.organizatorService.obradiZahtev(kor_ime, status, this.radionicaIzmena.naziv).subscribe(res => {
      if(res['poruka'] != 'ok') console.log('Greska obrada zahteva')
      else {
        this.radionicaIzmena.zahtevi.splice(this.radionicaIzmena.zahtevi.indexOf(kor_ime), 1)
      //  window.location.reload();
      }
    })
  }
}
