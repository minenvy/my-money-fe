import useWindowSize from '@/hooks/use-window-size'
import {
	HomeOutlined,
	LineChartOutlined,
	PlusCircleOutlined,
	UserOutlined,
	WalletOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface ISidebarProps {
	isShowedCategories: boolean
}

function Sidebar(props: ISidebarProps) {
	const windowWidth = useWindowSize()

	const { isShowedCategories } = props
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
	const routes = ['/', '/wallet', '/transaction', '/report', '/profile']

	return (
		<>
			{isInMobile ? (
				<SidebarInMobile icons={icons} labels={labels} routes={routes} />
			) : (
				<SidebarInDesktop
					icons={icons}
					labels={labels}
					routes={routes}
					isShowedCategories={isShowedCategories}
				/>
			)}
		</>
	)
}

function SidebarInMobile(props: {
	icons: Array<React.ReactNode>
	labels: Array<string>
	routes: Array<string>
}) {
	const { icons, labels, routes } = props
	const navigate = useNavigate()
	const [activeButtonId, setActiveButtonId] = useState(0)

	const handleClick = (index: number) => {
		setActiveButtonId(index)
		navigate(routes[index])
	}

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
							onClick={() => handleClick(index)}
						/>
					)
				})}
			</MobileWrapper>
		</FixedPositionInMobile>
	)
}

function SidebarInDesktop(props: {
	isShowedCategories: boolean
	icons: Array<React.ReactNode>
	labels: Array<string>
	routes: Array<string>
}) {
	const { icons, labels, routes, isShowedCategories } = props
	const navigate = useNavigate()
	const [activeButtonId, setActiveButtonId] = useState(0)

	const handleClick = (index: number) => {
		setActiveButtonId(index)
		navigate(routes[index])
	}

	return (
		<FixedPosition>
			<DesktopWrapper>
				{icons.map((icon, index) => {
					const label = isShowedCategories ? labels[index] : ''
					const isActive = activeButtonId === index
					return isShowedCategories ? (
						<DesktopButton
							isActive={isActive}
							icon={icon}
							label={label}
							key={index}
							onClick={() => handleClick(index)}
						/>
					) : (
						<MobileButton
							isActive={isActive}
							icon={icon}
							label={label}
							key={index}
							onClick={() => handleClick(index)}
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
	&[data-mode-info='small'] {
		width: 14.5rem;
		padding: 1rem;
	}
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
