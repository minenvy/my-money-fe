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
import { icons, typeOptions, valueToLabel } from '@/constants/money-type'
import { CalendarOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import PopDeleteConfirm from './pop-confirm'

interface ITransaction {
	id: string
	money: number
	type: string
	date: Date
	updateDraft: Function
	deleteDraft?: Function
}

function Transaction(props: ITransaction) {
	const { id, money, type, date, updateDraft, deleteDraft } = props

	const typeImage = icons.find((icon) => icon.value === type)?.icon

	const changeMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateDraft(id, {
			money: Number(e.target.value.replaceAll(',', '')),
		})
	}
	const changeType = (value: string) => {
		updateDraft(id, {
			type: value,
		})
	}
	const changeDate: DatePickerProps['onChange'] = (_, dateString) => {
		updateDraft(id, {
			date: new Date(dateString),
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
						value={dayjs(dayjs(date), 'DD/MM/YYYY')}
						onChange={changeDate}
						allowClear={false}
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

export default Transaction
