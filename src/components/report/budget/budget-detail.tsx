import ListItem from '@/components/list-item'
import ShadowBox from '@/components/shadow-box'
import getRemainingDays from '@/utilities/get-remaining-days-in-month'
import formatMoney from '@/utilities/money-format'
import { Avatar, Input, Modal, Typography } from 'antd'
import styled from 'styled-components'
import BudgetInfoModal from './budget-info-modal'
import useWindowSize from '@/hooks/use-window-size'

type DetailProps = {
	id: string
	icon?: React.ReactNode
	name: string
	startDate: Date
	endDate: Date
	totalMoney: number
	usedMoney: number
	options: string
	forceUpdateFunction: Function
}

function BudgetDetail(props: DetailProps) {
	const {
		id,
		icon,
		name,
		startDate,
		endDate,
		totalMoney,
		usedMoney,
		options,
		forceUpdateFunction,
	} = props
	const windowSize = useWindowSize()

	const isInMobile = windowSize <= 768
	const subTitle =
		startDate.toLocaleDateString() + ' - ' + endDate.toLocaleDateString()
	const percent = (usedMoney / totalMoney) * 100
	const remainingMoney = totalMoney - usedMoney
	const today = new Date()
	const remainingDays = getRemainingDays(today, endDate)

	const handleClick = () => {
		const modal = Modal.info({
			title: name,
			icon: (
				<Avatar style={{ backgroundColor: '#1677ff' }}>
					{name[0].toUpperCase()}
				</Avatar>
			),
			content: (
				<BudgetInfoModal
					id={id}
					totalMoney={totalMoney}
					usedMoney={usedMoney}
					startDate={startDate}
					endDate={endDate}
					options={options}
					forceUpdateFunction={() => {
						forceUpdateFunction()
						modal.destroy()
					}}
				/>
			),
			centered: true,
			width: isInMobile ? '100%' : '40rem',
			okButtonProps: { type: 'default' },
			onOk: () => modal.destroy(),
		})
	}

	return (
		<div onClick={handleClick}>
			<ShadowBox>
				<ListItem
					title={name}
					icon={icon}
					subTitle={subTitle}
					moreDetail={formatMoney(totalMoney)}
				/>
				<TotalLine>
					<UsedLine
						style={{
							width: `${percent}%`,
							backgroundColor:
								percent < 30 ? '#58ff79' : percent < 70 ? '#e4ff58' : '#ff5858',
						}}
					/>
				</TotalLine>
				<DueDate>
					<Typography.Text type="secondary">
						{remainingDays > 0 ? `Còn ${remainingDays} ngày` : 'Hết hạn'}
					</Typography.Text>
					<Typography.Text type="secondary">
						{formatMoney(remainingMoney)}
					</Typography.Text>
				</DueDate>
			</ShadowBox>
		</div>
	)
}

const TotalLine = styled.div`
	width: 100%;
	height: 0.5rem;
	background-color: #ddd;
	border-radius: 4px;
	margin-top: 0.75rem;
`
const UsedLine = styled.div`
	height: 0.5rem;
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
`
const DueDate = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 0.25rem;
`

export default BudgetDetail
