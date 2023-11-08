import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRouter from './routers/user.routes';
import gostRouter from './routers/gost.routes';
import ucesnikRouter from './routers/ucesnik.router';
import organizatorRouter from './routers/organizator.routes';


const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/piapia');
const con = mongoose.connection;
con.once('open', ()=>{
    console.log('db connection ok')
})

const router = express.Router();
router.use('/users', userRouter);
router.use('/gost', gostRouter);
router.use('/ucesnik', ucesnikRouter);
router.use('/organizator', organizatorRouter)


app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));