import formatMoney from '@/utilities/money-format'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { useState } from 'react'

function TotalMoney() {
	const [isShowedTotal, setIsShowedTotal] = useState(false)

	const money = 50_000_000

	const toggleDisplayTotal = () => {
		setIsShowedTotal((preState) => !preState)
	}
	return (
		<>
			<Typography.Title level={5}>Tổng số dư</Typography.Title>
			<Typography.Text>
				{isShowedTotal ? formatMoney(money) : '**********'}
			</Typography.Text>
			&nbsp;
			<span onClick={() => toggleDisplayTotal()}>
				{isShowedTotal ? <EyeInvisibleOutlined /> : <EyeOutlined />}
			</span>
		</>
	)
}

export default TotalMoney
