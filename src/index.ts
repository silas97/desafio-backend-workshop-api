import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import workshopsRouter from './routes/workshops';
import colaboradoresRouter from './routes/colaboradores';
import atasRouter from './routes/atas';

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

app.use('/api/atas', atasRouter);
app.use('/api/colaboradores', colaboradoresRouter);
app.use('/api/workshops', workshopsRouter);

app.listen(port, () => {
	console.log(`O servidor está em execução em http://localhost:${port}`);
});
