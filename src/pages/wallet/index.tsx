import InOutDetail from '@/components/in-out-detail'
import ShadowWrapper from '@/components/shadow-wrapper'
import TitleInOutDetail from '@/pages/wallet/title-in-out-detail'
import formatMoney from '@/utilities/money-format'
import { DatePicker, DatePickerProps, Typography } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import styled from 'styled-components'
import QuickReport from './quick-report'

const monthFormat = 'YYYY/MM'
const today = new Date()

function Wallet() {
	const [month, setMonth] = useState(today.getMonth() + 1)
	const monthWithYear =
		today.getFullYear() + '/' + (month < 10 ? `0${month}` : month)
	const money = 5_000_000

	const changeMonth: DatePickerProps['onChange'] = (_, dateString) => {
		setMonth(Number(dateString.split('-')[1]))
	}

	return (
		<>
			<TotalMoney>
				<StyledText type="secondary">Số dư</StyledText>
				<StyledText strong>{formatMoney(money)}</StyledText>
			</TotalMoney>

			<StyledDatePicker
				defaultValue={dayjs(monthWithYear, monthFormat)}
				format={monthFormat}
				picker="month"
				onChange={changeMonth}
			/>

			<QuickReport quickMoneyReport={[-200_000, 500_000, -100_000, 200_000]} />

			<SeparatePart>
				<ShadowWrapper mode="mini">
					<FlexBox>
						<TitleInOutDetail time={new Date()} money={3_000_000} />
						<InOutDetail type="luong" money={2_000} mode="mini" />
						<InOutDetail type="hoadon" money={2_000} mode="mini" />
						<InOutDetail type="anuong" money={4_000} mode="mini" />
					</FlexBox>
				</ShadowWrapper>
				<ShadowWrapper mode="mini">
					<FlexBox>
						<TitleInOutDetail time={new Date()} money={3_000_000} />
						<InOutDetail type="luong" money={2_000} mode="mini" />
						<InOutDetail type="hoadon" money={2_000} mode="mini" />
						<InOutDetail type="anuong" money={4_000} mode="mini" />
					</FlexBox>
				</ShadowWrapper>
				<ShadowWrapper mode="mini">
					<FlexBox>
						<TitleInOutDetail time={new Date()} money={3_000_000} />
						<InOutDetail type="luong" money={2_000} mode="mini" />
						<InOutDetail type="hoadon" money={2_000} mode="mini" />
						<InOutDetail type="anuong" money={4_000} mode="mini" />
					</FlexBox>
				</ShadowWrapper>
				<ShadowWrapper mode="mini">
					<FlexBox>
						<TitleInOutDetail time={new Date()} money={3_000_000} />
						<InOutDetail type="luong" money={2_000} mode="mini" />
						<InOutDetail type="hoadon" money={2_000} mode="mini" />
						<InOutDetail type="anuong" money={4_000} mode="mini" />
					</FlexBox>
				</ShadowWrapper>
			</SeparatePart>
		</>
	)
}

const StyledText = styled(Typography.Text)`
	text-align: center;
`
const TotalMoney = styled.div`
	display: flex;
	flex-direction: column;
	align-content: space-between;
`
const StyledDatePicker = styled(DatePicker)`
	margin: 1rem auto 0;
`
const SeparatePart = styled.div`
	display: flex;
	gap: 0.5rem;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-top: 1rem;
	overflow: auto;
`
const FlexBox = styled.div`
	display: flex;
	flex-direction: column;
`

export default Wallet
