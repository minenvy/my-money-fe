import InOutHomeReport from '@/pages/home/in-out-home-report'
import RecentTransaction from '@/pages/home/recent-transaction'
import TotalMoney from '@/pages/home/total-money'
import { useAuth } from '@/contexts/auth'
import { Typography } from 'antd'
import styled from 'styled-components'
import FirstLoginSteps from '@/components/first-login-steps'

function Home() {
	const { user } = useAuth()

	return (
		<Wrapper>
			<Typography.Title level={4}>Chào {user.nickname}!</Typography.Title>
			<TotalMoney />
			<InOutHomeReport />
			<RecentTransaction />
			{!user.nickname && <FirstLoginSteps />}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	overflow: auto;
`

export default Home
