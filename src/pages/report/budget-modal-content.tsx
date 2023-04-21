import ShadowBox from '@/components/shadow-box'
import getRemainingDays from '@/utilities/get-remaining-days-in-month'
import formatMoney from '@/utilities/money-format'
import { Typography } from 'antd'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'

interface IProps {
	id: string
}

function BudgetModalContent(props: IProps) {
	const { id } = props
	const data = [0, 0, 0, 20_000, 30_000]
	const totalMoney = 2_000_000
	const usedMoney = 1_000_000
	const remainingMoney = totalMoney - usedMoney
	const subTitle = new Date()
	const remainingDays = getRemainingDays(subTitle)
	const totalDays = data.length + remainingDays
	const isOverMoney = remainingMoney < 0

	return (
		<>
			<CenterBox>
				<Title level={4} type={isOverMoney ? 'danger' : 'success'}>
					{formatMoney(totalMoney - usedMoney)}
				</Title>
				<Typography.Text type="secondary">
					{isOverMoney ? 'Khoản chi quá giới hạn' : 'Khoản có thể chi'}
				</Typography.Text>
			</CenterBox>
			<FlexBox>
				<ShadowBox style={{ width: '6.5rem', padding: '0 8px' }}>
					<ReportBox>
						<Title level={5}>{totalMoney / 1e6} tr</Title>
						<Text type="secondary">Tổng ngân sách</Text>
					</ReportBox>
				</ShadowBox>
				<ShadowBox style={{ width: '6.5rem', padding: '0 8px' }}>
					<ReportBox>
						<Title level={5}>{usedMoney / 1e6} tr</Title>
						<Text type="secondary">Tổng đã chi</Text>
					</ReportBox>
				</ShadowBox>
				<ShadowBox style={{ width: '6.5rem', padding: '0 8px' }}>
					<ReportBox>
						<Title level={5}>{remainingDays} ngày</Title>
						<Text type="secondary">Đến cuối tháng</Text>
					</ReportBox>
				</ShadowBox>
			</FlexBox>

			<MarginBox>
				<Typography.Text>Biểu đồ chi tiêu</Typography.Text>
				<br></br>
				<Typography.Text type="secondary">(Đơn vị: triệu)</Typography.Text>
				<MultipleDatasetLineChart />
			</MarginBox>

			<MarginBox>
				<Typography.Text>Dự kiến chi tiêu: </Typography.Text>
				<Typography.Text>
					{formatMoney(totalMoney / totalDays)}/ngày
				</Typography.Text>
				<br></br>
				<Typography.Text>Thực tế chi tiêu: </Typography.Text>
				<Typography.Text>
					{formatMoney(data.length > 0 ? usedMoney / data.length : 0)}/ngày
				</Typography.Text>
			</MarginBox>
		</>
	)
}

const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		tooltips: {
			callbacks: {
				label: function (tooltipItem: any) {
					return tooltipItem.yLabel
				},
			},
		},
	},
}
function MultipleDatasetLineChart() {
	const usedMoneyEachDay = [0, 0, 100_000, 200_000, 50_000]
	const usedMoney = 350_000
	const averageOneDay =
		usedMoneyEachDay.length > 0 ? 350_000 / usedMoneyEachDay.length : 0
	const remainingDays = 10
	const moneyWillUseData: Array<number> = []
	usedMoneyEachDay.forEach((money, index) => {
		if (index === 0) moneyWillUseData.push(money)
		else moneyWillUseData.push(moneyWillUseData[index - 1] + money)
	})
	for (let i = 1; i <= remainingDays; i++) {
		moneyWillUseData.push(usedMoney + averageOneDay * i)
	}
	console.log(moneyWillUseData)

	const data = {
		labels: Array(moneyWillUseData.length).fill(''),
		datasets: [
			{
				label: 'Thực tế chi tiêu',
				data: moneyWillUseData.slice(0, usedMoneyEachDay.length),
				fill: true,
				borderColor: 'rgb(24, 144, 255)',
				backgroundColor: 'rgba(24, 144, 255, 0.2)',
			},
			{
				label: 'Dự kiến chi tiêu theo thực tế',
				data: moneyWillUseData,
				fill: true,
				borderColor: 'rgb(132, 196, 255)',
				backgroundColor: 'rgba(132, 196, 255, 0.2)',
			},

			{
				label: 'Tổng chi tiêu theo thực tế',
				data: moneyWillUseData.map(
					() => moneyWillUseData[moneyWillUseData.length - 1]
				),
				borderColor: 'rgb(255, 99, 78)',
				backgroundColor: 'rgba(255, 99, 78, 0.2)',
			},
			{
				label: 'Ngân sách đặt ra',
				data: moneyWillUseData.map(() => 900_000),
				borderColor: 'rgb(98, 255, 78)',
				backgroundColor: 'rgba(98, 255, 78, 0.2)',
			},
		],
	}

	return <Line options={options} data={data} />
}

const CenterBox = styled.div`
	text-align: center;
`
const Title = styled(Typography.Title)`
	margin: 0 !important;
`
const Text = styled(Typography.Text)`
	font-size: 0.65rem;
`
const ReportBox = styled.div`
	text-align: center;
`
const FlexBox = styled.div`
	display: flex;
	justify-content: space-around;
	@media screen and (max-width: 768px) {
		justify-content: space-between;
	}
`
const MarginBox = styled.div`
	margin-top: 0.5rem;
`

export default BudgetModalContent
