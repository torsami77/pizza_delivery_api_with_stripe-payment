import express, { Application, Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';

const app: Application = express();

config();
const PORT: number = +(process.env.PORT || 3000);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to Super-Piza API',
    });
})

app.use('/api/v1/', router);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    next(err);
});

app.listen(PORT, () => {
    console.log(`Local server would be running on ${PORT}`)
})