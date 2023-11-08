import express from 'express';
import { OrganizatorController } from '../controllers/organizator.controller';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../frontend/src/assets")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + ".json")
    }
})
const upload = multer({storage})


const organizatorRouter = express.Router();

organizatorRouter.route('/get_radionice').get(
    (req, res)=>new OrganizatorController().get_radionice(req, res)
)

organizatorRouter.route('/otkaziRadionicu').post(
    (req, res)=>new OrganizatorController().otkaziRadionicu(req, res)
)

organizatorRouter.route('/sacuvajJSON').post(
    (req, res)=>new OrganizatorController().sacuvajJSON(req, res)
)

organizatorRouter.route('/uploadSablon').post(upload.single("radionicaSablon"),
    (req, res)=>new OrganizatorController().uploadSablon(req, res)
)

organizatorRouter.route('/obradiZahtev').post(
    (req, res)=>new OrganizatorController().obradiZahtev(req, res)
)

organizatorRouter.route('/getRadionicaPoruke').post(
    (req, res)=>new OrganizatorController().getRadionicaPoruke(req, res)
)

organizatorRouter.route('/posaljiPoruku').post(
    (req, res)=>new OrganizatorController().posaljiPoruku(req, res)
)


export default organizatorRouter;