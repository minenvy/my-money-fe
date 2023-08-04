export interface Transaction {
  id: string
  money: number
  walletName: string
  walletId: string
  type: string
  createdAt: Date
  note?: string
  image?: string | File
  accessPermission: 'public' | 'private'
}

export interface MoneyType {
  name: string
  type: 'in' | 'out'
}
