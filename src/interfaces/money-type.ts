export interface FetchData {
	data: Array<NewMoneyType>
}
export interface MoneyType {
	icon: string
	value: string
	label: string
	type: 'in' | 'out'
}
export interface NewMoneyType {
	name: string
	type: 'in' | 'out'
}
export type MoneyTypeSelectOptions = [
	{
		label: 'Khoản chi'
		options: Array<{
			label: string
			value: string
		}>
	},
	{
		label: 'Khoản thu'
		options: Array<{
			label: string
			value: string
		}>
	}
]