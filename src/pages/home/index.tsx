import InOutHomeReport from '@/pages/home/in-out-home-report'
import RecentTransaction from '@/pages/home/recent-transaction'
import ShadowWrapper from '@/components/shadow-wrapper'
import TotalMoney from '@/pages/home/total-money'
import { useAuth } from '@/contexts/use-auth'
import { Typography } from 'antd'
import styled from 'styled-components'

function Home() {
	const { user } = useAuth()

	return (
		<Wrapper>
			<Typography.Title level={4}>Chào {user.username}!</Typography.Title>

			<ShadowWrapper>
				<TotalMoney />
			</ShadowWrapper>

			<ShadowWrapper>
				<InOutHomeReport />
			</ShadowWrapper>

			<ShadowWrapper>
				<RecentTransaction />
			</ShadowWrapper>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	overflow: auto;
`

export default Home
