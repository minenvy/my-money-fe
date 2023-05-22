import { imagesDir } from '@/constants/env'
import useWindowSize from '@/hooks/use-window-size'
import Icon from '@ant-design/icons'
import { Avatar, Button, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import OwnerDialog from './owner-dialog'
import useFetch from '@/hooks/use-fetch'
import Loading from '@/components/loading'
import { profileMenuIcon } from '@/constants/profile'
import default_avatar from '@/assets/default_avatar.jpg'

interface IData {
	isLoading: boolean
	data: {
		username: string
		nickname: string
		bio: string
		image: string
		transactions: number
		followers: number
		followings: number
	}
}

function OwnerHeaderProfile() {
	const navigate = useNavigate()
	const { id } = useParams()
	const windowSize = useWindowSize()
	const { data, isLoading } = useFetch(
		'my header profile',
		'/user/get-by-id/' + id
	) as IData
	const [isShowedDialog, setIsShowedDialog] = useState(false)

	const isInMobile = windowSize <= 768

	if (isLoading) return <Loading />
	if (data === undefined || data === null) return null

	const redirectToEdit = () => {
		navigate('/profile/edit-profile')
	}
	const showDialog = () => {
		setIsShowedDialog(true)
	}
	const closeDialog = () => setIsShowedDialog(false)

	return (
		<header>
			<Wrapper>
				<AvatarBox>
					<AvatarBoundary>
						<StyledAvatar
							src={
								data?.image !== '' ? imagesDir + data?.image : default_avatar
							}
							size={isInMobile ? 75 : 150}
						/>
					</AvatarBoundary>
				</AvatarBox>
				<InfoBox>
					<div>
						<StyledSpan>{data.nickname}</StyledSpan>
						{isInMobile && (
							<StyledIcon component={profileMenuIcon} onClick={showDialog} />
						)}
						<StyledButton onClick={redirectToEdit}>
							Thay đổi profile
						</StyledButton>
						{!isInMobile && (
							<StyledIcon component={profileMenuIcon} onClick={showDialog} />
						)}
					</div>
					{!isInMobile && (
						<MoreInfo>
							<span>
								<strong>{data.transactions} </strong>giao dịch
							</span>
							<ChildMoreInfo>
								<strong>{data.followers} </strong>followers
							</ChildMoreInfo>
							<ChildMoreInfo>
								<strong>{data.followings} </strong>following
							</ChildMoreInfo>
						</MoreInfo>
					)}
					{!isInMobile && (
						<Bio>
							<Typography.Text>{data?.bio}</Typography.Text>
						</Bio>
					)}
				</InfoBox>
			</Wrapper>
			{isInMobile && (
				<>
					<Bio>
						<Typography.Text>{data?.bio}</Typography.Text>
					</Bio>
					<MoreInfo>
						<span>
							<strong>{data.transactions} </strong>giao dịch
						</span>
						<ChildMoreInfo>
							<strong>{data.followers} </strong>followers
						</ChildMoreInfo>
						<ChildMoreInfo>
							<strong>{data.followings} </strong>following
						</ChildMoreInfo>
					</MoreInfo>
				</>
			)}
			{isShowedDialog && <OwnerDialog close={closeDialog} />}
		</header>
	)
}

const Wrapper = styled.div`
	display: flex;
`
const AvatarBox = styled.div`
	flex: 1;
`
const StyledAvatar = styled(Avatar)`
	background-color: #1890ff;
`
const AvatarBoundary = styled.div`
	width: fit-content;
	margin: 0 auto;
`
const InfoBox = styled.div`
	flex: 2;
	margin-left: 2rem;
`
const StyledSpan = styled.span`
	font-size: 1.25rem;
`
const StyledButton = styled(Button)`
	margin-left: 1.25rem;
	@media (max-width: 768px) {
		margin: 0;
		margin-top: 1rem;
		display: block;
	}
`
const MoreInfo = styled.div`
	margin-top: 1.875rem;
	@media (max-width: 768px) {
		width: 100%;
		max-width: 30rem;
		margin-top: 1rem;
		display: flex;
		justify-content: space-between;
		padding: 0 0.5rem;
		margin: 0 auto;
	}
`
const ChildMoreInfo = styled.span`
	margin-left: 2.75rem;
`
const Bio = styled.div`
	margin-top: 1rem;
	@media (max-width: 768px) {
		text-align: center;
		margin: 1rem;
	}
`
const StyledIcon = styled(Icon)`
	margin-left: 1.25rem;
	cursor: pointer;
`

export default OwnerHeaderProfile
