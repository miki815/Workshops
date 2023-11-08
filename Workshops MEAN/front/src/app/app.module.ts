import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UcesnikComponent } from './ucesnik/ucesnik.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { PromenaZaboravljeneLozinkeComponent } from './promena-zaboravljene-lozinke/promena-zaboravljene-lozinke.component';
import { PromenaLozinkeRegularnoComponent } from './promena-lozinke-regularno/promena-lozinke-regularno.component';
import { GostOsnovnoComponent } from './gost/gost-osnovno/gost-osnovno.component';
import { PocetnaComponent } from './ucesnik/pocetna/pocetna.component';
import { UcesnikRadioniceComponent } from './ucesnik/ucesnik-radionice/ucesnik-radionice.component';
import { UcesnikProfilnaComponent } from './ucesnik/ucesnik-profilna/ucesnik-profilna.component';
import { UcesnikRadioniceDetaljiComponent } from './ucesnik/ucesnik-radionice-detalji/ucesnik-radionice-detalji.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { UcesnikPostaniOrganizatorComponent } from './ucesnik/ucesnik-postani-organizator/ucesnik-postani-organizator.component';
import { OrganizatorPorukeComponent } from './organizator/organizator-poruke/organizator-poruke.component';
import { OrganizatorIzmeniRadionicuComponent } from './organizator/organizator-izmeni-radionicu/organizator-izmeni-radionicu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    RegisterComponent,
    UcesnikComponent,
    OrganizatorComponent,
    PromenaLozinkeComponent,
    PromenaZaboravljeneLozinkeComponent,
    PromenaLozinkeRegularnoComponent,
    GostOsnovnoComponent,
    PocetnaComponent,
    UcesnikRadioniceComponent,
    UcesnikProfilnaComponent,
    UcesnikRadioniceDetaljiComponent,
    AdminLoginComponent,
    UcesnikPostaniOrganizatorComponent,
    OrganizatorPorukeComponent,
    OrganizatorIzmeniRadionicuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
