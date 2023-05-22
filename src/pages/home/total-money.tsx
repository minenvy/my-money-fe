import ShadowBox from '@/components/shadow-box'
import { useAuth } from '@/contexts/auth'
import formatMoney from '@/utilities/money-format'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { useState } from 'react'

function TotalMoney() {
	const [isShowedTotal, setIsShowedTotal] = useState(false)
	const { user } = useAuth()

	const toggleDisplayTotal = () => {
		setIsShowedTotal((preState) => !preState)
	}

	return (
		<ShadowBox>
			<Typography.Title level={5}>Tổng số dư</Typography.Title>
			<Typography.Text>
				{isShowedTotal ? formatMoney(user.money) : '**********'}
			</Typography.Text>
			&nbsp;
			<span onClick={() => toggleDisplayTotal()}>
				{isShowedTotal ? <EyeInvisibleOutlined /> : <EyeOutlined />}
			</span>
		</ShadowBox>
	)
}

export default TotalMoney
