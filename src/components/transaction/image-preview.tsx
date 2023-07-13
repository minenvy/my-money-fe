import { CloseOutlined } from "@ant-design/icons"
import styled from "styled-components"

type ImagePreviewProps = {
	src: string
	close: Function
}

function ImagePreview(props: ImagePreviewProps) {
	const { src, close } = props

	return (
		<Wrapper>
			<StyledCloseOutlined onClick={() => close()} />
			<CenterContent>
				<StyledImg src={src} />
			</CenterContent>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	z-index: 3;
`
const CenterContent = styled.div`
	width: 90%;
	max-width: 30rem;
	display: flex;
	justify-content: center;
`
const StyledImg = styled.img`
	width: 90%;
	height: 90%;
	max-width: 19rem;
	max-height: 38rem;
`
const StyledCloseOutlined = styled(CloseOutlined)`
	color: grey;
	background-color: white;
	font-size: 1.5rem;
	padding: 0.25rem;
	border-radius: 50%;
	position: absolute;
	top: 3%;
	right: 5%;
	cursor: pointer;
`

export default ImagePreview
