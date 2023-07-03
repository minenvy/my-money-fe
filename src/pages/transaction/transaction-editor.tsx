import { Button, Modal } from 'antd'
import styled from 'styled-components'
import { LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useRef, useState } from 'react'
import Transaction from './transaction'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '@/hooks/use-fetch'
import { postFetch } from '@/api/fetch'
import useMoneyType from '@/hooks/use-money-type'
import { uploadImageToServer } from '@/utilities/image'
import { useMoneyContext } from '@/contexts/money'
import { v4 as uuid } from 'uuid'

const { confirm } = Modal

interface Transaction {
	id: string
	money: number
	walletName: string
	type: string
	createdAt: Date
	note?: string
	image?: string | File
	accessPermission: 'public' | 'private'
}
interface FetchData {
	data: Transaction
}

function TransactionEditor() {
	const { id } = useParams()
	const { money, changeMoney } = useMoneyContext()
	const { data } = useFetch(
		`transaction ${id}`,
		'/transaction/get-by-id/' + id
	) as FetchData
	const { moneyInTypes } = useMoneyType()
	const [transaction, setTransaction] = useState<Transaction>({
		id: uuid(),
		money: 0,
		walletName: money[0].name,
		type: 'anuong',
		createdAt: new Date(),
		note: '',
		image: '',
		accessPermission: 'public',
	})
	const [isLoading, setIsLoading] = useState('')
	const navigate = useNavigate()
	const beforeUpdateMoney = useRef(0)

	if (!transaction.id && data) {
		beforeUpdateMoney.current = moneyInTypes.includes(data.type)
			? data.money
			: -data.money
		setTransaction({ ...data, createdAt: new Date(data.createdAt) })
	}

	const back = () => navigate('/wallet')
	const updateDraft = (id: string, draft: Transaction) => {
		if (id !== transaction.id) return
		setTransaction({ ...transaction, ...draft })
	}
	const updateTransaction = async () => {
		if (isLoading) return
		setIsLoading('update')
		;(async () => {
			const updateMoney = moneyInTypes.includes(transaction.type)
				? transaction.money
				: -transaction.money
			const totalMoney = updateMoney - beforeUpdateMoney.current
			const imageName =
				typeof transaction.image === 'string'
					? transaction.image
					: await uploadImageToServer(transaction.image as File)

			const res = await postFetch('/transaction/edit', {
				...transaction,
				image: imageName,
			})
			if (res === null) return

			changeMoney({
				name: transaction.walletName,
				total: totalMoney,
			})
			setTimeout(() => navigate('/wallet'), 1000)
		})()
		setIsLoading('')
	}
	const deleteTransaction = async () => {
		if (isLoading) return
		setIsLoading('delete')
		;(async () => {
			const res = await postFetch('/transaction/delete', {
				id: transaction.id,
			})
			if (res === null) return

			// changeInfo({ money: user.money - beforeUpdateMoney.current })
			setTimeout(() => navigate('/wallet'), 1000)
		})()
		setIsLoading('')
	}
	const handleClickDelete = () => {
		confirm({
			title: 'Xóa',
			icon: <QuestionCircleOutlined style={{ color: 'red' }} />,
			content: 'Bạn có chắc chắn muốn xóa giao dịch này không?',
			okText: 'Có',
			okType: 'danger',
			cancelText: 'Không',
			onOk() {
				deleteTransaction()
			},
			onCancel() {},
		})
	}

	return (
		<Wrapper>
			<HeaderWrapper>
				<Button type="dashed" icon={<LeftOutlined />} onClick={() => back()} />
				<HeaderTitle>Sửa giao dịch</HeaderTitle>
			</HeaderWrapper>

			<Transaction
				{...transaction}
				updateDraft={updateDraft}
				allowEditImage={false}
				allowEditWalletName={false}
			/>

			<EditButtons>
				<Button
					danger
					loading={isLoading === 'delete'}
					onClick={handleClickDelete}
				>
					Xóa
				</Button>
				<Button
					type="primary"
					loading={isLoading === 'update'}
					onClick={updateTransaction}
				>
					Sửa
				</Button>
			</EditButtons>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	max-width: 30rem;
	width: 100%;
	margin: 0 auto;
`
const EditButtons = styled.div`
	display: flex;
	justify-content: space-around;
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

export default TransactionEditor
