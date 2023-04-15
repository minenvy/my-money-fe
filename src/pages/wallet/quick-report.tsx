import { formatMoneyWithSign } from '@/utilities/money-format'
import { Divider, Typography } from 'antd'
import styled from 'styled-components'

interface IProps {
	quickMoneyReport: Array<number>
}

function QuickReport(props: IProps) {
	const { quickMoneyReport } = props
	const items = ['Số dư đầu', 'Tổng tiền vào', 'Tổng tiền ra', 'Số dư cuối']

	return (
		<>
			{items.map((item, index) => {
				const money = formatMoneyWithSign(quickMoneyReport[index])
				const isLast = index === items.length - 1
				return (
					<FlexBox key={index} data-last-stt-info={isLast}>
						<Typography.Text>{item}</Typography.Text>
						<Typography.Title level={5}>{money}</Typography.Title>
					</FlexBox>
				)
			})}
		</>
	)
}

const FlexBox = styled.div`
	width: 100%;
	max-width: 19rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	&[data-last-stt-info='true'] {
		border-top: 1px solid #ddd;
		margin-bottom: 0.5rem;
	}
`

export default QuickReport
