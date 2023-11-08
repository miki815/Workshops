import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { Radionica } from 'src/app/models/radionica';
import { GoogleMapsModule } from '@angular/google-maps';
import { User } from 'src/app/models/user';
import { UcesnikService } from 'src/app/services/ucesnik.service';
import { RadionicaPoruke } from 'src/app/models/radionicaPoruke';



@Component({
  selector: 'app-ucesnik-radionice-detalji',
  templateUrl: './ucesnik-radionice-detalji.component.html',
  styleUrls: ['./ucesnik-radionice-detalji.component.css']
})
export class UcesnikRadioniceDetaljiComponent implements OnInit {

  ulogovan: User;
  radionica: Radionica;
  mojePoruke: RadionicaPoruke[];
  porukeRadionica: RadionicaPoruke;
  poruka: string;
  komentar: string;
  lajk: boolean = false;
  prijavljen: boolean = false;

  constructor(private ucesnikService: UcesnikService) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
    this.radionica = JSON.parse(localStorage.getItem('radionica detalji'));
    for(let kor_ime of this.radionica.svidjanja){
      if(kor_ime == this.ulogovan.kor_ime) {
        this.lajk = true;
        break;
      }
    }
    for(let kor_ime of this.radionica.ucesnici){
      if(kor_ime == this.ulogovan.kor_ime) {
        this.prijavljen = true;
        break;
      }
    }
    this.porukeRadionica = new RadionicaPoruke();
    this.ucesnikService.getPoruke(this.ulogovan.kor_ime).subscribe((poruke: RadionicaPoruke[])=>{
      this.mojePoruke = poruke;
      for(let radionicaPoruke of this.mojePoruke){
        if(radionicaPoruke.radionica == this.radionica.naziv){
          this.porukeRadionica.radionica = this.radionica.naziv;
          this.porukeRadionica.poruke = radionicaPoruke.poruke;
        }
      }
    });
  }

  prijava(){
    this.ucesnikService.prijava(this.radionica.naziv, this.ulogovan.kor_ime).subscribe(res=>{
      if(res['poruka'] == 'ok') {
        console.log('Prijavljeni ste')
        alert('Prijava uspesna, ceka se na odobrenje organizatora!')
      }
    })
  }

  obavestiMe(){
    this.ucesnikService.cekanje(this.radionica.naziv, this.ulogovan.email).subscribe(res=>{
      if(res['poruka'] == 'ok') {
        console.log('Dodati ste na listu za cekanje')
        alert('Vas zahtev je zabelezen')
      }
    })
  }

  posaljiPoruku(poruka){
    console.log(poruka + " " + this.radionica.naziv)
    this.ucesnikService.posaljiPoruku(poruka, this.radionica.naziv, this.ulogovan.kor_ime, this.ulogovan.profilna).subscribe(res=>{
      if(res['poruka'] != 'ok') console.log('Poruka slanje greska');
      else {
        alert('poruka poslata');
        for(let radionicaPoruke of this.mojePoruke){
          if(radionicaPoruke.radionica == this.radionica.naziv){
            this.porukeRadionica.poruke.push(res['poslataPoruka'])
          }
        }
        window.location.reload();
      };
    })
  }


  posaljiKomentar(komentar){
    console.log(komentar + " " + this.radionica.naziv)
    this.ucesnikService.posaljiKomentar(komentar, this.radionica._id,  this.ulogovan.kor_ime, this.ulogovan.profilna).subscribe(res=>{
      if(res['poruka'] != 'ok') console.log('Komentar slanje greska');
      else {
        this.radionica.komentari.push(res['komentar']);
        localStorage.setItem('radionica detalji', JSON.stringify(this.radionica))
      };
    })
  }

  lajkujRadionicu(){
    this.ucesnikService.lajkujRadionicu(this.ulogovan.kor_ime, this.radionica._id).subscribe(res=>{
      if(res['poruka'] != 'ok') console.log('Lajk greska');
      else {
        this.radionica.svidjanja.push(this.ulogovan.kor_ime);
        localStorage.setItem('radionica detalji', JSON.stringify(this.radionica));
        this.lajk = true;
      };
    })
  }

}
