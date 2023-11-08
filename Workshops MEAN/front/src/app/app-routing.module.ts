import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { GostOsnovnoComponent } from './gost/gost-osnovno/gost-osnovno.component';
import { LoginComponent } from './login/login.component';
import { OrganizatorIzmeniRadionicuComponent } from './organizator/organizator-izmeni-radionicu/organizator-izmeni-radionicu.component';
import { OrganizatorPorukeComponent } from './organizator/organizator-poruke/organizator-poruke.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { PromenaLozinkeRegularnoComponent } from './promena-lozinke-regularno/promena-lozinke-regularno.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { PromenaZaboravljeneLozinkeComponent } from './promena-zaboravljene-lozinke/promena-zaboravljene-lozinke.component';
import { RegisterComponent } from './register/register.component';
import { PocetnaComponent } from './ucesnik/pocetna/pocetna.component';
import { UcesnikPostaniOrganizatorComponent } from './ucesnik/ucesnik-postani-organizator/ucesnik-postani-organizator.component';
import { UcesnikProfilnaComponent } from './ucesnik/ucesnik-profilna/ucesnik-profilna.component';
import { UcesnikRadioniceDetaljiComponent } from './ucesnik/ucesnik-radionice-detalji/ucesnik-radionice-detalji.component';
import { UcesnikRadioniceComponent } from './ucesnik/ucesnik-radionice/ucesnik-radionice.component';
import { UcesnikComponent } from './ucesnik/ucesnik.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'user', component: UserComponent},
  {path:'admin', component: AdminLoginComponent},
  {path:'ucesnik', component: UcesnikProfilnaComponent},
  {path:'organizator', component: OrganizatorComponent},
  {path:'register', component: RegisterComponent},
  {path:'zaboravljena_lozinka', component: PromenaLozinkeComponent},
  {path:'promena_zaboravljene_lozinke/:reset_token', component: PromenaZaboravljeneLozinkeComponent},
  {path:'promena_lozinke_reg', component: PromenaLozinkeRegularnoComponent},
  {path:'organizator/promena_lozinke_reg', component: PromenaLozinkeRegularnoComponent},
  {path:'gost', component: GostOsnovnoComponent},
  {path:'ucesnik/radionice', component: UcesnikRadioniceComponent},
  {path:'ucesnik/profil', component: PocetnaComponent},
  {path:'ucesnik/radionice/detalji', component: UcesnikRadioniceDetaljiComponent},
  {path:'admin/pocetna', component: AdminComponent},
  {path:'ucesnik/postaniOrganizator', component: UcesnikPostaniOrganizatorComponent},
  {path: 'organizator/radionicaIzmena', component: OrganizatorIzmeniRadionicuComponent},
  {path: 'organizator/radionicaPoruke', component: OrganizatorPorukeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
