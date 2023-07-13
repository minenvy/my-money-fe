export interface Money {
  id: string
  name: string
  total: number
}

export interface MoneyContext {
  money: Array<Money>
  changeMoney: Function
  deleteMoney: Function
}