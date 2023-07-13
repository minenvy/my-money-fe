import { Avatar, Divider, Empty, Modal, Typography } from 'antd'
import styled from 'styled-components'
import DetailReportModal from './detail-report-modal'

type Props = {
	type: 'tháng' | 'năm'
	title: number
	year: number
	moneyType: 'in' | 'out' | 'in and out'
	moneyIn?: number
	moneyOut?: number
}

function QuickReport(props: Props) {
	const { type, moneyType, title, year, moneyIn, moneyOut } = props
	const isSelectMonth = type === 'tháng'
	const titleWithText = isSelectMonth ? 'Tháng ' + title : 'Năm ' + title

	if (moneyIn === 0 && moneyOut === 0) return null
	if (moneyType === 'in' && moneyIn === 0) return null
	if (moneyType === 'out' && moneyOut === 0) return null

	const handleClick = () => {
		const modal = Modal.info({
			icon: <Avatar style={{ backgroundColor: '#1677ff' }}>{title}</Avatar>,
			title: titleWithText,
			content: (
				<DetailReportModal
					type={type}
					moneyType={moneyType}
					month={title}
					year={year}
				/>
			),
			okButtonProps: { type: 'default' },
			onOk: () => modal.destroy(),
		})
	}

	return (
		<>
			<FlexBox onClick={handleClick}>
				<Typography.Title level={5}>{titleWithText}</Typography.Title>
				<Money>
					{moneyIn !== undefined && (
						<Typography.Text type="success" ellipsis>
							{moneyIn.toLocaleString()}
						</Typography.Text>
					)}
					{moneyOut !== undefined && (
						<Typography.Text type="danger" ellipsis>
							{moneyOut.toLocaleString()}
						</Typography.Text>
					)}
					{moneyIn !== undefined && moneyOut !== undefined && (
						<>
							<StyledDivider />
							<Typography.Text ellipsis>
								{(moneyIn - moneyOut).toLocaleString()}
							</Typography.Text>
						</>
					)}
				</Money>
			</FlexBox>
		</>
	)
}

const FlexBox = styled.div`
	display: flex;
	justify-content: space-between;
	width: 18rem;
	border-radius: 0.25rem;
	padding: 0.5rem;
	margin: 1rem 0;
	border: 1px solid #ddd;
	box-shadow: 0 2px 8px #ddd;
	cursor: pointer;
	@media (max-width: 768px) {
		margin: 1rem auto;
	}
`
const Money = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`
const StyledDivider = styled(Divider)`
	margin: 0.25rem 0;
	background-color: #e6e6e6;
`

export default QuickReport
