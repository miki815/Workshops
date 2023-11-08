import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-ucesnik-profilna',
  templateUrl: './ucesnik-profilna.component.html',
  styleUrls: ['./ucesnik-profilna.component.css']
})
export class UcesnikProfilnaComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ulogovan: User;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
  }

  profil(){
    this.router.navigate(['profil'], {relativeTo: this.activatedRoute})
  }

  radionice(){
    this.router.navigate(['radionice'], {relativeTo: this.activatedRoute})
  }

  postaniOrganizator(){
    this.router.navigate(['postaniOrganizator'], {relativeTo: this.activatedRoute})
  }

  promenaLozinke(){
    this.router.navigate(['../promena_lozinke_reg'], {relativeTo: this.activatedRoute})
  }

}
