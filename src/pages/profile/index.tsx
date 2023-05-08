import styled from 'styled-components'
import Header from './header'
import Main from './main'

function Profile() {
	return (
		<Wrapper>
			<Header />
			<Main />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin: 0 1.875rem;
	@media screen and (max-width: 768px) {
		margin: 0;
	}
`

export default Profile
