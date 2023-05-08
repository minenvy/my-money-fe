import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '@/contexts/auth'
import { register as registerApi } from '@/api/user'
import { message, Button } from 'antd'
import { useErrorBoundary } from '@/contexts/error-fetch-boundary'
import Input from '@/pages/login-register/input'
import { v4 as uuid } from 'uuid'

function Register() {
	const navigate = useNavigate()
	const { showBoundary } = useErrorBoundary()
	const { register } = useAuth()
	const [registerInformation, setRegisterInformation] = useState({
		id: uuid(),
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
		if (
			!registerInformation.username ||
			!registerInformation.password ||
			!registerInformation.repassword
		) {
			message.warning('Cần nhập đủ các thông tin!')
			return
		}
		if (registerInformation.password !== registerInformation.repassword) {
			message.warning('Mật khẩu không trùng khớp!')
			return
		}

		const res = (await registerApi({ ...registerInformation }).catch((err) => {
			showBoundary(err)
		})) as Response
		if (!res.ok) {
			message.warning('Tên tài khoản đã được sử dụng!')
			return
		}
		const user = await res.json()
		register(user)
		navigate('/')
	}
	const handleSubmit = async () => {
		if (isLoading) return
		setIsLoading(true)
		await handleRegister()
		setIsLoading(false)
	}

	return (
		<Form>
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
			<StyledButton
				type="primary"
				size="large"
				loading={isLoading}
				onClick={handleSubmit}
			>
				Đăng ký
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
	margin: 8rem auto 0;
`
const StyledLink = styled(Link)`
	margin-top: 1rem;
`
const StyledButton = styled(Button)`
	align-self: flex-end;
	margin-right: 5%;
	margin-top: 1.5rem;
`

export default Register
