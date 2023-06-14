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
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 2rem;
	padding: 3rem;
`

export default Loading
