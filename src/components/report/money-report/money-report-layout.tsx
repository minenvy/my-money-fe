import { DatePicker, DatePickerProps, Select } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import styled from 'styled-components'
import MoneyReportContent from './money-report-content'

const filterOptions = [
	{ value: 'month', label: 'Tháng' },
	{ value: 'year', label: 'Năm' },
]
const today = new Date()

type Props = {
	chartType: 'line-in' | 'line-out' | 'bar' | 'doughnut'
}

function MoneyReportLayout(props: Props) {
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
			<MoneyReportContent
				year={year}
				chartType={chartType}
				isSelectMonth={isSelectMonth}
			/>
		</>
	)
}

const StyledDatePicker = styled(DatePicker)`
	margin-left: 1rem;
	height: 1.5rem;
`

export default MoneyReportLayout
