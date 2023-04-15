import generateBackgroundColor from '@/utilities/generate-color'
import { Doughnut } from 'react-chartjs-2'

function DoughnutChart() {
	const labels = ['Red', 'Blue', 'Yellow',]
	const backgroundColor = labels.map(() => generateBackgroundColor())
	const borderColor = backgroundColor.map((color) => color.replace('0.2', '1'))
	const data = {
		labels,
		datasets: [
			{
				data: [12, 19, 3,],
				backgroundColor,
				borderColor,
				borderWidth: 1,
			},
		],
	}

	return <Doughnut data={data} />
}

export default DoughnutChart
