import ShadowBox from '@/components/shadow-box'
import { Avatar, Button, Input, Modal, message } from 'antd'
import styled from 'styled-components'
import {
	FileTextOutlined,
	LeftOutlined,
	QuestionCircleOutlined,
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import Transaction from './transaction'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '@/hooks/use-fetch'
import { deleteFetch, postFetch } from '@/api/fetch'

const { confirm } = Modal

interface ITransaction {
	id: string
	money: number
	type: string
	date: Date
}

function TransactionEditor() {
	const { id } = useParams()
	const { data } = useFetch('/transaction/get-by-id/' + id)
	const [transaction, setTransaction] = useState<ITransaction>({
		id: '',
		money: 0,
		type: 'anuong',
		date: new Date(),
	})
	const [note, setNote] = useState('')
	const [isLoading, setIsLoading] = useState(0)
	const navigate = useNavigate()

	useEffect(() => {
		if (!data) return
		setNote(data?.note)
		setTransaction({ ...data, date: new Date(data.year, data.month, data.day) })
	}, [data])

	const back = () => navigate('/wallet')
	const updateDraft = (id: string, draft: ITransaction) => {
		if (id !== transaction.id) return
		setTransaction({ ...transaction, ...draft })
	}
	const changeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNote(e.target.value)
	}
	const updateTransaction = async () => {
		if (isLoading > 0) return
		setIsLoading(2)
		;(async () => {
			const res = (await postFetch('/transaction/edit', {
				...transaction,
				note,
			}).catch(() =>
				message.warning('Có lỗi xảy ra, vui lòng thử lại sau.')
			)) as Response
			const serverMessage = await res.json()

			if (Object.keys(serverMessage).length === 0) {
				message.warning('Có lỗi xảy ra, vui lòng thử lại sau.')
				return
			}
			message.success('Cập nhật thành công!')
			setTimeout(() => navigate('/wallet'), 1000)
		})()
		setIsLoading(0)
	}
	const deleteTransaction = async () => {
		if (isLoading > 0) return
		setIsLoading(1)
		;(async () => {
			const res = (await deleteFetch('/transaction/delete', {
				id: transaction.id,
			}).catch(() =>
				message.warning('Có lỗi xảy ra, vui lòng thử lại sau.')
			)) as Response
			const serverMessage = await res.json()

			if (Object.keys(serverMessage).length === 0) {
				message.warning('Có lỗi xảy ra, vui lòng thử lại sau.')
				return
			}
			message.success('Xóa thành công!')
			setTimeout(() => navigate('/wallet'), 1000)
		})()
		setIsLoading(0)
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

			<Transaction {...transaction} updateDraft={updateDraft} />
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
						value={note}
						onChange={changeNote}
					/>
				</FlexBox>
			</ShadowBox>
			<EditButtons>
				<Button danger loading={isLoading === 1} onClick={handleClickDelete}>
					Xóa
				</Button>
				<Button
					type="primary"
					loading={isLoading === 2}
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
const FlexBox = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin: 0.75rem 0;
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
