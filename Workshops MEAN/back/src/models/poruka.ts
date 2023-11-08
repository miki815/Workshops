import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Poruka = new Schema({
    poruka: {
        type: String
    },
    vreme: {
        type: Date
    },
    salje: {
        type: String
    },
    prima:{
        type: String
    },
    radionica:{
        type: String
    },
    salje_slika:{
        type: String
    },
})

export default mongoose.model('Poruka', Poruka, 'poruke');