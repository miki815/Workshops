import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  kor_ime: string;
  lozinka: string;
  errorMsg: string;

  login(){
    this.userService.login(this.kor_ime, this.lozinka).subscribe((user: User)=>{
      if(user){
        if(user.status == 'na cekanju') this.errorMsg = 'Vas predlog za registracijom jos nije odobren.';
        else if(user.status == 'neaktivan') this.errorMsg = 'Vas predlog za registracijom je odbijen.';
        else{
          localStorage.setItem('user', user.kor_ime)
          localStorage.setItem('email', user.email)
          localStorage.setItem('ulogovan', JSON.stringify(user))
          if(user.tip == 'ucesnik') this.router.navigate(['/ucesnik']);
          else if(user.tip == 'organizator') this.router.navigate(['/organizator']);
        }
      }
      else this.errorMsg = "Pogresno korisnicko ime ili lozinka!";
    })
  }
}
