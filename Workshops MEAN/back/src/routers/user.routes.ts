import express from 'express';
import multer from 'multer';
import { UserController } from '../controllers/user.controller';

const checkFileType = function(file, cb){
    const fileTypes = /jpg|png/;
    const mimeType = fileTypes.test(file.mimeType);
    if(mimeType) return cb(null, true);
    else cb("Greska: fajl koji ste poslali nije slika!");
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../frontend/src/assets")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg")
    }
})
//const upload = multer({storage})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(png|jpg)$/)) 
            return cb(new Error('Greska: fajl koji ste poslali nije slika!'))
        cb(undefined, true)
    },
});

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

userRouter.route('/promena_lozinke').post(
    (req, res)=>new UserController().promena_lozinke(req, res)
)

userRouter.route('/validacija_tokena').post(
    (req, res)=>new UserController().validacija_tokena(req, res)
)

userRouter.route('/nova_lozinka').post(
    (req, res)=>new UserController().nova_lozinka(req, res)
)

userRouter.route('/promena_lozinke_reg').post(
    (req, res)=>new UserController().promena_lozinke_reg(req, res)
)

userRouter.route('/promena_lozinke_zab').post(
    (req, res)=>new UserController().promena_lozinke_zab(req, res)
)

userRouter.route('/uploadProfilna').post(upload.single("profilna"),
    (req, res)=>new UserController().uploadProfilna(req, res)
)

userRouter.route('/getKorisnici').get(
    (req, res)=>new UserController().getKorisnici(req, res)
)

userRouter.route('/obrisiKorisnika').post(
    (req, res)=>new UserController().obrisiKorisnika(req, res)
)

userRouter.route('/azurirajKorisnika').post(
    (req, res)=>new UserController().azurirajKorisnika(req, res)
)

userRouter.route('/getKorisniciNaCekanju').get(
    (req, res)=>new UserController().getKorisniciNaCekanju(req, res)
)

userRouter.route('/setStatus').post(
    (req, res)=>new UserController().setStatus(req, res)
)

userRouter.route('/getRadioniceStatus/:status').get(
    (req, res)=>new UserController().getRadioniceStatus(req, res)
)

userRouter.route('/setRadionicaStatus').post(
    (req, res)=>new UserController().setRadionicaStatus(req, res)
)

export default userRouter;