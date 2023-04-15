import formatMoney from '@/utilities/money-format'
import { Typography } from 'antd'
import styled from 'styled-components'

interface IProps {
	time: Date
	money: number
}

function TitleInOutDetail(props: IProps) {
	const { time, money } = props
	const date = time.getDate()
	const dayInWeek = time.toLocaleString('default', { weekday: 'long' })
	const monthWithYear = `tháng ${time.getMonth() + 1} ${time.getFullYear()}`

	return (
		<Wrapper>
			<Date>{date}</Date>
			<Detail>
				<Day>
					<Typography.Text type="secondary">{dayInWeek}</Typography.Text>
					<Typography.Text type="secondary">{monthWithYear}</Typography.Text>
				</Day>
				<Money>{formatMoney(money)}</Money>
			</Detail>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	align-items: center;
  gap: 1rem;
`
const Date = styled.span`
	font-size: 1.75rem;
`
const Detail = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
`
const Day = styled.div`
	display: flex;
	flex-direction: column;
`
const Money = styled.b`
	font-size: 1rem;
`

export default TitleInOutDetail
