import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function LogoImage() {
	const navigate = useNavigate()

	const handleClickLogo = () => {
		navigate('/')
	}

	return (
		<LogoImageWrapper onClick={() => handleClickLogo()}>
			<img src="/favicon-32x32.png" alt="logo" />
			<StyledText>My Money</StyledText>
		</LogoImageWrapper>
	)
}

const LogoImageWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`
const StyledText = styled.b`
	min-width: fit-content;
	margin-left: 0.25rem;
	@media (max-width: 768px) {
		display: none;
	}
`

export default LogoImage
