import styled from 'styled-components'

type Props = {
	icon: React.ReactNode
	label: string
	isActive?: boolean
	onClick: Function
}

function MobileButton(props: Props) {
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

export default MobileButton
