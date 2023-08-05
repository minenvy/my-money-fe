import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '@/contexts/auth'
import { message, Button } from 'antd'
import Input from '@/components/input'
import { v4 as uuid } from 'uuid'
import { postFetch } from '@/api/fetch'
import { registerToServer } from '@/api/user'

function Register() {
	const navigate = useNavigate()
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
	const checkValid = () => {
		if (
			!registerInformation.username ||
			!registerInformation.password ||
			!registerInformation.repassword
		) {
			message.warning('Cần nhập đủ các thông tin!')
			return false
		}
    if (registerInformation.password.length < 8) {
      message.warning('Mật khẩu dài tối thiểu 8 kí tự!')
			return false
    }
		if (registerInformation.password !== registerInformation.repassword) {
			message.warning('Mật khẩu không trùng khớp!')
			return false
		}
		return true
	}
	const handleRegister = async () => {
		if (!checkValid()) return
		const userInfo = await registerToServer({
			...registerInformation,
		})
		if (userInfo) {
			register({ ...userInfo, nickname: '' })
			navigate('/')
		}
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

export default Register
