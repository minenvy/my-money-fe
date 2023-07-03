import styled from 'styled-components'

type Props = {
	children: React.ReactNode
	style?: Object
}

function ShadowBox(props: Props) {
	const { children, style } = props

	return <Wrapper style={style}>{children}</Wrapper>
}

const Wrapper = styled.div`
	width: 100%;
	background-color: white;
	border: 1px solid #e6e6e6;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
	border-radius: 0.5rem;
	padding: 0.5rem 1rem;
	margin: 1rem 0;
	@media (max-width: 768px) {
		margin: 0.5rem auto;
	}
`

export default ShadowBox
