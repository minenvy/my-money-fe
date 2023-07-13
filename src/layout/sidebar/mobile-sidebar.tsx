import styled from 'styled-components'
import MobileButton from '@/layout/sidebar/mobile-button'

type Props = {
	icons: Array<React.ReactNode>
	labels: Array<string>
	activeButtonId: number
	onClick: Function
}

function MobileSidebar(props: Props) {
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

const FixedPositionInMobile = styled.aside`
	position: -webkit-sticky;
	position: sticky;
	bottom: 0;
	z-index: 3;
`
const MobileWrapper = styled.div`
	width: fit-content;
	display: flex;
	flex-direction: row;
	position: fixed;
	bottom: 0;
	width: 100vw;
	justify-content: center;
	background-color: #f9f9f9;
`

export default MobileSidebar
