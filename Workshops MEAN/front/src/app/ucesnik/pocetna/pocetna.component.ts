import { Component, OnInit } from '@angular/core';
import { Komentar } from 'src/app/models/komentar';
import { Poruka } from 'src/app/models/poruka';
import { Radionica } from 'src/app/models/radionica';
import { RadionicaPoruke } from 'src/app/models/radionicaPoruke';
import { User } from 'src/app/models/user';
import { UcesnikService } from 'src/app/services/ucesnik.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private ucesnikService: UcesnikService, private userService: UserService) { }

  imeNovo: string;
  prezimeNovo: string;
  korimeNovo: string;
  telefonNovo: string;
  emailNovo: string;
  profilnaNovo: string;
  profilnaFile: File = null;

  ulogovan: User;
  radionice: Radionica[];
  radioniceLajkovane: Radionica[];
  mojiKomentari: Komentar[];
  mojePoruke: RadionicaPoruke[];
  poruka: string;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'))
    this.profilnaNovo = this.ulogovan.profilna;
    this.imeNovo = this.ulogovan.ime;
    this.prezimeNovo = this.ulogovan.prezime;
    this.korimeNovo = this.ulogovan.kor_ime;
    this.telefonNovo = this.ulogovan.telefon;
    this.emailNovo = this.ulogovan.email;
    this.ucesnikService.getRadionice(this.ulogovan.kor_ime).subscribe((mojeRadionice: Radionica[])=>{
      this.radionice = mojeRadionice;
    })
    this.ucesnikService.getLajkovaneRadionice(this.ulogovan.kor_ime).subscribe((mojeRadionice: Radionica[])=>{
      this.radioniceLajkovane = mojeRadionice;
    })
    this.ucesnikService.getKomentari(this.ulogovan.kor_ime).subscribe((komentari: Komentar[])=>{
      this.mojiKomentari = komentari;
    })
    this.ucesnikService.getPoruke(this.ulogovan.kor_ime).subscribe((poruke: RadionicaPoruke[])=>{
      this.mojePoruke = poruke;
    })
  }

  updateInfo(){
    this.ucesnikService.updateInfo(this.imeNovo, this.prezimeNovo, this.korimeNovo, this.telefonNovo,
      this.emailNovo, this.ulogovan.kor_ime, this.profilnaNovo).subscribe(res =>{
      if(res['poruka'] == 'azurirano'){
        this.ulogovan.ime = this.imeNovo;
        this.ulogovan.prezime = this.prezimeNovo;
        this.ulogovan.kor_ime = this.korimeNovo;
        this.ulogovan.telefon = this.telefonNovo;
        this.ulogovan.email = this.emailNovo;
        this.ulogovan.profilna = this.profilnaNovo;
        localStorage.setItem('ulogovan', JSON.stringify(this.ulogovan));
        window.location.reload();
      } else console.log('azuriranje neuspesno')
    })
  }

  onFileSelected(event){
    this.profilnaFile = <File>event.target.files[0]
  }

  uploadImage(){
    let fd = new FormData();
    fd.append("profilna", this.profilnaFile, this.profilnaFile.name);
    console.log(fd.getAll('profilna'))
    this.userService.uploadProfilna(fd).subscribe(res=>{
      if(res['poruka'] == 'uspeh'){
      //  alert('Uspesno ste ucitali sliku.')
        this.profilnaNovo = res['putanja'];
        this.ulogovan.profilna = this.profilnaNovo;
      }
      else alert('Lose dimenzije (min 100x100px, max 300x300px)');
    });
  }

  sortBy(fieldName){
    this.radionice = this.radionice.sort((r1, r2)=>{
      switch(fieldName){
        case 'naziv':
          return r1.naziv >= r2.naziv ? 1 : -1;
        case 'datum':
          return r1.datum >= r2.datum ? 1 : -1;
        case 'mesto':
          return r1.mesto >= r2.mesto ? 1 : -1;
        default:
          return r1.opis_kratak >= r2.opis_kratak ? 1 : -1;
      }
    })
  }

  povuciLajk(nazivRadionice){
    this.ucesnikService.povuciLajk(nazivRadionice, this.ulogovan.kor_ime).subscribe(res=>{
      if(res['poruka'] != 'ok') console.log('Unlike greska');
      else window.location.reload();
    })
  }

  azurirajKomentar(kom, radionica){
    this.ucesnikService.azurirajKomentar(this.ulogovan.kor_ime, kom, radionica).subscribe(res=>{
      if(res['poruka'] != 'ok') console.log('Azuriraj greska');
      else window.location.reload();
    })
  }

  obrisiKomentar(kom, radionica){
    this.ucesnikService.obrisiKomentar(this.ulogovan.kor_ime, kom, radionica).subscribe(res=>{
      if(res['poruka'] != 'ok') console.log('Obrisi greska');
      else window.location.reload();
    })
  }

  posaljiPoruku(poruka, radionica){
    console.log(poruka + " " + radionica)
    this.ucesnikService.posaljiPoruku(poruka, radionica, this.ulogovan.kor_ime, this.ulogovan.profilna).subscribe(res=>{
      if(res['poruka'] != 'ok') console.log('Poruka slanje greska');
      else {
        for(let radionicaPoruke of this.mojePoruke){
          if(radionicaPoruke.radionica == radionica){
            radionicaPoruke.poruke.push(res['poslataPoruka'])
          }
        }
      };
    })
  }
}
