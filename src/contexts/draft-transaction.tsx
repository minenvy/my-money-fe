import { createContext, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

interface IProps {
	children: React.ReactNode
}
interface ITransaction {
	id: string
	money: number
	type: string
	date: Date
}
interface ITransactionProps {
	transactions: Array<ITransaction>
	note: string
}
interface IContext extends ITransactionProps {
	isLoading: boolean
	addDraft: Function
	updateDraft: Function
	deleteDraft: Function
	resetDraft: Function
	changeNote: Function
}

const DraftTransactionContext = createContext<IContext | null>(null)

function useDraftTransaction() {
	return useContext(DraftTransactionContext) as IContext
}

function DraftTransactionProvider(props: IProps) {
	const { children } = props
	const [transactionPage, setTransactionPage] = useState<ITransactionProps>({
		transactions: [
			{
				id: uuid(),
				money: 0,
				type: 'anuong',
				date: new Date(),
			},
		],
		note: '',
	})
	const [isLoading, setIsLoading] = useState(false)

	const addDraft = (draft?: ITransaction) => {
		const nullDraft: ITransaction = {
			id: uuid(),
			money: 0,
			type: 'anuong',
			date: new Date(),
		}
		const newTransaction: ITransaction = draft || nullDraft
		setTransactionPage({
			...transactionPage,
			transactions: [...transactionPage.transactions, newTransaction],
		})
	}
	const updateDraft = (id: string, draft: ITransaction) => {
		setTransactionPage({
			...transactionPage,
			transactions: transactionPage.transactions.map((transaction) => {
				if (transaction.id === id) return draft
				return transaction
			}),
		})
	}
	const deleteDraft = (id: string) => {
		setTransactionPage({
			...transactionPage,
			transactions: transactionPage.transactions.filter(
				(item) => item.id !== id
			),
		})
	}
	const resetDraft = () => {
		setTransactionPage({
			transactions: [
				{
					id: uuid(),
					money: 0,
					type: 'anuong',
					date: new Date(),
				},
			],
			note: '',
		})
	}
	const changeNote = (note: string) => {
		setTransactionPage({ ...transactionPage, note })
	}

	return (
		<DraftTransactionContext.Provider
			value={{
				...transactionPage,
				isLoading,
				addDraft,
				updateDraft,
				deleteDraft,
				resetDraft,
				changeNote,
			}}
		>
			{children}
		</DraftTransactionContext.Provider>
	)
}

export { useDraftTransaction }
export default DraftTransactionProvider
