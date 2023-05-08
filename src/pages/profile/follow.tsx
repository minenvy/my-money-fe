import ShadowBox from '@/components/shadow-box'
import { List } from 'antd'
import styled from 'styled-components'
import useFetch from '@/hooks/use-fetch'
import Loading from '@/components/loading'
import Person from './person'
import ProposersList from './proposers-list'
import { useParams } from 'react-router-dom'

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
	const { data, isLoading } = useFetch(`/user/get-${type}/` + id, [id]) as IData

	if (isLoading) return <Loading />
	if (!data) return null

	return (
		<Wrapper>
			<ShadowBox style={{ margin: '0.25rem 0' }}>
				<List>
					{data.map((item) => (
						<Person {...item} key={item.id} />
					))}
				</List>
				<ProposersList />
			</ShadowBox>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	max-height: 32rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: auto;
	@media screen and (max-width: 768px) {
	}
`

export default Follow
