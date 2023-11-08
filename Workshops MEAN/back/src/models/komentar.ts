import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Komentar = new Schema({
    kor_ime: {
        type: String
    },
    komentar: {
        type: String
    },
    radionica: {
        type: String
    },
    slika:{
        type: String
    },
    vreme:{
        type: Date
    }
})

export default mongoose.model('Komentar', Komentar, 'komentari');