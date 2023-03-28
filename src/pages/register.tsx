import { useState } from 'react'
import { Form, Link, redirect } from 'react-router-dom'
import styled from 'styled-components'
import CustomElement from '@/elements'

export async function action({ request }: any) {
	const formData = await request.formData()
	const body = Object.fromEntries(formData)
	console.log(body)
	return body
	redirect('/')
}

function Register() {
	const [registerInformation, setRegisterInformation] = useState({
		account: '',
		username: '',
		password: '',
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegisterInformation({
			...registerInformation,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<StyledForm method="post">
			<h1>Register</h1>
			<StyledLink to={'/login'}>Have an account?</StyledLink>
			<CustomElement.Input
				value={registerInformation.account}
				onChange={handleChange}
				name="account"
				type="text"
				placeholder="Account"
			/>
			<CustomElement.Input
				value={registerInformation.username}
				onChange={handleChange}
				name="username"
				type="text"
				placeholder="Username"
			/>
			<CustomElement.Input
				value={registerInformation.password}
				onChange={handleChange}
				name="password"
				type="password"
				placeholder="Password"
			/>
			<StyledButton type="submit">Register</StyledButton>
		</StyledForm>
	)
}

const StyledForm = styled(Form)`
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
const StyledButton = styled(CustomElement.Button)`
	align-self: flex-end;
  margin-right: 5%;
`

export default Register
