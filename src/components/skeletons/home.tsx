import { Skeleton } from 'antd'

const { Input, Avatar } = Skeleton
function HomeSkeleton() {
	const windowWidth = window.innerWidth
	const boxWidth = windowWidth - 32

	return (
		<>
			<Input size="small" active />
			<br></br>
			<br></br>
			<Input size="small" active />
			<br></br>
			<Input size="small" active />
			<br></br>
			<br></br>
			<Input size="small" active />
			<br></br>
			<Input size="small" active />
			<br></br>
			<br></br>
			<Avatar active shape="square" size={boxWidth} />
		</>
	)
}

export default HomeSkeleton
