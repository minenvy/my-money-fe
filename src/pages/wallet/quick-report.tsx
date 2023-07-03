import { formatMoneyWithSign } from '@/utilities/money-format'
import { Typography } from 'antd'
import styled from 'styled-components'

type Props = {
	quickMoneyReport: Array<number>
}

function QuickReport(props: Props) {
	const { quickMoneyReport } = props
	const items = ['Tổng tiền vào', 'Tổng tiền ra', 'Tổng kết']

	return (
		<Wrapper>
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
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 19rem;
	@media (max-width: 768px) {
		margin: 0 auto;
	}
`
const FlexBox = styled.div`
	width: 100%;
	max-width: 18rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	&[data-last-stt-info='true'] {
		border-top: 1px solid #ddd;
	}
`

export default QuickReport
