import { Bar } from 'react-chartjs-2'

const chartOptions = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Chart.js Bar Chart',
		},
	},
}
const labels = ['Hôm nay']

function BarChart() {
	const data = {
		labels,
		datasets: [
			{
				label: 'Chi',
				data: labels.map(() => 1000_000_000),
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgb(255, 99, 132)',
				borderWidth: 1,
			},
			{
				label: 'Thu',
				data: labels.map(() => 80_000),
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				borderColor: 'rgb(75, 192, 192)',
				borderWidth: 1,
			},
		],
	}

	return <Bar options={chartOptions} data={data} />
}

export default BarChart
