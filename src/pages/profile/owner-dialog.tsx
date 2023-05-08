import { useAuth } from '@/contexts/auth'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface IProps {
	close: Function
}

function OwnerDialog(props: IProps) {
	const { close } = props
	const { logout } = useAuth()
	const navigate = useNavigate()

	return (
		<Wrapper>
			<CenterContent>
				<StyledButton block onClick={() => navigate('/profile/change-password')}>
					Thay đổi mật khẩu
				</StyledButton>
				<StyledButton block onClick={() => logout()}>
					Đăng xuất
				</StyledButton>
				<StyledButton block onClick={() => close()}>
					Hủy
				</StyledButton>
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
	z-index: 3;
`
const CenterContent = styled.div`
	width: 90%;
	max-width: 30rem;
	padding: 0.5rem;
	border-radius: 0.5rem;
	background-color: #e6e6e6;
`
const StyledButton = styled(Button)`
	margin-top: 0.5rem;
`

export default OwnerDialog
