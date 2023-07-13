export interface QuickReport {
  title: string
  moneyIn?: number
  moneyOut?: number
}

export interface ReportMoney {
  [key: string]: Array<{
    type: string
    money: number
  }>
}

export interface TransactionReport {
	type: string
	money: number
}
