import ListItem from '@/components/list-item'
import TitleOfPartContent from './title-of-each-part-content'
import ShadowBox from '@/components/shadow-box'
import useFetch from '@/hooks/use-fetch'
import useMoneyType from '@/hooks/use-money-type'
import formatMoney from '@/utilities/money-format'
import { useNavigate } from 'react-router-dom'
import { Avatar, Modal, Typography } from 'antd'
import Loading from '@/components/loading'
import styled from 'styled-components'
import { imagesDir } from '@/constants/env'
import NoData from '@/components/empty'
import { getRecent } from '@/api/transaction'
import { Transaction } from '@/interfaces/transaction'

type Modal = {
	id: string
	icon: string
	title: string
	subTitle: React.ReactNode
	moreDetail: string
	description?: string
	image?: string
}

function RecentTransaction() {
	const navigate = useNavigate()
	const { data, isLoading } = useFetch<Array<Transaction>>(
		'recent transaction',
		getRecent
	)
	const { icons, moneyInTypes, valueToLabel } = useMoneyType()

	const hasNoData = data === null || data.length === 0
	if (hasNoData)
		return (
			<ShadowBox>
				{isLoading && <Loading />}
				<Typography.Title level={5}>Giao dịch gần đây</Typography.Title>
				<NoData />
			</ShadowBox>
		)

	const handleClick = () => {
		navigate('/wallet')
	}
	const showMoreDetail = (detail: Modal) => {
		const modal = Modal.info({
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
			okButtonProps: { type: 'default' },
			onOk: () => modal.destroy(),
		})
	}

	return (
		<ShadowBox>
			<TitleOfPartContent title="Giao dịch gần đây" onClick={handleClick} />
			{data.map((item) => {
				const icon = icons.find((ic) => ic.value === item.type)?.icon || ''
				const label = valueToLabel(item.type)
				const date = new Date(item.createdAt).toLocaleDateString('en-GB')
				const money = formatMoney(item.money)
				const type = moneyInTypes.includes(item.type) ? 'in' : 'out'
				return (
					<div
						key={item.id}
						onClick={() =>
							showMoreDetail({
								id: item.id,
								icon: icon,
								title: label,
								subTitle: date,
								moreDetail: money,
								description: item?.note,
								image: item?.image as string,
							})
						}
					>
						<ListItem
							key={item.id}
							title={label}
							icon={icon}
							subTitle={date}
							moreDetail={money}
							type={type}
						/>
					</div>
				)
			})}
		</ShadowBox>
	)
}

const StyledImg = styled.img`
	width: 100%;
	height: 100%;
`

export default RecentTransaction
