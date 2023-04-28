import DoughnutChart from '@/components/doughnut-chart'
import generateBackgroundColor from '@/utilities/generate-color'
import formatMoney from '@/utilities/money-format'
import { Avatar, Divider, Modal, Typography } from 'antd'
import styled from 'styled-components'

interface IProps {
	title: string
	moneyIn?: number
	moneyOut?: number
}

function QuickReport(props: IProps) {
	const { title, moneyIn, moneyOut } = props

	const handleClick = () => {
		const modal = Modal.info({
			icon: (
				<Avatar style={{ backgroundColor: generateBackgroundColor() }}>
					{title}
				</Avatar>
			),
			title,
			content: (
				<ModalContent
					detail={[
						{
							label: 'Ăn uống',
							data: 70,
						},
						{
							label: 'Chi phis khacs',
							data: 30,
						},
						{
							label: 'Giải trí',
							data: 30,
						},
						{
							label: 'Giải trí',
							data: 30,
						},
						{
							label: 'Giải trí',
							data: 30,
						},
						{
							label: 'Chi phis khacs',
							data: 30,
						},
						{
							label: 'Chi phis khacs',
							data: 30,
						},
						{
							label: 'Chi phis khacs',
							data: 30,
						},
						{
							label: 'Chi phis khacs',
							data: 30,
						},
					]}
				/>
			),
			okButtonProps: { type: 'default' },
			onOk: () => modal.destroy(),
		})
	}

	return (
		<>
			<FlexBox onClick={handleClick}>
				<Typography.Title level={5}>{title}</Typography.Title>
				<Money>
					<Typography.Text type="success" ellipsis>
						{moneyIn && moneyIn.toLocaleString()}
					</Typography.Text>
					<Typography.Text type="danger" ellipsis>
						{moneyOut && moneyOut.toLocaleString()}
					</Typography.Text>
					{moneyIn && moneyOut && (
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

function ModalContent(props: {
	detail: Array<{ label: string; data: number }>
}) {
	const { detail } = props
	const total = detail.reduce((sum, item) => sum + item.data, 0)

	return (
		<CenterBox>
			<Typography.Text>Tổng tiền: {formatMoney(total)}</Typography.Text>
			<DoughnutChart detail={detail} />
		</CenterBox>
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
	@media screen and (max-width: 768px) {
		margin: 1rem auto;
	}
`
const Money = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`
const StyledDivider = styled(Divider)`
	margin: 0.25rem 0;
	background-color: #e6e6e6;
`
const CenterBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

export default QuickReport
