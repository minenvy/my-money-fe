import ShadowBox from '@/components/shadow-box'
import { Avatar, Button, Input, message } from 'antd'
import styled from 'styled-components'
import { FileTextOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import Transaction from './transaction'
import { postFetch } from '@/api/fetch'
import { useNavigate } from 'react-router-dom'

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

function NewTransactions() {
	const navigate = useNavigate()
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
				if (transaction.id === id) return { ...transaction, ...draft }
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
	const changeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTransactionPage({ ...transactionPage, note: e.target.value })
	}
	const addNewTransaction = async () => {
		if (transactionPage.transactions.length === 0) {
			message.warning('Yêu cầu có ít nhất 1 giao dịch nhỏ!')
			return
		}
		const isNotValid = transactionPage.transactions.find(
			(item) => item.money === 0
		)
		if (isNotValid) {
			message.warning('Số tiền phải khác 0!')
			return
		}
		const urls = transactionPage.transactions.map((item) =>
			postFetch('/transaction/add', {
				...item,
				note: transactionPage.note,
			})
		)
		Promise.all(urls)
			.then(() => {
				message.success('Thêm giao dịch thành công!')
				setTimeout(() => navigate('/wallet'), 1000)
			})
			.catch(() => {
				message.warning('Có lỗi xảy ra. Thêm giao dịch thất bại!')
				return
			})
	}
	const handleSubmit = async () => {
		if (isLoading) return
		setIsLoading(true)
		await addNewTransaction()
		setIsLoading(false)
	}

	return (
		<Wrapper>
			<HeaderWrapper>
				<HeaderTitle>Thêm giao dịch</HeaderTitle>
			</HeaderWrapper>

			{transactionPage.transactions.map((transaction) => {
				return (
					<Transaction
						key={transaction.id}
						{...transaction}
						updateDraft={updateDraft}
						deleteDraft={deleteDraft}
					/>
				)
			})}
			<Button onClick={() => addDraft()}>Thêm giao dịch nhỏ</Button>
			<ShadowBox>
				<FlexBox>
					<Avatar
						src={
							<FileTextOutlined
								style={{ color: '#212121', fontSize: '1.25rem' }}
							/>
						}
					/>
					<Input.TextArea
						allowClear
						placeholder="Ghi chú"
						value={transactionPage.note}
						onChange={changeNote}
					/>
				</FlexBox>
			</ShadowBox>
			<Button type="primary" block loading={isLoading} onClick={handleSubmit}>
				Thêm
			</Button>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	max-width: 30rem;
	width: 100%;
	margin: 0 auto;
`
const FlexBox = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin: 0.75rem 0;
`
const HeaderWrapper = styled.div`
	display: flex;
	height: 2rem;
	margin-bottom: 1rem;
`
const HeaderTitle = styled.p`
	flex: 1;
	text-align: center;
	padding: 0.25rem 0;
	font-size: 1.1rem;
`

export default NewTransactions
