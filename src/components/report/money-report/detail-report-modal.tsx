import { getInMonth, getInYear } from '@/api/transaction'
import { Empty, Typography } from 'antd'
import Loading from '@/components/loading'
import useFetch from '@/hooks/use-fetch'
import useMoneyType from '@/hooks/use-money-type'
import { TransactionReport } from '@/interfaces/report'
import styled from 'styled-components'
import formatMoney from '@/utilities/money-format'
import DoughnutChart from '@/components/doughnut-chart'
import ListItem from '@/components/list-item'

type ModalContentProps = {
	type: 'tháng' | 'năm'
	month: number
	year: number
	moneyType: 'in' | 'out' | 'in and out'
}

function DetailReportModal(props: ModalContentProps) {
	const { type, moneyType, month, year } = props
	const isMonthReport = type === 'tháng'
	const { data, isLoading } = useFetch<Array<TransactionReport>>(
		isMonthReport
			? `quick report month ${month} ${year}`
			: `quick report year ${year}`,
		isMonthReport ? () => getInMonth(month, year) : () => getInYear(year)
	)
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

	const checkSameType = (type: string) => {
		if (moneyType === 'in') return moneyInTypes.includes(type)
		if (moneyType === 'out') return !moneyInTypes.includes(type)
		return true
	}

	const detail: Array<{
		label: string
		data: number
	}> = []
	data.forEach((item: TransactionReport) => {
		if (moneyType === 'in and out') {
			detail.push({
				label: valueToLabel(item.type),
				data: item.money,
			})
			return
		}
		if (checkSameType(item.type))
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
			{data
				.filter((transaction) => checkSameType(transaction.type))
				.map((transaction) => {
					const title = valueToLabel(transaction.type)
					const icon = icons.find(
						(icon) => icon.value === transaction.type
					)?.icon

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

const CenterBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

export default DetailReportModal
