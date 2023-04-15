import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '@/contexts/use-auth'
import { register as registerApi } from '@/api/user'
import { Spin, message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useErrorBoundary } from '@/contexts/error-fetch-boundary'
import Input from '@/pages/login-register/input'
import Button from '@/pages/login-register/no-icon-button'

function Register() {
	const navigate = useNavigate()
	const [messageApi, contextHolder] = message.useMessage()
	const { showBoundary } = useErrorBoundary()
	const { register } = useAuth()
	const [registerInformation, setRegisterInformation] = useState({
		username: '',
		password: '',
		repassword: '',
	})
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegisterInformation({
			...registerInformation,
			[e.target.name]: e.target.value,
		})
	}
	const handleRegister = async () => {
		if (registerInformation.password !== registerInformation.repassword) {
			messageApi.warning('Mật khẩu không trùng khớp!')
			return
		}

		const user = await registerApi({ ...registerInformation }).catch((err) => {
			showBoundary(err)
		})
		if (!user) {
			messageApi.warning('Tên tài khoản đã được sử dụng!')
			return
		}

		register(user)
		navigate('/')
	}
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (isLoading) return
		setIsLoading(true)
		await handleRegister()
		setIsLoading(false)
	}

	return (
		<Form onSubmit={handleSubmit} aria-disabled={isLoading}>
			{contextHolder}
			<h1>Đăng ký</h1>
			<StyledLink to={'/login'}>Bạn đã có tài khoản?</StyledLink>
			<Input
				value={registerInformation.username}
				onChange={handleChange}
				name="username"
				type="text"
				placeholder="Tài khoản"
			/>
			<Input
				value={registerInformation.password}
				onChange={handleChange}
				name="password"
				type="password"
				placeholder="Mật khẩu"
			/>
			<Input
				value={registerInformation.repassword}
				onChange={handleChange}
				name="repassword"
				type="password"
				placeholder="Nhập lại mật khẩu"
			/>
			<StyledButton type="submit">
				{isLoading ? (
					<Spin indicator={<StyledLoadingOutlined spin />} />
				) : (
					'Đăng ký'
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
	margin: 1.5rem auto 0;
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

export default Register
