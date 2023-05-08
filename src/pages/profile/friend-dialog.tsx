import { postFetch } from '@/api/fetch'
import { useAuth } from '@/contexts/auth'
import { Button, message } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

interface IProps {
	close: Function
}

function FriendDialog(props: IProps) {
	const { close } = props
	const { id } = useParams()
	const { user, changeInfo } = useAuth()
	const [isLoading, setIsLoading] = useState(false)

	const isBlocked = user.blockers.includes(id || '')

	const block = async () => {
		const res = (await postFetch('/user/block', {
			id,
			isBlocked: !isBlocked,
		}).catch(() => {
			message.warning('Có lỗi xảy ra, vui lòng thử lại sau!')
			return
		})) as Response
		if (!res.ok) return
		changeInfo({
			blockers: isBlocked
				? user.blockers.filter((item) => item !== id)
				: [...user.blockers, id],
		})
	}
	const handleClickBlock = async () => {
		if (isLoading) return
		setIsLoading(true)
		await block()
		setIsLoading(false)
	}

	return (
		<Wrapper>
			<CenterContent>
				<StyledButton
					block
					loading={isLoading}
					onClick={() => handleClickBlock()}
				>
					{isBlocked ? 'Unblock' : 'Block'}
				</StyledButton>
				<StyledButton block onClick={() => close()}>
					Hủy
				</StyledButton>
			</CenterContent>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 3;
`
const CenterContent = styled.div`
	width: 90%;
	max-width: 30rem;
	padding: 0.5rem;
	border-radius: 0.5rem;
	background-color: #e6e6e6;
`
const StyledButton = styled(Button)`
	margin-top: 0.5rem;
`

export default FriendDialog
