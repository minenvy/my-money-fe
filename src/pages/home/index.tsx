import InOutHomeReport from '@/pages/home/in-out-home-report'
import RecentTransaction from '@/pages/home/recent-transaction'
import ShadowBox from '@/components/shadow-box'
import TotalMoney from '@/pages/home/total-money'
import { useAuth } from '@/contexts/auth'
import { Typography } from 'antd'
import styled from 'styled-components'

function Home() {
	const { user } = useAuth()

	return (
		<Wrapper>
			<Typography.Title level={4}>Chào {user.username}!</Typography.Title>
			<TotalMoney />
			<InOutHomeReport />
			<RecentTransaction />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	overflow: auto;
`

export default Home
