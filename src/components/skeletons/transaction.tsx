import { Skeleton } from 'antd'
import styled from 'styled-components'

const { Input, Button } = Skeleton
function TransactionSkeleton() {
	return (
		<Wrapper>
			<Input size="small" active />
			<br></br>
			<Skeleton avatar active paragraph={{ rows: 2 }} />
			<br></br>
			<Skeleton avatar active paragraph={{ rows: 1 }} />
			<br></br>
			<Skeleton avatar active paragraph={{ rows: 1 }} />
			<br></br>
			<Button active />
			<br></br>
			<Skeleton avatar active paragraph={{ rows: 2 }} />
			<br></br>
			<Button active block />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	max-width: 20rem;
	margin: 0 auto;
	text-align: center;
`

export default TransactionSkeleton
