import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UcesnikService } from 'src/app/services/ucesnik.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-ucesnik-postani-organizator',
  templateUrl: './ucesnik-postani-organizator.component.html',
  styleUrls: ['./ucesnik-postani-organizator.component.css']
})
export class UcesnikPostaniOrganizatorComponent implements OnInit {

  constructor(private ucesnikService: UcesnikService, private userService: UserService) { }

  naziv: string;
  mesto: string;
  datum: Date;
  opis_kratak: string;
  opis_duzi: string;
  slobodnih_mesta: number;
  glavna_slika: string;
  galerija_slike: string[];
  radionicaProfilna: File = null;
  radionicaGalerija: File[] = [];
  ulogovan: User;

  ngOnInit(): void {
  }

  predlogRadionice(){
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
    this.ucesnikService.predlogRadionice(this.naziv, this.mesto, this.datum, this.opis_kratak, this.opis_duzi, 'predlog',
    this.glavna_slika, this.galerija_slike, this.slobodnih_mesta, this.ulogovan.kor_ime).subscribe(res=>{
      alert("Vas predlog je zabelezen")
    })
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
      this.glavna_slika = res['putanja']
      alert(this.glavna_slika)
    });
  }

  uploadImages(){
    let fd = new FormData();
    for(let i = 0;i < this.radionicaGalerija.length; i++)
      fd.append("radionicaGalerija", this.radionicaGalerija[i], this.radionicaGalerija[i].name);
    this.ucesnikService.uploadGalerija(fd).subscribe(res=>{
      this.galerija_slike = res['galerija']
      console.log(this.galerija_slike)
    });
  }
}
