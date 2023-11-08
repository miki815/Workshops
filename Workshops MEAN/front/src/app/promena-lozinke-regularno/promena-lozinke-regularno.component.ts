import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-promena-lozinke-regularno',
  templateUrl: './promena-lozinke-regularno.component.html',
  styleUrls: ['./promena-lozinke-regularno.component.css']
})
export class PromenaLozinkeRegularnoComponent implements OnInit {

  lozinka_stara: string = '';
  lozinka_nova: string = '';
  lozinka_nova2: string = '';
  ulogovan: User;
  errorMsg: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'))
  }


  promena_lozinke(){
    if(this.lozinka_nova == '' || this.lozinka_nova2 == '' || this.lozinka_stara == ''){
      this.errorMsg = "Molimo vas da unesete sva trazena polja.";
    }
    else if(this.lozinka_nova != this.lozinka_nova2){
      this.errorMsg = "Lozinke se ne poklapaju.";
    }
    else if(this.lozinka_nova.match(/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z][a-zA-Z0-9!@#$%^&*]{7,15}$/)){
      this.userService.promena_lozinke_reg(this.ulogovan.email, this.lozinka_nova, this.lozinka_stara).subscribe(res=>{
          if(res['poruka']=='Lozinka promenjena'){
            alert('Lozinka promenjena! Molimo Vas da se ulogujete ponovo.');
            localStorage.removeItem('ulogovan')
            this.router.navigate(['../../']);
          } else{
            this.errorMsg = "Stara lozinka nije dobra.";
          }
        })
    } else{
      this.errorMsg = "Nova lozinka mora da sadrzi 8-16 karaktera, bar jedno veliko slovo, \
      broj i specijalni karakter i mora pocinjati slovom.";
    }
  } 
  
}
