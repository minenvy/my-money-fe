import ShadowBox from '@/components/shadow-box'
import styled from 'styled-components'
import useFetch from '@/hooks/use-fetch'
import Loading from '@/components/loading'
import Person from './person'
import ProposersList from './proposers-list'
import { useParams } from 'react-router-dom'
import NoData from '@/components/empty'
import { getFollow } from '@/api/user'
import { Friend } from '@/interfaces/friend'

const shadowBoxStyles = {
	margin: '0.25rem 0',
	width: '100%',
	maxWidth: '33rem',
}

type Props = {
	type: 'followers' | 'followings'
}

function Follow(props: Props) {
	const { type } = props
	const { id = '' } = useParams()
	const { data, isLoading } = useFetch<Array<Friend>>(
		`${type} ${id}`,
		() => getFollow(type, id),
		[type, id]
	)

	if (isLoading) return <Loading />

	return (
		<Wrapper>
			<ShadowBox style={shadowBoxStyles}>
				{data ? (
					data.map((item) => <Person {...item} key={item.id} />)
				) : (
					<NoData />
				)}
				<ProposersList />
			</ShadowBox>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: auto;
`

export default Follow
