import { useAuth } from '@/contexts/auth'
import { BellOutlined, MenuOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function Header() {
	const { user } = useAuth()
	const [isHaveNotification, setIsHaveNotification] = useState(true)

	return (
		<Wrapper>
			<LogoImage />
			<RightContent>
				<Badge dot={isHaveNotification} offset={[-21, 5]}>
					<MarginButton type="text" shape="circle" icon={<BellOutlined />} />
				</Badge>
				<StyledAvatar src={user?.image || ''} size="large">
					{(user.username[0] || '').toUpperCase()}
				</StyledAvatar>
			</RightContent>
		</Wrapper>
	)
}

function LogoImage() {
	const navigate = useNavigate()

	const handleClickLogo = () => {
		navigate('/')
	}

	return (
		<LogoImageWrapper onClick={() => handleClickLogo()}>
			<img src="/favicon-32x32.png" alt="logo" />
			<StyledText>My Money</StyledText>
		</LogoImageWrapper>
	)
}

const Wrapper = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 1rem;
`
const LogoImageWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`
const StyledText = styled.b`
	min-width: fit-content;
	margin-left: 0.25rem;
	@media screen and (max-width: 768px) {
		display: none;
	}
`
const RightContent = styled.div`
	display: flex;
`
const MarginButton = styled(Button)`
	margin-right: 1rem;
`
const StyledAvatar = styled(Avatar)`
	background-color: #1890ff;
`

export { LogoImage }
export default Header
