import { Button, Modal, message } from 'antd'
import styled from 'styled-components'
import { LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useRef, useState } from 'react'
import Transaction from './transaction'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '@/hooks/use-fetch'
import { postFetch } from '@/api/fetch'
import { useAuth } from '@/contexts/auth'
import { moneyInTypes } from '@/constants/money-type'
import { uploadImageToServer } from '@/utilities/image'

const { confirm } = Modal

interface ITransaction {
	id: string
	money: number
	type: string
	createdAt: Date
	note?: string
	image?: string | File
	accessPermission: 'public' | 'private'
}
interface IData {
	data: ITransaction
}

function TransactionEditor() {
	const { id } = useParams()
	const { user, changeInfo } = useAuth()
	const { data } = useFetch(
		`transaction ${id}`,
		'/transaction/get-by-id/' + id
	) as IData
	const [transaction, setTransaction] = useState<ITransaction>({
		id: '',
		money: 0,
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
	const updateDraft = (id: string, draft: ITransaction) => {
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

			const res = (await postFetch('/transaction/edit', {
				...transaction,
				image: imageName,
			})) as Response
			if (!res) return
			if (!res.ok) {
				message.warning('Có lỗi xảy ra. Sửa giao dịch thất bại!')
				return
			}
			changeInfo({ money: user.money + totalMoney })
			message.success('Cập nhật thành công!')
			setTimeout(() => navigate('/wallet'), 1000)
		})()
		setIsLoading('')
	}
	const deleteTransaction = async () => {
		if (isLoading) return
		setIsLoading('delete')
		;(async () => {
			const res = (await postFetch('/transaction/delete', {
				id: transaction.id,
			})) as Response
			if (!res) return
			if (!res.ok) {
				message.warning('Có lỗi xảy ra. Xóa giao dịch thất bại!')
				return
			}
			changeInfo({ money: user.money - beforeUpdateMoney.current })
			message.success('Xóa thành công!')
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
