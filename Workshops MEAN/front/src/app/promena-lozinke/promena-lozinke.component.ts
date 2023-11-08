import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private userService: UserService) { }

  email: string;

  ngOnInit(): void {
  }

  promena_lozinke(){
    this.userService.promena_lozinke(this.email).subscribe(ob=>{
        if(ob['message']=='poruka poslata'){
          alert('Privremeni link za promenu lozinke je poslat na vasu email adresu. Link je vazeci narednih 30min.');
        } else{
          alert('Mejl ne postoji!');
        }
      })
  }

}
