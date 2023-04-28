import InOutDetail from '@/components/in-out-detail'
import { profileTabs } from '@/constants/profile-tab'
import { Tabs } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import MiniTransaction from './mini-transaction'
import Followers from './followers'
import Following from './following'

const tabChildren = [<MiniTransaction />, <Followers />, <Following />]
function MainContent() {
	const [activeKeyTab, setActiveKeyTab] = useState(profileTabs[0].key)

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
	@media screen and (max-width: 768px) {
		margin-top: 1rem;
	}
`

export default MainContent
