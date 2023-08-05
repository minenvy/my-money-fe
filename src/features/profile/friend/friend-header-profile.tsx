import { imagesDir } from '@/constants/env'
import useWindowSize from '@/hooks/use-window-size'
import Icon from '@ant-design/icons'
import { Avatar, Button, Typography } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useFetch from '@/hooks/use-fetch'
import Loading from '@/components/loading'
import { profileMenuIcon } from '@/constants/profile'
import { useAuth } from '@/contexts/auth'
import FriendDialog from './friend-dialog'
import { postFetch } from '@/api/fetch'
import default_avatar from '@/assets/images/default_avatar.jpg'
import socket from '@/utilities/socket'
import { checkFollow, getById } from '@/api/user'
import { CheckFollow, ProfileHeader } from '@/interfaces/profile'

function FriendHeaderProfile() {
	const { id = '' } = useParams()
	const { user } = useAuth()
	const windowSize = useWindowSize()
	const [isShowedDialog, setIsShowedDialog] = useState(false)
	const [isPosting, setIsPosting] = useState(false)
	const [isFollowed, setIsFollowed] = useState<boolean>()
	const followStatus = useFetch<CheckFollow>(`check follow ${id}`, () =>
		checkFollow(id)
	)
	const { data, isLoading } = useFetch<ProfileHeader>(
		'friend header profile',
		() => getById(id)
	)

	const isInMobile = windowSize <= 768

	if (followStatus.data && isFollowed === undefined)
		setIsFollowed(followStatus.data.isFollowed)

	const follow = async () => {
		const res = await postFetch('/user/follow', {
			id,
			isFollowed: !isFollowed,
		})
		if (res === null) return
		setIsFollowed(!isFollowed)

		if (!isFollowed)
			socket.emit('follow', { senderId: user.id, receiverId: id })
	}
	const handleClickFollow = async () => {
		if (isPosting) return
		setIsPosting(true)
		await follow()
		setIsPosting(false)
	}
	const showDialog = () => {
		setIsShowedDialog(true)
	}
	const closeDialog = () => setIsShowedDialog(false)

	return (
		<header>
			{(isLoading || followStatus.isLoading) && <Loading />}
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
						<StyledSpan>{data && data.nickname}</StyledSpan>
						{isInMobile && (
							<StyledIcon component={profileMenuIcon} onClick={showDialog} />
						)}
						<StyledButton loading={isPosting} onClick={handleClickFollow}>
							{isFollowed ? 'Unfollow' : 'Follow'}
						</StyledButton>
						{!isInMobile && (
							<StyledIcon component={profileMenuIcon} onClick={showDialog} />
						)}
					</div>
					{!isInMobile && (
						<MoreInfo>
							<span>
								<strong>{data && data.transactions} </strong>giao dịch
							</span>
							<ChildMoreInfo>
								<strong>{data && data.followers} </strong>followers
							</ChildMoreInfo>
							<ChildMoreInfo>
								<strong>{data && data.followings} </strong>following
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
							<strong>{data && data.transactions} </strong>giao dịch
						</span>
						<ChildMoreInfo>
							<strong>{data && data.followers} </strong>followers
						</ChildMoreInfo>
						<ChildMoreInfo>
							<strong>{data && data.followings} </strong>following
						</ChildMoreInfo>
					</MoreInfo>
				</>
			)}
			{isShowedDialog && <FriendDialog close={closeDialog} />}
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

export default FriendHeaderProfile
