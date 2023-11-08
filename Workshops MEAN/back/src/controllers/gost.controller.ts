import * as express from 'express'
import User from '../models/user'
import ResetToken from '../models/reset_token'
import Radionica from '../models/radionica'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { time } from 'console'


export class GostController{
    get_radionice = (req: express.Request, res: express.Response)=>{
        Radionica.find({status: "aktivna"}, (err, data)=>{
            if(err) console.log(err)
            else res.json(data)
        })    
    }

}