import { BellOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Spin, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import VirtualList from 'rc-virtual-list'
import { useAuth } from '@/contexts/auth'
import useFetch from '@/hooks/use-fetch'
import NoData from '@/components/empty'
import socket from '@/utilities/socket'
import default_avatar from '@/assets/images/default_avatar.jpg'
import { imagesDir } from '@/constants/env'
import { useNavigate } from 'react-router-dom'
import { Notification as NotificationType } from '@/interfaces/notification'
import { getNotifications, readNotification } from '@/api/notification'

const ContainerHeight = 400
const ItemHeight = 48
const Offset = 15

function Notification() {
	const navigate = useNavigate()
	const { user } = useAuth()
	const { data } = useFetch<Array<NotificationType>>(
		'notifications',
		getNotifications
	)
	const [notifications, setNotifications] = useState<Array<NotificationType>>(
		[]
	)
	const [isOpened, setIsOpened] = useState(false)
	const [isFetching, setIsFetching] = useState(false)
	const offset = useRef(0)

	useEffect(() => {
		socket.on('notification', (data: NotificationType) => {
			if (notifications === undefined) return
			setNotifications((preState) => {
				const isHadThisNotification = notifications.find(
					(notification) => notification.id === data.id
				)
				return isHadThisNotification
					? [...preState]
					: [{ ...data, status: 'unread' }, ...preState]
			})
		})
	}, [socket])

	if (data === null) return null
	if (notifications.length === 0 && data.length > 0) setNotifications(data)

	const numberOfNotification = notifications.reduce(
		(total, notification) => total + (notification.status === 'unread' ? 1 : 0),
		0
	)

	const toggleShowNotification = () => {
		setIsOpened((preState) => !preState)
	}
	const onScroll = async (e: React.UIEvent<HTMLElement, UIEvent>) => {
		if (
			e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
			ContainerHeight
		) {
			setIsFetching(true)
			const res = await getNotifications(user.id, offset.current + Offset)
			offset.current += Offset
			setNotifications([...notifications, ...res])
			setIsFetching(false)
		}
	}
	const redirectToFriend = async (id: string, userId: string) => {
		readNotification(id)
		setNotifications(
			notifications.map((item) =>
				item.id === id ? { ...item, status: 'read' } : item
			)
		)
		navigate('/profile/' + userId)
		setIsOpened(false)
	}

	return (
		<Wrapper>
			<Badge count={numberOfNotification} overflowCount={9} offset={[-10, 5]}>
				<Button
					type="text"
					shape="circle"
					icon={<BellOutlined />}
					onClick={toggleShowNotification}
				/>
			</Badge>
			{isOpened && (
				<NotificationBox>
					{notifications.length > 0 ? (
						<VirtualList
							data={notifications as Array<NotificationType>}
							height={ContainerHeight}
							itemHeight={ItemHeight}
							itemKey="id"
							onScroll={onScroll}
						>
							{(notification, index) => {
								const isNewDay =
									index === 0 ||
									(index !== 0 &&
										notification.createdAt !==
											notifications[index - 1].createdAt)
								const date = new Date(notification.createdAt)
								const timestamp = `${date.toLocaleString('default', {
									weekday: 'long',
								})} ${date.getDate()}/${
									date.getMonth() + 1
								}/${date.getFullYear()}`
								const isRead = notification.status === 'read'

								return (
									<>
										{isNewDay && (
											<Typography.Text strong>{timestamp}</Typography.Text>
										)}
										<NotificationInDay
											onClick={() =>
												redirectToFriend(notification.id, notification.userId)
											}
											style={{ backgroundColor: isRead ? 'white' : '#edf7ff' }}
										>
											<StyledAvatar
												src={
													notification.image
														? imagesDir + notification.image
														: default_avatar
												}
											/>
											<Typography.Text>{notification.message}</Typography.Text>
										</NotificationInDay>
									</>
								)
							}}
						</VirtualList>
					) : (
						<NoData />
					)}
					{isFetching && <Spin />}
				</NotificationBox>
			)}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	position: relative;
	margin-right: 1rem;
`
const NotificationBox = styled.div`
	position: absolute;
	top: 3rem;
	right: -2.75rem;
	width: 22rem;
	padding: 1rem;
	border-radius: 4px;
	border: 1px solid #ddd;
	background-color: white;
	z-index: 3;
	@media screen and (max-width: 768px) {
		width: 19rem;
	}
`
const NotificationInDay = styled.div`
	height: 3rem;
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 0.5rem;
	margin: 0.5rem 0;
	cursor: pointer;
`
const StyledAvatar = styled(Avatar)`
	background-color: #1890ff;
`

export default Notification
