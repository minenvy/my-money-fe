import styled from 'styled-components'
import Header from './header'
import Sidebar from './sidebar'
import { Outlet } from 'react-router-dom'

function DefaultLayout() {
	return (
		<Wrapper>
			<Header />
			<Main>
				<Sidebar />
				<Content>
					<Outlet />
				</Content>
			</Main>
		</Wrapper>
	)
}

const Wrapper = styled.div``
const Main = styled.div``
const Content = styled.div``

export default DefaultLayout
