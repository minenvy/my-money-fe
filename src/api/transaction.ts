import { getFetch, postFetch } from '@/api/fetch'
import routes from './route'
import { Transaction } from '@/interfaces/transaction'

export async function getInMonth(
  month: number,
  year: number
): Promise<Array<Transaction>> {
  return await getFetch(
    `${routes.getTransactionsInMonth}/${month}/${year}`
  )
}

export async function getInYear(year: number): Promise<Array<Transaction>> {
  return await getFetch(`${routes.getTransactionsInYear}/${year}`)
}

export async function getRecent(): Promise<Array<Transaction>> {
  return await getFetch(routes.getRecentTransactions)
}

export async function getInfinite(
  userId: string,
  offset: number
): Promise<Array<Transaction>> {
  return await getFetch(
    `${routes.getInfiniteTransactions}/${userId}/${offset}`
  )
}

export async function getDraftTransactions(): Promise<Array<Transaction>> {
  return await getFetch(routes.getDraftTransactions)
}

export async function getById(transactionId: string): Promise<Transaction> {
  return await getFetch(
    `${routes.getTransactionById}/${transactionId}`
  )
}

export async function editTransaction(transaction: Transaction) {
  await postFetch(routes.editTransaction, { ...transaction })
}

export async function getSeparateInMonth(
  month: number,
  year: number,
  walletName: string
): Promise<Array<Transaction>> {
  return await getFetch(
    `${routes.getSeparateInMonth}/${month}/${year}/${walletName}`
  )
}
