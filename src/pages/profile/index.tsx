import styled from 'styled-components'
import Header from '@/features/profile/header'
import Main from '@/features/profile/main'
import { useParams } from 'react-router-dom'

function Profile() {
	const { id } = useParams()

	return (
		<Wrapper key={id}>
			<Header />
			<Main />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin: 0 1.875rem;
	@media (max-width: 768px) {
		margin: 0;
	}
`

export default Profile
