import { useAuth } from '@/contexts/auth'
import useWindowSize from '@/hooks/use-window-size'
import {
	HomeOutlined,
	LineChartOutlined,
	PlusCircleOutlined,
	UserOutlined,
	WalletOutlined,
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MobileSidebar from '@/layout/sidebar/mobile-sidebar'
import DesktopSidebar from '@/layout/sidebar/desktop-sidebar'

const page = ['', 'wallet', 'transaction', 'report', 'profile']

function Sidebar() {
	const navigate = useNavigate()
	const location = useLocation()
	const { user } = useAuth()
	const windowWidth = useWindowSize()
	const [activeButtonId, setActiveButtonId] = useState(
		page.indexOf(location.pathname.split('/')[1])
	)
	const isInMobile = windowWidth <= 768
	const routes = [
		'/',
		'/wallet',
		'/transaction',
		'/report',
		'/profile/' + user.id,
	]

	const handleClick = (index: number) => {
		setActiveButtonId(index)
		navigate(routes[index])
	}
	useEffect(() => {
		setActiveButtonId(page.indexOf(location.pathname.split('/')[1]))
	}, [location])

	const labels = [
		'Tổng quan',
		'Tài khoản',
		isInMobile ? '' : 'Thu chi',
		'Thống kê',
		'Cá nhân',
	].filter((label) => (isInMobile ? true : label))
	const icons = [
		<HomeOutlined />,
		<WalletOutlined />,
		<PlusCircleOutlined
			style={{ fontSize: isInMobile ? '1.1rem' : '1.3rem' }}
		/>,
		<LineChartOutlined />,
		<UserOutlined />,
	].filter((icon) => !!icon)

	return (
		<>
			{isInMobile ? (
				<MobileSidebar
					icons={icons}
					labels={labels}
					activeButtonId={activeButtonId}
					onClick={handleClick}
				/>
			) : (
				<DesktopSidebar
					icons={icons}
					labels={labels}
					activeButtonId={activeButtonId}
					onClick={handleClick}
				/>
			)}
		</>
	)
}

export default Sidebar
