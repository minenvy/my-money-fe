import { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '@/hooks/use-fetch'
import { useErrorBoundary } from './error-fetch-boundary'

interface IMoney {
	id: string
	name: string
	total: number
}

interface IData {
	data: Array<IMoney>
}

interface IMoneyContext {
	money: Array<IMoney>
	changeMoney: Function
	deleteMoney: Function
}

const MoneyContext = createContext<IMoneyContext | null>(null)

export function useMoneyContext() {
	return useContext(MoneyContext) as IMoneyContext
}

interface IMoneyProviderProps {
	children: React.ReactNode
}

export default function MoneyProvider({ children }: IMoneyProviderProps) {
	const { data } = useFetch(
		'get all wallet',
		'/wallet/get-all-wallet'
	) as IData
	const [money, setMoney] = useState<Array<IMoney>>([])
	const { showBoundary } = useErrorBoundary()

	useEffect(() => {
		if (data === null)
			showBoundary(new Error('Lỗi lấy thông tin tiền trong ví'))
		if (data && money.length === 0) setMoney(data)
	}, [data])

	const changeMoney = (newMoney: IMoney) => {
		setMoney((preState) => {
			if (preState.length === 0) return [newMoney]
			const nowMoney = preState.find((money) => money.name === newMoney.name)
			if (nowMoney)
				return preState.map((money) => {
					if (money.name === newMoney.name)
						return {
							...money,
							total: money.total + newMoney.total,
						}
					return money
				})
			return [...preState, newMoney]
		})
	}
	const deleteMoney = (name: string) => {
		setMoney((preState) => preState.filter((money) => money.name !== name))
	}

	return (
		<MoneyContext.Provider value={{ money, changeMoney, deleteMoney }}>
			{children}
		</MoneyContext.Provider>
	)
}
