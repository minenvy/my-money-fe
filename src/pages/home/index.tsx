import InOutHomeReport from '@/pages/home/expense-home-report'
import RecentTransaction from '@/pages/home/recent-transaction'
import TotalMoney from '@/pages/home/total-money'
import { useAuth } from '@/contexts/auth'
import { Typography } from 'antd'
import styled from 'styled-components'
import Wallet from './wallet'

function Home() {
	const { user } = useAuth()

	return (
		<Wrapper>
			<Typography.Title level={4}>Chào {user.nickname}!</Typography.Title>
			<TotalMoney />
			<Wallet />
			<InOutHomeReport />
			<RecentTransaction />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	overflow: auto;
`

export default Home
