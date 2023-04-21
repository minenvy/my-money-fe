import useWindowSize from '@/hooks/use-window-size'
import styled from 'styled-components'

interface IProps {
	children: React.ReactNode
	style?: Object
	mode?: string
}

function ShadowBox(props: IProps) {
	const { children, mode, style } = props
	const windowSize = useWindowSize()
	const isInMobile = windowSize < 768

	return (
		<Wrapper
			data-mode-info={mode}
			data-device-info={isInMobile ? 'mobile' : 'desktop'}
			style={style}
		>
			{children}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	background-color: white;
	border: 1px solid #e6e6e6;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
	border-radius: 0.5rem;
	padding: 0.5rem 1rem;
	margin: 1rem 0;
	&[data-mode-info='mini'] {
		width: 19rem;
	}
	&[data-device-info='mobile'] {
		margin: 0.5rem auto;
	}
`

export default ShadowBox
