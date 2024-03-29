import { postFetch } from '@/api/fetch'
import ListItem from '@/components/list-item'
import { imagesDir } from '@/constants/env'
import { useAuth } from '@/contexts/auth'
import { Avatar, Button } from 'antd'
import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import default_avatar from '@/assets/images/default_avatar.jpg'
import { useNavigate } from 'react-router-dom'
import socket from '@/utilities/socket'
import { PersonInterface } from '@/interfaces/profile'
import { followFriend } from '@/api/user'

const Person = React.forwardRef((props: PersonInterface, _) => {
	const { id, nickname, image, bio, isFollowed } = props
	const navigate = useNavigate()
	const { user } = useAuth()
	const [isFollowedThisUser, setIsFollowedThisUser] = useState(isFollowed)
	const [isPosting, setIsPosting] = useState(false)

	const isInOwnerProfile = user.id === id

	const follow = async () => {
		await followFriend(id, !isFollowedThisUser)
		setIsFollowedThisUser(!isFollowedThisUser)

		if (!isFollowedThisUser)
			socket.emit('follow', { senderId: user.id, receiverId: id })
	}
	const handleClickFollow = async (e: any) => {
		e.stopPropagation()
		if (isPosting) return
		setIsPosting(true)
		await follow()
		setIsPosting(false)
	}
	const redirectToFriendProfile = () => navigate('/profile/' + id)

	return (
		<Boundary onClick={redirectToFriendProfile}>
			<ListItem
				icon={
					<StyledAvatar
						src={image !== '' ? imagesDir + image : default_avatar}
						size="large"
					/>
				}
				title={nickname}
				subTitle={bio || 'Chưa có bio'}
				moreDetail={
					!isInOwnerProfile && (
						<Button loading={isPosting} onClick={handleClickFollow}>
							{isFollowedThisUser ? 'Unfollow' : 'Follow'}
						</Button>
					)
				}
			/>
		</Boundary>
	)
})

const StyledAvatar = styled(Avatar)`
	background-color: #1890ff;
`
const Boundary = styled.div`
	width: 100%;
	margin: 0 auto;
`

export default Person
