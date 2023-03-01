import express from 'express';
import cors from 'cors'
import { exportTransactions, getTransactions } from './controllers/transactions';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

const app = express();

app.use(cors(corsOptions))

app.get('/transactions', getTransactions);
app.get('/export', exportTransactions);


app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
