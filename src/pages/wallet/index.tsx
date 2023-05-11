import ListItem from '@/components/list-item'
import ShadowBox from '@/components/shadow-box'
import TitleInOutDetail from '@/pages/wallet/title-in-out-detail'
import formatMoney from '@/utilities/money-format'
import { Avatar, DatePicker, Image, Modal, Typography } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import styled from 'styled-components'
import QuickReport from './quick-report'
import NoData from '@/components/empty'
import useFetch from '@/hooks/use-fetch'
import { icons, moneyInTypes, valueToLabel } from '@/constants/money-type'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth'
import Loading from '@/components/loading'

const monthFormat = 'MM/YYYY'
const today = new Date()

interface ITransaction {
	id: string
	money: number
	type: string
	createdAt: string | Date
	note?: string
}

function Wallet() {
	const { user } = useAuth()
	const [time, setTime] = useState({
		month: today.getMonth() + 1,
		year: today.getFullYear(),
	})

	const changeMonth = (dateString: string) => {
		const dateInfo = dateString.split('/')
		setTime({
			month: Number(dateInfo[0]),
			year: Number(dateInfo[1]),
		})
	}

	return (
		<>
			<TotalMoney>
				<StyledText type="secondary">Số dư</StyledText>
				<StyledText strong>{formatMoney(user.money)}</StyledText>
			</TotalMoney>
			<StyledDatePicker
				defaultValue={dayjs(dayjs(today), monthFormat)}
				format={monthFormat}
				picker="month"
				onChange={(_, dateString) => changeMonth(dateString)}
			/>
			<MainContent month={time.month} year={time.year} />
		</>
	)
}

interface IData {
	isLoading: boolean
	data: Array<ITransaction>
}
interface IMainContentProps {
	month: number
	year: number
}
interface IModal {
	id: string
	icon: string
	title: string
	subTitle: React.ReactNode
	moreDetail: string
	description?: string
}

function MainContent(props: IMainContentProps) {
	const { month, year } = props
	const navigate = useNavigate()
	const { data, isLoading } = useFetch(
		`transactions in wallet ${month} ${year}`,
		`/transaction/get-separate-in-month/${month}/${year}`,
		[month, year]
	) as IData

	if (isLoading) return <Loading />
	if (data === undefined)
		return (
			<ShadowBox>
				<NoData />
			</ShadowBox>
		)

	const hasData = data.length > 0
	if (!hasData) {
		return (
			<ShadowBox>
				<NoData />
			</ShadowBox>
		)
	}

	let totalMoneyIn = 0
	let totalMoneyOut = 0
	const monthStatist: Array<Array<ITransaction>> = []
	const dayInMonth: Array<number> = []
	data.forEach((item) => {
		if (moneyInTypes.includes(item.type)) totalMoneyIn += item.money
		else totalMoneyOut += item.money

		const createdAt = new Date(item.createdAt)
		const day = createdAt.getDate()
		if (!dayInMonth.includes(day)) {
			dayInMonth.push(day)
			monthStatist.push([item])
		} else monthStatist[dayInMonth.indexOf(day)].push(item)
	})

	const redirectToTransaction = (id: string) => navigate('/transaction/' + id)
	const showMoreDetail = (detail: IModal) => {
		const modal = Modal.confirm({
			icon: <Avatar src={detail.icon} />,
			title: detail.title,
			content: (
				<>
					<Typography.Text>{detail.subTitle}</Typography.Text>
					<br></br>
					<Typography.Text>{detail.moreDetail}</Typography.Text>
					<br></br>
					<Typography.Text>{detail.description}</Typography.Text>
				</>
			),
			okButtonProps: { type: 'primary' },
			onOk: () => modal.destroy(),
			cancelText: 'Sửa',
			cancelButtonProps: { type: 'default' },
			onCancel: () => redirectToTransaction(detail.id),
		})
	}

	return (
		<Layout>
			<QuickReport
				quickMoneyReport={[
					totalMoneyIn,
					-totalMoneyOut,
					totalMoneyIn - totalMoneyOut,
				]}
			/>
			<SeparatePart>
				{monthStatist.map((dayStatis, index) => {
					const totalMoney = dayStatis.reduce(
						(total, item) =>
							moneyInTypes.includes(item.type)
								? total + item.money
								: total - item.money,
						0
					)

					return (
						<ShadowBox key={index}>
							<FlexBox>
								<TitleInOutDetail
									time={new Date(year, month, dayInMonth[index])}
									money={totalMoney}
								/>
								{dayStatis.map((item: ITransaction) => {
									const icon = icons.find((ic) => ic.value === item.type)?.icon
									const title = valueToLabel(item.type)
									const date = new Date(item.createdAt).toLocaleDateString(
										'en-GB'
									)
									const money = formatMoney(item.money)
									const type = moneyInTypes.includes(item.type) ? 'in' : 'out'
									return (
										<div
											key={item.id}
											onClick={() =>
												showMoreDetail({
													id: item.id,
													icon: icon,
													title: title,
													subTitle: date,
													moreDetail: money,
													description: item?.note,
												})
											}
										>
											<ListItem
												icon={icon}
												title={title}
												subTitle={date}
												moreDetail={money}
												type={type}
											/>
										</div>
									)
								})}
							</FlexBox>
						</ShadowBox>
					)
				})}
			</SeparatePart>
		</Layout>
	)
}

const StyledText = styled(Typography.Text)`
	text-align: center;
	font-size: 1.25rem;
`
const TotalMoney = styled.div`
	display: flex;
	flex-direction: column;
	align-content: space-between;
`
const StyledDatePicker = styled(DatePicker)`
	margin: 1rem auto 0;
`
const Layout = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	gap: 2rem;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`
const SeparatePart = styled.div`
	flex: 1;
	max-height: 32rem;
	display: flex;
	gap: 0.5rem;
	justify-content: space-between;
	flex-wrap: wrap;
	overflow: auto;
`
const FlexBox = styled.div`
	display: flex;
	flex-direction: column;
`

export default Wallet
