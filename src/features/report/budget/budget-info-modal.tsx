import ShadowBox from '@/components/shadow-box'
import useMoneyType from '@/hooks/use-money-type'
import getRemainingDays from '@/utilities/get-remaining-days-in-month'
import formatMoney from '@/utilities/money-format'
import { Typography } from 'antd'
import styled from 'styled-components'
import PopDeleteConfirm from './pop-delete'
import MultipleDatasetLineChart from './multiple-dataset-line-chart'

type Props = {
	id: string
	totalMoney: number
	usedMoney: number
	startDate: Date
	endDate: Date
	options: string
	forceUpdateFunction: Function
}

function BudgetInfoModal(props: Props) {
	const {
		id,
		totalMoney,
		usedMoney,
		startDate,
		endDate,
		options,
		forceUpdateFunction,
	} = props
	const { valueToLabel } = useMoneyType()

	const remainingMoney = totalMoney - usedMoney
	const today = new Date()
	const days = getRemainingDays(startDate, today)
	const remainingDays = getRemainingDays(today, endDate)
	const totalDays = days + remainingDays
	const isOverMoney = remainingMoney < 0

	return (
		<Wrapper>
			<PopDeleteConfirm id={id} forceUpdateFunction={forceUpdateFunction} />
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
					{formatMoney(Math.round(totalMoney / totalDays))}/ngày
				</Typography.Text>
				<br></br>
				<Typography.Text>Thực tế chi tiêu: </Typography.Text>
				<Typography.Text>
					{formatMoney(days > 0 ? Math.round(usedMoney / days) : 0)}/ngày
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
				<MultipleDatasetLineChart
					id={id}
					totalMoney={totalMoney}
					startDate={startDate}
					endDate={endDate}
				/>
			</MarginBox>
		</Wrapper>
	)
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
	@media (max-width: 768px) {
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

export default BudgetInfoModal
