import { profileTabs } from '@/constants/profile'
import { Tabs } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import MiniTransaction from './mini-transaction'
import Follow from './follow'
import { useParams } from 'react-router-dom'
import useFetch from '@/hooks/use-fetch'
import Loading from '@/components/loading'
import { useAuth } from '@/contexts/auth'

const tabChildren = [
	<MiniTransaction />,
	<Follow type="followers" />,
	<Follow type="followings" />,
]

interface IData {
	isLoading: boolean
	data: {
		isBlocked: boolean
	}
}

function Main() {
	const { id = '' } = useParams()
	const { user } = useAuth()
	const { data, isLoading } = useFetch(
		`check block ${id}`,
		`/user/check-block/${id}/${user.id}`,
		[id]
	) as IData
	const [activeKeyTab, setActiveKeyTab] = useState(profileTabs[0].key)

	if (isLoading) return <Loading />
	if (data === undefined || data === null) return null
	if (user.id !== id && data.isBlocked)
		return (
			<Wrapper>
				<StyledP>{`Bạn đã bị block bởi người dùng này!`}</StyledP>
			</Wrapper>
		)

	const tabItems = profileTabs.map((tab, index) => {
		return { ...tab, children: tabChildren[index] }
	})

	const handleChangeTab = (activeKey: string) => {
		setActiveKeyTab(activeKey)
	}

	return (
		<Wrapper>
			<Tabs
				centered
				items={tabItems}
				activeKey={activeKeyTab}
				onChange={handleChangeTab}
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin-top: 2.75rem;
	@media (max-width: 768px) {
		margin-top: 1rem;
	}
`
const StyledP = styled.p`
	text-align: center;
`

export default Main
