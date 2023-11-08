import * as express from 'express'
import User from '../models/user'
import ResetToken from '../models/reset_token'
import Radionica from '../models/radionica'
import Poruka from '../models/poruka'
import nodemailer from 'nodemailer'
import fs from 'fs'

interface MulterRequest extends express.Request{
    file: any;
}

var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'mm190117d@student.etf.bg.ac.rs',
        pass: '1billion1'
    }
});



export class OrganizatorController{
    get_radionice = (req: express.Request, res: express.Response)=>{
        Radionica.find({status: 'aktivna'}, (err, data)=>{
            console.log(data)
            if(err) console.log(err)
            else res.json(data)
        })    
    }

    otkaziRadionicu = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv
        Radionica.findOne({naziv: naziv}, (err, radionica)=>{
            radionica.status = 'otkazana';
            for(let ucesnik of radionica.ucesnici){
                User.findOne({kor_ime: ucesnik}, (err, user) => {
                    if(err) console.log(err)
                    let email = user.email;
                    var mailOptions = {
                        from: 'mm190117d@student.etf.bg.ac.rs',
                        to: email,
                        subject: 'Radionica otkazana',
                        text: 'Zao nam je, radionica ' + radionica.naziv + " na kojoj ste ucesnik je otkazana."
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error) {console.log(error); res.send(error)}
                        else  console.log(email + ": Poruka poslata");
                    })
                })
            }          
            radionica.save().then(resp=>{
                res.status(200).json({'poruka': 'ok'});
            }).catch(err=>{
                res.status(400).json({'poruka': 'greska otkazivanje'});
            })
            })    
    }

    sacuvajJSON = (req: express.Request, res: express.Response)=>{
        let radionica = req.body.radionica;
        console.log(radionica)
        let radionicaJSON = JSON.stringify(radionica, null, 2);
        fs.writeFile('../frontend/src/assets/radionica' + Date.now() + radionica.naziv +'.json', radionicaJSON, err => {
            if(err) console.log(err)
            else res.json({'poruka':'ok'})
        })
    }

    uploadSablon = (req: express.Request, res: express.Response)=>{
        console.log((req as MulterRequest).file);
        let path = (req as MulterRequest).file.path
        fs.readFile(path, 'utf-8', (err, jsonFile) => {
            if(err) {console.log(err);  res.json({'poruka': 'greska'})}
            else {
                let radionicaSablon = JSON.parse(jsonFile)
                console.log(radionicaSablon)
                res.json({'radionicaSablon': radionicaSablon})
            }
        })
    }

    obradiZahtev = (req: express.Request, res: express.Response)=>{
        let status = req.body.status
        let kor_ime = req.body.kor_ime
        let naziv = req.body.naziv
        if(status == 'odbijen'){
            Radionica.updateOne({naziv: naziv}, {$pull: {zahtevi: kor_ime}}, (err, resp) =>{
                if(err) console.log(err); 
                else res.json({'poruka': 'ok'})
            })
        } else{
            Radionica.updateOne({naziv: naziv}, {$pull: {zahtevi: kor_ime}, $push: {ucesnici: kor_ime},
            $inc: {slobodnih_mesta: -1}}, (err, resp) =>{
                if(err) console.log(err); 
                else res.json({'poruka': 'ok'})
            })
        }
    }

    getRadionicaPoruke = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        Radionica.findOne({naziv: naziv}, (err, radionica)=>{
            if(err) console.log(err);
            else res.json(radionica);
        })
    }

    posaljiPoruku = (req: express.Request, res: express.Response)=>{
        let poruka = new Poruka(req.body)
        Radionica.collection.updateOne({naziv: poruka.radionica, "caskanje.kor_ime": poruka.prima},
         {$push: {"caskanje.$.poruke": poruka}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"poruka": "ok", "poslataPoruka": poruka})
         })
    }


}