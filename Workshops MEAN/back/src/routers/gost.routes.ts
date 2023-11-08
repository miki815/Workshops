import express from 'express';
import { GostController } from '../controllers/gost.controller';


const gostRouter = express.Router();

gostRouter.route('/get_radionice').get(
    (req, res)=>new GostController().get_radionice(req, res)
)



export default gostRouter;