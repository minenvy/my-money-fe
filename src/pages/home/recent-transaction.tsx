import InOutDetail from '@/components/in-out-detail'
import TitleOfPartContent from './title-of-part-content'
import ShadowBox from '@/components/shadow-box'
import useFetch from '@/hooks/use-fetch'
import { icons, moneyInTypes, valueToLabel } from '@/constants/money-type'
import formatMoney from '@/utilities/money-format'
import { useNavigate } from 'react-router-dom'

function RecentTransaction() {
	const { data, isLoading } = useFetch('/transaction/recent')
	const navigate = useNavigate()

	const hasData = data && data.length > 0
	const handleClick = () => {
		navigate('/wallet')
	}

	return (
		<>
			{hasData && (
				<ShadowBox>
					<TitleOfPartContent title="Giao dịch gần đây" onClick={handleClick} />
					{data.map((item: any) => {
						const icon = icons.find((ic) => ic.value === item.type)?.icon
						const label = valueToLabel(item.type)
						const date = new Date(item.year, item.month, item.day)
							.toLocaleString()
							.split(',')[0]
						const money = formatMoney(item.money)
						const type = moneyInTypes.includes(item.type) ? 'in' : 'out'

						return (
							<InOutDetail
								key={item.id}
								id={item.id}
								title={label}
								icon={icon}
								subTitle={date}
								description={item.note}
								rightPart={money}
								type={type}
							/>
						)
					})}
				</ShadowBox>
			)}
		</>
	)
}

export default RecentTransaction
