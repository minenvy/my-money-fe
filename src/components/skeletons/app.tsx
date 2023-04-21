import { Skeleton } from 'antd'
import styled from 'styled-components'

const { Avatar } = Skeleton
function AppSkeleton() {
	const windowWidth = window.innerWidth
	const boxWidth = windowWidth - 32

	return (
		<Wrapper>
			<Avatar active shape="square" size={boxWidth} />
			<Avatar active shape="square" size={boxWidth} />
		</Wrapper>
	)
}

const Wrapper = styled.div`
  padding: 1rem;
`

export default AppSkeleton
