import * as express from 'express'
import User from '../models/user'
import Radionica from '../models/radionica'
import Komentar from '../models/komentar'
import Poruka from '../models/poruka'
import nodemailer from 'nodemailer'
import radionica from '../models/radionica'

interface MulterRequest extends express.Request{
    file: any;
    files: any;
}

export class UcesnikController{

    updateInfo = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        console.log(username)
        User.findOne({kor_ime: username}, (err, user)=>{
            if(err) console.log(err)
            console.log(user)
            user.ime = req.body.ime;
            user.prezime = req.body.prezime;
            user.kor_ime = req.body.korime;
            user.email = req.body.email;
            user.telefon = req.body.telefon;
            user.profilna = req.body.profilna;
            //user.profilna = novaProfilna;
        /*    if(user.profilna != novaProfilna || user.kor_ime != username){
                Radionica.find({}, (err, radionice)=>{
                    for(let i = 0;i < radionice.length;i++){
                        let radionica = radionice[i];
                        console.log('Radionice update user')
                        for(let j = 0;j < radionice[i].ucesnici.length; j++){
                            let ucesnik = radionice[i].ucesnici[j];
                            if(ucesnik == username) radionice[i].ucesnici[j] = user.kor_ime;
                        }
                        for(let j = 0;j < radionice[i].svidjanja.length; j++){
                            let ucesnik = radionice[i].svidjanja[j];
                            if(ucesnik == username) radionice[i].svidjanja[j] = user.kor_ime;
                        }
                        for(let j = 0;j < radionice[i].zahtevi.length; j++){
                            let ucesnik = radionice[i].zahtevi[j];
                            if(ucesnik == username) radionice[i].zahtevi[j] = user.kor_ime;
                        }
                        for(let j = 0 ; j < radionice[i].komentari.length; j++){
                            let komentar =  radionice[i].komentari[j]
                            if(komentar.kor_ime == username) {
                                radionice[i].komentari[j].kor_ime = user.kor_ime;
                                radionice[i].komentari[j].slika = user.profilna;
                            }
                        }
                        for(let cet of radionica.caskanje){
                            if(cet.kor_ime == username){
                                cet.kor_ime = user.kor_ime;
                                for(let poruka of cet.poruke){
                                   if(poruka.salje == username) {
                                    console.log('poruka found')
                                   }
                                }
                            }
                        }
                        if(i == radionice.length-1){
                            radionica.save().then(us=>{
                                user.save().then(us=>{
                                    res.status(200).json({'poruka': 'azurirano'});
                                }).catch(err=>{
                                    res.status(400).json({'poruka': 'azuriranje greska'});
                                })
                            })
                        } else{
                            radionica.save();
                        }
                    }
                  
                })
            } else{
                user.save().then(us=>{
                    res.status(200).json({'poruka': 'azurirano'});
                }).catch(err=>{
                    res.status(400).json({'poruka': 'azuriranje greska'});
                })
            }*/
            // if(user.profilna != novaProfilna){
            //     user.profilna = novaProfilna;
            //     console.log("menjam profilnu")
            //     Radionica.collection.updateMany({"caskanje.kor_ime": username}, 
            //        {$set:{"caskanje.poruke.$.salje_slika": novaProfilna}}, (err, resp)=>{
            //             if(err) console.log(err);          
            //        } )
            // }
            user.save().then(us=>{
                res.status(200).json({'poruka': 'azurirano'});
            }).catch(err=>{
                res.status(400).json({'poruka': 'azuriranje greska'});
            })
       
        })    
    }

    getRadionice = (req: express.Request, res: express.Response)=>{
        let username = req.params.username
        Radionica.find({ucesnici: {$in: username}},(err, radionice)=>{
            if(err) console.log(err)
            else res.json(radionice)
        })
    }

    getLRadionice = (req: express.Request, res: express.Response)=>{
        let username = req.params.username
        console.log(username)
        Radionica.find({svidjanja: {$in: username}},(err, radionice)=>{
            if(err) {console.log(err)}
            else res.json(radionice)
        })
    }

    getKomentari = (req: express.Request, res: express.Response)=>{
        let username = req.params.username
        Radionica.find({komentari: {$elemMatch: {kor_ime: username}}}, (err, radionice)=>{
            if(err) {console.log(err)}
            else {
                let mojiKomentari = []
                for(let radionica of radionice){
                    for(let kom of radionica.komentari){
                        if(kom.kor_ime == username) mojiKomentari.push(new Komentar({username: username, komentar:kom.komentar, radionica:radionica.naziv}))
                    }
                }
                console.log(mojiKomentari)
                res.json(mojiKomentari)
            }
        })
    }

    povuciLajk = (req: express.Request, res: express.Response)=>{
        let nazivRadionice = req.body.nazivR;
        let kor_ime = req.body.kor_ime;
        Radionica.collection.updateOne({naziv: nazivRadionice}, {$pull: {svidjanja: kor_ime}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'poruka': 'ok'})
        })
    }

    azurirajKomentar = (req: express.Request, res: express.Response)=>{
        let radionica = req.body.radionica;
        let mojKomentar = req.body. komentar;
        let username = req.body.kor_ime;
        Radionica.collection.updateOne({naziv: radionica, "komentari.kor_ime": username},{$set:{"komentari.$.komentar":mojKomentar}}, (err, radionica)=>{
            if(err) console.log(err)
            else res.json({'poruka': 'ok'})
        })
    }

    obrisiKomentar = (req: express.Request, res: express.Response)=>{
        let radionica = req.body.radionica;
        let mojKomentar = req.body. komentar;
        let username = req.body.kor_ime;
        Radionica.collection.updateOne({naziv: radionica},{$pull:{komentari:{komentar: mojKomentar, kor_ime: username}}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'poruka': 'ok'})
        })
    }


    otkaziPrijavu = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime
        let radionica = req.body.radionica
        Radionica.collection.updateOne({naziv: radionica}, {$pull: {ucesnici: kor_ime},
            $inc: {slobodnih_mesta: 1}}, (err, resp)=>{
                if(err) console.log(err)             
        })
        Radionica.collection.findOne({naziv: radionica}, (err, radionica)=>{
            if(err) console.log(err)
            if(radionica.slobodnih_mesta == 1){
                for(var email of radionica.cekanje){
                    console.log(email)
                    var transporter = nodemailer.createTransport({
                        service: 'hotmail',
                        auth: {
                            user: 'email here',
                            pass: 'password here'
                        }
                    });
                    var mailOptions = {
                        from: 'mm190117d@student.etf.bg.ac.rs',
                        to: email,
                        subject: 'Slobodna mesta',
                        text: 'Nova slobodna mesta na radionici ' + radionica.naziv + ". Prijavite se sto pre!"
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error) {console.log(error); res.send(error)}
                        else  console.log(email + ": Poruka poslata");
                    })
                }
                Radionica.collection.updateOne({naziv: radionica}, {$set: {cekanje: []}}, (error, ob)=>{
                    if(error) {console.log(error); res.send(error)}
                })
            }
            res.json({"poruka": "ok"})
        })
    }

    prijava = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime
        let radionica = req.body.radionica
        Radionica.collection.updateOne({naziv: radionica}, {$push: {zahtevi: kor_ime}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'poruka': 'ok'})
        })
    }

    cekanje = (req: express.Request, res: express.Response)=>{
        let email = req.body.email
        let radionica = req.body.radionica
        Radionica.collection.updateOne({naziv: radionica}, {$push: {cekanje: email}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'poruka': 'ok'})
        })
    }

    insertRadionica = (req: express.Request, res: express.Response)=>{
        let radionica = new Radionica(req.body);
        console.log(radionica);
        radionica.save().then(resp=>{
            res.status(200).json({'poruka': 'radionica dodata'});
        }).catch(err=>{
            res.status(400).json({'poruka': 'greska radionica dodata'});
        })
    }

    uploadProfilna = (req: express.Request, res: express.Response)=>{
        let putanja = (req as MulterRequest).file.path;
        let putanja_delovi = putanja.split('\\')
        let frontend_putanja = "../../../assets/" + putanja_delovi[putanja_delovi.length - 1]
        res.json({'putanja': frontend_putanja})
    }

    uploadGalerija = (req: express.Request, res: express.Response)=>{
        let galerija = []
        for(let i = 0;i < (req as MulterRequest).files.radionicaGalerija.length; i++){
            let putanja = (req as MulterRequest).files.radionicaGalerija[i].path;
            let putanja_delovi = putanja.split('\\');
            let frontend_putanja = "../../../assets/" + putanja_delovi[putanja_delovi.length - 1];
            galerija.push(frontend_putanja);
         //   galerija.push((req as MulterRequest).files.radionicaGalerija[i].path)
        }
        res.json({'galerija': galerija})
    }

    getPoruke = (req: express.Request, res: express.Response)=>{
        let username = req.params.username
        let radionicaPoruke = [];
        Radionica.find({caskanje: {$elemMatch: {kor_ime:username}}},(err, radionice)=>{
            console.log("radionice caskanje")
            if(err) console.log(err)
            else {
                for(let radionica of radionice){
                    console.log(radionica.id)
                    let mojePoruke = []
                    for(let cet of radionica.caskanje){
                        if(cet.kor_ime == username){
                            for(let poruka of cet.poruke){
                                mojePoruke.push(poruka)
                            }
                        }
                    }
                    radionicaPoruke.push(new Object({radionica: radionica.naziv, poruke: mojePoruke}))
                }
                console.log(radionicaPoruke)
                res.json(radionicaPoruke)
            }
        })
    }

    posaljiPoruku = (req: express.Request, res: express.Response)=>{
        let poruka = new Poruka(req.body)
        Radionica.findOne({naziv: poruka.radionica, "caskanje.kor_ime": poruka.salje}, (err, radionica)=>{
            if(err) console.log(err);
            if(radionica == null){
                let novoCaskanje = new Object({"kor_ime":poruka.salje, "poruke":[poruka]})
                Radionica.collection.updateOne({naziv: poruka.radionica},
                {$push: {caskanje: novoCaskanje}}, (err, resp)=>{
                   if(err) console.log(err)
                   else res.json({"poruka": "ok", "poslataPoruka": poruka})
                })
            } else{
                Radionica.collection.updateOne({naziv: poruka.radionica, "caskanje.kor_ime": poruka.salje},
                {$push: {"caskanje.$.poruke": poruka}}, (err, resp)=>{
                   if(err) console.log(err)
                   else res.json({"poruka": "ok", "poslataPoruka": poruka})
                })
            }
        })
    }

    posaljiKomentar = (req: express.Request, res: express.Response)=>{
        let idRadionice = req.body.idRadionice;
        let slika = req.body.slika;
        let kor_ime = req.body.salje;
        let vreme = req.body.vreme;
        let komentar = req.body.komentar;
        let mojKomentar = new Komentar()
        mojKomentar.vreme = vreme;
        mojKomentar.slika = slika;
        mojKomentar.kor_ime = kor_ime;
        mojKomentar.komentar = komentar;
        console.log(idRadionice);
        Radionica.updateOne({_id:idRadionice}, {$push: {komentari: mojKomentar}}, (err, resp)=>{
            if(err) console.log(err);
            else{
                res.json({'poruka':'ok','komentar':mojKomentar})
            }
        })
    }

    lajkujRadionicu = (req: express.Request, res: express.Response)=>{
        let idRadionice = req.body.idRadionice;
        let kor_ime = req.body.kor_ime;
        Radionica.updateOne({_id:idRadionice}, {$push: {svidjanja: kor_ime}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'})
        })
    }

    obrisiRadionicu = (req: express.Request, res: express.Response)=>{
        let idRadionice = req.body.id;
        Radionica.deleteOne({_id: idRadionice}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        })
    }

    sacuvajRadionicu = (req: express.Request, res: express.Response)=>{
        let novaRadionica = req.body.radionica;
        Radionica.findOne({_id: novaRadionica._id}, (err, radionica)=>{
            if(err) console.log(err)
            console.log( novaRadionica._id)
            console.log(radionica)
            if(novaRadionica.slobodnih_mesta > 0 &&  radionica.slobodnih_mesta == 0){
                Radionica.collection.findOne({naziv: novaRadionica.naziv}, (err, radionica)=>{
                    for(var email of radionica.cekanje){
                        console.log(email)
                        var transporter = nodemailer.createTransport({
                            service: 'hotmail',
                            auth: {
                                user: 'email here',
                                pass: 'password here'
                            }
                        });
                        var mailOptions = {
                            from: 'mm190117d@student.etf.bg.ac.rs',
                            to: email,
                            subject: 'Slobodna mesta',
                            text: 'Nova slobodna mesta na radionici ' + radionica.naziv + ". Prijavite se sto pre!"
                        };
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error) {console.log(error); res.send(error)}
                            else  console.log(email + ": Poruka poslata");
                        })
                    }
                })
            }
            radionica.naziv = novaRadionica.naziv;
            radionica.mesto = novaRadionica.mesto;
            radionica.datum = novaRadionica.datum;
            radionica.slobodnih_mesta = novaRadionica.slobodnih_mesta;
            radionica.opis_kratak = novaRadionica.opis_kratak;
            radionica.opis_duzi = novaRadionica.opis_duzi;
            radionica.glavna_slika = novaRadionica.glavna_slika;
            radionica.galerija_slike = novaRadionica.galerija_slike;
            radionica.save().then(resp=>{
                res.json({'poruka':'ok'})
            });
        })
    }

}