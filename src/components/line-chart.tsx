import { Typography } from 'antd'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
			onClick: () => {},
		},
	},
}

type Props = {
	labels: Array<string | number>
	money: Array<number>
	type: 'in' | 'out'
	unit: string
}

function LineChart(props: Props) {
	const { labels, money, type, unit } = props

	const dataset =
		type === 'out'
			? [
					{
						label: 'Chi',
						data: money,
						fill: true,
						borderColor: 'rgb(255, 99, 132)',
						backgroundColor: 'rgba(255, 99, 132, 0.5)',
					},
			  ]
			: [
					{
						label: 'Thu',
						data: money,
						fill: true,
						borderColor: 'rgb(82, 196, 26)',
						backgroundColor: 'rgba(82, 196, 26, 0.2)',
					},
			  ]
	const data = {
		labels,
		datasets: dataset,
	}

	return (
		<Wrapper>
			<Typography.Text type="secondary">
				{unit ? `(Đơn vị: ${unit} đồng)` : `(Đơn vị: đồng)`}
			</Typography.Text>
			<Line options={options} data={data} />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`

export default LineChart
