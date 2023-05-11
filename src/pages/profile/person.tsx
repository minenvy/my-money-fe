import { postFetch } from '@/api/fetch'
import ListItem from '@/components/list-item'
import { imagesDir } from '@/constants/env'
import { useAuth } from '@/contexts/auth'
import { Avatar, Button, Typography, message } from 'antd'
import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import default_avatar from '@/assets/default_avatar.jpg'
import { useNavigate } from 'react-router-dom'

interface IPerson {
	id: string
	nickname: string
	image: string
	bio: string
}

const Person = React.forwardRef((props: IPerson, ref) => {
	const { id, nickname, image, bio } = props
	const navigate = useNavigate()
	const { user, changeInfo } = useAuth()
	const [isPosting, setIsPosting] = useState(false)

	const isInOwnerProfile = user.id === id
	const isFollowed = user.followings.includes(id || '')

	const follow = async () => {
		const res = (await postFetch('/user/follow', {
			id,
			isFollowed: !isFollowed,
		})) as Response
		if (!res) return
		if (!res.ok) {
			message.warning('Bạn chỉ có thể follow tối đa 20 người!')
			return
		}
		changeInfo({
			followings: isFollowed
				? user.followings.filter((item) => item !== id)
				: [...user.followings, id],
		})
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
							{isFollowed ? 'Unfollow' : 'Follow'}
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
	width: 30rem;
	@media (max-width: 768px) {
		width: 19rem;
	}
`

export default Person
