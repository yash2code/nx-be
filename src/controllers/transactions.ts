import { Request, RequestHandler, Response } from 'express';
import { getTransactionsFromDB } from '../services/transactions';
import { parse } from 'json2csv';

interface QueryTypes {
    status: string
    search: string
    page: number
}

export const getTransactions: RequestHandler<unknown, unknown, unknown, QueryTypes> = async (req, res) => {
    try {
        const { status, search, page } = req.query;
        const transactions = await getTransactionsFromDB(status, search, page);
        res.json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

export const exportTransactions:RequestHandler<unknown, unknown, unknown, QueryTypes> = async (req, res) => {
    try {
      const { status, search, page } = req.query;
      const transactions = await getTransactionsFromDB(status, search, page);
      const fields: string[] = [
        'date',
        'gross_amount',
        'status',
        'customer',
        'swifter_id',
        'external_id',
        'source',
      ];
      const csv = parse(transactions, { fields });
      res.attachment('transactions.csv');
      res.send(csv);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };