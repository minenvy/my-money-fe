import { Modal, Select, Typography } from 'antd'
import { Fragment, useState } from 'react'
import styled from 'styled-components'
import BarChart from '@/components/bar-chart'
import DoughnutChart from '@/components/doughnut-chart'
import useWindowSize from '@/hooks/use-window-size'
import InOutDetail from '@/components/in-out-detail'
import TitleOfPartContent from './title-of-part-content'
import NoData from '@/components/empty'
import ShadowBox from '@/components/shadow-box'

const filterOptions = [
	{ value: 'month', label: 'Tháng này' },
	{ value: 'year', label: 'Năm nay' },
]

function InOutHomeReport() {
	const windowSize = useWindowSize()
	const [selectedOption, setSelectedOption] = useState(filterOptions[0].value)
	const [modalApi, contextHolder] = Modal.useModal()

	const hasData = true
	const isInMobile = windowSize < 768
	const mode = isInMobile ? 'mobile' : 'desktop'
	const chartLabel =
		filterOptions.find((option) => option.value === selectedOption)?.label || ''

	const handleChange = (value: string) => {
		setSelectedOption(value)
	}
	// const handleClick = () => {
	// 	modalApi.info({
	// 		title: ''
	// 	})
	// }

	return (
		<ShadowBox>
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
				{hasData ? (
					<>
						<ChartWrapper data-mode-info={mode}>
							<FlexBox data-mode-info={mode}>
								<BarChart
									labels={[chartLabel]}
									moneyIn={[100_000]}
									moneyOut={[80_000]}
									unit="nghìn"
									type="horizontal"
								/>
							</FlexBox>
							<FlexBox data-mode-info={mode}>
								<DoughnutChart
									detail={[
										{
											label: 'Ăn uống',
											data: 70,
										},
										{
											label: 'Giải trí',
											data: 30,
										},
										{
											label: 'Giải trí',
											data: 30,
										},
										{
											label: 'Giải trí',
											data: 30,
										},
										{
											label: 'Giải trí',
											data: 30,
										},
										{
											label: 'Giải trí',
											data: 30,
										},
										{
											label: 'Giải trí',
											data: 30,
										},
										{
											label: 'Chi phis khacs',
											data: 30,
										},
										{
											label: 'Chi phis khacs',
											data: 30,
										},
										{
											label: 'Chi phis khacs',
											data: 30,
										},
										{
											label: 'Chi phis khacs',
											data: 30,
										},
									]}
								/>
							</FlexBox>
						</ChartWrapper>
						<StyledTitle level={5}>Chi tiêu nhiều nhất</StyledTitle>
						{/* <div onClick={handleClick}> */}
						<InOutDetail
							id="abc"
							title="Ăn uống"
							icon=""
							subTitle="30/4/2022"
							rightNumber={20000}
						/>
						{/* </div> */}
						<InOutDetail
							id="abc"
							title="Ăn uống"
							icon=""
							subTitle="30/4/2022"
							rightNumber={20000}
						/>
						<InOutDetail
							id="abc"
							title="Ăn uống"
							icon=""
							subTitle="30/4/2022"
							rightNumber={20000}
						/>
						{contextHolder}
					</>
				) : (
					<NoData hasButton />
				)}
			</Wrapper>
		</ShadowBox>
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
