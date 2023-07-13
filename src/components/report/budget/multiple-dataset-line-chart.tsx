import Loading from '@/components/loading'
import useFetch from '@/hooks/use-fetch'
import getRemainingDays from '@/utilities/get-remaining-days-in-month'
import { Typography } from 'antd'
import { Line } from 'react-chartjs-2'
import { getDayExpense } from '@/api/budget'

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

interface MultipleDatasetLineChartProps {
	id: string
	totalMoney: number
	startDate: string | Date
	endDate: string | Date
}
interface IData {
	isLoading: boolean
	data: Array<{
		createdAt: string | Date
		money: number
	}>
}

function MultipleDatasetLineChart(props: MultipleDatasetLineChartProps) {
	const { id, totalMoney, startDate, endDate } = props
	const { data, isLoading } = useFetch(`chart budget ${id}`, () =>
		getDayExpense(id)
	) as IData

	if (data === null || data.length === 0)
		return (
			<>
				{isLoading && <Loading />}
				<Typography.Text>
					Hiện tại bạn chưa có tiêu dùng nào trong ngân sách này
				</Typography.Text>
			</>
		)

	const dataLength = data.length
	const passDays =
		getRemainingDays(startDate, data[dataLength - 1].createdAt) + 1
	let usedMoneyEachDay = Array(passDays).fill(0)
	data.forEach((item) => {
		const index = getRemainingDays(startDate, item.createdAt)
		usedMoneyEachDay[index] = item.money
	})

	usedMoneyEachDay = usedMoneyEachDay.map((money) => round(money))
	const usedMoney = usedMoneyEachDay.reduce((total, money) => total + money, 0)
	const averageOneDay =
		usedMoneyEachDay.length > 0 ? usedMoney / usedMoneyEachDay.length : 0
	const remainingDays = getRemainingDays(new Date(), endDate)
	const moneyWillUseData: Array<number> = []
	usedMoneyEachDay.forEach((money, index) => {
		if (index === 0) moneyWillUseData.push(money)
		else moneyWillUseData.push(moneyWillUseData[index - 1] + money)
	})
	for (let i = 1; i <= remainingDays; i++) {
		moneyWillUseData.push(usedMoney + averageOneDay * i)
	}

	const chartData = {
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
				data: moneyWillUseData.map(() => round(totalMoney)),
				borderColor: 'rgb(98, 255, 78)',
				backgroundColor: 'rgba(98, 255, 78, 0.2)',
			},
		],
	}

	return (
		<>
			<Typography.Text>Biểu đồ chi tiêu</Typography.Text>
			<br></br>
			<Typography.Text type="secondary">(Đơn vị: nghìn đồng)</Typography.Text>
			<Line options={options} data={chartData} />
		</>
	)
}

function round(money: number) {
	return Math.round((money / 1e3) * 1000) / 1000
}

export default MultipleDatasetLineChart
