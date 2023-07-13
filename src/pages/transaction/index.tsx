import { useParams } from 'react-router-dom'
import TransactionEditor from '@/components/transaction/transaction-editor'
import NewTransactions from '@/components/transaction/new-transactions'

function TransactionPage() {
	const { id } = useParams()
	const isEditing = !!id

	return <>{isEditing ? <TransactionEditor /> : <NewTransactions />}</>
}

export default TransactionPage
