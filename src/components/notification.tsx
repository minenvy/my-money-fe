import { BellOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Spin, Typography, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import VirtualList from 'rc-virtual-list'
import { getFetch, postFetch } from '@/api/fetch'
import { useAuth } from '@/contexts/auth'
import useFetch from '@/hooks/use-fetch'
import Loading from './loading'
import NoData from './empty'
import socket from '@/utilities/socket'
import default_avatar from '@/assets/default_avatar.jpg'
import { imagesDir } from '@/constants/env'
import { useNavigate } from 'react-router-dom'

const ContainerHeight = 400
const ItemHeight = 48
const Offset = 15

interface INotification {
	id: string
	userId: string
	image: string
	message: string
	status: 'read' | 'unread'
	createdAt: string
}
interface IData {
	isLoading: boolean
	data: Array<INotification>
}

function Notification() {
	const navigate = useNavigate()
	const { user } = useAuth()
	const { data, isLoading } = useFetch(
		`notification ${user.id}`,
		`/notification/get-infinite/${user.id}/0`,
		[user.id]
	) as IData
	const [notifications, setNotifications] = useState<Array<INotification>>([])
	const [isOpened, setIsOpened] = useState(false)
	const [isFetching, setIsFetching] = useState(false)
	const offset = useRef(0)

	useEffect(() => {
		socket.on('notification', (data: INotification) => {
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

	if (isLoading) return <Loading />
	if (!data) return null
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
			const res = (await getFetch(
				'/notification/get-infinite/' +
					user.id +
					'/' +
					(offset.current + Offset)
			)) as Response
			if (!res || !res.ok) return
			offset.current += Offset
			const resData = await res.json()
			setNotifications([...notifications, ...resData])
			setIsFetching(false)
		}
	}
	const redirectToFriend = async (id: string, userId: string) => {
		const res = await postFetch('/notification/read', { id })
		if (!res || !res.ok) return
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
							data={notifications as Array<INotification>}
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
								const isRead = notification.status === 'read'

								return (
									<>
										{isNewDay && (
											<Typography.Text strong>
												{`${date.toLocaleString('default', {
													weekday: 'long',
												})} ${date.getDate()}/${
													date.getMonth() + 1
												}/${date.getFullYear()}`}
											</Typography.Text>
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
