import styled from 'styled-components'
import Header from './header'
import Sidebar from './sidebar'
import { Outlet } from 'react-router-dom'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	Filler,
} from 'chart.js'
import ImagesUploadProvider from '@/contexts/images-uploader'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
	ArcElement
)

function MainLayout() {
	return (
		<ImagesUploadProvider>
			<Header />
			<Main>
				<Sidebar />
				<Content>
					<Outlet />
				</Content>
			</Main>
		</ImagesUploadProvider>
	)
}

const Main = styled.main`
	display: flex;
	flex-direction: row;
	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
`
const Content = styled.div`
	flex: 1;
	padding: 0.5rem 2rem;
	overflow: auto;
	margin-bottom: 0.5rem;
	max-width: 70rem;
	margin: 0 auto;
	@media screen and (max-width: 768px) {
		order: -1;
		width: 100%;
		padding: 0.5rem 1rem;
		margin-bottom: 4.4rem;
	}
`

export default MainLayout
