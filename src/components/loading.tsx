import { Spin } from 'antd'
import styled from 'styled-components'

function Loading() {
	return (
		<Wrapper>
			<Spin />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(230, 230, 230, 0.5);
  z-index: 100;
`

export default Loading
