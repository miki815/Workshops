import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  kor_ime: string;
  lozinka: string;
  errorMsg: string;
 

  ngOnInit(): void {
  }

  login(){
    this.userService.login(this.kor_ime, this.lozinka).subscribe((user: User)=>{
      if(user){
        if(user.tip != 'admin') this.errorMsg = "Nemate ulogu admin!";
        else{
          localStorage.setItem('user', user.kor_ime)
          localStorage.setItem('email', user.email)
          localStorage.setItem('ulogovan', JSON.stringify(user))
          this.router.navigate(['/admin/pocetna']);
        }
      }
      else this.errorMsg = "Pogresno korisnicko ime ili lozinka!";
    })
  }
  
}
