import DoughnutChart from '@/components/doughnut-chart'
import ListItem from '@/components/list-item'
import Loading from '@/components/loading'
import useMoneyType from '@/hooks/use-money-type'
import useFetch from '@/hooks/use-fetch'
import formatMoney from '@/utilities/money-format'
import { Avatar, Divider, Empty, Modal, Typography } from 'antd'
import styled from 'styled-components'

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
				<ModalContent
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

interface Transaction {
	type: string
	money: number
}
type ModalContentProps = {
	type: 'tháng' | 'năm'
	month: number
	year: number
	moneyType: 'in' | 'out' | 'in and out'
}
interface FetchData {
	isLoading: boolean
	data: Array<Transaction>
}
function ModalContent(props: ModalContentProps) {
	const { type, moneyType, month, year } = props
	const isMonthReport = type === 'tháng'
	const { data, isLoading } = useFetch(
		isMonthReport
			? `quick report month ${month} ${year}`
			: `quick report year ${year}`,
		isMonthReport
			? `/transaction/get-in-month/${month}/${year}`
			: `/transaction/get-in-year/${year}`
	) as FetchData
	const { icons, moneyInTypes, valueToLabel } = useMoneyType()

	if (data === undefined || data === null || data.length === 0)
		return (
			<>
				{isLoading && <Loading />}
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					imageStyle={{ height: 60 }}
					description="Chưa có dữ liệu"
				/>
			</>
		)

	const detail: Array<{
		label: string
		data: number
	}> = []
	data.forEach((item: Transaction) => {
		if (moneyType === 'in and out') {
			detail.push({
				label: valueToLabel(item.type),
				data: item.money,
			})
			return
		}
		if (
			(moneyType === 'in' && moneyInTypes.includes(item.type)) ||
			(moneyType === 'out' && !moneyInTypes.includes(item.type))
		)
			detail.push({
				label: valueToLabel(item.type),
				data: item.money,
			})
	})
	const total = detail.reduce((sum, item) => sum + item.data, 0)
	if (total === 0)
		return (
			<Empty
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				imageStyle={{ height: 60 }}
				description="Chưa có dữ liệu"
			/>
		)

	return (
		<CenterBox>
			<Typography.Text>Tổng tiền: {formatMoney(total)}</Typography.Text>
			<DoughnutChart detail={detail} />
			{data.map((transaction) => {
				const title = valueToLabel(transaction.type)
				const icon = icons.find((icon) => icon.value === transaction.type)?.icon

				return (
					<ListItem
						key={transaction.type}
						title={title}
						icon={icon}
						moreDetail={formatMoney(transaction.money)}
					/>
				)
			})}
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
const CenterBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

export default QuickReport
