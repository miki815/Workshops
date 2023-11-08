import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
  }


  ime: string = '';
  prezime: string = '';
  kor_ime: string = '';
  lozinka: string = '';
  lozinka2: string = '';
  tip: string = '';
  telefon: string = '';
  email: string = '';
  organizacija: string = '';
  adresa: string = '';
  maticni: string = '';
  profilnaFile: File = null;
  profilna: string;
  errorMsg: string;
  successMsg: string;

  register(){
    if(this.ime == '' || this.prezime == '' || this.kor_ime == '' || this.lozinka == '' ||
    this.tip == '' || this.telefon == '' || this.email == ''){
      this.errorMsg = "Sva polja moraju biti popunjena!";
      return;
    }
    if(this.lozinka.match(/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z][a-zA-Z0-9!@#$%^&*]{7,15}$/)){
      if(this.lozinka != this.lozinka2) {this.errorMsg = "Lozinke se ne poklapaju!"; return;}
      else{
        this.userService.register(this.ime, this.prezime,
          this.kor_ime, this.lozinka, this.telefon, this.email, this.tip, 
          this.organizacija, this.adresa, this.maticni, 'na cekanju', this.profilna).subscribe(ob=>{
            if(ob['poruka']=='ok') {this.successMsg = 'Vas zahtev za registracijom je zabelezen i ceka na odobrenje administratora.'; this.errorMsg = '';}
            else if(ob['poruka'] == 'neaktivan') this.errorMsg = 'Nije moguca registracija sa ovim korisnickim imenom zbog prethodno odbijenog zahteva';
            else if(ob['poruka'] == 'postoji') this.errorMsg = 'Korisnicko ime ili email zauzeti'
            else this.errorMsg = 'Greska'
          })
      }
    }
    else{
      this.errorMsg = "Lozinka mora da sadrzi 8-16 karaktera, bar jedno veliko slovo, \
      broj i specijalni karakter i mora pocinjati slovom.";
    }
   
  }

  onFileSelected(event){
    this.profilnaFile = <File>event.target.files[0]
  }


  uploadImage(){
    let fd = new FormData();
    console.log(fd)
    fd.append("profilna", this.profilnaFile, this.profilnaFile.name);
    console.log(fd.getAll('profilna'))
    this.userService.uploadProfilna(fd).pipe(catchError(()=>{ 
      alert('Fajl koji ste poslali nije slika');
      return throwError(()=>new Error('greska'))})).subscribe(res=>{
      if(res['poruka']=='uspeh') {
        alert("Profilna upload uspesno.");
        this.profilna = res['putanja']
      } else alert('Lose dimenzije (min 100x100px, max 300x300px)')
    });
  }

 


}
