import { postFetch } from '@/api/fetch'
import { checkBlock } from '@/api/user'
import Loading from '@/components/loading'
import { useAuth } from '@/contexts/auth'
import useFetch from '@/hooks/use-fetch'
import { CheckBlock } from '@/interfaces/profile'
import { Button } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
	close: Function
}

function FriendDialog(props: Props) {
	const { close } = props
	const { id = '' } = useParams()
	const { user } = useAuth()
	const { data, isLoading } = useFetch<CheckBlock>(`check block ${id}`, () =>
		checkBlock(user.id, id)
	)
	const [isBlockedThisUser, setIsBlockedThisUser] = useState<boolean>()
	const [isFetching, setIsFetching] = useState(false)

	if (data && isBlockedThisUser === undefined)
		setIsBlockedThisUser(data.isBlocked)

	const block = async () => {
		const res = await postFetch('/user/block', {
			id,
			isBlocked: !isBlockedThisUser,
		})
		if (res === null) return
		setIsBlockedThisUser(!isBlockedThisUser)
	}
	const handleClickBlock = async () => {
		if (isFetching) return
		setIsFetching(true)
		await block()
		setIsFetching(false)
	}

	return (
		<Wrapper>
			{isLoading && <Loading />}
			<CenterContent>
				<StyledButton
					block
					loading={isFetching}
					onClick={() => handleClickBlock()}
				>
					{isBlockedThisUser ? 'Unblock' : 'Block'}
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
