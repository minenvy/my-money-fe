import { Select, Typography } from 'antd'
import styled from 'styled-components'
import BarChart from '@/components/bar-chart'
import DoughnutChart from '@/components/doughnut-chart'
import ListItem from '@/components/list-item'
import NoData from '@/components/empty'
import useFetch from '@/hooks/use-fetch'
import {
	icons,
	moneyInTypes,
	moneyOutTypes,
	valueToLabel,
} from '@/constants/money-type'
import formatMoney from '@/utilities/money-format'
import ShadowBox from '@/components/shadow-box'
import TitleOfPartContent from './title-of-part-content'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Loading from '@/components/loading'

const filterOptions = [
	{ value: 'month', label: 'Tháng này' },
	{ value: 'year', label: 'Năm nay' },
]
const today = new Date()
const month = today.getMonth() + 1
const year = today.getFullYear()

interface ITransaction {
	type: string
	money: number
}
interface IData {
	isLoading: boolean
	data: Array<ITransaction>
}
interface IProps {
	selectedOption: string
}

function InOutHomeReport() {
	const navigate = useNavigate()
	const [selectedOption, setSelectedOption] = useState(filterOptions[0].value)

	const handleChange = (value: string) => {
		setSelectedOption(value)
	}
	const handleClick = () => {
		navigate('/report')
	}

	return (
		<ShadowBox>
			<InOutWrapper>
				<TitleOfPartContent title="Tình hình thu chi" onClick={handleClick} />
				<Select
					value={selectedOption}
					options={filterOptions}
					onChange={handleChange}
					size="small"
					style={{ width: '6.5rem' }}
				/>
				<MainReport selectedOption={selectedOption} />
			</InOutWrapper>
		</ShadowBox>
	)
}

function MainReport(props: IProps) {
	const { selectedOption } = props
	const isSelectMonth = selectedOption === 'month'
	const { data, isLoading } = useFetch(
		isSelectMonth
			? `transaction month ${month} ${year}`
			: `transaction year ${year}`,
		isSelectMonth
			? `/transaction/get-in-month/${month}/${year}`
			: `/transaction/get-in-year/${year}`,
		[selectedOption]
	) as IData

	if (isLoading) return <Loading />
	if (data === undefined) return <NoData hasButton />

	const hasData = data.length > 0
	if (!hasData) return <NoData hasButton />

	const barLabel =
		filterOptions.find((option) => option.value === selectedOption)?.label || ''
	const moneyInBar = data.reduce(
		(total: number, item: ITransaction) =>
			total + (moneyInTypes.includes(item.type) ? round(item.money) : 0),
		0
	)
	const moneyOutBar = data.reduce(
		(total: number, item: ITransaction) =>
			total + (moneyOutTypes.includes(item.type) ? round(item.money) : 0),
		0
	)

	const mostMoneyOut = data
		.filter((item: ITransaction) => moneyOutTypes.includes(item.type))
		.sort((a: ITransaction, b: ITransaction) => (a.money < b.money ? 1 : -1))
		.slice(0, 3)

	return (
		<Wrapper>
			<br></br>
			<ChartWrapper>
				<FlexBox>
					<BarChart
						labels={[barLabel]}
						moneyIn={[moneyInBar]}
						moneyOut={[moneyOutBar]}
						type="horizontal"
						unit="nghìn"
					/>
				</FlexBox>
				<FlexBox>
					<DoughnutChart
						detail={data.map((item: ITransaction) => {
							return {
								label: valueToLabel(item.type),
								data: item.money,
							}
						})}
					/>
				</FlexBox>
			</ChartWrapper>
			<StyledTitle level={5}>Chi tiêu nhiều nhất</StyledTitle>
			{mostMoneyOut.map((item: ITransaction) => {
				const icon = icons.find((ic) => ic.value === item.type)?.icon
				const title = valueToLabel(item.type)
				const date = isSelectMonth
					? (Number(month) < 10 ? `0${month}` : month) + '/' + year
					: year.toString()
				const money = formatMoney(item.money)
				const type = moneyInTypes.includes(item.type) ? 'in' : 'out'
				return (
					<ListItem
						key={item.type}
						title={title}
						icon={icon}
						subTitle={date}
						moreDetail={money}
						type={type}
					/>
				)
			})}
		</Wrapper>
	)
}

function round(money: number) {
	return Math.round((money / 1e3) * 1000) / 1000
}

const InOutWrapper = styled.div`
	.ant-select-selector {
		background-color: transparent !important;
		border: none !important;
	}
`
const Wrapper = styled.div`
	.ant-select-selector {
		background-color: transparent !important;
		border: none !important;
	}
`
const ChartWrapper = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 2rem;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`
const FlexBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 45%;
	@media (max-width: 768px) {
		width: 100%;
	}
`
const StyledTitle = styled(Typography.Title)`
	margin-top: 2rem;
`

export default InOutHomeReport
