import ListItem from '@/components/list-item'
import ShadowBox from '@/components/shadow-box'
import TitleExpenseDetail from '@/features/wallet/title-expense-detail'
import formatMoney from '@/utilities/money-format'
import { Avatar, Modal, Typography } from 'antd'
import styled from 'styled-components'
import QuickReport from './quick-report'
import NoData from '@/components/empty'
import useFetch from '@/hooks/use-fetch'
import useMoneyType from '@/hooks/use-money-type'
import { useNavigate } from 'react-router-dom'
import Loading from '@/components/loading'
import { imagesDir } from '@/constants/env'
import { Transaction } from '@/interfaces/transaction'
import { getSeparateInMonth } from '@/api/transaction'
import { Modal as ModalType } from '@/interfaces/wallet'

type Props = {
	month: number
	year: number
	walletName: string
}

function WalletModal(props: Props) {
	const { month, year, walletName } = props
	const navigate = useNavigate()
	const { data, isLoading } = useFetch<Array<Transaction>>(
		`transactions in wallet ${month} ${year} ${walletName}`,
		() => getSeparateInMonth(month, year, walletName),
    [walletName, month, year]
	)
	const { icons, moneyInTypes, valueToLabel } = useMoneyType()

	if (data === null || data.length === 0)
		return (
			<ShadowBox>
				{isLoading && <Loading />}
				<NoData />
			</ShadowBox>
		)

	let totalMoneyIn = 0
	let totalMoneyOut = 0
	const monthStatist: Array<Array<Transaction>> = []
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
	const showMoreDetail = (detail: ModalType) => {
		const modal = Modal.confirm({
			icon: <Avatar src={detail.icon} />,
			title: detail.title,
			content: (
				<>
					<Typography.Text>{detail.subTitle}</Typography.Text>
					<br></br>
					<Typography.Text>{detail.moreDetail}</Typography.Text>
					<br></br>
					<Typography.Text>{detail?.description}</Typography.Text>
					<br></br>
					{detail.image && (
						<StyledImg src={imagesDir + detail.image} loading="lazy" />
					)}
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
								<TitleExpenseDetail
									time={new Date(year, month, dayInMonth[index])}
									money={totalMoney}
								/>
								{dayStatis.map((item: Transaction) => {
									const icon =
										icons.find((ic) => ic.value === item.type)?.icon || ''
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
													image: item?.image as string,
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
const StyledImg = styled.img`
	width: 100%;
	height: 100%;
`

export default WalletModal
