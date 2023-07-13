export interface Budget {
  id: string
  name: string
  money: number
  usedMoney: number
  startDate: Date
  endDate: Date
  options: string
}

export interface NewBudget {
  id: string
  name: string
  money: number
  startDate: string
  endDate: string
  options: string
}
