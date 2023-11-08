import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Radionica } from 'src/app/models/radionica';
import { User } from 'src/app/models/user';
import { OrganizatorService } from 'src/app/services/organizator.service';
import { UcesnikService } from 'src/app/services/ucesnik.service';

@Component({
  selector: 'app-organizator-poruke',
  templateUrl: './organizator-poruke.component.html',
  styleUrls: ['./organizator-poruke.component.css']
})
export class OrganizatorPorukeComponent implements OnInit {

  constructor(private organizatorService: OrganizatorService, private router: Router,
     private activatedRoute: ActivatedRoute) { }

  radionica: Radionica;
  ulogovan: User;
  otvorenCet: Array<number>;
  novePoruke: Array<string>;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'))
    this.radionica = JSON.parse(localStorage.getItem('radionicaPoruke'))
    this.otvorenCet = new Array(this.radionica.caskanje.length).fill(0);
    this.novePoruke = new Array(this.radionica.caskanje.length).fill('');
  }

  prikaziCet(i){
    this.otvorenCet[i] = 1;
  }

  posaljiPoruku(poruka, prima){
    this.organizatorService.posaljiPoruku(poruka, this.radionica.naziv, this.ulogovan.kor_ime, 
      this.ulogovan.profilna, prima).subscribe(res=>{
        if(res['poruka'] =='ok') {
          console.log("Poruka poslata");
          for(let cet of this.radionica.caskanje){
            if(cet.kor_ime == prima) {cet.poruke.push(res['poslataPoruka']); break;}
          }
        }
      })
  }

  nazad(){
    this.router.navigate(['../'], {relativeTo: this.activatedRoute})
  }

}
