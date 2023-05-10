import ShadowBox from '@/components/shadow-box'
import styled from 'styled-components'
import useFetch from '@/hooks/use-fetch'
import Loading from '@/components/loading'
import Person from './person'
import ProposersList from './proposers-list'
import { useParams } from 'react-router-dom'

const shadowBoxStyles = {
	margin: '0.25rem 0',
	width: '100%',
	maxWidth: '33rem',
}

interface IPerson {
	id: string
	nickname: string
	image: string
	bio: string
}
interface IData {
	isLoading: boolean
	data: Array<IPerson>
}
interface IProps {
	type: 'followers' | 'followings'
}

function Follow(props: IProps) {
	const { type } = props
	const { id = '' } = useParams()
	const { data, isLoading } = useFetch(
		`${type} ${id}`,
		`/user/get-${type}/` + id
	) as IData

	if (isLoading) return <Loading />
	if (data === undefined) return null

	return (
		<Wrapper>
			<ShadowBox style={shadowBoxStyles}>
				{data.map((item) => (
					<Person {...item} key={item.id} />
				))}
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
