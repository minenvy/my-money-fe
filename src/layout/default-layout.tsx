import styled from 'styled-components'
import Header from './header'
import Sidebar from './sidebar'
import { Outlet } from 'react-router-dom'
import { useCallback, useState } from 'react'
import useWindowSize from '@/hooks/use-window-size'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from 'chart.js'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
)

function DefaultLayout() {
	const [isShowedCategories, setIsShowedCategories] = useState(true)
	const windowWidth = useWindowSize()
	const isInMobile = windowWidth <= 768
	const mode = isInMobile ? 'mobile' : 'desktop'

	const toggleCategories = useCallback(() => {
		setIsShowedCategories((preState) => !preState)
	}, [])

	return (
		<>
			<Header toggleCategories={toggleCategories} />
			<Main data-mode-info={mode}>
				<Sidebar isShowedCategories={isShowedCategories} />
				<Content data-mode-info={mode}>
					<Outlet />
				</Content>
			</Main>
		</>
	)
}

const Main = styled.div`
	display: flex;
	flex-direction: row;
	&[data-mode-info='mobile'] {
		flex-direction: column;
	}
`
const Content = styled.div`
	flex: 1;
	padding: 0.5rem 1rem;
	overflow: auto;
	margin-bottom: 0.5rem;
	&[data-mode-info='mobile'] {
		order: -1;
		margin-bottom: 4.4rem;
	}
`

export default DefaultLayout
