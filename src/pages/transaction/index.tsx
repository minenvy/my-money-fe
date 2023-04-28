import { useParams } from 'react-router-dom'
import TransactionEditor from './transaction-editor'
import NewTransactions from './new-transactions'

function TransactionPage() {
	const { id } = useParams()
	const isEditing = !!id

	return <>{isEditing ? <TransactionEditor /> : <NewTransactions />}</>
}

export default TransactionPage
