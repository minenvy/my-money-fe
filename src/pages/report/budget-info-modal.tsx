import { postFetch } from '@/api/fetch'
import ShadowBox from '@/components/shadow-box'
import { valueToLabel } from '@/constants/money-type'
import getRemainingDays from '@/utilities/get-remaining-days-in-month'
import formatMoney from '@/utilities/money-format'
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Typography, message } from 'antd'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'

interface IProps {
	id: string
	totalMoney: number
	usedMoney: number
	startDate: Date
	endDate: Date
	options: string
}

function BudgetInfoModal(props: IProps) {
	const { id, totalMoney, usedMoney, startDate, endDate, options } = props
	const remainingMoney = totalMoney - usedMoney
	const today = new Date()
	const days = getRemainingDays(startDate, today)
	const remainingDays = getRemainingDays(today, endDate)
	const totalDays = days + remainingDays
	const isOverMoney = remainingMoney < 0

	return (
		<Wrapper>
			<PopDeleteConfirm id={id} />
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
				{remainingDays > 0 && (
					<ShadowBox style={{ width: '6.5rem', padding: '0 8px' }}>
						<ReportBox>
							<Title level={5}>{remainingDays} ngày</Title>
							<Text type="secondary">Đến cuối hạn</Text>
						</ReportBox>
					</ShadowBox>
				)}
			</FlexBox>

			<MarginBox>
				<Typography.Text>Ngày bắt đầu: </Typography.Text>
				<Typography.Text>
					{startDate.toLocaleDateString('en-GB')}
				</Typography.Text>
				<br></br>
				<Typography.Text>Ngày kết thúc: </Typography.Text>
				<Typography.Text>{endDate.toLocaleDateString('en-GB')}</Typography.Text>
				<br></br>
				<Typography.Text>Dự kiến chi tiêu: </Typography.Text>
				<Typography.Text>
					{formatMoney(totalMoney / totalDays)}/ngày
				</Typography.Text>
				<br></br>
				<Typography.Text>Thực tế chi tiêu: </Typography.Text>
				<Typography.Text>
					{formatMoney(days > 0 ? usedMoney / days : 0)}/ngày
				</Typography.Text>
				<br></br>
				<Typography.Text>Các loại chi tiêu: </Typography.Text>
				<Typography.Text>
					{options
						.split(',')
						.map((option) => valueToLabel(option.trim()))
						.join(', ')
						.trim()}
				</Typography.Text>
			</MarginBox>

			<MarginBox>
				<Typography.Text>Biểu đồ chi tiêu</Typography.Text>
				<br></br>
				<Typography.Text type="secondary">(Đơn vị: nghìn đồng)</Typography.Text>
				<MultipleDatasetLineChart id={id} totalMoney={totalMoney} />
			</MarginBox>
		</Wrapper>
	)
}

function PopDeleteConfirm(props: { id: string }) {
	const { id } = props
	const [open, setOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const onDelete = async () => {
		const res = (await postFetch('/budget/delete', { id }).catch(() => {
			message.warning('Có lỗi xảy ra. Vui lòng thử lại sau!')
			return
		})) as Response
		if (!res.ok) {
			message.warning('Có lỗi xảy ra. Vui lòng thử lại sau!')
			return
		}
		message.success('Xóa thành công!')
		setTimeout(() => window.location.reload(), 1000)
	}
	const showPopConfirm = () => setOpen(true)
	const handleOk = async () => {
		setIsLoading(true)
		await onDelete()
		setIsLoading(false)
		setOpen(false)
	}
	const handleCancel = () => {
		setOpen(false)
	}

	return (
		<Popconfirm
			title="Xóa"
			description="Bạn có chắc chắn muốn xóa mục này?"
			icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
			open={open}
			onConfirm={handleOk}
			okType="danger"
			okButtonProps={{ loading: isLoading }}
			onCancel={handleCancel}
		>
			<DeleteButton
				icon={<DeleteOutlined />}
				type="text"
				onClick={showPopConfirm}
			/>
		</Popconfirm>
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

interface IMultipleDatasetLineChartProps {
	id: string
	totalMoney: number
}
function MultipleDatasetLineChart(props: IMultipleDatasetLineChartProps) {
	const { id, totalMoney } = props
	const usedMoneyEachDay = [0, 20000, 40000, 40000].map((money) => round(money))
	const usedMoney = usedMoneyEachDay.reduce((total, money) => total + money, 0)
	const averageOneDay =
		usedMoneyEachDay.length > 0 ? usedMoney / usedMoneyEachDay.length : 0
	const remainingDays = 10
	const moneyWillUseData: Array<number> = []
	usedMoneyEachDay.forEach((money, index) => {
		if (index === 0) moneyWillUseData.push(money)
		else moneyWillUseData.push(moneyWillUseData[index - 1] + money)
	})
	for (let i = 1; i <= remainingDays; i++) {
		moneyWillUseData.push(usedMoney + averageOneDay * i)
	}

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
				data: moneyWillUseData.map(() => round(totalMoney)),
				borderColor: 'rgb(98, 255, 78)',
				backgroundColor: 'rgba(98, 255, 78, 0.2)',
			},
		],
	}

	return <Line options={options} data={data} />
}

function round(money: number) {
	return Math.round((money / 1e3) * 1000) / 1000
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
const Wrapper = styled.div`
	position: relative;
	& button {
		display: none;
	}
	&:hover {
		& button {
			display: block;
		}
	}
`
const DeleteButton = styled(Button)`
	position: absolute;
	top: 0;
	right: 0;
`

export default BudgetInfoModal
