import ShadowBox from '@/components/shadow-box'
import { DatePicker, DatePickerProps, Select } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import styled from 'styled-components'
import QuickReport from './quick-report'
import ChartComponent from './report-chart'

const filterOptions = [
	{ value: 'month', label: 'Tháng' },
	{ value: 'year', label: 'Năm' },
]
const today = new Date()

interface IQuickReport {
	title: string
	moneyIn?: number
	moneyOut?: number
}
interface IProps {
	chartType: 'line-in' | 'line-out' | 'bar' | 'doughnut'
}

function MoneyReportLayout(props: IProps) {
	const { chartType } = props
	const [selectedOption, setSelectedOption] = useState(filterOptions[0].value)
	const [year, setYear] = useState(today.getFullYear())

	const report: Array<IQuickReport> = [
		{
			title: '1',
			moneyIn: 100000,
			moneyOut: 200000,
		},
		{
			title: '2',
			moneyIn: 30000,
			moneyOut: 40000,
		},
		{
			title: '3',
			moneyIn: 70000,
			moneyOut: 70000,
		},
		{
			title: '4',
			moneyIn: 100000,
			moneyOut: 200000,
		},
		{
			title: '5',
			moneyIn: 30000,
			moneyOut: 40000,
		},
		{
			title: '6',
			moneyIn: 70000,
			moneyOut: 70000,
		},
		{
			title: '7',
			moneyIn: 100000,
			moneyOut: 200000,
		},
		{
			title: '8',
			moneyIn: 30000,
			moneyOut: 40000,
		},
		{
			title: '9',
			moneyIn: 70000,
			moneyOut: 70000,
		},
		{
			title: '10',
			moneyIn: 100000,
			moneyOut: 200000,
		},
		{
			title: '11',
			moneyIn: 30000,
			moneyOut: 40000,
		},
		{
			title: '12',
			moneyIn: 70000,
			moneyOut: 70000,
		},
	]

	const handleChangeSelect = (value: string) => {
		setSelectedOption(value)
	}
	const handleChangeYear: DatePickerProps['onChange'] = (
		_,
		dateString: string
	) => {
		setYear(Number(dateString))
	}

	return (
		<>
			<Select
				value={selectedOption}
				options={filterOptions}
				onChange={handleChangeSelect}
				size="small"
				style={{ width: '6.5rem' }}
			/>
			<StyledDatePicker
				picker="year"
				value={dayjs(dayjs(today.setFullYear(year)), 'YYYY')}
				onChange={handleChangeYear}
			/>
			<ShadowBox>
				<FlexBox>
					<Chart>
						<ChartComponent chartType={chartType} report={report} />
					</Chart>
					<Report>
						{report.map((quickReport) => {
							const { title, moneyIn, moneyOut } = quickReport
							const unitInTitle = selectedOption === 'month' ? 'Tháng' : 'Năm'
							return (
								<QuickReport
									title={unitInTitle + ' ' + title}
									moneyIn={moneyIn}
									// moneyOut={moneyOut}
									key={title}
								/>
							)
						})}
					</Report>
				</FlexBox>
			</ShadowBox>
		</>
	)
}

const StyledDatePicker = styled(DatePicker)`
	margin-left: 1rem;
	height: 1.5rem;
`
const FlexBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 2rem;
	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
`
const Chart = styled.div`
	width: 60%;
	min-height: 28rem;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: scroll;
	@media screen and (max-width: 768px) {
		width: 17rem;
		min-height: unset;
	}
`
const Report = styled.div`
	max-height: 28rem;
	width: 20rem;
	overflow: auto;
	@media screen and (max-width: 768px) {
		width: 100%;
		::-webkit-scrollbar {
			display: none;
		}
	}
	::-webkit-scrollbar {
		display: block;
		width: 6px;
	}
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 2px grey;
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb {
		background: #ccc;
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: grey;
	}
`

export default MoneyReportLayout
