import { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '@/hooks/use-fetch'
import { useErrorBoundary } from './error-fetch-boundary'
import { FetchData, Money, MoneyContext } from '@/interfaces/money-context'

const MoneyContext = createContext<MoneyContext | null>(null)

export function useMoneyContext() {
	return useContext(MoneyContext) as MoneyContext
}

type MoneyProviderProps = {
	children: React.ReactNode
}

export default function MoneyProvider({ children }: MoneyProviderProps) {
	const { data } = useFetch(
		'get all wallet',
		'/wallet/get-all-wallet'
	) as FetchData
	const [money, setMoney] = useState<Array<Money>>([
		{
			id: '',
			name: '',
			total: 0,
		},
	])
	const { showBoundary } = useErrorBoundary()

	useEffect(() => {
		if (data === null)
			showBoundary(new Error('Lỗi lấy thông tin tiền trong ví'))
		if (data) setMoney(data)
	}, [data])

	const changeMoney = (newMoney: Money) => {
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
