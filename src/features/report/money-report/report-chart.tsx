import BarChart from '@/components/bar-chart'
import LineChart from '@/components/line-chart'
import { QuickReport } from '@/interfaces/report'
import formatMoney from '@/utilities/money-format'
import { Typography } from 'antd'
import styled from 'styled-components'

type ChartProps = {
	chartType: string
	report: Array<QuickReport>
}

function ChartComponent(props: ChartProps) {
	const { chartType, report } = props
	if (chartType.includes('bar')) {
		const labels = report.map((item) => item.title)
		const moneyIn = report.map((item) =>
			item.moneyIn ? round(item.moneyIn) : 0
		)
		const moneyOut = report.map((item) =>
			item.moneyOut ? round(item.moneyOut) : 0
		)
		return (
			<BarChart
				labels={labels}
				moneyIn={moneyIn}
				moneyOut={moneyOut}
				unit="nghìn"
			/>
		)
	}
	if (chartType.includes('line')) {
		const labels = report.map((item) => item.title)
		const type = chartType.split('-')[1] as 'in' | 'out'
		const money = report.map((item) => {
			const money = type === 'in' ? item.moneyIn : item.moneyOut
			return money ? round(money) : 0
		})
		const totalMoney = money.reduce((total, item) => total + item, 0) * 1e3
		return (
			<Wrapper>
				<LineChart labels={labels} money={money} type={type} unit="nghìn" />
				<FlexBox>
					<Typography.Text type="secondary">
						Tổng tiền {type === 'in' ? 'thu nhập' : 'chi tiêu'}
					</Typography.Text>
					<Typography.Text>{formatMoney(totalMoney)}</Typography.Text>
				</FlexBox>
				<FlexBox>
					<Typography.Text type="secondary">
						Trung bình/{labels.length === 12 ? 'tháng' : 'năm'}
					</Typography.Text>
					<Typography.Text>
						{formatMoney(totalMoney / labels.length)}
					</Typography.Text>
				</FlexBox>
			</Wrapper>
		)
	}

	return <></>
}

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`
const FlexBox = styled.div`
	display: flex;
	justify-content: space-between;
	max-width: 20rem;
	margin-top: 0.5rem;
`

function round(money: number) {
	return Math.round(money / 1e3)
}

export default ChartComponent
