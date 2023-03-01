import { Transaction } from '../types';
import { transactions } from '../data/transactions';

export const getTransactionsFromDB = async (
    status: string,
    search: string,
    page: number = 1,
): Promise<Transaction[]> => {
    let filteredTransactions = transactions;
    if (status) {
        const statusArr = status.split(',');
        filteredTransactions = filteredTransactions.filter((t) =>
            statusArr.includes(t.status),
        );
    }
    if (search) {
        const searchRegex = new RegExp(search, 'i');
        filteredTransactions = filteredTransactions.filter((t) =>
            searchRegex.test(t.customer),
        );
    }
    const pageSize = 15;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pagedTransactions = filteredTransactions.slice(startIndex, endIndex);
    return pagedTransactions;
};