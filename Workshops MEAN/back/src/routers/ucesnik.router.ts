import express from 'express';
import { UcesnikController } from '../controllers/ucesnik.controller';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../frontend/src/assets")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg")
    }
})
const upload = multer({storage})
const multiple_upload = upload.fields([{name: 'radionicaGalerija', maxCount: 5}])


const ucesnikRouter = express.Router();

ucesnikRouter.route('/updateInfo').post(
    (req, res)=>new UcesnikController().updateInfo(req, res)
)

ucesnikRouter.route('/getRadionice/:username').get(
    (req, res)=>new UcesnikController().getRadionice(req, res)
)

ucesnikRouter.route('/getLRadionice/:username').get(
    (req, res)=>new UcesnikController().getLRadionice(req, res)
)

ucesnikRouter.route('/getKomentari/:username').get(
    (req, res)=>new UcesnikController().getKomentari(req, res)
)

ucesnikRouter.route('/povuciLajk').post(
    (req, res)=>new UcesnikController().povuciLajk(req, res)
)

ucesnikRouter.route('/azurirajKomentar').post(
    (req, res)=>new UcesnikController().azurirajKomentar(req, res)
)

ucesnikRouter.route('/obrisiKomentar').post(
    (req, res)=>new UcesnikController().obrisiKomentar(req, res)
)

ucesnikRouter.route('/otkaziPrijavu').post(
    (req, res)=>new UcesnikController().otkaziPrijavu(req, res)
)

ucesnikRouter.route('/prijava').post(
    (req, res)=>new UcesnikController().prijava(req, res)
)

ucesnikRouter.route('/cekanje').post(
    (req, res)=>new UcesnikController().cekanje(req, res)
)

ucesnikRouter.route('/insertRadionica').post(
    (req, res)=>new UcesnikController().insertRadionica(req, res)
)

ucesnikRouter.route('/uploadProfilna').post(upload.single("radionicaGlavna"),
    (req, res)=>new UcesnikController().uploadProfilna(req, res)
)

ucesnikRouter.route('/uploadGalerija').post(multiple_upload,
    (req, res)=>new UcesnikController().uploadGalerija(req, res)
)

ucesnikRouter.route('/getPoruke/:username').get(
    (req, res)=>new UcesnikController().getPoruke(req, res)
)

ucesnikRouter.route('/posaljiPoruku').post(
    (req, res)=>new UcesnikController().posaljiPoruku(req, res)
)

ucesnikRouter.route('/posaljiKomentar').post(
    (req, res)=>new UcesnikController().posaljiKomentar(req, res)
)

ucesnikRouter.route('/lajkujRadionicu').post(
    (req, res)=>new UcesnikController().lajkujRadionicu(req, res)
)

ucesnikRouter.route('/obrisiRadionicu').post(
    (req, res)=>new UcesnikController().obrisiRadionicu(req, res)
)

ucesnikRouter.route('/sacuvajRadionicu').post(
    (req, res)=>new UcesnikController().sacuvajRadionicu(req, res)
)

export default ucesnikRouter;