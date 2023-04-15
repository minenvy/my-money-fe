import useWindowSize from '@/hooks/use-window-size'
import styled from 'styled-components'

interface IProps {
	children: React.ReactNode
	mode?: string
}

function ShadowWrapper(props: IProps) {
	const { children, mode } = props
	const windowSize = useWindowSize()
	const isInMobile = windowSize < 768

	return (
		<Wrapper
			data-mode-info={mode}
			data-device-info={isInMobile ? 'mobile' : 'desktop'}
		>
			{children}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	background-color: white;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
	border-radius: 8px;
	padding: 0.5rem 1rem;
	&[data-mode-info='mini'] {
		width: 19rem;
	}
	&[data-device-info='mobile'] {
		margin: 0 auto;
	}
`

export default ShadowWrapper
