import InOutDetail from '@/components/in-out-detail'
import ShadowBox from '@/components/shadow-box'
import TitleInOutDetail from '@/pages/wallet/title-in-out-detail'
import formatMoney from '@/utilities/money-format'
import { DatePicker, DatePickerProps, Typography } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import styled from 'styled-components'
import QuickReport from './quick-report'
import NoData from '@/components/empty'
import useFetch from '@/hooks/use-fetch'
import { icons, moneyInTypes, valueToLabel } from '@/constants/money-type'
import { useNavigate } from 'react-router-dom'

const monthFormat = 'MM/YYYY'
const today = new Date()

interface ITransaction {
	id: string
	type: string
	money: number
	day: number
	month: number
	year: number
	note?: string
}

function Wallet() {
	const navigate = useNavigate()
	const [month, setMonth] = useState(today.getMonth() + 1)
	const [year, setYear] = useState(today.getFullYear())
	const { data, isLoading } = useFetch(
		`/transaction/get-in-month/${month}/${year}`,
		[month, year]
	)

	const changeMonth = (dateString: string) => {
		const dateInfo = dateString.split('/')
		setMonth(Number(dateInfo[0]))
		setYear(Number(dateInfo[1]))
	}
	const redirectToTransaction = (id: string) => navigate('/transaction/' + id)

	const hasData = data && data.length > 0
	const money = 5_000_000
	if (!hasData) {
		return (
			<>
				<TotalMoneyTitle money={money} />
				<MonthPicker onChange={changeMonth} />
				<ShadowBox>
					<NoData />
				</ShadowBox>
			</>
		)
	}

	const monthStatist: Array<Array<ITransaction>> = []
	const dayInMonth: Array<number> = []
	data.forEach((item: ITransaction) => {
		const day = item.day
		if (!dayInMonth.includes(day)) {
			dayInMonth.push(day)
			monthStatist.push([item])
		} else monthStatist[dayInMonth.indexOf(day)].push(item)
	})

	return (
		<>
			<TotalMoneyTitle money={0} />
			<MonthPicker onChange={changeMonth} />

			<Layout>
				<QuickReport
					quickMoneyReport={[-200_000, 500_000, -100_000, 200_000]}
				/>
				<SeparatePart>
					{monthStatist.map((dayStatis, index) => {
						const totalMoney = dayStatis.reduce(
							(total, item) =>
								moneyInTypes.includes(item.type)
									? total + item.money
									: total - item.money,
							0
						)

						return (
							<ShadowBox mode="mini" key={index}>
								<FlexBox>
									<TitleInOutDetail
										time={new Date(year, month, dayInMonth[index])}
										money={totalMoney}
									/>
									{dayStatis.map((item: ITransaction) => {
										const icon = icons.find(
											(ic) => ic.value === item.type
										)?.icon
										const title = valueToLabel(item.type)
										const date = new Date(item.year, item.month, item.day)
											.toLocaleString()
											.split(',')[0]
										const money = formatMoney(item.money)
										const type = moneyInTypes.includes(item.type) ? 'in' : 'out'
										return (
											<div key={item.id} onClick={() => redirectToTransaction(item.id)}>
												<InOutDetail
													id={item.id}
													icon={icon}
													title={title}
													subTitle={date}
													rightPart={money}
													mode="mini"
													type={type}
												/>
											</div>
										)
									})}
								</FlexBox>
							</ShadowBox>
						)
					})}
				</SeparatePart>
			</Layout>
		</>
	)
}

function TotalMoneyTitle(props: { money: number }) {
	const { money } = props
	return (
		<TotalMoney>
			<StyledText type="secondary">Số dư</StyledText>
			<StyledText strong>{formatMoney(money)}</StyledText>
		</TotalMoney>
	)
}
function MonthPicker(props: { onChange: Function }) {
	const { onChange } = props

	return (
		<StyledDatePicker
			defaultValue={dayjs(dayjs(today), monthFormat)}
			format={monthFormat}
			picker="month"
			onChange={(_, dateString) => onChange(dateString)}
		/>
	)
}

const StyledText = styled(Typography.Text)`
	text-align: center;
	font-size: 1.25rem;
`
const TotalMoney = styled.div`
	display: flex;
	flex-direction: column;
	align-content: space-between;
`
const StyledDatePicker = styled(DatePicker)`
	margin: 1rem auto 0;
`
const Layout = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	gap: 2rem;
	@media screen and (max-width: 768px) {
		flex-direction: column;
		gap: 0;
	}
`
const SeparatePart = styled.div`
	flex: 1;
	max-width: 40rem;
	max-height: 32rem;
	margin: 0 auto;
	display: flex;
	gap: 0.5rem;
	justify-content: space-between;
	flex-wrap: wrap;
	overflow: auto;
	@media screen and (max-width: 768px) {
		max-width: 19rem;
	}
`
const FlexBox = styled.div`
	display: flex;
	flex-direction: column;
`

export default Wallet
