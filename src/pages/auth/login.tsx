import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '@/contexts/auth'
import { message, Button } from 'antd'
import Input from '@/components/input'
import { UserInfo } from '@/interfaces/auth'
import { loginToServer } from '@/api/user'

function Login() {
	const navigate = useNavigate()
	const { login } = useAuth()
	const [loginInformation, setLoginInformation] = useState({
		username: '',
		password: '',
	})
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginInformation({
			...loginInformation,
			[e.target.name]: e.target.value,
		})
	}
	const checkValid = () => {
		if (!loginInformation.username || !loginInformation.password) {
			message.warning('Cần nhập đủ các thông tin!')
			return false
		}
		return true
	}
	const handleLogin = async () => {
		if (!checkValid()) return
		const userInfo = await loginToServer(
			loginInformation.username,
			loginInformation.password
		)
		if (userInfo) {
			login(userInfo)
			navigate('/')
		}
	}
	const handleSubmit = async () => {
		if (isLoading) return
		setIsLoading(true)
		await handleLogin()
		setIsLoading(false)
	}

	return (
		<Form>
			<h1>Đăng nhập</h1>
			<StyledLink to={'/register'}>Bạn chưa có tài khoản?</StyledLink>
			<Input
				value={loginInformation.username}
				onChange={handleChange}
				name="username"
				type="text"
				placeholder="Tài khoản"
			/>
			<Input
				value={loginInformation.password}
				onChange={handleChange}
				name="password"
				type="password"
				placeholder="Mật khẩu"
			/>
			<StyledButton
				type="primary"
				size="large"
				loading={isLoading}
				onClick={handleSubmit}
			>
				Đăng nhập
			</StyledButton>
		</Form>
	)
}

const Form = styled.form`
	max-width: 540px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
	padding-top: 8rem;
`
const StyledLink = styled(Link)`
	margin-top: 1rem;
`
const StyledButton = styled(Button)`
	align-self: flex-end;
	margin-right: 5%;
	margin-top: 1.5rem;
`

export default Login
