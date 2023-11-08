import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Radionica } from 'src/app/models/radionica';
import { User } from 'src/app/models/user';
import { GostService } from 'src/app/services/gost.service';
import { UcesnikService } from 'src/app/services/ucesnik.service';

@Component({
  selector: 'app-ucesnik-radionice',
  templateUrl: './ucesnik-radionice.component.html',
  styleUrls: ['./ucesnik-radionice.component.css']
})
export class UcesnikRadioniceComponent implements OnInit {

  constructor(private ucesnikService: UcesnikService, private gostService: GostService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ulogovan: User;
  mojeRadionice: Radionica[]
  sveRadionice: Radionica[]
  pojam: string = "";
  opcija: number = 0;
  pretrazeno: boolean = false;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
    this.ucesnikService.getRadionice(this.ulogovan.kor_ime).subscribe((mojeRadionice: Radionica[])=>{
      this.mojeRadionice = mojeRadionice;
    });
    this.gostService.dohvati_radionice().subscribe((data: Radionica[])=>{
      this.sveRadionice = data;
    });
  }


  otkaziPrijavu(nazivRadionice, d){
    let deadline = new Date(Date.now() + 12*60*60*1000);
    let datum = new Date(d)
    if(deadline > datum) {console.log("Manje od 12h"); alert("Ne mozete otkazati radionicu jer je ostalo manje od 12h do pocetka")}
    else{
      this.ucesnikService.otkaziPrijavu(this.ulogovan.kor_ime, nazivRadionice).subscribe(res=>{
        if(res['poruka'] == 'ok') console.log('Prijava otkazana');
        window.location.reload();
      })
    }
  }

  pretraga(){
    this.gostService.dohvati_radionice().subscribe((sve_radionice: Radionica[])=>{
      if(this.opcija == 0) this.sveRadionice = sve_radionice.filter(r => r.naziv.includes(this.pojam));
      else if(this.opcija == 1) this.sveRadionice = sve_radionice.filter(r => r.mesto.includes(this.pojam));
      else this.sveRadionice = sve_radionice.filter(r => (r.naziv.includes(this.pojam) || r.mesto.includes(this.pojam)));
      this.pretrazeno = true;
    });
  }

  sortDatum(){
    this.sveRadionice.sort((a, b)=>{
      if(a.datum > b.datum) return 1;
      else if(a.datum == b.datum) return 0;
      else return -1;
    })
  }

  sortNaziv(){
    this.sveRadionice.sort((a, b)=>{
      if(a.naziv.toLowerCase() > b.naziv.toLowerCase()) return 1;
      else if(a.naziv.toLowerCase() == b.naziv.toLowerCase()) return 0;
      else return -1;
    })
  }

  detalji(radionica: Radionica){
    localStorage.setItem('radionica detalji', JSON.stringify(radionica))
    this.router.navigate(['detalji'], {relativeTo: this.activatedRoute})
  }

}
