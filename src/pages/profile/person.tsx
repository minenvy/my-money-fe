import { postFetch } from '@/api/fetch'
import { imagesDir } from '@/constants/env'
import { useAuth } from '@/contexts/auth'
import { Avatar, Button, List, Typography, message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface IPerson {
	id: string
	nickname: string
	image: string
	bio: string
}

function Person(props: IPerson) {
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
		}).catch(() => {
			message.warning('Có lỗi xảy ra, vui lòng thử lại sau!')
			return
		})) as Response
		if (!res.ok) return
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
			<List.Item>
				<List.Item.Meta
					avatar={
						<StyledAvatar
							src={image !== '' ? imagesDir + image : ''}
							size="large"
						>
							{nickname[0].toUpperCase()}
						</StyledAvatar>
					}
					title={nickname}
					description={bio || 'Chưa có bio'}
				/>
				{isInOwnerProfile ? (
					<Typography.Text>
						{isFollowed ? 'Unfollow' : 'Follow'}
					</Typography.Text>
				) : (
					<Button loading={isPosting} onClick={handleClickFollow}>
						{isFollowed ? 'Unfollow' : 'Follow'}
					</Button>
				)}
			</List.Item>
		</Boundary>
	)
}

const Boundary = styled.div`
	width: 30rem;
	@media screen and (max-width: 768px) {
		width: 19rem;
	}
`
const StyledAvatar = styled(Avatar)`
	background-color: #1890ff;
`

export default Person
