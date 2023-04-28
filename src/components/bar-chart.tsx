import { Typography } from 'antd'
import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'

const chartOptions = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
	},
}

interface IProps {
	labels: Array<string | number>
	moneyIn: Array<number>
	moneyOut: Array<number>
	type?: 'horizontal' | 'stacked'
	unit?: string
}

function BarChart(props: IProps) {
	const { labels, moneyIn, moneyOut, type = 'horizontal', unit = 'nghìn' } = props
	const options =
		type === 'horizontal'
			? chartOptions
			: {
					...chartOptions,
					scales: {
						x: {
							stacked: true,
						},
						y: {
							stacked: true,
						},
					},
			  }

	const data = {
		labels,
		datasets: [
			{
				label: 'Chi',
				data: moneyOut,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgb(255, 99, 132)',
				borderWidth: 1,
			},
			{
				label: 'Thu',
				data: moneyIn,
				backgroundColor: 'rgba(82, 196, 26, 0.2)',
				borderColor: 'rgb(82, 196, 26)',
				borderWidth: 1,
			},
		],
	}

	return (
		<Wrapper>
			<Typography.Text type="secondary">{`(Đơn vị: ${unit} đồng)`}</Typography.Text>
			<Bar options={options} data={data} />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

export default BarChart
