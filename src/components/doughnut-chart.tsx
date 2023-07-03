import generateBackgroundColor from '@/utilities/generate-color'
import { Doughnut } from 'react-chartjs-2'

type Props = {
	detail: Array<{
		label: string
		data: number
	}>
}

function DoughnutChart(props: Props) {
	const { detail } = props
	const labels = detail.map((item) => item.label)
	const dataOfDataset = detail.map((item) => item.data)
	const backgroundColor = labels.map(() => generateBackgroundColor())
	const borderColor = backgroundColor.map((color) => color.replace('0.2', '1'))
	const data = {
		labels,
		datasets: [
			{
				data: dataOfDataset,
				backgroundColor,
				borderColor,
				borderWidth: 1,
			},
		],
	}

	return <Doughnut data={data} />
}

export default DoughnutChart
