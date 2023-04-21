import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { login as loginApi } from '@/api/user'
import { useAuth } from '@/contexts/auth'
import { message, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useErrorBoundary } from '@/contexts/error-fetch-boundary'
import Button from '@/pages/login-register/no-icon-button'
import Input from '@/pages/login-register/input'

function Login() {
	const navigate = useNavigate()
	const [messageApi, contextHolder] = message.useMessage()
	const { showBoundary } = useErrorBoundary()
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
	const handleLogin = async () => {
		const user = await loginApi({ ...loginInformation }).catch((err) => {
			// showBoundary(err)
		})
		// if (!user) {
		// 	messageApi.warning('Tài khoản hoặc mật khẩu không chính xác!')
		// 	return
		// }

		login(user)
		navigate('/')
	}
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (isLoading) return
		setIsLoading(true)
		await handleLogin()
		setIsLoading(false)
	}

	return (
		<Form onSubmit={handleSubmit}>
			{contextHolder}
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
			<StyledButton type="submit">
				{isLoading ? (
					<Spin indicator={<StyledLoadingOutlined spin />} />
				) : (
					'Đăng nhập'
				)}
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
	margin: 3rem auto 0;
`
const StyledLink = styled(Link)`
	margin-top: 1rem;
`
const StyledButton = styled(Button)`
	align-self: flex-end;
	margin-right: 5%;
`
const StyledLoadingOutlined = styled(LoadingOutlined)`
	font-size: 1.5rem;
	color: #fff;
`

export default Login
