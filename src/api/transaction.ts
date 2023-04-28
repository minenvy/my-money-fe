import { getFetch, postFetch } from '@/api/fetch'

export function add(transaction: {
  id: string
  money: number
  type: string
  date: Date
  note?: string
}, signal: any) {
  return postFetch('/transaction/add', { ...transaction }, signal)
}
