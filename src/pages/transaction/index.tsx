import ShadowBox from '@/components/shadow-box'
import {
	Avatar,
	Button,
	DatePicker,
	DatePickerProps,
	Input,
	Select,
	Typography,
} from 'antd'
import styled from 'styled-components'
import coinImage from '@/assets/coin.png'
import { useState } from 'react'
import { icons, typeOptions } from '@/constants/money-type'
import {
	CalendarOutlined,
	DeleteOutlined,
	FileTextOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { useDraftTransaction } from '@/contexts/draft-transaction'
import PopDeleteConfirm from './pop-confirm'
import { useParams } from 'react-router-dom'

interface ITransaction {
	id: string
	money?: number
	type?: string
	date?: Date
}

function Transaction() {
	const { transactions, note, changeNote, addDraft } = useDraftTransaction()
	const { id } = useParams()
	const isUpdating = !!id
	// If have transaction prop or draft, this page is to update a transaction. If not, this page is to add new transaction
	const changeThisNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		changeNote(e.target.value)
	}
	const handleAddDraft = () => {
		addDraft()
	}

	return (
		<Wrapper>
			<StyledTitle level={5}>
				{isUpdating ? 'Sửa ' : 'Thêm '}Giao dịch
			</StyledTitle>

			{transactions.map((transaction) => {
				return <ChildTransaction key={transaction.id} {...transaction} />
			})}
			<Button onClick={handleAddDraft}>Thêm giao dịch nhỏ</Button>
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
						onChange={changeThisNote}
					/>
				</FlexBox>
			</ShadowBox>
			{isUpdating ? (
				<EditButtons>
					<Button danger>Xóa</Button>
					<Button type="primary">Sửa</Button>
				</EditButtons>
			) : (
				<Button type="primary" block>
					Thêm
				</Button>
			)}
		</Wrapper>
	)
}

function ChildTransaction(props: ITransaction) {
	const id = props.id
	const moneyProp = props?.money || 0
	const typeProp = props?.type || ''
	const dateProp = props?.date || new Date()
	const { deleteDraft } = useDraftTransaction()
	const [money, setMoney] = useState(moneyProp)
	const [type, setType] = useState(typeProp)
	const [date, setDate] = useState(dateProp)

	const typeImage = icons.find((icon) => icon.value === type)?.icon

	const changeMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMoney(Number(e.target.value.replaceAll(',', '')))
	}
	const changeType = (value: string) => {
		setType(value)
	}
	const changeDate: DatePickerProps['onChange'] = (_, dateString) => {
		setDate(new Date(dateString))
	}

	return (
		<MarginWrapper>
			<PopDeleteConfirm onDelete={() => deleteDraft(id)} />
			<ShadowBox>
				<FlexBox>
					<Avatar src={coinImage} />
					<Money>
						<Typography.Text type="secondary">Số tiền</Typography.Text>
						<StyledInput
							placeholder="Số tiền"
							bordered={false}
							size="large"
							value={money.toLocaleString()}
							onChange={changeMoney}
						/>
					</Money>
				</FlexBox>
				<FlexBox>
					<Avatar src={typeImage} />
					<Select
						placeholder="Chọn nhóm"
						defaultValue={type}
						onChange={changeType}
						options={typeOptions}
						style={{ width: '100%' }}
					/>
				</FlexBox>
				<FlexBox>
					<Avatar
						src={
							<CalendarOutlined
								style={{ color: '#212121', fontSize: '1.25rem' }}
							/>
						}
					/>
					<DatePicker
						defaultValue={dayjs(dayjs(date), 'DD/MM/YYYY')}
						onChange={changeDate}
					/>
				</FlexBox>
			</ShadowBox>
		</MarginWrapper>
	)
}

const Wrapper = styled.div`
	max-width: 30rem;
	width: 100%;
	margin: 0 auto;
`
const StyledTitle = styled(Typography.Title)`
	text-align: center !important;
`
const FlexBox = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin: 0.75rem 0;
`
const MarginWrapper = styled.div`
	margin: 1rem 0;
	position: relative;
	& button {
		display: none;
	}
	&:hover {
		& button {
			display: inline;
		}
	}
`
const Money = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`
const StyledInput = styled(Input)`
	font-size: 1.5rem;
`
const EditButtons = styled.div`
	display: flex;
	justify-content: space-around;
`

export default Transaction
