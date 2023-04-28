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
import styled from 'styled-components'

const page = ['', 'wallet', 'transaction', 'report', 'profile']
const routes = ['/', '/wallet', '/transaction', '/report', '/profile']

function Sidebar() {
	const navigate = useNavigate()
	const location = useLocation()
	const windowWidth = useWindowSize()
	const [activeButtonId, setActiveButtonId] = useState(
		page.indexOf(location.pathname.split('/')[1])
	)

	const handleClick = (index: number) => {
		setActiveButtonId(index)
		navigate(routes[index])
	}
	useEffect(() => {
		setActiveButtonId(page.indexOf(location.pathname.split('/')[1]))
	}, [location])

	const isInMobile = windowWidth <= 768
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
				<SidebarInMobile
					icons={icons}
					labels={labels}
					activeButtonId={activeButtonId}
					onClick={handleClick}
				/>
			) : (
				<SidebarInDesktop
					icons={icons}
					labels={labels}
					activeButtonId={activeButtonId}
					onClick={handleClick}
				/>
			)}
		</>
	)
}

function SidebarInMobile(props: {
	icons: Array<React.ReactNode>
	labels: Array<string>
	activeButtonId: number
	onClick: Function
}) {
	const { icons, labels, activeButtonId, onClick } = props

	return (
		<FixedPositionInMobile>
			<MobileWrapper>
				{icons.map((icon, index) => {
					const label = labels[index]
					const isActive = activeButtonId === index && !!label
					return (
						<MobileButton
							isActive={isActive}
							icon={icon}
							label={label}
							key={label}
							onClick={() => onClick(index)}
						/>
					)
				})}
			</MobileWrapper>
		</FixedPositionInMobile>
	)
}

function SidebarInDesktop(props: {
	icons: Array<React.ReactNode>
	labels: Array<string>
	activeButtonId: number
	onClick: Function
}) {
	const { icons, labels, activeButtonId, onClick } = props
	const windowSize = useWindowSize()
	const isInLaptop = windowSize < 1200

	return (
		<FixedPosition>
			<DesktopWrapper>
				{icons.map((icon, index) => {
					const label = labels[index]
					const isActive = activeButtonId === index
					return isInLaptop ? (
						<MobileButton
							isActive={isActive}
							icon={icon}
							label={''}
							onClick={() => onClick(index)}
						/>
					) : (
						<DesktopButton
							isActive={isActive}
							icon={icon}
							label={label}
							key={index}
							onClick={() => onClick(index)}
						/>
					)
				})}
			</DesktopWrapper>
		</FixedPosition>
	)
}

function DesktopButton(props: {
	icon: React.ReactNode
	label: string
	isActive?: boolean
	onClick: Function
}) {
	const { icon, label, isActive, onClick } = props
	return (
		<CustomDesktopButton data-focus-info={isActive} onClick={() => onClick()}>
			{icon}
			<StyledSpan>{label}</StyledSpan>
		</CustomDesktopButton>
	)
}

export function MobileButton(props: {
	icon: React.ReactNode
	label: string
	isActive?: boolean
	onClick: Function
}) {
	const { icon, label, isActive, onClick } = props
	return (
		<CustomMobileButton
			data-focus-info={isActive}
			data-mini-info={!label}
			onClick={() => onClick()}
		>
			{icon}
			{label && (
				<StyledSpan style={{ fontSize: '0.75rem' }}>{label}</StyledSpan>
			)}
		</CustomMobileButton>
	)
}

const FixedPositionInMobile = styled.aside`
	position: -webkit-sticky;
	position: sticky;
	bottom: 0;
	z-index: 3;
`
const FixedPosition = styled.aside`
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	align-self: flex-start;
`
const Wrapper = styled.div`
	width: fit-content;
	display: flex;
`
const MobileWrapper = styled(Wrapper)`
	flex-direction: row;
	position: fixed;
	bottom: 0;
	width: 100vw;
	justify-content: center;
	background-color: #f9f9f9;
`
const DesktopWrapper = styled(Wrapper)`
	flex-direction: column;
`
const CustomButton = styled.div`
	display: flex;
	align-items: center;
	border-radius: 0.75rem;
	cursor: pointer;
	&:hover {
		background-color: #d5d5d5;
	}
	& span {
		font-size: 1.1rem;
	}
	&[data-focus-info='true'] {
		color: #1890ff;
		background-color: #e6e6e6;
	}
	&[data-mini-info='true'] {
		padding: 0.75rem;
		& span {
			font-size: 1.5rem;
		}
	}
`
const CustomDesktopButton = styled(CustomButton)`
	flex-direction: row;
	padding: 0 1rem;
`
const CustomMobileButton = styled(CustomButton)`
	flex-direction: column;
	justify-content: center;
	padding: 0.15rem;
	padding-top: 0.45rem;
`
const StyledSpan = styled.span`
	flex: 1;
	text-align: center;
	padding: 0.5rem 1rem;
`

export default Sidebar
