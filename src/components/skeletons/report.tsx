import { Skeleton } from 'antd'
import styled from 'styled-components'

const { Input, Avatar, Button } = Skeleton
function ReportSkeleton() {
	const windowWidth = window.innerWidth
	const boxWidth = windowWidth - 32
	const isInMobile = windowWidth <= 768

	return (
		<>
			{isInMobile ? (
				<>
					<Wrapper>
						<Button active />
						<Button active />
					</Wrapper>
					<br></br>
					<br></br>
					<Wrapper>
						<Button active />
						<Button active />
					</Wrapper>
				</>
			) : (
				<>
					<Input size="small" active />
					<Input size="small" active />
					<Input size="small" active />
					<Input size="small" active />
					<br></br>
					<Input size="small" active />
					<Input size="small" active />
					<br></br>
					<Avatar active shape="square" size={boxWidth} />
				</>
			)}
		</>
	)
}

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
`

export default ReportSkeleton
