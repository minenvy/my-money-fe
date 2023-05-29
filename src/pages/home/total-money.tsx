import ShadowBox from '@/components/shadow-box'
import { useMoneyContext } from '@/contexts/money'
import formatMoney from '@/utilities/money-format'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { useState } from 'react'

function TotalMoney() {
	const [isShowedTotal, setIsShowedTotal] = useState(false)
	const { money } = useMoneyContext()

	const totalMoney = money.reduce(
		(total, moneyItem) => moneyItem.total + total,
		0
	)

	const toggleDisplayTotal = () => {
		setIsShowedTotal((preState) => !preState)
	}

	return (
		<ShadowBox>
			<Typography.Title level={5}>Tổng số dư</Typography.Title>
			<Typography.Text>
				{isShowedTotal ? formatMoney(totalMoney) : '**********'}
			</Typography.Text>
			&nbsp;
			<span onClick={() => toggleDisplayTotal()}>
				{isShowedTotal ? <EyeInvisibleOutlined /> : <EyeOutlined />}
			</span>
		</ShadowBox>
	)
}

export default TotalMoney
