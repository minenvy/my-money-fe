import styled from 'styled-components'

type Props = {
	icon: React.ReactNode
	label: string
	isActive?: boolean
	onClick: Function
}

function DesktopButton(props: Props) {
	const { icon, label, isActive, onClick } = props
	return (
		<CustomDesktopButton data-focus-info={isActive} onClick={() => onClick()}>
			{icon}
			<StyledSpan>{label}</StyledSpan>
		</CustomDesktopButton>
	)
}

const CustomButton = styled.div`
	display: flex;
	align-items: center;
	border-radius: 10px;
	cursor: pointer;
	&:hover {
		background-color: #d5d5d5;
	}
	& span {
		font-size: 1.1rem;
	}
	&[data-focus-info='true'] {
		color: #1890ff;
		background-color: #f2f2f2;
	}
	&[data-mini-info='true'] {
		padding: 0.75rem;
		& span {
			font-size: 1.5rem;
		}
	}
`
const CustomDesktopButton = styled(CustomButton)`
	width: 200px;
	flex-direction: row;
	padding: 0 1rem;
`
const StyledSpan = styled.span`
	flex: 1;
	text-align: center;
	padding: 0.5rem 1rem;
`

export default DesktopButton
