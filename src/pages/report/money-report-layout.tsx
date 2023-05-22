import ShadowBox from '@/components/shadow-box'
import { DatePicker, DatePickerProps, Select } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import styled from 'styled-components'
import QuickReport from './quick-report'
import ChartComponent from './report-chart'
import useFetch from '@/hooks/use-fetch'
import NoData from '@/components/empty'
import { moneyInTypes } from '@/constants/money-type'
import Loading from '@/components/loading'

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
	const isSelectMonth = selectedOption === 'month'

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
			<MainReport
				year={year}
				chartType={chartType}
				isSelectMonth={isSelectMonth}
			/>
		</>
	)
}

interface IMainReportContentProps {
	year: number
	chartType: string
	isSelectMonth: boolean
}
interface IData {
	isLoading: boolean
	data: {
		[key: string]: Array<{
			type: string
			money: number
		}>
	}
}

function MainReport(props: IMainReportContentProps) {
	const { year, chartType, isSelectMonth } = props
	const { data, isLoading } = useFetch(
		`chart report ${isSelectMonth} ${year}`,
		(isSelectMonth ? '/report/month/' : '/report/year/') + year,
		[isSelectMonth, year]
	) as IData

	if (isLoading) return <Loading />
	if (data === undefined || data === null)
		return (
			<ShadowBox>
				<NoData />
			</ShadowBox>
		)

	const maxLength = isSelectMonth ? 12 : 5
	let hasData = false
	for (let i = 1; i <= maxLength; i++) {
		const index = isSelectMonth ? i : year + 1 - i
		if (data[index]?.length !== 0) hasData = true
	}
	if (!hasData)
		return (
			<ShadowBox>
				<NoData />
			</ShadowBox>
		)

	const report: Array<IQuickReport> = []
	for (let i = 1; i <= maxLength; i++) {
		const title = (isSelectMonth ? i : year + 1 - i).toString()
		const monthReport = {
			title,
			moneyIn: 0,
			moneyOut: 0,
		}

		data[title]?.forEach((item: any) => {
			if (moneyInTypes.includes(item.type)) {
				monthReport.moneyIn += item.money
			} else monthReport.moneyOut += item.money
		})
		report.push(monthReport)
	}

	return (
		<ShadowBox>
			<FlexBox>
				<Chart>
					<ChartComponent chartType={chartType} report={report} />
				</Chart>
				<Report>
					{report.map((quickReport) => {
						const { title, moneyIn, moneyOut } = quickReport
						const type = isSelectMonth ? 'tháng' : 'năm'
						const isReportMoneyIn = ['bar', 'line-in'].includes(chartType)
						const isReportMoneyOut = ['bar', 'line-out'].includes(chartType)
						const moneyType =
							chartType === 'bar'
								? 'in and out'
								: chartType === 'line-in'
								? 'in'
								: 'out'

						return (
							<QuickReport
								type={type}
								moneyType={moneyType}
								year={year}
								title={Number(title)}
								moneyIn={isReportMoneyIn ? moneyIn : undefined}
								moneyOut={isReportMoneyOut ? moneyOut : undefined}
								key={title}
							/>
						)
					})}
				</Report>
			</FlexBox>
		</ShadowBox>
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
	@media (max-width: 768px) {
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
	@media (max-width: 768px) {
		width: 18rem;
		min-height: unset;
	}
`
const Report = styled.div`
	max-height: 28rem;
	width: 20rem;
	overflow: auto;
	@media (max-width: 768px) {
		width: 100%;
	}
`

export default MoneyReportLayout
