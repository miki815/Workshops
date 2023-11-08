import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Radionica = new Schema({
    id:{
        type: String
    },
    naziv: {
        type: String
    },
    datum: {
        type: Date
    },
    mesto: {
        type: String
    },
    opis_kratak: {
        type: String
    },
    opis_duzi: {
        type: String
    },
    glavna_slika: {
        type: String
    },
    galerija_slike:{
        type: Array
    },
    organizator:{
        type: String
    },
    status: {
        type: String
    },
    slobodnih_mesta: {
        type: Number
    },
    ucesnici:{
        type: Array
    },
    svidjanja:{
        type: Array
    },
    komentari:{
        type: Array
    },
    zahtevi:{
        type: Array
    },
    caskanje:{
        type: Array
    }
})

export default mongoose.model('Radionica', Radionica, 'radionice');