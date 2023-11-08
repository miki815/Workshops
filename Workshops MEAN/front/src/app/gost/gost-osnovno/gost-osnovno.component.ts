import { Component, OnInit } from '@angular/core';
import { Radionica } from 'src/app/models/radionica';
import { GostService } from 'src/app/services/gost.service';

@Component({
  selector: 'app-gost-osnovno',
  templateUrl: './gost-osnovno.component.html',
  styleUrls: ['./gost-osnovno.component.css']
})
export class GostOsnovnoComponent implements OnInit {

  constructor(private gostService: GostService) { }

  radionice: Radionica[];
  topRadionice: Radionica[];
  pojam: string = "";
  opcija: number = 0;
  pretrazeno: boolean = false;

  ngOnInit(): void {
    this.gostService.dohvati_radionice().subscribe((radionice: Radionica[])=>{
      this.radionice = radionice;
      this.topRadionice = JSON.parse(JSON.stringify(this.radionice));
      this.topRadionice = this.topRadionice.sort((r1, r2)=>{
        return r2.svidjanja.length - r1.svidjanja.length;
      })
      this.topRadionice.length = 5;
    });
  }

  pretraga(){
    this.gostService.dohvati_radionice().subscribe((sve_radionice: Radionica[])=>{
      if(this.opcija == 0) this.radionice = sve_radionice.filter(r => r.naziv.includes(this.pojam));
      else if(this.opcija == 1) this.radionice = sve_radionice.filter(r => r.mesto.includes(this.pojam));
      else this.radionice = sve_radionice.filter(r => (r.naziv.includes(this.pojam) || r.mesto.includes(this.pojam)));
      this.pretrazeno = true;
    });
  }

  sortDatum(){
    this.radionice.sort((a, b)=>{
      if(a.datum > b.datum) return 1;
      else if(a.datum == b.datum) return 0;
      else return -1;
    })
  }

  sortNaziv(){
    this.radionice.sort((a, b)=>{
      if(a.naziv.toLowerCase() > b.naziv.toLowerCase()) return 1;
      else if(a.naziv.toLowerCase() == b.naziv.toLowerCase()) return 0;
      else return -1;
    })
  }

}
