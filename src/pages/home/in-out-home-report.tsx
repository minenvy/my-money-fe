import { Select, Typography } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import BarChart from '@/components/bar-chart'
import DoughnutChart from '@/components/doughnut-chart'
import useWindowSize from '@/hooks/use-window-size'
import InOutDetail from '@/components/in-out-detail'
import TitleOfPartContent from './title-of-part-content'

const filterOptions = [
	{ value: 'day', label: 'Hôm nay' },
	{ value: 'month', label: 'Tháng này' },
	{ value: 'year', label: 'Năm nay' },
]

function InOutHomeReport() {
	const windowSize = useWindowSize()
	const [selectedOption, setSelectedOption] = useState(filterOptions[0].value)

	const isInMobile = windowSize < 768
	const mode = isInMobile ? 'mobile' : 'desktop'

	const handleChange = (value: string) => {
		setSelectedOption(value)
	}

	return (
		<Wrapper>
			<TitleOfPartContent title="Tình hình thu chi" />
			<Select
				value={selectedOption}
				options={filterOptions}
				onChange={handleChange}
				size="small"
				style={{ width: '6.5rem' }}
			/>
			<br></br>
			<Typography.Text type="secondary">{`(Đơn vị: nghìn đồng)`}</Typography.Text>
			<ChartWrapper data-mode-info={mode}>
				<FlexBox data-mode-info={mode}>
					<BarChart />
				</FlexBox>
				<FlexBox data-mode-info={mode}>
					<DoughnutChart />
				</FlexBox>
			</ChartWrapper>
			<StyledTitle level={5}>Chi tiêu nhiều nhất</StyledTitle>
			<InOutDetail type="luong" money={2_000} percent="43%" />
			<InOutDetail type="hoadon" money={2_000} />
			<InOutDetail type="anuong" money={5_000} />
		</Wrapper>
	)
}

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
	&[data-mode-info='mobile'] {
		flex-direction: column;
	}
`
const FlexBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 45%;
	&[data-mode-info='mobile'] {
		width: 100%;
	}
`
const StyledTitle = styled(Typography.Title)`
	margin-top: 2rem;
`

export default InOutHomeReport
