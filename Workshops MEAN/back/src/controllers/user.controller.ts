import * as express from 'express'
import User from '../models/user'
import ResetToken from '../models/reset_token'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { time } from 'console'
import multer from 'multer'
import Radionica from '../models/radionica'
import sizeOf from 'image-size'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        cb(null, "test222.jpg")
    }
})
const upload = multer({storage})

interface MulterRequest extends express.Request{
    file: any;
}


export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;

        User.findOne({'kor_ime': kor_ime, 'lozinka': lozinka}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    register = (req: express.Request, res: express.Response)=>{
        let user = new User(req.body);
        console.log(req.body.kor_ime);
        User.findOne({$or:[{'kor_ime': req.body.kor_ime},{'email':req.body.email}]}, (err, u)=>{
            if(err) console.log(err);
            else if(u){
                if(u.status == 'neaktivan') res.json({'poruka': 'neaktivan'})
                else res.json({'poruka': 'postoji'})
            }
            else {
                user.save().then(user=>{
                    res.status(200).json({'poruka': 'ok'});
                }).catch(err=>{
                    res.status(400).json({'poruka': 'db error'});
                })
            }
        })
    }

    promena_lozinke = (req: express.Request, res: express.Response)=>{
        let expire_time = new Date();
        expire_time.setMinutes(expire_time.getMinutes() + 30);

        let reset_token = new ResetToken({token: crypto.randomBytes(16).toString('hex'),
                        email: req.body.email, expire_time: expire_time});

        reset_token.save().then(user=>{
                console.log("Token saved in database");
            }).catch(err=>{
                res.status(400).json({'message': 'error'});
            })

        var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'email here',
                pass: 'password here'
            }
        });
        var mailOptions = {
            from: 'mm190117d@student.etf.bg.ac.rs',
            to: req.body.email,
            subject: 'Promena lozinke',
            text: `http://localhost:4200/promena_zaboravljene_lozinke/${reset_token.token}`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error) {console.log(error); res.send(error)}
            else  res.status(200).json({'message': 'poruka poslata'});
        })
    }

    
    validacija_tokena = (req: express.Request, res: express.Response)=>{
        let token = req.body.token;
        console.log(token);
        ResetToken.findOne({'token': token}, (err, mytoken)=>{
            if(err) console.log(err);
            else {
                console.log("Token pronadjen.")
                if(new Date() > mytoken.expire_time) res.status(200).json({'poruka': 'Vreme isteklo'});
                else { console.log('Token dobar'); res.status(200).json({'poruka': 'Ok', 'email':mytoken.email});}
            };
        })
    }


    nova_lozinka = (req: express.Request, res: express.Response)=>{
        
    }

    promena_lozinke_reg = (req: express.Request, res: express.Response)=>{
        let email = req.body.email;
        let lozinka_stara = req.body.lozinka_stara;
        let lozinka_nova = req.body.lozinka_nova;

        User.findOne({'email': email, 'lozinka': lozinka_stara}, (err, user)=>{
            if(err) console.log(err);
            else if(user == null) res.status(200).json({'poruka': 'Korisnik ne postoji'});
            else {
                console.log(user.kor_ime);
                user.lozinka = lozinka_nova;
                user.save().then(us=>{
                    res.status(200).json({'poruka': 'Lozinka promenjena'});
                }).catch(err=>{
                    res.status(400).json({'poruka': 'Greska pri promeni lozinke'});
                })
            }
        })
    }

    promena_lozinke_zab = (req: express.Request, res: express.Response)=>{
        let email = req.body.email;
        let lozinka = req.body.lozinka;

        User.findOne({'email': email}, (err, user)=>{
            if(err) console.log(err);
            else if(user == null) res.status(200).json({'poruka': 'Korisnik ne postoji'});
            else {
                console.log(user.kor_ime);
                user.lozinka = lozinka;
                user.save().then(us=>{
                    res.status(200).json({'poruka': 'Lozinka promenjena'});
                }).catch(err=>{
                    res.status(400).json({'poruka': 'Greska pri promeni lozinke'});
                })
            }
        })
    }


    uploadProfilna = (req: express.Request, res: express.Response)=>{
        let putanja = (req as MulterRequest).file.path;
        console.log(putanja)
        sizeOf(putanja, (err, dimenzije)=>{
            if(dimenzije.width<100||dimenzije.width>300||dimenzije.height<100||dimenzije.height>300){
                res.json({'poruka':'lose dimenzije'})
            } else{
                let putanja_delovi = putanja.split('\\')
                let frontend_putanja = "../../../assets/" + putanja_delovi[putanja_delovi.length - 1]
                res.json({'putanja': frontend_putanja, 'poruka': 'uspeh'})
            }
        })

    }

    getKorisnici = (req: express.Request, res: express.Response)=>{
        User.find({$or:[{tip:'ucesnik'},{tip:'organizator'}]}, (err, users)=>{
            if(err) console.log(err)
            else res.json(users)
        })
    }

    obrisiKorisnika = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        User.collection.deleteOne({kor_ime: username}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'poruka': 'ok'})
        })
    }

    azurirajKorisnika = (req: express.Request, res: express.Response)=>{
        let ime = req.body.ime;
        console.log(ime)
        let prezime = req.body.prezime;
        let telefon = req.body.telefon;
        let email = req.body.email;
        let kor_ime = req.body.kor_ime
        User.collection.updateOne({kor_ime: kor_ime},{$set:{ime: ime, prezime: prezime, telefon: telefon,
            email: email}}, (err, resp)=>{
                if(err) console.log(err)
                else res.json({'poruka': 'ok'})
        })
    }

    getKorisniciNaCekanju = (req: express.Request, res: express.Response)=>{
        User.find({status: 'na cekanju'}, (err, korisnici)=>{
            if(err) console.log(err)
            else {console.log(korisnici); res.json(korisnici)}
        })
    }

    setStatus = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let status = req.body.status;
        User.collection.updateOne({kor_ime: username}, {$set: {status: status}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    getRadioniceStatus = (req: express.Request, res: express.Response)=>{
        let status = req.params.status;
        Radionica.find({status: status}, (err, radionice)=>{
            if(err) console.log(err)
            else res.json(radionice)
        })
    }

    setRadionicaStatus = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        let organizator = req.body.organizator;
        let status = req.body.status;
        let orgTip = "organizator"
        if(status == 'odbijena'){
            Radionica.collection.updateOne({naziv: naziv, organizator: organizator},{$set: {status: status}}, (err, resp)=>{
                if(err) console.log(err);
                else res.json({'poruka': 'ok'});
            })
        }
        else{
            Radionica.find({$or: [{ucesnici: {$in: organizator}}, {zahtevi:  {$in: organizator}}]}, (err, ob)=>{
                console.log(ob)
                if(err) console.log(err)
                else if(ob.length != 0) res.json({'poruka': 'aktivan ucesnik'});
                else{
                    Radionica.collection.updateOne({naziv: naziv, organizator: organizator},{$set: {status: status}}, (err, resp)=>{
                        if(err) console.log(err)
                    })
                    User.collection.updateOne({kor_ime: organizator}, {$set: {tip: orgTip}}, (err, resp)=>{
                        if(err) console.log(err)
                        else res.json({'poruka': 'ok'});
                    })
                }      
            })
             
        }
    }

}