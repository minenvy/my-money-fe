import { changePasswordInServer } from '@/api/user'
import { useAuth } from '@/contexts/auth'
import useWindowSize from '@/hooks/use-window-size'
import { Button, Form, Input, message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function PasswordEditor() {
	const navigate = useNavigate()
	const windowSize = useWindowSize()
	const { user } = useAuth()
	const [password, setPassword] = useState({
		now: '',
		new: '',
		confirm: '',
	})
	const [isLoading, setIsLoading] = useState(false)

	const isInMobile = windowSize <= 768
	const formLayout = isInMobile ? 'vertical' : 'horizontal'
	const formItemLayout =
		formLayout === 'horizontal'
			? { labelCol: { span: 6 }, wrapperCol: { span: 16 } }
			: null

	const changeNowPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword({ ...password, now: e.target.value })
	}
	const changeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword({ ...password, new: e.target.value })
	}
	const changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword({ ...password, confirm: e.target.value })
	}
	const cancel = () => navigate('/profile/' + user.id)
	const checkValid = () => {
		if (!password.now || !password.new || !password.confirm) {
			message.warning('Cần nhập đủ các thông tin!')
			return false
		}
		if (password.new !== password.confirm) {
			message.warning('Mật khẩu mới không trùng nhau!')
			return false
		}
		return true
	}
	const changePassword = async () => {
		if (!checkValid()) return
		await changePasswordInServer({ ...password })
		setTimeout(() => navigate('/profile/' + user.id), 1000)
	}
	const handleSubmit = async () => {
		if (isLoading) return
		setIsLoading(true)
		await changePassword()
		setIsLoading(false)
	}

	return (
		<Wrapper>
			<FlexBox>
				<StyledForm {...formItemLayout}>
					<Form.Item label="Mật khẩu hiện tại">
						<Input
							type="password"
							value={password.now}
							onChange={changeNowPassword}
						/>
					</Form.Item>
					<Form.Item label="Mật khẩu mới">
						<Input
							type="password"
							value={password.new}
							onChange={changeNewPassword}
						/>
					</Form.Item>
					<Form.Item label="Mật khẩu mới">
						<Input
							type="password"
							value={password.confirm}
							onChange={changeConfirmPassword}
						/>
					</Form.Item>
					<Buttons>
						<Button onClick={cancel}>Hủy</Button>
						<Button type="primary" loading={isLoading} onClick={handleSubmit}>
							Thay đổi
						</Button>
					</Buttons>
				</StyledForm>
			</FlexBox>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`
const FlexBox = styled.div`
	width: 90%;
	max-width: 37.5rem;
	padding: 2rem 4rem;
	border: 1px solid #ddd;
	@media (max-width: 768px) {
		padding: 1rem;
	}
`
const AvatarWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`
const Name = styled.div`
	margin-left: 1rem;
`
const StyledButton = styled(Button)`
	padding: 0.25rem 0;
`
const Buttons = styled.div`
	display: flex;
	justify-content: space-around;
`
const StyledForm = styled(Form)`
	margin-top: 1rem;
	@media (max-width: 768px) {
		& .ant-row {
			display: unset;
		}
	}
`

export default PasswordEditor
