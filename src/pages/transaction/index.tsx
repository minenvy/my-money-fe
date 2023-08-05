import { useParams } from 'react-router-dom'
import TransactionEditor from '@/features/transaction/transaction-editor'
import NewTransactions from '@/features/transaction/new-transactions'

function TransactionPage() {
	const { id } = useParams()
	const isEditing = !!id

	return <>{isEditing ? <TransactionEditor /> : <NewTransactions />}</>
}

export default TransactionPage
