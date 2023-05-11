import ListItem from '@/components/list-item'
import TitleOfPartContent from './title-of-part-content'
import ShadowBox from '@/components/shadow-box'
import useFetch from '@/hooks/use-fetch'
import { icons, moneyInTypes, valueToLabel } from '@/constants/money-type'
import formatMoney from '@/utilities/money-format'
import { useNavigate } from 'react-router-dom'
import { Avatar, Modal, Typography, Image } from 'antd'
import Loading from '@/components/loading'

interface IData {
	isLoading: boolean
	data: Array<{
		id: string
		money: number
		type: string
		createdAt: string | Date
		note?: string
	}>
}
interface IModal {
	id: string
	icon: string
	title: string
	subTitle: React.ReactNode
	moreDetail: string
	description?: string
}

function RecentTransaction() {
	const navigate = useNavigate()
	const { data, isLoading } = useFetch(
		'recent transaction',
		'/transaction/recent'
	) as IData

	if (isLoading) return <Loading />
	if (data === undefined) return null
	const hasData = data && data.length > 0
	if (!hasData) return null

	const handleClick = () => {
		navigate('/wallet')
	}
	const showMoreDetail = (detail: IModal) => {
		const modal = Modal.info({
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
			okButtonProps: { type: 'default' },
			onOk: () => modal.destroy(),
		})
	}

	return (
		<ShadowBox>
			<TitleOfPartContent title="Giao dịch gần đây" onClick={handleClick} />
			{data.map((item) => {
				const icon = icons.find((ic) => ic.value === item.type)?.icon
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

export default RecentTransaction
