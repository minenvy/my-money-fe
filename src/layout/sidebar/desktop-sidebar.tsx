import useWindowSize from '@/hooks/use-window-size'
import styled from 'styled-components'
import MobileButton from '@/layout/sidebar/mobile-button'
import DesktopButton from '@/layout/sidebar/desktop-button'

function DesktopSidebar(props: {
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
							key={index}
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

const FixedPosition = styled.aside`
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	align-self: flex-start;
	padding: 0.75rem;
`
const DesktopWrapper = styled.div`
	width: fit-content;
	display: flex;
	flex-direction: column;
`

export default DesktopSidebar
