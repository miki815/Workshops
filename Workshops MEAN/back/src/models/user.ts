import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    kor_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    telefon: {
        type: String
    },
    email: {
        type: String
    },
    profilna:{
        type: String
    },
    status: {
        type: String
    },
    tip: {
        type: String
    },
    organizacija: {
        type: String
    },
    adresa: {
        type: String
    },
    maticni: {
        type: String
    },
})

export default mongoose.model('User', User, 'users');