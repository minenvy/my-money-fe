import { imagesDir } from '@/constants/env'
import { useAuth } from '@/contexts/auth'
import { useImagesUpload } from '@/contexts/images-uploader'
import { BellOutlined, SyncOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import default_avatar from '@/assets/default_avatar.jpg'
import socket from '@/utilities/socket'

function Header() {
	const { user } = useAuth()
	const { isUploading } = useImagesUpload()
	const [isHaveNotification, setIsHaveNotification] = useState(false)
	console.log('header')
	useEffect(() => {}, [socket])

	return (
		<Wrapper>
			<LogoImage />
			<RightContent>
				{isUploading && (
					<Tooltip title="Trích xuất dữ liệu từ ảnh các giao dịch" color="blue">
						<StyledSyncOutlined spin={isUploading} />
					</Tooltip>
				)}
				<Badge dot={isHaveNotification} offset={[-21, 5]}>
					<MarginButton type="text" shape="circle" icon={<BellOutlined />} />
				</Badge>
				<StyledAvatar
					src={user?.image !== '' ? imagesDir + user.image : default_avatar}
					size="large"
				/>
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
	@media (max-width: 768px) {
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
const StyledSyncOutlined = styled(SyncOutlined)`
	margin-top: 0.5rem;
	margin-right: 1rem;
	height: fit-content;
`

export { LogoImage }
export default Header
