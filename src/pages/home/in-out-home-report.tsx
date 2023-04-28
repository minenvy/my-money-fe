import { Avatar, Modal, Select, Typography } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import BarChart from '@/components/bar-chart'
import DoughnutChart from '@/components/doughnut-chart'
import useWindowSize from '@/hooks/use-window-size'
import InOutDetail from '@/components/in-out-detail'
import TitleOfPartContent from './title-of-part-content'
import NoData from '@/components/empty'
import ShadowBox from '@/components/shadow-box'
import useFetch from '@/hooks/use-fetch'
import {
	icons,
	moneyInTypes,
	moneyOutTypes,
	valueToLabel,
} from '@/constants/money-type'
import formatMoney from '@/utilities/money-format'
import { useNavigate } from 'react-router-dom'

const filterOptions = [
	{ value: 'month', label: 'Tháng này' },
	{ value: 'year', label: 'Năm nay' },
]
const today = new Date()
const month = today.getMonth() + 1
const year = today.getFullYear()

interface ITransaction {
	id: string
	label: string
	type: string
	money: number
	day: number
	month: number
	year: number
	note?: string
}

function InOutHomeReport() {
	const navigate = useNavigate()
	const windowSize = useWindowSize()
	const [selectedOption, setSelectedOption] = useState(filterOptions[0].value)
	const isSelectMonth = selectedOption === 'month'
	const { data, isLoading } = useFetch(
		isSelectMonth
			? `/transaction/get-in-month/${month}/${year}`
			: `/transaction/get-in-year/${year}`,
		[selectedOption]
	)

	const hasData = data && data.length > 0
	if (!hasData)
		return (
			<ShadowBox>
				<NoData hasButton />
			</ShadowBox>
		)

	const barLabel =
		filterOptions.find((option) => option.value === selectedOption)?.label || ''
	const moneyInBar = data.reduce(
		(total: number, item: ITransaction) =>
			total + (moneyInTypes.includes(item.type) ? item.money : 0),
		0
	)
	const moneyOutBar = data.reduce(
		(total: number, item: ITransaction) =>
			total + (moneyOutTypes.includes(item.type) ? item.money : 0),
		0
	)
	const dataUniqueType: Array<ITransaction> = []
	data.forEach((item: ITransaction) => {
		const label = valueToLabel(item.type)
		const dataUniqueItem = dataUniqueType.find((ele) => ele.label === label)
		dataUniqueItem
			? (dataUniqueItem.money += item.money)
			: dataUniqueType.push({
					id: item.id,
					label,
					type: item.type,
					money: item.money,
					day: item.day,
					month: item.month,
					year: item.year,
					note: item?.note,
			  })
	})
	const mostMoneyOut = dataUniqueType
		.filter((item) => moneyOutTypes.includes(item.type))
		.slice(0, 3)
	const isInMobile = windowSize < 768

	const handleChange = (value: string) => {
		setSelectedOption(value)
	}
	const showMoreDetail = (detail: any) => {
		if (!isInMobile) return

		const modal = Modal.info({
			icon: <Avatar src={detail.icon} />,
			title: detail.title,
			content: (
				<>
					<Typography.Text>{detail.subTitle}</Typography.Text>
					<br></br>
					<Typography.Text>{detail.moreDetail}</Typography.Text>
					<br></br>
					<Typography.Text>{detail.description}</Typography.Text>
					<br></br>
				</>
			),
			okButtonProps: { type: 'default' },
			onOk: () => modal.destroy(),
		})
	}
	const handleClick = () => {
		navigate('/report')
	}

	return (
		<ShadowBox>
			<Wrapper>
				<TitleOfPartContent title="Tình hình thu chi" onClick={handleClick} />
				<Select
					value={selectedOption}
					options={filterOptions}
					onChange={handleChange}
					size="small"
					style={{ width: '6.5rem' }}
				/>
				<br></br>
				<ChartWrapper>
					<FlexBox>
						<BarChart
							labels={[barLabel]}
							moneyIn={[moneyInBar]}
							moneyOut={[moneyOutBar]}
							type="horizontal"
						/>
					</FlexBox>
					<FlexBox>
						<DoughnutChart
							detail={dataUniqueType.map((item) => {
								return {
									label: item.label,
									data: item.money,
								}
							})}
						/>
					</FlexBox>
				</ChartWrapper>
				<StyledTitle level={5}>Chi tiêu nhiều nhất</StyledTitle>
				{mostMoneyOut.map((item) => {
					const icon = icons.find((ic) => ic.value === item.type)?.icon
					const date = new Date(item.year, item.month, item.day)
						.toLocaleString()
						.split(',')[0]
					const money = formatMoney(item.money)
					const type = moneyInTypes.includes(item.type) ? 'in' : 'out'
					return (
						<div
							key={item.id}
							onClick={() =>
								showMoreDetail({
									icon: icon,
									title: item.label,
									subTitle: date,
									description: item.note,
									moreDetail: money,
								})
							}
						>
							<InOutDetail
								id={item.id}
								title={item.label}
								icon={icon}
								subTitle={date}
								description={item.note}
								rightPart={money}
								type={type}
							/>
						</div>
					)
				})}
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
	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
`
const FlexBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 45%;
	@media screen and (max-width: 768px) {
		width: 100%;
	}
`
const StyledTitle = styled(Typography.Title)`
	margin-top: 2rem;
`

export default InOutHomeReport
