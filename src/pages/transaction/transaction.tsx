import ShadowBox from '@/components/shadow-box'
import {
	Avatar,
	DatePicker,
	DatePickerProps,
	Input,
	Select,
	Typography,
} from 'antd'
import styled from 'styled-components'
import coinImage from '@/assets/coin.png'
import { icons, typeSelectOptions, valueToLabel } from '@/constants/money-type'
import { CalendarOutlined, FileTextOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import PopDeleteConfirm from './pop-confirm'

interface ITransaction {
	id: string
	money: number
	type: string
	createdAt: Date
	note?: string
	updateDraft: Function
	deleteDraft?: Function
}

function Transaction(props: ITransaction) {
	const { id, money, type, createdAt, note, updateDraft, deleteDraft } = props

	const typeImage = icons.find((icon) => icon.value === type)?.icon

	const changeMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
		const money = Number(e.target.value.replaceAll(',', ''))
		if (!isNaN(money))
			updateDraft(id, {
				money,
			})
	}
	const changeType = (value: string) => {
		updateDraft(id, {
			type: value,
		})
	}
	const changeDate: DatePickerProps['onChange'] = (_, dateString) => {
		updateDraft(id, {
			createdAt: new Date(dateString),
		})
	}
	const changeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		updateDraft(id, {
			note: e.target.value,
		})
	}

	return (
		<MarginWrapper>
			{deleteDraft && <PopDeleteConfirm onDelete={() => deleteDraft(id)} />}
			<ShadowBox>
				<FlexBox>
					<Avatar src={coinImage} />
					<Money>
						<Typography.Text type="secondary">Số tiền</Typography.Text>
						<StyledInput
							placeholder="Số tiền"
							bordered={false}
							size="large"
							value={money ? money.toLocaleString() : 0}
							onChange={changeMoney}
						/>
					</Money>
				</FlexBox>
				<FlexBox>
					<Avatar src={typeImage} />
					<Select
						placeholder="Chọn nhóm"
						value={valueToLabel(type)}
						onChange={changeType}
						options={typeSelectOptions}
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
						value={dayjs(dayjs(createdAt).format('YYYY-MM-DD'))}
						onChange={changeDate}
						allowClear={false}
					/>
				</FlexBox>
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
		</MarginWrapper>
	)
}

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
			display: block;
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

export default Transaction